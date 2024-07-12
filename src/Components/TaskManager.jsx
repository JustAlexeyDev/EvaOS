import React, {useState, useEffect} from "react"
import AppsMenu from "./AppsMenu";
import { format } from "date-fns";
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
            <button className="App--Icon" onClick={handleOpenAppsMenu}>
                <img src="https://imgs.search.brave.com/B5T_S2RQl4H6vTtPSbe6NPhXxwb_6dI6r06OmNZnRk8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXhj/ZG4uaWNvbnM4LmNv/bS9wbGF0Zm9ybXMv/YmVuZWZpdHMvaWNv/bi93aW5kb3dzLnN2/Zw" />
            </button>

            <div>
                {format(new Date(), "MM/dd/yyyy")} {time}
            </div>
        </div>
    );
}
export default TaskManager;