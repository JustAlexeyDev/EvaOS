import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react"

const Bsod = () => {
    const [error, setError] = useState("")

    useEffect(()=> {
        if(window.location.href == "/*") {
            setError("Window");
        } else {
            setError("Unknow error!");
        }        
    })


    return(
        <div className="Page Bsod">
            <h1>The Problem has been detected on this system</h1>
            <p>Please reboot this page! If this problem not hidden go to <Link to="/">SDDM</Link></p>
            <hr />
            <h2>Error code: {error}</h2>
        </div>
    );
}
export default Bsod;