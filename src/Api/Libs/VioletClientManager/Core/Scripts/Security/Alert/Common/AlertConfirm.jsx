

const AlertConfirm = ({onClick}) => {
    return(
        <div className="AlertConfirm">
            <a>Отмена</a>
            <button onClick={onClick}>Подтвердить</button>
        </div>
    );
}
export default AlertConfirm;