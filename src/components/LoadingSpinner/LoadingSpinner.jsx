import React, { useEffect, useRef } from 'react';
import { rotateAnimation } from '../../utils/gsapAnimations';
import { motion } from 'framer-motion';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  const spinnerRef = useRef(null);

  useEffect(() => {
    let animation;
    if (spinnerRef.current) {
      animation = rotateAnimation(spinnerRef.current, 1);
    }
    return () => {
      if (animation) animation.kill();
    };
  }, []);

  return (
    <motion.div 
      className="loading-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="spinner" ref={spinnerRef}></div>
      {text && <span className="loading-text">{text}</span>}
    </motion.div>
  );
};

export default LoadingSpinner;
