import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChecker from '../../Api/Libs/VioletClientKernel/Core/Scripts/Security/PasswordChecker';
import LoginChecker from "../../Api/Libs/VioletClientKernel/Core/Scripts/Security/LoginChecker";
import FogotPassword from "../../Api/Libs/VioletClientKernel/Core/Scripts/Security/FogotPassword";

const Login: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [fogotForm, setFogotForm] = useState<boolean>(false);
    const username = localStorage.getItem("user");
    const [password, setPassword] = useState<string>("");
    const [fogotInput, setFogotInput] = useState<string>("");
    const navigate = useNavigate();
    const passwordChecker = new PasswordChecker();
    const fogotPasswordChecker = new FogotPassword();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordChecker.checkPassword(password)) {
            navigate("/Desktop");
            setError("");
        } else {
            setError("Wrong Password!");
        }
    }

    const handleForgot = (e: React.FormEvent) => {
        e.preventDefault();
        if (fogotPasswordChecker.checkFogotPassword(fogotInput)) {
            navigate("/Desktop");
            setError("");
        } else {
            setError("Wrong Answer!");
        }
    }

    return (
        <div className="Page SDDM gradient-bg">
            <div className="sddm--container">
                <div>
                    <h1>Welcome, {username}!</h1>
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
                <button 
                    className="white" 
                    onClick={() => setFogotForm(true)}
                    disabled={!fogotPasswordChecker.isForgotPasswordAvailable()}
                >
                    Forgot password?
                </button>
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
            <LoginChecker />
        </div>
    );
}

export default Login;