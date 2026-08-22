import { useEffect , useState} from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response)=> response.json())
      .then((data)=> setTasks(data))
  }, []);

  return(
    <div>
      <h1>Task Manager</h1>

      {
        tasks.map((task) => (
        <p key={task._id}>{task.title}</p>
        ))
      }

    </div>
  );

}

export default App
