import React, { useEffect, useRef } from 'react';
import { TABS } from '../../utils/constants';
import gsap from 'gsap';
import './TabNavigation.scss';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabsRef = useRef([]);

  useEffect(() => {
    // Simple GSAP animation on load
    gsap.from(tabsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    });
  }, []);

  return (
    <div className="tab-navigation">
      <div className="tabs-container">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            ref={el => tabsRef.current[index] = el}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="icon">{tab.icon}</span>
            <span className="label">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="active-underline" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
