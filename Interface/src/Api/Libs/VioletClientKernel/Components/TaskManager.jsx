import React, {useState, useEffect} from "react"
import AppsMenu from "./AppsMenu";
import { format } from "date-fns";
import logo from './Menu.svg';
const TaskManager =  () => {
    const [openAppsMenu, setOpenAppsMenu] = useState(false);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    const handleOpenAppsMenu = () => {
        if(openAppsMenu == true) {
            setOpenAppsMenu(false);
        } else {
            setOpenAppsMenu(true);
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
          setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => {
          clearInterval(intervalId);
        };
      }, []);

    return(
        <div className="TaskManager--Container ">
            {openAppsMenu &&
                <AppsMenu />
            }
            <button className="TaskManager--App--Icon" onClick={handleOpenAppsMenu}>
                <img src={logo} />
            </button>

            <div>
                {format(new Date(), "MM/dd/yyyy")} {time}
            </div>
        </div>
    );
}
export default TaskManager;