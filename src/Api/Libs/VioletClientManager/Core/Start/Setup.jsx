import React, {useState, useEffect} from "react";
import {useNavigate } from "react-router-dom";
import './style.css';
import Alert from "../Scripts/Security/Alert/Alert";
import VioletUiLoadingBar from "../../../VioletUiLib/Libs/uiElements/ProgressBars/LoadingBar/VioletUiLoadingBar";

const Setup = (Page) => {

    const navigate = useNavigate();
    const [setup, setSetup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [fogotQuestion, setFogotQuestion] = useState("");
    const [AlertNoti, setAlertNoti] = useState(false);
    const [loadingBar, setLoadingBar] = useState(0)

    const Start = () => {
            setLoading(true);
            setSetup(true);
            localStorage.setItem("user", username);
            localStorage.setItem("password", password);
            localStorage.setItem("fogotQuestion", fogotQuestion);

            // const load = () => {
            //     let i = 0;
            // }
            setTimeout(() => {
                window.location.href = "/Login";
            }, 2000);
    }
    const Cancle = () => {
        setSetup(false);
    }

    const Login = (e) => {
        e.preventDefault();
        if (code.value == localStorage.getItem("password")) {
            window.location.href = "/Login";
        } 
    }

    const signin = () => {
        setUsername(usernameform.value);
        setPassword(passwordform.value);
        setFogotQuestion(fogotQuestionFrom.value);
        if(username && password) {
            Start();
        } 
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            // navigate("/Desktop");
            setAlertNoti(true)
        }
    }, [navigate]);    

    return(
        <div className="setup">

            <div className="Setup--Container">
                <p>SDDM.process.setupSystem.manager</p>
                <div className="Setup--Container--Box">
                    <div>
                        <h1>Добро пожаловать в EvaOS!</h1>
                        <p>Эта система написана на ReactJS и поддерживается по лицензии MIT</p>
                        <p>Введите ваше имя и пароль от новой учетной записи. В случае если это окно появилось случайно, в поле Код напишиет пароль от уже существующей учетной записи.:</p>                        
                    </div>

                    {!setup && (
                        <form require>
                            <p>Введите ваше имя:</p>
                            <input id="usernameform" type="text" placeholder="Username"/>
                            <p>Введите пароль:</p>
                            <input id="passwordform" type="password" placeholder="Password" />
                            <p>Введите имя вашего первого питомца:</p>
                            <input id="fogotQuestionFrom" placeholder="Какое имя у вашего первого питомца?" type="text" />
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

                <form className="Setup--NavBar">
                    <input id="code" type="text" placeholder="Код"/>
                    <button onClick={Login}>Войти</button>
                </form>

                <div className="Setup--NavBar">
                    <button onClick={Cancle}>Отмена</button>
                    <button onClick={signin} className="Accent--Button">Установить систему</button>
                </div>
            </div>
            {AlertNoti && (
                <Alert title="Ошибка прав доступа"/>
            )}
        </div>
    );
}
export default Setup;