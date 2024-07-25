import React from "react";
import VioletUiAccentButton from "../../../VioletUiLib/Libs/uiElements/Buttions/VioletUiAccentButton";
import { useNavigate } from "react-router";

const PowerManager: React.FC =() => {
    const navigate = useNavigate();
    const logoutF = () => {
        navigate("/Login");
    }
    
    return(
        <div>
            <VioletUiAccentButton onClick={logoutF} title="Блокировка"/>
        </div>
    );
}
export default PowerManager;