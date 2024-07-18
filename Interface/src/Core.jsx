import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Screens/Login";
import Bsod from "./Api/Libs/VioletClientManager/Core/Managers/Errors/Bsod";
import Desktop from "./Screens/Desktop";
import Setup from "./Api/Libs/VioletClientManager/Core/Start/Setup";

import LoginChecker from "./Api/Libs/VioletClientManager/Core/Scripts/Security/LoginChecker";


const Core = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Setup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/*" element={<Bsod />} />
                <Route path="/Desktop" element={<Desktop />} />
            </Routes>
            <LoginChecker />
        </div>
    );
}

export default Core;