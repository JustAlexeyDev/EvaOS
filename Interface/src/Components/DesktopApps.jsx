import React, {useState, useEffect} from "react";

import Notepad from "../Apps/Note/NotepadApp";
import TodoApp from "../Apps/TodoApp/ToDoApp";
import Settings from "../Apps/SettingsApp/SettingsApp";
import VioletUiTest from "../Apps/VioletUiTest/VioletUiTest";
import TerminalApp from "../Apps/TerminalApp/TerminalApp";

const DesktopApps = () => {

    return(
        <div className="DesktopApps">
            <Notepad />
            <Settings />
            <TodoApp />
            <VioletUiTest />
            <TerminalApp />
        </div>
    );
}
export default DesktopApps;