import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response)=> response.json())
      .then((data)=> console.log(data))
  }, []);

  return (
    <h1>Task Manager</h1>
  )
}

export default App
