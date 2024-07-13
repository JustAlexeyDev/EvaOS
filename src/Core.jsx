import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./Screens/Login";
import Bsod from "./Errors/Bsod";
import Desktop from "./Screens/Desktop";
import Setup from "./Start/Setup";

const Core = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Setup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/*" element={<Bsod />} />
                <Route path="/Desktop" element={<Desktop />} />
            </Routes>
        </div>
    );
}

export default Core;