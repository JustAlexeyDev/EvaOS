import './VioletUiLoadingBar.css';

const VioletUiLoadingBar = ({progress}) => {
    
    return(
        <div className="VioletUiLoadingBar--Container">
            <div className="VioletUiLoadingBar--Container--Box">
                <span style={{height: '100%', width: `${progress}%`}}></span>
            </div>
        </div>
    );
}
export default VioletUiLoadingBar;