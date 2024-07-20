import './SettingsApp.css';
import React, { useState } from 'react';
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';
import SystemInfo from '../../Api/Libs/VioletClientManager/Core/Managers/Debug/SystemInfo';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState(null);
  const osversion = localStorage.getItem("osversion")

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

  const renderPage = () => {
    switch (activePage) {
      case 'Account':
        return (
          <div className="Settings--Page--Options">
            <p>Аватар</p>
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
            <p>Версия системы: {osversion}</p>
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
            <nav>
              <button className='Accent--Button' onClick={() => setPage('Account')}>Аккаунт</button>
              <button className='Accent--Button' onClick={() => setPage('Personalization')}>Персонализация</button>
              <button className='Accent--Button' onClick={() => setPage('SystemMonitor')}>Системный монитор</button>
              <button className='Accent--Button' onClick={() => setPage('AboutSystem')}>О системе</button>
            </nav>
            <div>
              {renderPage()}
            </div>
          </div>
        </WindowManager>
      )}
    </div>
  );
};

export default Settings;