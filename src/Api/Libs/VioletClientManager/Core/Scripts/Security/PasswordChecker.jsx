import React, {useState, useEffect} from 'react';

const PasswordChecker = ({password, username}) => {
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
        <div>

        </div>
    );
}
export default PasswordChecker;