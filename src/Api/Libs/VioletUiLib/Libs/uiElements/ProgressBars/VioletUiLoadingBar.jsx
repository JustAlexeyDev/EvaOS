import './VioletUiLoadingBar.css';

const VioletUiLoadingBar = ({progress}) => {
    return(
        <div className="VioletUiLoadingBar--Container">
            <div className="VioletUiLoadingBar--Container--Box">
                <span style={{height: '20px', width: `${progress}`, backgroundColor: "green"}}></span>
            </div>
        </div>
    );
}
export default VioletUiLoadingBar;