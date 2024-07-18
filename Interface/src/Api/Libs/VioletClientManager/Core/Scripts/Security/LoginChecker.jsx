import React, { useEffect } from "react";
import {useNavigate } from "react-router-dom";

export default function LoginChecker() {
    const navigate = useNavigate();
    const userLogged = localStorage.getItem("user");
    useEffect(() => {
        if (userLogged) {
            console.log("Checked");
        } if (!userLogged) {
            navigate("/");
            console.error("NotAuth");
        }
    }, [navigate]);    
}


