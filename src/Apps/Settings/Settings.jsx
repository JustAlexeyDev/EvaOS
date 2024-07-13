import React, { useState } from 'react';
import WindowManager from '../../Managers/WindowManager';
import './Style.css';
import SystemInfo from '../../Managers/Debug/SystemInfo';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [ Account, setAccount] = useState(false);
  const [Personalization, setPersonalization] = useState(false);
  const [SystemMonitor, setSystemMonitor] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const Open =() => {
    setIsOpen(true);
  }

  const AccountPage = () => {
    setAccount(true);
    setPersonalization(false);
    setSystemMonitor(false);
  }
  const PersonalizationPage = () => {
    setPersonalization(true);
    setAccount(false);
    setSystemMonitor(false);
  }
  const SystemMonitorPage = () => {
    setPersonalization(false);
    setAccount(false);
    setSystemMonitor(true);
  }

  return (
    <div>
      <div>
        <button onClick={Open} className="App--Icon">
          <img src="https://imgs.search.brave.com/rhB7jgQOFaeS6bKWYcB8SfKxc0whFJ1UNjVqlssjyos/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWFwcGxlLXNldHRp/bmdzLTEtNDkzMTYy/LnBuZz9mPXdlYnAm/dz0yNTY" />
        </button>
      </div>
      {isOpen && (
        <WindowManager title="Настройки" onClose={handleClose}>
            <div className="Settings--Container">
                <nav>
                    <button onClick={AccountPage}>Аккаунт</button>
                    <button onClick={PersonalizationPage}>Персонализация</button>
                    <button onClick={SystemMonitorPage}>Системный монитор</button>
                </nav>
                <div>
                    {Account && (
                        <div className="Settings--Page--Options">
                            <p>Аватар</p>
                        </div>
                    )}
                    {Personalization && (
                        <div>
                            <p>Обои</p>
                        </div>
                    )}
                    {SystemMonitor && (
                      <div className="Settings--Page--Options">
                          <SystemInfo />
                      </div>
                    )}
                </div>
            </div>
        </WindowManager>
      )}
    </div>
  );
};

export default Settings;