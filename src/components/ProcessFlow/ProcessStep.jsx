import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Globe, Mail, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const ProcessStep = ({ step, index }) => {
  return (
    <div className="process-step-container">
      <div className="step-number-wrapper">
        <div className={`step-circle ${step.id === 1 ? 'active' : ''}`}>
          {step.id}
        </div>
      </div>

      <motion.div 
        className="step-card"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="step-card-header">
          <div className="header-text">
            <h2>{step.title}</h2>
            <p>{step.subtitle}</p>
          </div>
          {step.tag && (
            <span className={`tag ${step.tag.toLowerCase().replace(' ', '-')}`}>
              {step.tag}
            </span>
          )}
        </div>

        {/* Step 1 Content: Documents & Criteria */}
        {step.sections && (
          <div className="step-content columns">
            {step.sections.map((section, i) => (
              <div key={i} className="content-column">
                <h3 className="column-title">
                  {section.title === 'REQUIRED DOCUMENTS' ? <FileText size={14} /> : <Scale size={14} />}
                  {section.title}
                </h3>
                <div className="items-list">
                  {section.items.map((item, j) => (
                    <div key={j} className="list-item">
                      {typeof item === 'string' ? (
                        <>
                          <div className="check-box"><CheckCircle2 size={14} /></div>
                          <span>{item}</span>
                        </>
                      ) : (
                        <div className="criteria-box">
                          <span className="label">{item.label}</span>
                          <span className="value">{item.value}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2 Content: Actions */}
        {step.actions && (
          <div className="step-content actions-area">
            <div className="action-btns">
              <button className="register-online-btn">
                <Globe size={18} />
                Register Online
              </button>
              <button className="mail-in-btn">
                <Mail size={18} />
                Mail-in Form
              </button>
            </div>
            {step.footer && <p className="step-footer-text">{step.footer}</p>}
          </div>
        )}

        {/* Step 3 Content: Voting Methods */}
        {step.votingMethods && (
          <div className="step-content grid-area">
            <div className="method-grid">
              {step.votingMethods.map((m, i) => (
                <div key={i} className={`method-box ${m.color}`}>
                  {m.icon === 'calendar' && <Calendar size={24} />}
                  {m.icon === 'mail' && <Mail size={24} />}
                  {m.icon === 'map-pin' && <MapPin size={24} />}
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProcessStep;
