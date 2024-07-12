import DesktopApps from "../Components/DesktopApps";
import TaskManager from "../Components/TaskManager";
import React, { useState } from 'react';
const Desktop = () => {

    return(
        <div className="Page Desktop"> 
            <DesktopApps />
            <TaskManager />
        </div>
    );
}
export default Desktop;