import {useState, useEffect} from "react";

function DashBoard({ onLogout }) {
    const [tasks,setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchTasks= async () => {
            try{
                const response = await fetch("http://localhost:3000/api/tasks",{
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                });

                if(response.status === 401){
                    localStorage.removeItem("token");
                    onLogout();
                    return;
                }

                const data = await response.json();
                setTasks(data);
                console.log(data);
            }
            catch(error){
                console.error("Error fetching tasks:", error);
            }
        };    
        fetchTasks();
    }, []);      

    const createTask= async()=>{
        const token= localStorage.getItem("token")
        try{
            const response= await fetch("http://localhost:3000/api/tasks",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify({
                    title:newTask
                })
            });
            const data= await response.json();

            console.log(data);
            console.log("task created successfully")

            setTasks(prevTasks => [...prevTasks, data]);
            setNewTask("");
        }
        catch(error){
            console.error("Error creating task:", error);
        }
    };

    const updateTask = async(taskId, updates) => {
        const token = localStorage.getItem("token");

        try{
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });

            const data = await response.json();
            console.log(data);

            setTasks(prevTasks =>
                prevTasks.map(currentTask =>
                    currentTask._id === taskId ? data : currentTask
                )
            );
        }
        catch(error){
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async(taskId) => {
        const token = localStorage.getItem("token");

        try{
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: "DELETE",
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data);

            setTasks(prevTasks =>
                prevTasks.filter(currentTask => currentTask._id !== taskId)
            );
        }
        catch(error){
            console.error("Error deleting task:", error);
        }
    };

    return(
        <div>
            <h1>Welcome to the Dashboard</h1>

            <input
                type="text"
                value={newTask}
                onChange={(e)=> setNewTask(e.target.value)}
                placeholder="Enter new task"
            />
            <button onClick={createTask}>Add Task</button>

            {tasks.map(task=>(
                <div key={task._id}>

                    {editingTaskId===task._id ?
                    (
                        <>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={e=> setEditTitle(e.target.value)}
                            />
                            <button
                                onClick={()=>{
                                    updateTask(task._id, {title: editTitle})
                                    setEditingTaskId(null);
                                    setEditTitle("");
                                }}
                            > 
                            Save
                            </button>
                        </>
                    )
                    :
                    (
                        <>
                            <p>{task.title}</p>
                            <button onClick={()=>{
                                setEditingTaskId(task._id);
                                setEditTitle(task.title);
                            }}>
                                Edit
                            </button>
                        </>
                    )}

                    <button onClick={() => updateTask(task._id, { completed: !task.completed })}>
                        {task.completed? "Completed": "Complete"}
                    </button>

                    <button onClick={() => deleteTask(task._id)}>
                        Delete
                    </button>
                </div> 
            ))}
        </div>
    )
}
export default DashBoard;