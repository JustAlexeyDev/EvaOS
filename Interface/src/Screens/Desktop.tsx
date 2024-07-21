import React, { useState } from 'react';
import DesktopApps from "../Components/DesktopApps";
import ContextMenu from "../Api/Libs/VioletClientKernel/Core/Managers/Context/ContextMenu";
import LoginChecker from "../Api/Libs/VioletClientKernel/Core/Scripts/Security/LoginChecker";
import TaskManager from "../Api/Libs/VioletClientKernel/Components/TaskManager";

const Desktop: React.FC = () => {

    return(
        <div className="Page Desktop"> 
            <DesktopApps />
            <TaskManager />
            <ContextMenu /> 
            <LoginChecker />
        </div>
    );
}
export default Desktop;