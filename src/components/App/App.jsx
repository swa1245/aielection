import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useChat } from '../../hooks/useChat';
import { useTimeline } from '../../hooks/useTimeline';
import { useProcessFlow } from '../../hooks/useProcessFlow';

import Header from '../Header/Header';
import ChatInterface from '../ChatInterface/ChatInterface';
import Timeline from '../Timeline/Timeline';
import ProcessFlow from '../ProcessFlow/ProcessFlow';
import ErrorToast from '../ErrorToast/ErrorToast';

import './App.scss';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useLocalStorage('electionAssistant_country', 'USA');
  const [activeTab, setActiveTab] = useState(0);

  // Hooks
  const { messages, sendMessage, isLoading: chatLoading, error: chatError, clearChat, setError: setChatError } = useChat(selectedCountry);
  const { timeline, isLoading: timelineLoading, error: timelineError, setError: setTimelineError } = useTimeline(selectedCountry);
  const { steps, isLoading: processLoading, error: processError, setError: setProcessError } = useProcessFlow(selectedCountry);

  const handleCountryChange = (id) => {
    setSelectedCountry(id);
  };

  const handleClearError = () => {
    setChatError(null);
    setTimelineError(null);
    setProcessError(null);
  };

  const currentError = chatError || timelineError || processError;

  const getClearLabel = () => {
    if (activeTab === 0) return 'Clear Chat';
    if (activeTab === 1) return 'Clear History';
    return null;
  };

  const handleClearAction = () => {
    if (activeTab === 0) clearChat();
    // Timeline clear could be added here if needed
  };

  return (
    <div className={`app-shell tab-${activeTab}`}>
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onClearChat={getClearLabel() ? handleClearAction : null}
        clearLabel={getClearLabel()}
      />
      
      <main className="app-main">
        <div className="content-container">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="full-height"
              >
                <ChatInterface 
                  messages={messages} 
                  sendMessage={sendMessage} 
                  isLoading={chatLoading}
                  selectedCountry={selectedCountry}
                  onCountryChange={handleCountryChange}
                />
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Timeline 
                  timeline={timeline} 
                  isLoading={timelineLoading} 
                />
              </motion.div>
            )}

            {activeTab === 2 && (
              <motion.div
                key="process"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ProcessFlow 
                  steps={steps} 
                  isLoading={processLoading} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <ErrorToast message={currentError} onClose={handleClearError} />
    </div>
  );
};

export default App;
