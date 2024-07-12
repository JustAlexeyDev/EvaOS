import React, {useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import Bsod from "./Pages/Bsod";
import Desktop from "./Pages/Desktop";
import Setup from "./Manager/Setup";

const App = () => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Setup />}/>
                <Route path="/Login" element={<Login />}/>
                <Route path="/*" element={<Bsod />}/>
                <Route path="/Desktop" element={<Desktop />}/>
            </Routes>
        </div>
    );
}
export default App;