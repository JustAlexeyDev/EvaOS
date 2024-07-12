import React, {useState} from "react";
import './style.css';

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
        } else {
            alert("Enter valid data");
        }
    }
    return(
        <div className="setup">

            <div className="Setup--Container">
                <div className="Setup--Container--Box">
                    <div>
                        <h1>Welcome to EvaOS!</h1>
                        <p>This is web os created on react.js</p>
                        <p>Enter your username and password:</p>                        
                    </div>

                    {!setup && (
                        <form require>
                            <p>Enter your name:</p>
                            <input id="usernameform" type="text" placeholder="Username"/>
                            <p>Enter password:</p>
                            <input id="passwordform" type="password" placeholder="Password" />
                            <p>Enter fogot question:</p>
                            <input id="fogotQuestionFrom" placeholder="what is name of your first pet?" type="text" />
                        </form>
                    )}
                    <div>
                        {loading && (
                            <div>
                                Loading..
                            </div>
                        )}
                    </div>
                </div>

                <form className="Setup--NavBar">
                    <input id="code" type="text" placeholder="code"/>
                    <button onClick={Login}>Enter</button>
                </form>



                <div className="Setup--NavBar">
                    <button onClick={Cancle}>Cancle</button>
                    <button onClick={signin} className="Accent--Button">Next</button>
                </div>
            </div>

        </div>
    );
}
export default Setup;