import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react"

const Bsod = () => {
    const [error, setError] = useState("")

    useEffect(()=> {
        if(window.location.href == "*") {
            setError("Not Found! 404");
        } else {
            setError("Unknow error!");
        }        
    })


    return(
        <div className="Page Bsod">
            <h1>Проблема была замчена на этой системе</h1>
            <br />
            <br />
            <p>Пожалуйста, перезагрузите эту страницу или перейдите в систему: <Link to="/Login">SDDM</Link></p>
            <br />
            <br />
            <h2>Error code: {error}</h2>
        </div>
    );
}
export default Bsod;