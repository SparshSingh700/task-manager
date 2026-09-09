import {useState, useEffect} from "react";

function DashBoard() {
    const [task,setTask] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchTasks= async () => {
            try{
                const response = await fetch("http://localhost:3000/api/tasks",{
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setTask(data);
                console.log(data);
            }
            catch(error){
                console.error("Error fetching tasks:", error);
            }
        };    
        fetchTasks();
    }, []);      

    return(
        <div>
            <h1>Welcome to the Dashboard</h1>
            {task.map(task=>(
                <p key={task._id}>{task.title}</p>
            ))}
        </div>
    )
}
export default DashBoard;