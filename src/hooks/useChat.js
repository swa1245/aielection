import { useState, useCallback } from 'react';
import { api } from '../services/api';

export const useChat = (country) => {
  const [messages, setMessages] = useState([
    {
      id: Date.now().toString(),
      sender: 'ai',
      text: 'Hello! I am your Election Assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const newUserMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);
    setError(null);

    try {
      // Pass the selected country context
      const res = await api.chat(text, country);
      
      const newAiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: res.data?.content || 'Sorry, I did not understand that.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMsg]);
    } catch (err) {
      setError(err.message || 'Failed to send message');
      // Remove the optimistically added user message or just show error? Let's just show error.
    } finally {
      setIsLoading(false);
    }
  }, [country]);

  const clearChat = useCallback(() => {
    setMessages([{
      id: Date.now().toString(),
      sender: 'ai',
      text: `Chat cleared. How can I assist you with ${country || 'elections'}?`,
      timestamp: new Date()
    }]);
  }, [country]);

  return { messages, sendMessage, isLoading, error, clearChat, setError };
};
