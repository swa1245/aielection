import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, IdCard, FileText, Clock, Headset, Phone, CheckCircle2 } from 'lucide-react';
import TimelineItem from './TimelineItem';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Timeline.scss';

const Timeline = ({ timeline, isLoading }) => {
  if (isLoading) {
    return <LoadingSpinner text="Loading Timeline..." />;
  }

  // Enhanced timeline with images and status based on the design
  const enhancedTimeline = [
    {
      date: 'Oct 24, 2024',
      event: 'Voter Registration',
      description: 'The final window for eligibility confirmation has closed across all primary states for the upcoming cycle.',
      status: 'COMPLETED',
      image: '/assets/images/registration.png'
    },
    {
      date: 'Nov 05, 2024',
      event: 'General Election Day',
      description: 'The nation casts its vote. Polling stations are active nationwide from 7 AM to 8 PM local time. Your voice matters today.',
      status: 'ACTIVE NOW',
      image: '/assets/images/handshake.png'
    },
    {
      date: 'Jan 20, 2025',
      event: 'Inauguration Ceremony',
      description: 'The formal transfer of power occurs on the West Front of the U.S. Capitol, marking the start of a new presidential term.',
      status: 'UPCOMING EVENT',
      image: '/assets/images/capitol.png'
    }
  ];

  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <div className="cycle-pill">
          <Clock size={14} />
          2024 Electoral Cycle
        </div>
        <h1 className="timeline-title">Your Election Timeline</h1>
        <p className="timeline-subtitle">
          A comprehensive, real-time guide to the critical milestones of the United States<br/>
          electoral process. Track deadlines, voting days, and transitions.
        </p>
      </div>

      <div className="timeline-list">
        {enhancedTimeline.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>

      <div className="timeline-footer-cards">
        <div className="checklist-card">
          <div className="card-content">
            <h3>Election Day Checklist</h3>
            <p>Ensure a smooth voting experience by completing these essential preparatory steps before heading to the polls.</p>
            <div className="checklist-grid">
              <div className="check-item"><MapPin size={16} /> Verify Polling Address</div>
              <div className="check-item"><IdCard size={16} /> Valid Photo ID Ready</div>
              <div className="check-item"><FileText size={16} /> Review Sample Ballot</div>
              <div className="check-item"><Clock size={16} /> Plan Your Travel Time</div>
            </div>
          </div>
          <div className="card-decoration">
            <div className="icon-circle">
              <CheckCircle2 size={32} />
            </div>
          </div>
        </div>

        <div className="help-card">
          <div className="help-icon">
            <Headset size={24} />
          </div>
          <h3>Need Direct Help?</h3>
          <p>Our dedicated Voter Support Team is available 24/7 to answer questions about eligibility and polling.</p>
          <button className="hotline-btn">
            <Phone size={16} />
            Contact Voter Hotline
          </button>
          <span className="disclaimer">STANDARD RATES MAY APPLY</span>
        </div>
      </div>

      <footer className="footer-credits">
        © 2024 Federal Election Commission - Institutional Access Hub
      </footer>
    </div>
  );
};

export default Timeline;
