import React, {useState, useEffect} from "react";

import Notepad from "../Apps/Note/NotepadApp";
import TodoApp from "../Apps/TodoApp/ToDoApp";
import Settings from "../Apps/SettingsApp/SettingsApp";
import TerminalApp from "../Apps/TerminalApp/TerminalApp";
import LetterApp from "../Apps/LetterApp/LetterApp";

const DesktopApps: React.FC = () => {

    return(
        <div className="DesktopApps">
            <Notepad />
            <Settings />
            <TodoApp />
            <TerminalApp />
            <LetterApp />
        </div>
    );
}
export default DesktopApps;