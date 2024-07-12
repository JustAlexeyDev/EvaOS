import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const container  = document.getElementById('root');
const root = ReactDOM.createRoot(container);

import './Assets/Css/Global.css';
import './Assets/Css/Reset.css';
import App from "./App";

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)