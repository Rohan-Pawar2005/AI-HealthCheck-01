/**
 * Footer Component - Exact Stitch AI Design Specification
 */

import React from 'react';
import { NavTab } from './Header';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  onEmergencyClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onEmergencyClick }) => {
  return (
    <footer className="w-full bg-surface-container-lowest mt-16 shadow-[0_-1px_8px_rgba(0,0,0,0.02)] border-t border-surface-container">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Notice */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
              </div>
              <span className="font-headline text-lg font-bold text-on-surface">AI HealthCheck</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Authoritative clinical decision-support infrastructure engineered for immediate assessment, evidence-informed guidance, and diagnostic awareness.
            </p>
            <span className="inline-block px-2.5 py-1 rounded bg-surface-container text-xs text-on-surface-variant font-medium w-fit">
              v1.0.4-preview - Non-diagnostic
            </span>
          </div>

          {/* Column 2: Clinical Evidence Sources */}
          <div>
            <h4 className="text-sm font-bold text-on-surface mb-3 uppercase tracking-wider">
              Clinical Evidence Sources
            </h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>
                <a
                  href="https://medlineplus.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  <span>MedlinePlus (NLM / NIH)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.nhs.uk/conditions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  <span>NHS Health A to Z</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.who.int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  <span>World Health Organization (WHO)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.cdc.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  <span>CDC Guidelines & Feeds</span>
                </a>
              </li>
              <li>
                <a
                  href="https://dailymed.nlm.nih.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  <span>DailyMed & openFDA</span>
                </a>
              </li>
              <li>
                <a
                  href="https://mohfw.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  <span>MoHFW Clinical Registry (India)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance & Security */}
          <div>
            <h4 className="text-sm font-bold text-on-surface mb-3 uppercase tracking-wider">
              Governance & Security
            </h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>
                <button
                  onClick={() => onNavigate('about-and-safety')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Privacy Policy & Disclaimers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about-and-safety')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Data Deletion & Retention
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about-and-safety')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Source Attribution & Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('medicine-information')}
                  className="hover:text-primary transition-colors text-left"
                >
                  API Docs & AI Studio Export
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about-and-safety')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Accessibility Standards
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Protocol */}
          <div>
            <h4 className="text-sm font-bold text-on-surface mb-3 uppercase tracking-wider">
              Emergency Protocol
            </h4>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              If you are facing acute symptoms, severe chest pressure, or loss of breath, do not wait for algorithmic review.
            </p>
            <button
              onClick={onEmergencyClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-error text-on-error text-sm font-bold hover:opacity-95 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Call Emergency 112 / 911</span>
            </button>
            <div className="mt-4">
              <button
                onClick={() => onNavigate('about-and-safety')}
                className="text-xs text-secondary hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Contact Clinical Oversight Team</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-surface-container bg-surface-container-low px-4 py-4 rounded-xl text-center">
          <p className="text-xs sm:text-sm text-on-surface-variant">
            © 2026 AI HealthCheck. All medical research data verified against public domain clinical repositories. Not a substitute for formal diagnosis or clinical care.
          </p>
        </div>
      </div>
    </footer>
  );
};
