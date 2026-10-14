/**
 * AI HealthCheck - Simplified Symptom Checker
 * Parses user symptoms, checks emergency signs, asks only essential follow-up questions:
 * - Age
 * - Duration
 * - Severity
 * - Allergies & relevant history
 * Fast, clear, and easy to use without unnecessary cognitive load.
 */

import React, { useState, useEffect } from 'react';
import { AssessmentInput, SymptomOntology } from '../types/clinical';
import { RECOGNIZED_SYMPTOMS } from '../data/medicalKnowledge';

interface SymptomCheckerProps {
  initialSymptomText?: string;
  onSubmit: (input: AssessmentInput) => void;
  onEmergencyTrigger: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({
  initialSymptomText = '',
  onSubmit,
  onEmergencyTrigger,
  onCancel,
  isSubmitting = false,
}) => {
  // Symptom management
  const [inputText, setInputText] = useState(initialSymptomText);
  const [identifiedSymptoms, setIdentifiedSymptoms] = useState<SymptomOntology[]>([]);
  const [symptomSearch, setSymptomSearch] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Essential follow-up state
  const [age, setAge] = useState<number>(28);
  const [duration, setDuration] = useState<'today' | '3days' | 'week' | 'chronic'>('3days');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('moderate');
  const [hasPenicillinAllergy, setHasPenicillinAllergy] = useState(false);
  const [isPregnant, setIsPregnant] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse natural language symptoms on initial mount or text change
  useEffect(() => {
    if (initialSymptomText) {
      parseAndSetSymptoms(initialSymptomText);
    }
  }, [initialSymptomText]);

  const parseAndSetSymptoms = (text: string) => {
    const lower = text.toLowerCase();
    const matches: SymptomOntology[] = [];

    // Check emergency red-flags first
    const emergencyFound = RECOGNIZED_SYMPTOMS.some(
      (s) => s.isRedFlagTrigger && (lower.includes(s.name.toLowerCase()) || lower.includes(s.commonName.toLowerCase()))
    );

    if (
      emergencyFound ||
      lower.includes('chest pain') ||
      lower.includes('heart attack') ||
      lower.includes('cannot breathe') ||
      lower.includes('stroke') ||
      lower.includes('facial droop')
    ) {
      onEmergencyTrigger();
      return;
    }

    // Match recognized symptoms
    for (const sym of RECOGNIZED_SYMPTOMS) {
      const name = sym.name.toLowerCase();
      const common = sym.commonName.toLowerCase();
      if (lower.includes(name) || lower.includes(common)) {
        if (!matches.some((m) => m.id === sym.id)) {
          matches.push(sym);
        }
      }
    }

    // Default to at least one if common keywords detected
    if (matches.length === 0) {
      if (lower.includes('throat') || lower.includes('swallow')) {
        const found = RECOGNIZED_SYMPTOMS.find((s) => s.id === 'sore_throat');
        if (found) matches.push(found);
      }
      if (lower.includes('cough')) {
        const found = RECOGNIZED_SYMPTOMS.find((s) => s.id === 'cough_dry');
        if (found) matches.push(found);
      }
      if (lower.includes('fever') || lower.includes('temperature') || lower.includes('hot')) {
        const found = RECOGNIZED_SYMPTOMS.find((s) => s.id === 'fever_mild');
        if (found) matches.push(found);
      }
      if (lower.includes('headache') || lower.includes('head pain')) {
        const found = RECOGNIZED_SYMPTOMS.find((s) => s.id === 'headache_mild');
        if (found) matches.push(found);
      }
      if (lower.includes('nose') || lower.includes('cold') || lower.includes('sneez')) {
        const found = RECOGNIZED_SYMPTOMS.find((s) => s.id === 'runny_nose');
        if (found) matches.push(found);
      }
    }

    setIdentifiedSymptoms(matches);
  };

  const handleAddSymptom = (sym: SymptomOntology) => {
    if (sym.isRedFlagTrigger) {
      onEmergencyTrigger();
      return;
    }
    if (!identifiedSymptoms.some((s) => s.id === sym.id)) {
      setIdentifiedSymptoms([...identifiedSymptoms, sym]);
    }
    setSymptomSearch('');
    setShowSearchDropdown(false);
  };

  const handleRemoveSymptom = (id: string) => {
    setIdentifiedSymptoms(identifiedSymptoms.filter((s) => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifiedSymptoms.length === 0 && !inputText.trim()) {
      setError('Please identify at least one symptom to assess.');
      return;
    }
    if (age <= 0 || age > 120) {
      setError('Please enter a valid age between 1 and 120.');
      return;
    }

    setError(null);

    // Build payload
    const symptomsIds = identifiedSymptoms.map((s) => s.id);
    if (symptomsIds.length === 0 && inputText.trim()) {
      symptomsIds.push('sore_throat'); // fallback matching
    }

    const payload: AssessmentInput = {
      patientAge: age,
      jurisdiction: 'IND',
      symptoms: symptomsIds,
      symptomDuration: duration,
      progressionPace: duration === 'today' ? 'sudden' : 'gradual',
      painSeverity: severity === 'severe' ? 8 : severity === 'moderate' ? 5 : 2,
      associatedSymptoms: [],
      knownAllergies: hasPenicillinAllergy ? ['PENICILLIN_CLASS'] : [],
      currentMedicines: [],
      existingConditions: [],
      isPregnant,
      freeTextDescription: inputText,
      consentAccepted: true,
    };

    onSubmit(payload);
  };

  // Filter symptoms for quick search
  const availableSymptoms = RECOGNIZED_SYMPTOMS.filter(
    (s) =>
      !identifiedSymptoms.some((is) => is.id === s.id) &&
      (s.name.toLowerCase().includes(symptomSearch.toLowerCase()) ||
        s.commonName.toLowerCase().includes(symptomSearch.toLowerCase()))
  );

  return (
    <div className="w-full min-h-[calc(100vh-4rem-3.5rem)] bg-[#f8faf9] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 pb-5 border-b border-neutral-200/80">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-semibold text-neutral-500 hover:text-[#00685f] inline-flex items-center gap-1 mb-3 cursor-pointer"
          >
            &larr; Back to Home
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00201c]">
            A Few Quick Details
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Answer a few quick questions so we can provide safe, relevant health guidance.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Identified Symptoms */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Identified Symptoms
            </label>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {identifiedSymptoms.map((sym) => (
                <span
                  key={sym.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e6f4f1] text-[#00685f] text-xs font-bold border border-[#00685f]/20"
                >
                  <span>{sym.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSymptom(sym.id)}
                    className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#00685f]/20 cursor-pointer text-xs"
                    title="Remove"
                  >
                    ×
                  </button>
                </span>
              ))}

              {identifiedSymptoms.length === 0 && (
                <span className="text-xs text-neutral-400 italic">No symptoms selected yet.</span>
              )}
            </div>

            {/* Quick add symptom search */}
            <div className="relative">
              <input
                type="text"
                value={symptomSearch}
                onChange={(e) => {
                  setSymptomSearch(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="+ Add another symptom (e.g. fever, headache, sore throat)..."
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:bg-white"
              />
              {showSearchDropdown && symptomSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-neutral-200 rounded-xl shadow-lg z-20 p-1">
                  {availableSymptoms.slice(0, 6).map((sym) => (
                    <div
                      key={sym.id}
                      onClick={() => handleAddSymptom(sym)}
                      className="px-3 py-2 text-xs hover:bg-[#e6f4f1] hover:text-[#00685f] rounded-lg cursor-pointer flex items-center justify-between"
                    >
                      <span className="font-semibold">{sym.name}</span>
                      <span className="text-[10px] text-neutral-400">{sym.category}</span>
                    </div>
                  ))}
                  {availableSymptoms.length === 0 && (
                    <div className="p-2 text-center text-xs text-neutral-400">No matching symptom found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Age */}
          <div>
            <label htmlFor="patient-age" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
              Age of Patient
            </label>
            <input
              id="patient-age"
              type="number"
              min={1}
              max={120}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full sm:w-48 px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00685f]"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Age helps tailor dosage safety thresholds and clinical rules.
            </p>
          </div>

          {/* Section 3: Duration */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              How long have you had these symptoms?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'today', label: 'Started today' },
                { id: '3days', label: '2 to 3 days' },
                { id: 'week', label: 'About a week' },
                { id: 'chronic', label: 'Over 2 weeks' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDuration(opt.id as any)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                    duration === opt.id
                      ? 'bg-[#00685f] text-white border-[#00685f] shadow-xs'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Severity */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              How severe is your discomfort?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mild', label: 'Mild', desc: 'Manageable, minimal disruption' },
                { id: 'moderate', label: 'Moderate', desc: 'Uncomfortable, affects routine' },
                { id: 'severe', label: 'Severe', desc: 'High pain, difficult to function' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSeverity(opt.id as any)}
                  className={`py-2.5 px-3 rounded-xl border transition-all cursor-pointer text-left ${
                    severity === opt.id
                      ? 'bg-[#e6f4f1] text-[#00685f] border-[#00685f] ring-1 ring-[#00685f]'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[10px] text-neutral-500 truncate">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 5: Relevant History & Allergies */}
          <div className="pt-2 border-t border-neutral-200/80 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
              Safety Checks (Optional)
            </label>

            <label className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hasPenicillinAllergy}
                onChange={(e) => setHasPenicillinAllergy(e.target.checked)}
                className="w-4 h-4 rounded text-[#00685f] accent-[#00685f]"
              />
              <span>Known Penicillin or antibiotic allergy</span>
            </label>

            {age >= 14 && age <= 55 && (
              <label className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPregnant}
                  onChange={(e) => setIsPregnant(e.target.checked)}
                  className="w-4 h-4 rounded text-[#00685f] accent-[#00685f]"
                />
                <span>Currently pregnant (checks pregnancy safety contraindications)</span>
              </label>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#00685f] hover:bg-[#005149] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing Symptoms...</span>
                </>
              ) : (
                <>
                  <span>Get Clinical Guidance</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
