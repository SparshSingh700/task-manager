import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setIsError(false);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setIsError(true);
                setMessage(data.message || "Login failed");
                return;
            }

            console.log(data);
            setMessage("Login successful");
        } catch (error) {
            setIsError(true);
            setMessage("Unable to connect to the server");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card">
            <h2>Login</h2>

            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <label>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={(event) => setShowPassword(event.target.checked)}
                        />
                        Show password
                    </label>
                </div>

                <button className="auth-button" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                {message && (
                    <div className={`message ${isError ? "error" : "success"}`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}

export default Login;