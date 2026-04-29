import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Send, Plus, Bot, User, ThumbsUp, Copy, ChevronDown, Check } from 'lucide-react';
import './ChatInterface.scss';

const ChatInterface = ({ messages, sendMessage, isLoading, selectedCountry, onCountryChange }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const [showCountryMenu, setShowCountryMenu] = useState(false);

  const countries = ['USA', 'India', 'UK', 'Canada', 'Germany'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="chat-container">
      {/* Top Context Card */}
      <div className="context-card">
        <div className="context-info">
          <div className="globe-icon">
            <Globe size={20} />
          </div>
          <div className="context-text">
            <h3>Electoral Context</h3>
            <p>Providing information based on local regulations.</p>
          </div>
        </div>
        <div className="country-dropdown">
          <button className="dropdown-trigger" onClick={() => setShowCountryMenu(!showCountryMenu)}>
            {selectedCountry === 'USA' ? 'United States' : selectedCountry}
            <ChevronDown size={16} />
          </button>
          <AnimatePresence>
            {showCountryMenu && (
              <motion.div 
                className="dropdown-menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {countries.map(c => (
                  <button 
                    key={c} 
                    className={`menu-item ${selectedCountry === c ? 'active' : ''}`}
                    onClick={() => {
                      onCountryChange(c);
                      setShowCountryMenu(false);
                    }}
                  >
                    {c === 'USA' ? 'United States' : c}
                    {selectedCountry === c && <Check size={14} />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-area">
        {messages.map((msg, idx) => (
          <MessageBubble key={msg.id} message={msg} isLast={idx === messages.length - 1} />
        ))}
        {isLoading && (
          <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <button type="button" className="action-btn">
            <Plus size={20} />
          </button>
          <input 
            type="text" 
            placeholder="Ask anything about the voting process..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="send-btn" disabled={!inputText.trim()}>
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

const MessageBubble = ({ message }) => {
  const isAi = message.sender === 'ai';

  // Basic parser for structured content
  const renderContent = (text) => {
    if (!isAi) return <p className="text-content">{text}</p>;

    // Detect if it's a "Requirements" list
    if (text.includes('requirements:')) {
      const parts = text.split('\n');
      const intro = parts[0];
      const items = parts.slice(1).filter(p => p.trim().startsWith('-') || p.trim().match(/^\d+\./));
      const actionIndex = parts.findIndex(p => p.toLowerCase().includes('next recommended action'));
      const footerText = actionIndex !== -1 ? parts.slice(actionIndex).join('\n') : null;

      return (
        <div className="structured-content">
          <p className="intro">{intro}</p>
          <div className="requirement-list">
            {items.map((item, i) => (
              <div key={i} className="requirement-item">
                <div className="bullet"></div>
                <span>{item.replace(/^-\s*|^\d+\.\s*/, '')}</span>
              </div>
            ))}
          </div>
          {footerText && (
            <div className="action-callout">
              <div className="callout-header">
                <span className="bolt-icon">⚡</span>
                NEXT RECOMMENDED ACTION
              </div>
              <p>{footerText.replace(/next recommended action:?/i, '').trim()}</p>
            </div>
          )}
        </div>
      );
    }

    return <p className="text-content">{text}</p>;
  };

  return (
    <motion.div 
      className={`message-bubble ${message.sender}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {isAi && (
        <div className="avatar">
          <Bot size={16} />
        </div>
      )}
      <div className="message-card">
        {renderContent(message.text)}
        {isAi && (
          <div className="message-actions">
            <button className="msg-action-btn"><ThumbsUp size={14} /> Helpful</button>
            <button className="msg-action-btn"><Copy size={14} /> Copy</button>
          </div>
        )}
      </div>
      {!isAi && <div className="message-timestamp">10:42 AM</div>}
    </motion.div>
  );
};

export default ChatInterface;
