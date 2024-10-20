import './NetlerApp.css';
import React, { useState } from 'react';
import WindowManager from '../../Api/Libs/VioletClientKernel/Core/Managers/Windows/WindowManager';
import logo from './icon.svg';
import info from './info.json';

const NetlerApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('https://www.google.com');
  const [isLoading, setIsLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };

  const Open = () => {
    setIsOpen(true);
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleGo = async () => {
    setIsLoading(true);
    try {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = url;
      const response = await fetch(proxyUrl + targetUrl);
      const html = await response.text();
      setHtmlContent(html);
    } catch (error) {
      console.error('Error fetching URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const html = await response.text();
      setHtmlContent(html);
    } catch (error) {
      console.error('Error fetching URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button onClick={Open} className="App--Icon">
          <img src={logo} alt="Settings" />
        </button>
      </div>
      
      {isOpen && (
        <WindowManager title={info.name} onClose={handleClose} description={info.description}>
          <div className="Browser--Container">
            <div className="Browser--Toolbar">
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                className="Browser--UrlInput"
              />
              <button onClick={handleGo} className="Browser--GoButton">Go</button>
              <button onClick={handleRefresh} className="Browser--RefreshButton">Refresh</button>
            </div>
            <div className="Browser--Content">
              {isLoading ? (
                <div className="Browser--Loading">Loading...</div>
              ) : (
                <iframe
                  srcDoc={htmlContent}
                  title="Mini Browser"
                  className="Browser--Iframe"
                />
              )}
            </div>
          </div>
        </WindowManager>
      )}
    </div>
  );
};

export default NetlerApp;