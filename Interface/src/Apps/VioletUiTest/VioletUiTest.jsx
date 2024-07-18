import "src/Apps/VioletUiTest/VioletUiTest.css";

import React, { useState, useEffect } from 'react';

import WindowManager from 'src/Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';
import VioletUiLoadingBar from 'src/Api/Libs/VioletUiLib/Libs/uiElements/ProgressBars/LoadingBar/VioletUiLoadingBar';
import VioletUiCriticalBar from 'src/Api/Libs/VioletUiLib/Libs/uiElements/ProgressBars/CriticalBar/VioletUiCriticalBar';


const VioletUiTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [progressbar, setProgressbar] = useState(50)

  const handleClose = () => {
    setIsOpen(false);
  };

  const Open =() => {
    setIsOpen(true);
  }

    useEffect(() => {
        const RandomNumber = () => {
            setProgressbar(100);
        }

        const RandomNumberUpdater = setInterval(() => {
            RandomNumber();
        }, 1000);        
        return () => clearInterval(RandomNumberUpdater);
    }, []);


  return (
    <>
        <div>
        <button onClick={Open} className="App--Icon">
          <img alt="Logo"/>
        </button>
      </div>

      {isOpen && (
        <WindowManager title="VioletUiTestApp" onClose={handleClose}>
          <div className="">
            {/* <VioletUiLoadingBar progress={progressbar}/> */}
            <VioletUiCriticalBar progress={progressbar}/>

          </div>
        </WindowManager>
      )}
    </>
  );
};

export default VioletUiTest;