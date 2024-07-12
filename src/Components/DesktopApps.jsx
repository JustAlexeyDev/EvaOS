
import Notepad from "../Apps/Note/Notepad";
import React, {useState, useEffect} from "react";
import TodoApp from "../Apps/TodoApp/ToDoApp";
import Settings from "../Apps/Settings/Settings";

const DesktopApps = () => {

    return(
        <div className="DesktopApps">
            <Notepad />
            <TodoApp />
            <Settings />
        </div>
    );
}
export default DesktopApps;