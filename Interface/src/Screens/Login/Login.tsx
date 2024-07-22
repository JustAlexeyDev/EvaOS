import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChecker from '../../Api/Libs/VioletClientKernel/Core/Scripts/Security/PasswordChecker';
// import './Login.scss';

const Login: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [fogotForm, setFogotForm] = useState<boolean>(false);
    const username = localStorage.getItem("user")
    const [password, setPassword] = useState<string>("");
    const [fogotInput, setFogotInput] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const storedPassword = localStorage.getItem("password");
        if (password === storedPassword) {
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

    // useEffect(() => {
    //     const interBubble = document.querySelector('.interactive') as HTMLElement | null;
    //     if (!interBubble) {
    //         console.error("Element with class 'interactive' not found");
    //         return;
    //     }
    
    //     let curX = 0;
    //     let curY = 0;
    //     let tgX = 0;
    //     let tgY = 0;
    
    //     function move() {
    //         if (interBubble) {
    //             curX += (tgX - curX) / 20;
    //             curY += (tgY - curY) / 20;
    //             interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    //         }
    //         requestAnimationFrame(move);
    //     }
    
    //     window.addEventListener('mousemove', (event) => {
    //         tgX = event.clientX;
    //         tgY = event.clientY;
    //     });
    
    //     move();
    // }, []);

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
            <PasswordChecker password={password} username={username} onSubmit={handleLogin} />
            <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className="gradients-container">
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>
                <div className="interactive"></div>
            </div>
        </div>
    );
}
export default Login;   