import React from 'react';
import { LogOut, Trash2 } from 'lucide-react';
import './Header.scss';

const Header = ({ activeTab, onTabChange, onClearChat, clearLabel = 'Clear Chat' }) => {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-box">
            <div className="logo-icon"></div>
          </div>
          <h1 className="logo-text">
            <span className="bold">Election</span>
            <span className="red">Assistant</span>
          </h1>
        </div>

        <nav className="header-nav">
          <button 
            className={`nav-link ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => onTabChange(0)}
          >
            Chat
          </button>
          <button 
            className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => onTabChange(1)}
          >
            Timeline
          </button>
          <button 
            className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => onTabChange(2)}
          >
            Process Guide
          </button>
        </nav>

        <div className="header-actions">
          {onClearChat && (
            <button className="clear-btn" onClick={onClearChat}>
              {clearLabel}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
