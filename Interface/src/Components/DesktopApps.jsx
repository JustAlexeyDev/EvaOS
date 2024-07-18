import React, {useState, useEffect} from "react";

import Notepad from "../Apps/Note/Notepad";
import TodoApp from "../Apps/TodoApp/ToDoApp";
import Settings from "../Apps/Settings/Settings";
import VioletUiTest from "../Apps/VioletUiTest/VioletUiTest";
import TerminalApp from "../Apps/TerminalApp/TerminalApp";

const DesktopApps = () => {

    return(
        <div className="DesktopApps">
            <Notepad />
            <TodoApp />
            <Settings />
            <VioletUiTest />
            <TerminalApp />
        </div>
    );
}
export default DesktopApps;