import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const container  = document.getElementById('root');
const root = ReactDOM.createRoot(container);

import "./Api/Libs/VioletClientManager/Core/default/Styles/Reset.css";
import "./Api/Libs/VioletClientManager/Core/default/Styles/Global.css";

import Core from "./Core";

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Core />
        </BrowserRouter>
    </React.StrictMode>
)