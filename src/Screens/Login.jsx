
import React, {useEffect, useState} from "react";
import PasswordChecker from '../Api/Libs/VioletClientManager/Core/Scripts/Security/PasswordChecker';

const Login = () => {
    const [error, setError] = useState("");
    const [fogotForm, setFogotForm] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if(password.value === localStorage.getItem("password")) {
            window.location.href = "/Desktop";
            setError("");
        } else {
            setError("Wrong password!");
        }
    }


    const FogotF = (e) => {
        e.preventDefault();
        if(fogotInput.value == localStorage.getItem("fogotQuestion")) {
            window.location.href = "/Desktop";
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