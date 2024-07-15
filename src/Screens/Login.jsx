
import React, {useEffect, useState} from "react";
import PasswordChecker from '../Api/Libs/VioletClientManager/Core/Scripts/Security/PasswordChecker';
import { useNavigate } from "react-router-dom";

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
            setError("Неверный пароль!");
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
                    <h1>Добро Пожаловать, {localStorage.getItem("user")}!</h1>
                </div>
                    <form onSubmit={handleLogin}>
                        <input type="password" id="password" placeholder="Введите пароль.."/>
                        <button className="white" type="submit">Войти</button>
                    </form>
                {error}
                <button className="white" onClick={setFogotForm}>Забыли пароль?</button>
                {
                    fogotForm && (
                        <form>
                            <input id="fogotInput" type="text" placeholder="Имя вашего питомца"/>
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