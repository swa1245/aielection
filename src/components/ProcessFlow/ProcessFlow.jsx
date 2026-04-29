import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  MapPin, 
  Vote, 
  CheckCircle2, 
  ShieldCheck,
  ClipboardCheck,
  ChevronDown,
  Clock,
  FileText,
  ListChecks,
  Lightbulb,
  AlertTriangle,
  Gavel,
  Printer
} from 'lucide-react';
import './ProcessFlow.scss';

const StepIcon = ({ iconName }) => {
  const props = { size: 28 };
  switch (iconName?.toLowerCase()) {
    case 'registration': return <UserPlus {...props} />;
    case 'location': return <MapPin {...props} />;
    case 'vote': return <Vote {...props} />;
    case 'check': return <CheckCircle2 {...props} />;
    case 'ballot': return <ClipboardCheck {...props} />;
    default: return <Vote {...props} />;
  }
};

const ProcessFlow = ({ steps }) => {
  const [expandedStep, setExpandedStep] = useState(steps && steps.length > 0 ? steps[0].id || 0 : null);

  if (!steps || steps.length === 0) return null;

  const toggleStep = (id) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="process-page">
      <header className="process-header">
        <div className="official-pill">
          <ShieldCheck size={14} />
          Official Electoral Master Guide
        </div>
        <h1 className="process-title">Comprehensive Voting Protocol</h1>
        <p className="process-subtitle">
          An institutional-grade guide generated in real-time. Detailed procedures, legal compliance, and expert tips for a seamless democratic experience.
        </p>
      </header>

      <div className="process-steps-container">
        <div className="vertical-line"></div>
        {steps.map((step, index) => {
          const isExpanded = expandedStep === (step.id || index);
          
          return (
            <motion.div 
              key={step.id || index}
              className={`detailed-step-card ${isExpanded ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleStep(step.id || index)}
            >
              <div className="step-number-indicator">
                <span>{index + 1}</span>
              </div>
              
              <div className="card-header">
                <div className="header-content">
                  <div className="icon-box">
                    <StepIcon iconName={step.icon} />
                  </div>
                  <div className="title-group">
                    <h3>{step.title}</h3>
                    <p className="short-desc">{step.description}</p>
                  </div>
                </div>
                <div className="expand-trigger">
                  <ChevronDown size={24} className={`chevron ${isExpanded ? 'rotated' : ''}`} />
                </div>
              </div>

              {/* Normal Interactive Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    className="card-expanded-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="content-grid">
                      <div className="details-section">
                        <div className="info-block">
                          <h4 className="section-title">
                            <ListChecks size={16} /> Standard Procedure
                          </h4>
                          <ul className="details-list">
                            {Array.isArray(step.details) && step.details.length > 0 ? step.details.map((detail, dIdx) => (
                              <li key={dIdx}>
                                <div className="bullet-dot"></div>
                                {detail}
                              </li>
                            )) : <li>{step.details || 'Information pending...'}</li>}
                          </ul>
                        </div>

                        {step.proTips && step.proTips.length > 0 && (
                          <div className="info-block tips-block">
                            <h4 className="section-title tip-title">
                              <Lightbulb size={16} /> Expert Recommendations
                            </h4>
                            <ul className="details-list">
                              {step.proTips.map((tip, tIdx) => (
                                <li key={tIdx} className="tip-item">{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {step.pitfalls && step.pitfalls.length > 0 && (
                          <div className="info-block pitfalls-block">
                            <h4 className="section-title pit-title">
                              <AlertTriangle size={16} /> Common Pitfalls
                            </h4>
                            <ul className="details-list">
                              {step.pitfalls.map((pit, pIdx) => (
                                <li key={pIdx} className="pit-item">{pit}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="meta-section">
                        {step.requiredDocs && step.requiredDocs.length > 0 && (
                          <div className="meta-block">
                            <h4 className="section-title doc-title">
                              <FileText size={16} /> Required Documents
                            </h4>
                            <div className="doc-tags">
                              {step.requiredDocs.map((doc, docIdx) => (
                                <span key={docIdx} className="doc-tag">{doc}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {step.estimatedTime && (
                          <div className="meta-block time-block">
                            <h4 className="section-title time-title">
                              <Clock size={16} /> Estimated Time
                            </h4>
                            <p className="time-text">{step.estimatedTime}</p>
                          </div>
                        )}

                        {step.legalNotice && (
                          <div className="meta-block legal-block">
                            <h4 className="section-title legal-title">
                              <Gavel size={16} /> Legal Compliance
                            </h4>
                            <p className="legal-text">{step.legalNotice}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Print-Only Expanded Content (Static) */}
              <div className="print-only-content">
                <div className="content-grid">
                  <div className="details-section">
                    <h4 className="section-title">Standard Procedure</h4>
                    <ul className="details-list">
                      {Array.isArray(step.details) ? step.details.map((d, i) => <li key={i}>{d}</li>) : <li>{step.details}</li>}
                    </ul>
                    {step.proTips && (
                      <>
                        <h4 className="section-title">Expert Tips</h4>
                        <ul className="details-list">
                          {step.proTips.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                  <div className="meta-section">
                    {step.requiredDocs?.length > 0 && (
                      <div className="meta-block">
                        <h4 className="section-title">Required Documents</h4>
                        <p>{step.requiredDocs.join(', ')}</p>
                      </div>
                    )}
                    {step.legalNotice && (
                      <div className="meta-block">
                        <h4 className="section-title">Legal Compliance</h4>
                        <p>{step.legalNotice}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="process-footer">
        <div className="footer-content">
          <h3>Generate Your Official PDF Report</h3>
          <p>This will compile all expert tips, legal notices, and procedural steps into a single institutional guide.</p>
          <button className="footer-btn" onClick={handleDownload}>
            <Printer size={18} />
            Generate Master Guide (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;
