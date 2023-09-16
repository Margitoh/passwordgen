import React, { useState } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [transitionComplete, setTransitionComplete] = useState(false);

  const generatePassword = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=[]{}|;:,.<>?';
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
    setTransitionComplete(false);
    setTimeout(() => setTransitionComplete(true), 300);
  };
    
  const copyPasswordToClipboard = () => {
    if (password) {
      const textField = document.createElement('textarea');
      textField.innerText = password;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="App">
      <div className={`container ${password && 'expanded'}`}>
        <h1>Password Generator</h1>
        <div className="buttons">
          <button className="btn-8" onClick={() => generatePassword(8)}>8-char Password</button>
          <button className="btn-10" onClick={() => generatePassword(10)}>10-char Password</button>
          <button className="btn-12" onClick={() => generatePassword(12)}>12-char Password</button>
          <button className="btn-16" onClick={() => generatePassword(16)}>16-char Password</button>
        </div>
        <div className="password"> 
          {password && transitionComplete && (
            <div>
              Generated Password: 
              <h3>{password}</h3>
              <div className="copy-icon" onClick={copyPasswordToClipboard}>
                <FontAwesomeIcon icon={faCopy} /> Copy
              </div>
              {copied && <p className="copy-notification">Password copied to clipboard</p>}
          </div>
          )}
        </div>
      </div>
      <div className="test-link">
        <p>Test your password strength with: <a href="https://www.security.org/how-secure-is-my-password/" target="_blank" rel="noopener noreferrer">https://www.security.org/how-secure-is-my-password/</a></p>
      </div>
    </div>
  );
}

export default App;
