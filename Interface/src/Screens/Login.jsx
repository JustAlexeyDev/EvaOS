import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import PasswordChecker from '../Api/Libs/VioletClientKernel/Core/Scripts/Security/PasswordChecker';

const Login = () => {
    const [error, setError] = useState("");
    const [fogotForm, setFogotForm] = useState(false);
    const navigate = useNavigate();
    const userPassword = localStorage.getItem("password");

    const handleLogin = (e) => {
        e.preventDefault();
        if(password.value === userPassword) {
            navigate("/Desktop");
            setError("");
        } else {
            setError("Wrong Password!");
        }
    }

    const FogotF = (e) => {
        e.preventDefault();
        if(fogotInput.value == localStorage.getItem("fogotQuestion")) {
            navigate("/Desktop");
            setError("");
        }
    }

    return(
        <div className="Page SDDM">
            <div className="sddm--container">
                <div>
                    <h1>Welcome, {localStorage.getItem("user")}!</h1>
                </div>
                    <form onSubmit={handleLogin}>
                        <input type="password" id="password" placeholder="Enter password.."/>
                        {/* <button className="white" type="submit">Войти</button> */}
                    </form>
                {error}
                <button className="white" onClick={setFogotForm}>Fogot password?</button>
                {
                    fogotForm && (
                        <form>
                            <input id="fogotInput" type="text" placeholder="Fogot word.."/>
                            <button onClick={FogotF}>Enter</button>
                        </form>
                    )
                }
            </div>
            <PasswordChecker />
        </div>
    );
}
export default Login;