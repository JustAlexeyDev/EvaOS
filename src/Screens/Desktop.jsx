import DesktopApps from "../Components/DesktopApps";
import TaskManager from "../Components/TaskManager";
import React, { useState } from 'react';
import ContextMenu from "../Managers/Context/ContextMenu";
const Desktop = () => {

    return(
        <div className="Page Desktop"> 
            <DesktopApps />
            <TaskManager />
            <ContextMenu /> 
        </div>
    );
}
export default Desktop;