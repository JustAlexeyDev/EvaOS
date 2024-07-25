import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Screens/Login/Login";
import Bsod from "./Api/Libs/VioletClientKernel/Core/Managers/Errors/Bsod";
import Desktop from "./Screens/Desktop";
import SystemSoftwareSetupManager from "./Api/Libs/VioletClientKernel/Core/SSSM/SystemSoftwareSetupManager";
import LoginChecker from "./Api/Libs/VioletClientKernel/Core/Scripts/Security/LoginChecker";

const Core: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SystemSoftwareSetupManager />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/*" element={<Bsod />} />
                <Route path="/Desktop" element={<Desktop />} />
            </Routes>
            {/* <LoginChecker /> */}
        </div>
    );
}

export default Core;