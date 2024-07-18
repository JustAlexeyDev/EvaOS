import 'src/Api/Libs/VioletUiLib/Libs/uiElements/ProgressBars/CriticalBar/VioletUiCriticalBar.css';
import React, {useState, useEffect} from "react";

const VioletUiCriticalBar= ({progress}) => {
    const [progressBarColor, setProgressBarColor] = useState('green');

    useEffect(() => {
        const colorUpdate = () => {
            if (progress < 40) {
                setProgressBarColor('green');
            } else if (progress < 60) {
                setProgressBarColor('yellow');
            } else {
                setProgressBarColor('red');
            }     
        }

        const intervalId = setInterval(() => {
            colorUpdate();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])

    return(
        <div className="VioletUiCriticalBar--Container">
            <div className="VioletUiCriticalBar--Container--Box">
                <span style={{height: '100%', width: `${progress}%`, backgroundColor: progressBarColor}}></span>
            </div>
        </div>
    );
}
export default VioletUiCriticalBar;