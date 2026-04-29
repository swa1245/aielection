import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, PlayCircle, Calendar } from 'lucide-react';

const TimelineItem = ({ item, index }) => {
  const isLeft = index % 2 === 0;

  const getStatusIcon = (status) => {
    switch(status) {
      case 'COMPLETED': return <CheckCircle2 size={18} />;
      case 'ACTIVE NOW': return <PlayCircle size={18} />;
      default: return <Calendar size={18} />;
    }
  };

  return (
    <motion.div 
      className={`timeline-item ${isLeft ? 'left' : 'right'}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="item-text">
        <div className={`status-pill ${item.status.toLowerCase().replace(' ', '-')}`}>
          <div className="dot"></div>
          {item.status}
        </div>
        <h2 className="event-title">{item.event}</h2>
        <p className="event-description">{item.description}</p>
        
        <div className="status-indicator">
          {getStatusIcon(item.status)}
        </div>
      </div>

      <div className="item-image-wrapper">
        <div className="image-card">
          <img src={item.image} alt={item.event} />
          <div className="date-overlay">
            {item.date}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
