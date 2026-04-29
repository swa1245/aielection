import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { typewriterEffect } from '../../utils/gsapAnimations';
import './ChatInterface.scss';

const ChatMessage = ({ message, isLatestAi }) => {
  const isUser = message.sender === 'user';
  const textRef = useRef(null);
  const [isTyping, setIsTyping] = React.useState(isLatestAi);

  useEffect(() => {
    if (isLatestAi && textRef.current && !isUser) {
      typewriterEffect(textRef.current, message.text, 0.03, () => {
        setIsTyping(false);
      });
    } else if (textRef.current) {
      textRef.current.textContent = message.text;
    }
  }, [message.text, isLatestAi, isUser]);

  return (
    <motion.div 
      className={`chat-message ${isUser ? 'user' : 'ai'}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="message-avatar">
        {isUser ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        <p ref={textRef} className="message-text">
          {!isLatestAi && message.text}
        </p>
        <span className="timestamp">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
