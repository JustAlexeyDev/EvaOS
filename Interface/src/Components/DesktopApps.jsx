
import Notepad from "src/Apps/Note/Notepad";
import React, {useState, useEffect} from "react";
import TodoApp from "src/Apps/TodoApp/ToDoApp";
import Settings from "src/Apps/Settings/Settings";
import VioletUiTest from "src/Apps/VioletUiTest/VioletUiTest";
import TerminalApp from "src/Apps/TerminalApp/TerminalApp";

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