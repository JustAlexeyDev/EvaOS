
import Notepad from "../Apps/Note/Notepad";
import React, {useState, useEffect} from "react";
import TodoApp from "../Apps/TodoApp/ToDoApp";

const DesktopApps = () => {

    return(
        <div className="DesktopApps">
            <Notepad />
            <TodoApp />
        </div>
    );
}
export default DesktopApps;