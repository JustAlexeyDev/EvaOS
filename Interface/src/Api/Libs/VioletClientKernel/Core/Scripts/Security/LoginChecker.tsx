import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginChecker: React.FC = () => {
    const navigate = useNavigate();
    const userLogged = localStorage.getItem("user");

    useEffect(() => {
        if (userLogged) {
            console.log("Checked");
        } else {
            navigate("/");
            console.error("NotAuth");
        }
    }, [navigate, userLogged]);

    return null;
}

export default LoginChecker;