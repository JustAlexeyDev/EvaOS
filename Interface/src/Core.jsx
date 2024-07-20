import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Screens/Login";
import Bsod from "./Api/Libs/VioletClientManager/Core/Managers/Errors/Bsod";
import Desktop from "./Screens/Desktop";
import SSSMprocessSetupSystemManager from "./Api/Libs/VioletClientManager/Core/SSSM/SSSMprocessSetupSystemManager";
import LoginChecker from "./Api/Libs/VioletClientManager/Core/Scripts/Security/LoginChecker";


const Core = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SSSMprocessSetupSystemManager />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/*" element={<Bsod />} />
                <Route path="/Desktop" element={<Desktop />} />
            </Routes>
            <LoginChecker />
        </div>
    );
}

export default Core;