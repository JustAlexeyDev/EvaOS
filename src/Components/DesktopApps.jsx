
import Notepad from "../Apps/Note/Notepad";
import React, {useState, useEffect} from "react";
import TodoApp from "../Apps/TodoApp/ToDoApp";
import Settings from "../Apps/Settings/Settings";
import NotepadOnCapp from "../Apps/NoteOnCapp/NotepadOnCapp";

const DesktopApps = () => {

    return(
        <div className="DesktopApps">
            <NotepadOnCapp />
            <Notepad />
            <TodoApp />
            <Settings />
        </div>
    );
}
export default DesktopApps;