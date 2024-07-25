import './Styles/Buttons.css';

const VioletUiAccentButton = ({title, onClick}) => {
    return(
        <button className="Accent--Button--VioletUi" onClick={onClick}>
            {title}
        </button>
    );
}
export default VioletUiAccentButton;