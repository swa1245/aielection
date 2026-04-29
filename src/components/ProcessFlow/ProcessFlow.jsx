import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquare, HelpCircle, Quote } from 'lucide-react';
import ProcessStep from './ProcessStep';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './ProcessFlow.scss';

const ProcessFlow = ({ steps, isLoading }) => {
  if (isLoading) {
    return <LoadingSpinner text="Loading Process Flow..." />;
  }

  // Enhanced steps based on the design images
  const enhancedSteps = [
    {
      id: 1,
      title: 'Check Eligibility',
      subtitle: 'Verify your legal standing before proceeding to registration.',
      tag: 'Essential',
      sections: [
        {
          title: 'REQUIRED DOCUMENTS',
          items: ['Proof of U.S. Citizenship', 'Valid Government-issued Photo ID', 'Recent Utility Bill (Proof of Residence)']
        },
        {
          title: 'LEGAL CRITERIA',
          items: [
            { label: 'Age Requirement', value: 'Must be 18+ years old by Election Day.' },
            { label: 'Residency', value: 'Meet your specific state\'s residency duration.' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Register to Vote',
      subtitle: 'Submit your information to your state or local election office.',
      tag: 'Active Now',
      actions: [
        { label: 'Register Online', type: 'primary', icon: 'globe' },
        { label: 'Mail-in Form', type: 'secondary', icon: 'mail' }
      ],
      footer: 'Deadlines vary by state. Most registration windows close 15-30 days before election day.'
    },
    {
      id: 3,
      title: 'Cast Your Ballot',
      subtitle: 'Finalize your choices and submit your vote through your preferred method.',
      votingMethods: [
        { label: 'Early Voting', icon: 'calendar', color: 'orange' },
        { label: 'Absentee/Mail', icon: 'mail', color: 'purple' },
        { label: 'Poll Station', icon: 'map-pin', color: 'blue' }
      ]
    }
  ];

  return (
    <div className="process-page">
      <div className="process-header">
        <div className="official-pill">
          <ShieldCheck size={14} />
          Official 2024 Election Guide
        </div>
        <h1 className="process-title">Your Path to the Polls</h1>
        <p className="process-subtitle">
          A streamlined, step-by-step journey to ensuring your voice is heard in the<br/>
          upcoming federal elections.
        </p>
      </div>

      <div className="process-timeline-container">
        <div className="vertical-line"></div>
        <div className="process-steps-list">
          {enhancedSteps.map((step, index) => (
            <ProcessStep key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>

      <div className="process-footer-card">
        <div className="footer-left">
          <span className="support-tag">24/7 SUPPORT AVAILABLE</span>
          <h2>Still have questions about the process?</h2>
          <p>
            Our intelligent assistant can clarify state-specific laws, 
            help you find your polling station, or check registration 
            deadlines for your zip code.
          </p>
          <div className="footer-btns">
            <button className="chat-btn">
              <MessageSquare size={18} />
              Start Interactive Chat
            </button>
            <button className="faq-btn">
              <HelpCircle size={18} />
              Browse FAQs
            </button>
          </div>
        </div>
        <div className="footer-right">
          <img src="/assets/images/capitol_dark.png" alt="Capitol" />
          <div className="quote-overlay">
            <Quote size={32} className="quote-icon" />
            <p>"Democracy is not just the right to vote, it is the right to live in dignity."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;
