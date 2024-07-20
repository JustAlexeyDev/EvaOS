import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

    const versionOfSSSM = "1.003.00";
    

    const Start = () => {
            setLoading(true);
            setSetup(true);
            localStorage.setItem("user", username);
            localStorage.setItem("password", password);
            localStorage.setItem("fogotQuestion", fogotQuestion);
            localStorage.setItem("osversion", osversion);

            setTimeout(() => {
                window.location.href = "/Login";
            }, 2000);
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
                        <h1>Welcome to EvaOS!</h1>
                        <p>This system is written in ReactJS and is supported under the MIT license</p>
                        <p>Enter your name and password for the new account.</p>                        
                    </div>

                    {!setup && (
                        <form>
                            <div>
                                <p>Enter username:</p>
                                <input id="usernameform" type="text" placeholder="Username" required/>                                
                            </div>
                            <div>
                                <p>Create a password:</p>
                                <input id="passwordform" type="password" placeholder="Password" required/>                                
                            </div>
                            <div>
                                <p>Create a recovery word:</p>
                                <input id="fogotQuestionFrom" placeholder="For example, what is the name of your first pet?" type="text" required/>                                
                            </div>


                            <button onClick={signin} className="Accent--Button">Setup system (2 clicks)</button>
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
                <Alert title="Access Error"/>
            )}
        </div>
    );
}
export default SSSMprocessSetupSystemManager;