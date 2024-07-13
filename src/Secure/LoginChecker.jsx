import React, { useEffect } from "react";
import {useNavigate } from "react-router-dom";

export default function LoginChecker() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user") == true) {
            navigate("/Login");
        }
    }, [navigate]);    
}


