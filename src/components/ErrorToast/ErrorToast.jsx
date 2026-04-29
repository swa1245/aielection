import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ErrorToast.scss';

const ErrorToast = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="error-toast"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <span className="icon">⚠️</span>
          <span className="text">{message}</span>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorToast;
