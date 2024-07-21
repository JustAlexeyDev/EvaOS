import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChecker from '../Api/Libs/VioletClientKernel/Core/Scripts/Security/PasswordChecker';

const Login: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [fogotForm, setFogotForm] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [fogotInput, setFogotInput] = useState<string>("");
    const navigate = useNavigate();
    const userPassword = localStorage.getItem("password");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === userPassword) {
            navigate("/Desktop");
            setError("");
        } else {
            setError("Wrong Password!");
        }
    }

    const handleForgot = (e: React.FormEvent) => {
        e.preventDefault();
        if (fogotInput === localStorage.getItem("fogotQuestion")) {
            navigate("/Desktop");
            setError("");
        } else {
            setError("Wrong Answer!");
        }
    }

    return (
        <div className="Page SDDM">
            <div className="sddm--container">
                <div>
                    <h1>Welcome, {localStorage.getItem("user")}!</h1>
                </div>
                <form onSubmit={handleLogin}>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter password.." 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button className="white" type="submit">Login</button>
                </form>
                {error && <p>{error}</p>}
                <button className="white" onClick={() => setFogotForm(true)}>Forgot password?</button>
                {
                    fogotForm && (
                        <form onSubmit={handleForgot}>
                            <input 
                                id="fogotInput" 
                                type="text" 
                                placeholder="Forgot word.." 
                                value={fogotInput} 
                                onChange={(e) => setFogotInput(e.target.value)} 
                            />
                            <button type="submit">Enter</button>
                        </form>
                    )
                }
            </div>
            <PasswordChecker password={password} username={localStorage.getItem("user") || ""} onSubmit={handleLogin} />
        </div>
    );
}
export default Login;