import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Globe2,
  TrendingUp,
  Users,
  Activity,
  Lightbulb,
  ArrowUpRight
} from 'lucide-react';
import './Timeline.scss';

const Timeline = ({ events, stats, selectedCountry, onCountryChange, countries }) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  if (!events) return null;

  return (
    <div className="timeline-page">
      {/* 1. Electoral Context Card (Shared Component Style) */}
      <div className="context-card">
        <div className="context-info">
          <div className="globe-icon">
            <Globe2 size={24} />
          </div>
          <div className="context-text">
            <h3>Electoral Context</h3>
            <p>Currently viewing data for {selectedCountry}</p>
          </div>
        </div>

        <div className="country-dropdown">
          <button 
            className="dropdown-trigger"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedCountry}
            <ChevronRight size={16} className={`chevron ${showDropdown ? 'rotated' : ''}`} />
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              {countries.map(country => (
                <button
                  key={country}
                  className={`menu-item ${selectedCountry === country ? 'active' : ''}`}
                  onClick={() => {
                    onCountryChange(country);
                    setShowDropdown(false);
                  }}
                >
                  {country}
                  {selectedCountry === country && <CheckCircle2 size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Intelligence Dashboard Section (New) */}
      {stats && (
        <div className="intelligence-dashboard">
          <div className="dashboard-grid">
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="stat-icon time">
                <Clock size={20} />
              </div>
              <div className="stat-value">{stats.daysUntilPolling}</div>
              <div className="stat-label">Until Polling</div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="stat-icon growth">
                <TrendingUp size={20} />
              </div>
              <div className="stat-value">{stats.projectedTurnout}</div>
              <div className="stat-label">Projected Turnout</div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="stat-icon voters">
                <Users size={20} />
              </div>
              <div className="stat-value">{stats.activeVoters}</div>
              <div className="stat-label">Active Voters</div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="stat-icon health">
                <Activity size={20} />
              </div>
              <div className="stat-value">{stats.healthScore}/100</div>
              <div className="stat-label">Democratic Health</div>
            </motion.div>
          </div>

          <motion.div 
            className="insight-bar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="insight-content">
              <Lightbulb size={18} className="insight-icon" />
              <p><strong>AI Insight:</strong> {stats.cycleInsight}</p>
            </div>
            <ArrowUpRight size={18} className="arrow" />
          </motion.div>
        </div>
      )}

      {/* 3. Original Timeline Content */}
      <header className="timeline-header">
        <div className="cycle-pill">
          <Calendar size={14} />
          Current Electoral Cycle
        </div>
        <h1 className="timeline-title">Election Intelligence Timeline</h1>
        <p className="timeline-subtitle">
          Real-time analytical tracking of major milestones for the {selectedCountry} elections.
        </p>
      </header>

      <div className="timeline-list">
        {events.map((item, index) => (
          <motion.div 
            key={item.id}
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="item-content-wrapper">
              <div className="item-text">
                <div className={`status-pill ${item.status}`}>
                  <span className="dot"></span>
                  {item.status}
                </div>
                <h3 className="event-title">{item.title}</h3>
                <p className="event-description">{item.description}</p>
                <span className="date-badge">{item.date}</span>
              </div>
            </div>
            
            <div className="item-image-wrapper">
              <div className="image-card">
                <img src={item.image} alt={item.title} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
