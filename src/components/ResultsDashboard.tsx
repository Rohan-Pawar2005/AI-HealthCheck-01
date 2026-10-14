/**
 * Results Dashboard - Clean, Evidence-Informed Clinical Guidance
 * Displays:
 * - Possible conditions supported by the prediction method
 * - Simple explanations of each condition
 * - Symptoms that match user's input
 * - Important missing symptoms (differential rules)
 * - Self-care precautions and evidence-backed home care advice
 * - When to seek medical attention
 * - Related medicine information (OTC / educational) with explicit warnings & no prescriptions
 * - Button to start a new check
 */

import React, { useState } from 'react';
import { TriageAnalysisResult, AssessmentInput } from '../types/clinical';
import { RECOGNIZED_SYMPTOMS } from '../data/medicalKnowledge';

interface ResultsDashboardProps {
  result: TriageAnalysisResult;
  assessmentInput: AssessmentInput;
  onEditSymptoms: () => void;
  onStartNew: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  assessmentInput,
  onEditSymptoms,
  onStartNew,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const hasPenicillinAllergy = assessmentInput.knownAllergies?.some((a) =>
    a.toUpperCase().includes('PENICILLIN') || a.toUpperCase().includes('BETA_LACTAM')
  );

  // Map symptom IDs back to clean readable names
  const getSymptomLabel = (symId: string) => {
    const found = RECOGNIZED_SYMPTOMS.find((s) => s.id === symId);
    return found ? found.name : symId.replace(/_/g, ' ');
  };

