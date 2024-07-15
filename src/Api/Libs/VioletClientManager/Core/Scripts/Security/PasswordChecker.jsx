import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordChecker = ({password, username, onSubmit}) => {
    const userPassword = localStorage.getItem("password");
    const userName = localStorage.getItem("user");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if(password.value === userPassword && userName == true) {
            navigate("/Desktop");
            setError("");
        } else {
            setError("Неверный пароль!");
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
        <div>

        </div>
    );
}
export default PasswordChecker;