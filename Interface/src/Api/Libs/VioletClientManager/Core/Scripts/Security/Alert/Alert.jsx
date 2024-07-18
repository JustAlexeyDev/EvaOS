import './Style.css';
import AlertConfirm from './Common/AlertConfirm';

const Alert = ({title, onClick}) => {
    const ConfirmF = () => {
        window.location.href = '/Desktop';
    }
    return(
        <div className="Alert--Container">
            <div className="Alert--Container--Box ">
                <div className="Alert--Container--Header">
                    {title}
                </div>
                <div className="Alert--Container--Content">
                    <AlertConfirm onClick={ConfirmF}/>
                </div>
            </div>
        </div>
    );
}
export default Alert;