  return (
    <div className="w-full bg-[#f8faf9] min-h-[calc(100vh-4rem-3.5rem)] py-8 px-4 sm:px-6 lg:px-8 text-neutral-800">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f4f1] text-[#00685f] text-xs font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00685f]"></span>
                <span>Preliminary Health Guidance Report</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00201c]">
                Assessment Results
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Generated based on the symptoms and health details you provided.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onEditSymptoms}
                className="px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-bold text-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit Symptoms</span>
              </button>

              <button
                type="button"
                onClick={onStartNew}
                className="px-4 py-2 rounded-xl bg-[#00685f] hover:bg-[#005149] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Start New Check</span>
              </button>
            </div>
          </div>

          {/* User Details Summary */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-neutral-50 p-4 rounded-xl border border-neutral-200/70">
            <div>
              <span className="text-neutral-500 block font-medium">Patient Age</span>
              <span className="font-bold text-neutral-800 text-sm">{assessmentInput.patientAge} years old</span>
            </div>
            <div>
              <span className="text-neutral-500 block font-medium">Duration</span>
              <span className="font-bold text-neutral-800 text-sm capitalize">
                {assessmentInput.symptomDuration === 'today' ? 'Started today' :
                 assessmentInput.symptomDuration === '3days' ? '2 to 3 days' :
                 assessmentInput.symptomDuration === 'week' ? 'About a week' : 'Over 2 weeks'}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block font-medium">Reported Symptoms</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {assessmentInput.symptoms && assessmentInput.symptoms.length > 0 ? (
                  assessmentInput.symptoms.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-700 font-semibold text-[11px]">
                      {getSymptomLabel(s)}
                    </span>
                  ))
                ) : (
                  <span className="text-neutral-600 font-semibold">{assessmentInput.freeTextDescription || 'General discomfort'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Preliminary Summary Insight */}
          {result.preliminarySummary && (
            <div className="mt-5 p-4 rounded-xl bg-[#e6f4f1]/60 border border-[#00685f]/20 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00685f] text-white flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                <strong className="text-[#00201c] block font-bold mb-0.5">Summary of Findings</strong>
                {result.preliminarySummary}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 1: Possible Conditions */}
        <section className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8">
          <div className="mb-6 pb-4 border-b border-neutral-200/80">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#00201c]">
              Possible Causes
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Conditions supported by clinical matching rules for your reported symptoms. These are possibilities for discussion with a doctor, not confirmed diagnoses.
            </p>
          </div>

          <div className="space-y-6">
            {result.possibleConditions.map((condition, idx) => (
              <div
                key={condition.id}
                className="p-5 sm:p-6 rounded-2xl border border-neutral-200 bg-white hover:border-[#00685f]/40 transition-all shadow-xs"
              >
                {/* Condition Title & Match Tier */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#00685f] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#00201c]">
                        {condition.conditionName}
                      </h3>
                      {condition.icd10Code && (
                        <span className="text-[11px] font-mono text-neutral-400">
                          ICD-10: {condition.icd10Code}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className={`self-start text-xs font-bold px-3 py-1 rounded-full border ${
                    condition.matchTier === 'HIGH_OVERLAP'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : condition.matchTier === 'MODERATE_OVERLAP'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                  }`}>
                    {condition.matchTierLabel || (condition.matchTier === 'HIGH_OVERLAP' ? 'High Overlap' : 'Moderate Overlap')}
                  </span>
                </div>

                {/* Explanation */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 pl-10">
                  {condition.clinicalExplanation}
                </p>

                {/* Matched vs Missing Symptoms Comparison Grid */}
                <div className="ml-0 sm:ml-10 grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200/70 text-xs">
                  {/* Symptoms that match */}
                  <div>
                    <span className="font-bold text-[#00685f] block mb-2 flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                      <svg className="w-4 h-4 text-[#00685f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Matching Symptoms Reported
                    </span>
                    <ul className="space-y-1.5 pl-1">
                      {condition.matchedEvidence.matchedReported.map((ev, i) => (
                        <li key={i} className="text-neutral-700 flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Important missing or rule-out symptoms */}
                  <div>
                    <span className="font-bold text-neutral-500 block mb-2 flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      Important Missing / Excluded Signs
                    </span>
                    <ul className="space-y-1.5 pl-1">
                      {condition.matchedEvidence.absentRedFlags.map((ev, i) => (
                        <li key={i} className="text-neutral-600 flex items-start gap-1.5">
                          <span className="text-neutral-400 font-bold">•</span>
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Source Reference */}
                {condition.sourceReference && (
                  <div className="ml-0 sm:ml-10 mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Clinical Reference: {condition.sourceReference.sourceName}</span>
                    <span>Reviewed: {condition.sourceReference.reviewDate}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Care Precautions & When to Seek Medical Attention */}
        <section className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8">
          <div className="mb-6 pb-4 border-b border-neutral-200/80">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#00201c]">
              Next Steps & Care Advice
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Suggested Care Level:</span>
              <span className="text-xs font-bold text-[#00685f] px-2.5 py-0.5 rounded-full bg-[#e6f4f1]">
                {result.urgencyTitle || 'Self-Care at Home'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Self-Care Precautions */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>{result.selfCareProtocol.title || 'Safe Self-Care Precautions'}</span>
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-neutral-700">
                  {result.selfCareProtocol.measures.map((measure, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </span>
                      <div>
                        <strong className="text-neutral-900">{measure.title}:</strong>{' '}
                        <span>{measure.instruction}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-emerald-200/60 text-[11px] text-emerald-800">
                Source: {result.selfCareProtocol.sourceAttribution}
              </div>
            </div>

            {/* When to Seek Medical Attention */}
            <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200/80 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-red-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>When to Seek Medical Attention</span>
                </h3>
                <p className="text-xs text-red-800/80 mb-3">
                  Contact a doctor or visit an urgent care clinic immediately if you experience any of these signs:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                  {result.escalationCriteria.warningPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-200 text-red-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        !
                      </span>
                      <div>
                        <strong className="text-neutral-900">{point.title}:</strong>{' '}
                        <span>{point.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-red-200/60">
                <a
                  href="tel:112"
                  className="inline-flex items-center gap-2 text-xs font-bold text-red-700 hover:text-red-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{result.escalationCriteria.emergencyContactNotice || 'Emergency Help: Dial 112'}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Related Medicine Information */}
        <section className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8">
          <div className="mb-6 pb-4 border-b border-neutral-200/80">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#00201c]">
              Related Medicine Information
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              General over-the-counter and supportive pharmacology education for these symptoms.
            </p>
          </div>

          {/* Strict Non-Prescription Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 mb-6 flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <strong className="block font-bold mb-0.5">Important Safety & Non-Prescription Notice:</strong>
              AI HealthCheck does not prescribe medicines, recommend specific dosages, or replace professional judgment. Always consult a licensed physician or pharmacist before taking any medication.
            </div>
          </div>

          {/* Allergy alert if penicillin */}
          {hasPenicillinAllergy && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-900 mb-6 flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <div>
                <strong className="block font-bold mb-0.5">Penicillin Allergy Registered:</strong>
                Avoid all beta-lactam antibiotics (such as Amoxicillin, Ampicillin, Augmentin). Always inform doctors and pharmacists of your allergy.
              </div>
            </div>
          )}

          {/* List of related medications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.medicineReferences.map((med, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-xl border border-neutral-200 bg-neutral-50/60">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-[#00201c]">{med.genericName}</h4>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#e6f4f1] text-[#00685f]">
                    {med.clinicalCategory}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                  <strong>Documented use:</strong> {med.documentedUse}
                </p>
                <div className="p-2.5 rounded-lg bg-red-50/80 border border-red-100 text-[11px] text-red-800 leading-relaxed">
                  <strong>Safety caution:</strong> {med.safetyWarning}
                </div>
              </div>
            ))}
          </div>

          {/* Antibiotic stewardship warning */}
          <div className="mt-5 p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <strong className="block font-bold mb-0.5">Antibiotic Stewardship:</strong>
              Antibiotics are ineffective against common viral colds, flu, and viral sore throats. Taking antibiotics unnecessarily causes adverse side effects and antibiotic resistance.
            </div>
          </div>
        </section>

        {/* Bottom Action Footer */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 text-left">
            Have different symptoms or want to check for someone else?
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-bold text-neutral-700 transition-colors cursor-pointer"
            >
              {copiedLink ? 'Link Copied!' : 'Share Results'}
            </button>
            <button
              type="button"
              onClick={onStartNew}
              className="px-6 py-2.5 bg-[#00685f] hover:bg-[#005149] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Start a New Check
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
