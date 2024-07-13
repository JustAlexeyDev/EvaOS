import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const container  = document.getElementById('root');
const root = ReactDOM.createRoot(container);

import './Env/Styles/Global.css';
import './Env/Styles/Reset.css';
import Core from "./Core";

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Core />
        </BrowserRouter>
    </React.StrictMode>
)