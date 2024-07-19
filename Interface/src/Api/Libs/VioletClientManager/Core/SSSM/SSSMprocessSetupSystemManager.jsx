import React, {useState, useEffect} from "react";
import {useNavigate } from "react-router-dom";
import './SSSMprocessSetupSystemManager.css';
import Alert from "../Scripts/Security/Alert/Alert";
import VioletUiLoadingBar from "../../../VioletUiLib/Libs/uiElements/ProgressBars/LoadingBar/VioletUiLoadingBar";
import { osversion } from "../../../../../config";

const SSSMprocessSetupSystemManager = (Page) => {

    const navigate = useNavigate();
    const [setup, setSetup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [fogotQuestion, setFogotQuestion] = useState("");
    const [AlertNoti, setAlertNoti] = useState(false);
    const [loadingBar, setLoadingBar] = useState(0);

    const versionOfSSSM = "1.002.00";
    

    const Start = () => {
            setLoading(true);
            setSetup(true);
            localStorage.setItem("user", username);
            localStorage.setItem("password", password);
            localStorage.setItem("fogotQuestion", fogotQuestion);
            localStorage.setItem("osversion", osversion);

            // setTimeout(() => {
            //     window.location.href = "/Login";
            // }, 2000);
    }

    const signin = (e) => {
        e.preventDefault();
        setUsername(usernameform.value);
        setPassword(passwordform.value);
        setFogotQuestion(fogotQuestionFrom.value);
        
        if(username && password) {
            Start();
        }  else {

        }
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setAlertNoti(true)
        }
    }, [navigate]);    

    return(
        <div className="setup">

            <div className="Setup--Container">
                <p>{versionOfSSSM}</p>
                <div className="Setup--Container--Box">
                    <div>
                        <h1>Добро пожаловать в EvaOS!</h1>
                        <p>Эта система написана на ReactJS и поддерживается по лицензии MIT</p>
                        <p>Введите ваше имя и пароль от новой учетной записи.</p>                        
                    </div>

                    {!setup && (
                        <form>
                            <div>
                                <p>Введите имя пользователя:</p>
                                <input id="usernameform" type="text" placeholder="Username" required/>                                
                            </div>
                            <div>
                                <p>Придумайте пароль:</p>
                                <input id="passwordform" type="password" placeholder="Password" required/>                                
                            </div>
                            <div>
                                <p>Придумайте слово востановления:</p>
                                <input id="fogotQuestionFrom" placeholder="Например какое имя у вашего первого питомца?" type="text" required/>                                
                            </div>


                            <button onClick={signin} className="Accent--Button">Установить систему (2 клика)</button>
                        </form>
                    )}
                    <div>
                        {loading && (
                            <div>
                                <VioletUiLoadingBar progress={loadingBar}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {AlertNoti && (
                <Alert title="Ошибка прав доступа"/>
            )}
        </div>
    );
}
export default SSSMprocessSetupSystemManager;