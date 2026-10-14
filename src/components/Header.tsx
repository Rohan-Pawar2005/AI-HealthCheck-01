/**
 * AI HealthCheck Header - Compact & Clean
 * Contains only:
 * - Logo and name
 * - Home, Symptom Checker, Health Library, Medicine Information
 * - Small Emergency Help link (112)
 */

import React, { useState } from 'react';

export type NavTab = 'home' | 'symptom-checker' | 'health-library' | 'medicine-information' | 'about-and-safety';

interface HeaderProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onEmergencyClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate, onEmergencyClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: NavTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#00685f] text-white flex items-center justify-center shadow-xs group-hover:bg-[#005149] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-lg sm:text-xl font-extrabold text-[#00201c] tracking-tight">
            AI HealthCheck
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2" aria-label="Main Navigation">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#e6f4f1] text-[#00685f]'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('symptom-checker')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'symptom-checker'
                ? 'bg-[#e6f4f1] text-[#00685f]'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Symptom Checker
          </button>
          <button
            onClick={() => handleNavClick('health-library')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'health-library'
                ? 'bg-[#e6f4f1] text-[#00685f]'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Health Library
          </button>
          <button
            onClick={() => handleNavClick('medicine-information')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'medicine-information'
                ? 'bg-[#e6f4f1] text-[#00685f]'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Medicine Information
          </button>
        </nav>

        {/* Small Emergency Help Link + Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onEmergencyClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors border border-red-200 cursor-pointer"
            title="Immediate emergency help (Dial 112)"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span>Emergency Help (112)</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-4 space-y-1 shadow-md">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
              activeTab === 'home' ? 'bg-[#e6f4f1] text-[#00685f]' : 'text-neutral-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('symptom-checker')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
              activeTab === 'symptom-checker' ? 'bg-[#e6f4f1] text-[#00685f]' : 'text-neutral-700'
            }`}
          >
            Symptom Checker
          </button>
          <button
            onClick={() => handleNavClick('health-library')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
              activeTab === 'health-library' ? 'bg-[#e6f4f1] text-[#00685f]' : 'text-neutral-700'
            }`}
          >
            Health Library
          </button>
          <button
            onClick={() => handleNavClick('medicine-information')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
              activeTab === 'medicine-information' ? 'bg-[#e6f4f1] text-[#00685f]' : 'text-neutral-700'
            }`}
          >
            Medicine Information
          </button>
        </div>
      )}
    </header>
  );
};
