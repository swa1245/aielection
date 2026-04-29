import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRIES } from '../../utils/constants';
import gsap from 'gsap';
import './CountrySelector.scss';

const CountrySelector = ({ selectedCountry, onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedObj = COUNTRIES.find(c => c.id === selectedCountry) || COUNTRIES[0];

  const handleSelect = (id) => {
    onSelect(id);
    setIsOpen(false);
  };

  const handleHover = (e) => {
    const emoji = e.currentTarget.querySelector('.emoji');
    if (emoji) {
      gsap.to(emoji, { y: -5, duration: 0.2, yoyo: true, repeat: 1 });
    }
  };

  return (
    <div className="country-selector">
      <motion.button 
        className="selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="selected-info">
          <span className="emoji">{selectedObj.emoji}</span>
          <span className="name">{selectedObj.name}</span>
        </span>
        <span className={`chevron ${isOpen ? 'open' : ''}`}>▼</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="dropdown-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {COUNTRIES.map((country) => (
              <motion.button
                key={country.id}
                className={`dropdown-item ${selectedCountry === country.id ? 'active' : ''}`}
                onClick={() => handleSelect(country.id)}
                onMouseEnter={handleHover}
                whileHover={{ backgroundColor: 'var(--color-gray-100)' }}
              >
                <span className="emoji">{country.emoji}</span>
                <span className="name">{country.name}</span>
                {selectedCountry === country.id && (
                  <motion.span 
                    className="active-indicator"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountrySelector;
