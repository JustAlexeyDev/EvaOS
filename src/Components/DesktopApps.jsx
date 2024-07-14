
import Notepad from "../Apps/Note/Notepad";
import React, {useState, useEffect} from "react";
import TodoApp from "../Apps/TodoApp/ToDoApp";
import Settings from "../Apps/Settings/Settings";
import VioletUiTest from "../Apps/VioletUiTest/VioletUiTest";

const DesktopApps = () => {

    return(
        <div className="DesktopApps">
            <Notepad />
            <TodoApp />
            <Settings />
            <VioletUiTest />
        </div>
    );
}
export default DesktopApps;