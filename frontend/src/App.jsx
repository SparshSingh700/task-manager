import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx";
import "./App.css";
import {useState} from "react";

function App() {
    const [token, setToken]= useState(localStorage.getItem("token"));
    return (
        <div className="app">
            <h1>Task Manager</h1>

            {token ? (
                <Dashboard />
            ) : (
                <div className="auth-container">
                    <Login onLogin={setToken} />
                    <Register />
                </div>
            )}
        </div>
    );
}

export default App;