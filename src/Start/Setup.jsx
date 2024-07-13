import React, {useState} from "react";
import './style.css';
import LoginChecker from "../Secure/LoginChecker";

const Setup = (Page) => {
    const [setup, setSetup] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [fogotQuestion, setFogotQuestion] = useState("");

    const Start = () => {
            setLoading(true);
            setSetup(true);
            localStorage.setItem("user", username);
            localStorage.setItem("password", password);
            localStorage.setItem("fogotQuestion", fogotQuestion);
            setTimeout(() => {
                window.location.href = "/Login";
            }, 2000) 

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
    return(
        <div className="setup">

            <div className="Setup--Container">
                <p>SDDM.process.setupSystem.manager</p>
                <div className="Setup--Container--Box">
                    <div>
                        <h1>Добро пожаловать в EvaOS!</h1>
                        <p>Эта система написана на ReactJS и поддерживается по лицензии MIT</p>
                        <p>Введите ваше имя и пароль от новой учетной записи. В случаи если это окно появилось случано, в поле Код напишиет пароль от уже существующей учетной записи.:</p>                        
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
                                Загрузка..
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
            <LoginChecker />
        </div>
    );
}
export default Setup;