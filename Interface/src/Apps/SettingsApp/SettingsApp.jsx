import './SettingsApp.css';
import React, { useState } from 'react';
import { CircleUser, SunMoon, MonitorCheck, FileText } from "lucide-react";
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';
import SystemInfo from '../../Api/Libs/VioletClientManager/Core/Managers/Debug/SystemInfo';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [activePage, setActivePage] = useState(null);
  const osversion = localStorage.getItem("osversion");
  const user = localStorage.getItem("user");
  const password = localStorage.getItem("password");

  const handleClose = () => {
    setIsOpen(false);
    setActivePage(null);
  };

  const openSettings = () => {
    setIsOpen(true);
  };

  const setPage = (page) => {
    setActivePage(page);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (newPassword && currentPassword !== password) {
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000); 
      return;
    }

    if (user !== newUsername) {
      localStorage.setItem("user", newUsername);
    }
    if (newPassword && password !== newPassword) {
      localStorage.setItem("password", newPassword);
    }

    document.getElementById('currentPassword').value = '';


    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000); 
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Account':
        return (
          <div className="Settings--Page--Options">
            <form onSubmit={handleSaveChanges}>
              <div>
                <p>Изменить имя пользователя</p>
                <input id='newUsername' type="text" defaultValue={user} />
              </div>
              <div>
                <p>Текущий пароль</p>
                <input id='currentPassword' type="password" />
              </div>
              <div>
                <p>Изменить пароль</p>
                <input id='newPassword' type="password" defaultValue={password} />
              </div>
              <button className='Accent--Button'>Save changes</button>
            </form>
          </div>
        );
      case 'Personalization':
        return (
          <div>
            <p>Обои</p>
          </div>
        );
      case 'SystemMonitor':
        return (
          <div className="Settings--Page--Options">
            <SystemInfo />
          </div>
        );
      case 'AboutSystem':
        return (
          <div>
            <h1>О системе</h1>
            <p>EvaOS - ReactJS Operating System</p>
            <p>Version: {osversion}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <button onClick={openSettings} className="App--Icon">
          <img src="https://imgs.search.brave.com/rhB7jgQOFaeS6bKWYcB8SfKxc0whFJ1UNjVqlssjyos/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWFwcGxlLXNldHRp/bmdzLTEtNDkzMTYy/LnBuZz9mPXdlYnAm/dz0yNTY" alt="Settings" />
        </button>
      </div>
      
      {isOpen && (
        <WindowManager title="Настройки" onClose={handleClose}>
          <div className="Settings--Container">
            <nav className='Settings--Container--Buttons'>
              <button onClick={() => setPage('Account')}><CircleUser /><p>Account</p></button>
              <button onClick={() => setPage('Personalization')}><SunMoon />Appearance</button>
              <button onClick={() => setPage('SystemMonitor')}><MonitorCheck />System monitor</button>
              <button onClick={() => setPage('AboutSystem')}><FileText />About system</button>
            </nav>
            <div className='Settings--Container--RightMenu'>
              {renderPage()}
              {showSuccessMessage && <div className={`Settings--SuccessMessage ${showSuccessMessage ? 'visible' : ''}`}>Saved successfully</div>}
              {showErrorMessage && <div className={`Settings--ErrorMessage ${showErrorMessage ? 'visible' : ''}`}>Error!</div>}
            </div>
          </div>
        </WindowManager>
      )}
    </div>
  );
};

export default Settings;