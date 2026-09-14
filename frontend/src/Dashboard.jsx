import { useState, useEffect } from "react";

function DashBoard({ onLogout }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [isLoading,  setIsLoading]= useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalTasks, setTotalTasks] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const [deletingTaskId, setDeletingTaskId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchTasks = async () => {
            setError("");
            try {
                const response = await fetch(`http://localhost:3000/api/tasks?page=${currentPage}&limit=5`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    onLogout();
                    return;
                }
                if(!response.ok){
                    throw new Error("Failed to fetch tasks")
                }

                const data = await response.json();
                setTotalTasks(data.pagination.total);
                const newTotalPages = data.pagination.totalPages;
                setTotalPages(newTotalPages);
                if (currentPage > newTotalPages) {
                    setCurrentPage(newTotalPages);
                    return;
                }
                setTasks(data.tasks);
            }
            catch (error) {
                console.error("Error fetching tasks:", error);
                setError(error.message);
            }
            finally{
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [currentPage, refreshKey]);

    const createTask = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:3000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: newTask
                })
            });
            if(!response.ok){
                throw new Error("Failed to create task");
            }
            setRefreshKey(prev=> prev+1 );
            setNewTask("");
        }
        catch (error) {
            console.error("Error creating task:", error);
            setError(error.message);
        }
    };

    const updateTask = async (taskId, updates) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            if(!response.ok){
                throw new Error("Failed to update task");
            }
            const data = await response.json();
            setTasks(prevTasks =>
                prevTasks.map(currentTask =>
                    currentTask._id === taskId ? data : currentTask
                )
            );

        }
        catch (error) {
            console.error("Error updating task:", error);
            setError(error.message);
        }
    };

    const deleteTask = async (taskId) => {
        const token = localStorage.getItem("token");

        if (deletingTaskId === taskId) {
            return;
        }

        setDeletingTaskId(taskId);

        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            await response.json();

            // NEW: immediately remove the successfully deleted task
            // from the current React state.
            setTasks(prevTasks =>
                prevTasks.filter(currentTask => currentTask._id !== taskId)
            );

            // KEEP: refetch from backend so pagination stays correct.
            setRefreshKey(prev => prev + 1);
        }
        catch (error) {
            console.error("Error deleting task:", error);
            setError(error.message);
        }
        finally {
            setDeletingTaskId(null);
        }
    };

    const saveEdit = (taskId) => {
        updateTask(taskId, { title: editTitle });
        setEditingTaskId(null);
        setEditTitle("");
    };

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <div>
                    <p className="dashboard-label">YOUR WORKSPACE</p>
                    <h2>My Tasks</h2>
                    <p className="dashboard-subtitle">
                        Keep track of what needs to get done.
                    </p>
                </div>

                <button
                    className="logout-button"
                    onClick={() => {
                        localStorage.removeItem("token");
                        onLogout();
                    }}
                >
                    Logout
                </button>
            </div>

            <div className="task-create-card">
                <input
                    className="task-input"
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="What needs to be done?"
                />

                <button
                    className="add-task-button"
                    onClick={createTask}
                    disabled={!newTask.trim()}
                >
                    Add Task
                </button>
            </div>

            <div className="tasks-section">
                <div className="tasks-section-header">
                    <h3>Tasks</h3>
                    <span className="task-count">
                        {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
                    </span>
                </div>

                {isLoading ? (
                    <div className="loading-state">
                        Loading tasks...
                    </div>
                )
                :
                error ? (
                    <div className="message error">
                        {error}
                    </div>
                )
                :
                tasks.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">✓</div>
                        <h3>No tasks yet</h3>
                        <p>Add your first task above to get started.</p>
                    </div>
                ) : (
                    <div className="task-list">
                        {tasks.map(task => (
                            <div
                                className={`task-card ${task.completed ? "task-completed" : ""}`}
                                key={task._id}
                            >

                                <button
                                    className={`complete-button ${task.completed ? "completed" : ""}`}
                                    onClick={() =>
                                        updateTask(task._id, {
                                            completed: !task.completed
                                        })
                                    }
                                    title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                                >
                                    {task.completed ? "✓" : ""}
                                </button>

                                <div className="task-content">
                                    {editingTaskId === task._id ? (
                                        <input
                                            className="edit-input"
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            autoFocus
                                        />
                                    ) : (
                                        <p className="task-title">{task.title}</p>
                                    )}

                                    <span className={`task-status ${task.completed ? "completed-status" : ""}`}>
                                        {task.completed ? "Completed" : "Active"}
                                    </span>
                                </div>

                                <div className="task-actions">
                                    {editingTaskId === task._id ? (
                                        <>
                                            <button
                                                className="save-button"
                                                onClick={() => saveEdit(task._id)}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className="cancel-button"
                                                onClick={() => {
                                                    setEditingTaskId(null);
                                                    setEditTitle("");
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="edit-button"
                                            onClick={() => {
                                                setEditingTaskId(task._id);
                                                setEditTitle(task.title);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}

                                    <button
                                        className="delete-button"
                                        onClick={() => deleteTask(task._id)}
                                        disabled={deletingTaskId === task._id}
                                    >
                                        {deletingTaskId === task._id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pagination">
                <button
                    onClick={()=>setCurrentPage(prev=> prev-1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={()=>setCurrentPage(prev=> prev+1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default DashBoard;