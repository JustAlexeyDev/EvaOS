import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SSSMprocessSetupSystemManager.css';
import Alert from "../Scripts/Security/Alert/Alert";
import VioletUiLoadingBar from "../../../VioletUiLib/Libs/uiElements/ProgressBars/LoadingBar/VioletUiLoadingBar";
import VioletUiLoopBar from "../../../VioletUiLib/Libs/uiElements/ProgressBars/LoopBar/VioletUiLoopBar";
import { osversion } from "../../../../../config";

const SSSMprocessSetupSystemManager: React.FC = () => {

    const navigate = useNavigate();
    const [setup, setSetup] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [fogotQuestion, setFogotQuestion] = useState<string>("");
    const [AlertNoti, setAlertNoti] = useState<boolean>(false);
    const [loadingBar, setLoadingBar] = useState<number>(0);

    const versionOfSSSM = "1.006.00";
    

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

    const signin = (e: React.FormEvent) => {
        e.preventDefault();
        if (localStorage.getItem("user")) {
            navigate("/UnexpectedKernelSystemError");
        } else {
            const usernameform = (document.getElementById("usernameform") as HTMLInputElement).value;
            const passwordform = (document.getElementById("passwordform") as HTMLInputElement).value;
            const fogotQuestionFrom = (document.getElementById("fogotQuestionFrom") as HTMLInputElement).value;
            
            setUsername(usernameform);
            setPassword(passwordform);
            setFogotQuestion(fogotQuestionFrom);
            
            if(username && password) {
                Start();
            }
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
                                <VioletUiLoopBar />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {AlertNoti && (
                <Alert title="Access Error" onClick={() => setAlertNoti(false)}/>
            )}
        </div>
    );
}
export default SSSMprocessSetupSystemManager;