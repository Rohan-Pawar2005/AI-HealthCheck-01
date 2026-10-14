/**
 * Minimal & Clean Homepage
 * Specifications:
 * - Heading: "How are you feeling today?"
 * - Subtitle: "Enter your symptoms to explore possible causes and safe next steps."
 * - One large symptom input field: "Describe your symptoms, e.g. fever, headache, and cough..."
 * - One primary button: "Analyze Symptoms"
 * - Small disclaimer: "Preliminary health guidance, not a confirmed diagnosis."
 * - Fits within one screen on a laptop without vertical scrolling.
 */

import React, { useState } from 'react';

interface HomePageProps {
  onAnalyze: (symptomsText: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onAnalyze }) => {
  const [symptomText, setSymptomText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = symptomText.trim();
    if (!trimmed) {
      setError('Please enter what you are experiencing to begin.');
      return;
    }
    setError(null);
    onAnalyze(trimmed);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-4rem-3.5rem)] bg-[#f8faf9]">
      <div className="w-full max-w-2xl text-center flex flex-col items-center">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#00201c] tracking-tight leading-tight mb-3">
          How are you feeling today?
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-neutral-600 mb-8 max-w-xl leading-relaxed">
          Enter your symptoms to explore possible causes and safe next steps.
        </p>

        {/* Single Input Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
          <div className="w-full relative">
            <textarea
              id="symptom-input"
              rows={3}
              value={symptomText}
              onChange={(e) => {
                setSymptomText(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Describe your symptoms, e.g. fever, headache, and cough..."
              className="w-full p-4 sm:p-5 rounded-2xl bg-white border-2 border-neutral-200 focus:border-[#00685f] focus:ring-4 focus:ring-[#00685f]/10 text-neutral-900 placeholder:text-neutral-400 text-base sm:text-lg shadow-sm resize-none outline-none transition-all leading-relaxed"
            />
          </div>

          {/* Validation Error Message if empty */}
          {error && (
            <div className="text-xs sm:text-sm font-semibold text-red-600 flex items-center gap-1.5 self-start sm:self-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 bg-[#00685f] hover:bg-[#005149] text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Analyze Symptoms</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        {/* Small Bottom Disclaimer */}
        <p className="mt-8 text-xs sm:text-sm text-neutral-500 max-w-md">
          Preliminary health guidance, not a confirmed diagnosis. In case of an emergency, call 112 or your local emergency number immediately.
        </p>
      </div>
    </div>
  );
};
