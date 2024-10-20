import './SettingsApp.css';
import React, { useState } from 'react';
import { CircleUser, Palette, MonitorCheck, FileText, EyeOff, Eye } from "lucide-react";
import WindowManager from '../../Api/Libs/VioletClientKernel/Core/Managers/Windows/WindowManager';
import SystemInfo from '../../Api/Libs/VioletClientKernel/Core/Managers/Debug/SystemInfo';
import logo from './icon.svg';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [activePage, setActivePage] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false
  });
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

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Account':
        return (
          <div className="Settings--Page--Options">
            <form onSubmit={handleSaveChanges}>
              <div>
                <p>Edit username</p>
                <input id='newUsername' type="text" defaultValue={user} />
              </div>
              <div>
                <p>Current password</p>

                <div className='Settings--Page--Options--Pswd--Inputs'>
                  <input id='currentPassword' type={showPasswords.currentPassword ? 'text' : 'password'} />                  
                  <div>
                    <button type="button" onClick={() => togglePasswordVisibility('currentPassword')}>
                      {showPasswords.currentPassword ? <EyeOff color='#ffffff'/> : <Eye color='#ffffff'/>}
                    </button>          
                  </div>                  
                </div>

              </div>
              <div>
                <p>Edit password</p>

                <div className='Settings--Page--Options--Pswd--Inputs'>
                  <input id='newPassword' type={showPasswords.newPassword ? 'text' : 'password'} defaultValue={password} />                
                  <div>
                  <button type="button" onClick={() => togglePasswordVisibility('newPassword')}>
                    {showPasswords.newPassword}
                  </button>
                  </div>                  
                </div>

              </div>
              <button className='Accent--Button'>Save changes</button>
            </form>
          </div>
        );
      case 'Personalization':
        return (
          <div>
            <p>Wallpapers</p>
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
            <h2>About system</h2>
            <br />
            <p>EvaOS - ReactJS Operating System</p>
            <br />
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
          <img src={logo} alt="Settings" />
        </button>
      </div>
      
      {isOpen && (
        <WindowManager title="Настройки" onClose={handleClose}>
          <div className="Settings--Container">
            <nav className='Settings--Container--Buttons'>
              <button onClick={() => setPage('Account')}><CircleUser /><p>Account</p></button>
              <button onClick={() => setPage('Personalization')}><Palette />Appearance</button>
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