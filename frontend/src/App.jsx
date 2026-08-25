import Login from "./Login.jsx";
import Register from "./Register.jsx";
import "./App.css";

function App() {
    return (
        <div className="app">
            <h1>Task Manager</h1>

            <div className="auth-container">
                <Login />
                <Register />
            </div>
        </div>
    );
}

export default App;