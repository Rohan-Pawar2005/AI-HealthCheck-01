/**
 * About, Clinical Governance & Safety Policies - Exact Stitch AI Design Specification (Image 13)
 * Clear evidence-based documentation, medical disclaimers, privacy policy, and verified emergency directories.
 */

import React, { useState, useEffect } from 'react';
import { NavTab } from './Header';
import { ApiService } from '../services/api';

interface AboutAndSafetyProps {
  onNavigate: (tab: NavTab) => void;
  onEmergencyClick: () => void;
}

export const AboutAndSafety: React.FC<AboutAndSafetyProps> = ({
  onNavigate,
  onEmergencyClick,
}) => {
  const [activeSection, setActiveSection] = useState<'disclaimer' | 'governance' | 'privacy' | 'emergency-dir'>('disclaimer');
  const [sourceStatuses, setSourceStatuses] = useState<any[]>([]);
  const [isLoadingSources, setIsLoadingSources] = useState(false);

  useEffect(() => {
    if (activeSection === 'governance') {
      loadSourceStatuses();
    }
  }, [activeSection]);

  const loadSourceStatuses = async () => {
    setIsLoadingSources(true);
    try {
      const data = await ApiService.checkReferenceSources();
      setSourceStatuses(data);
    } catch {
      // Handled in api
    } finally {
      setIsLoadingSources(false);
    }
  };

  return (
    <div className="w-full bg-[#f8faf9] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans text-neutral-800">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="mb-8 border-b border-neutral-200/80 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e6f4f1] text-[#00685f] tracking-wide uppercase border border-[#00685f]/20">
                  Clinical Safety & Transparency Standard
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  ISO/IEC 62304 & SaMD Compliant Architecture
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00201c] tracking-tight">
                About AI HealthCheck, Safety & Clinical Governance
              </h1>
              <p className="mt-2 text-base text-neutral-600 max-w-3xl leading-relaxed">
                Learn how AI HealthCheck safely screens symptoms, evaluates clinical guidelines, protects your private health data, 
                and guides users toward timely professional medical evaluation.
              </p>
            </div>

            <button
              onClick={onEmergencyClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Immediate Emergency Help (112)
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Strip */}
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-px mb-8 overflow-x-auto">
          {[
            { id: 'disclaimer', label: '1. Medical Disclaimer & Scope' },
            { id: 'governance', label: '2. Clinical Methodology & Rules' },
            { id: 'privacy', label: '3. Data Privacy & Zero-Track Policy' },
            { id: 'emergency-dir', label: '4. Verified Emergency Directory' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`py-3 px-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                activeSection === tab.id
                  ? 'border-[#00685f] text-[#00685f] bg-white rounded-t-lg'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Section 1: Medical Disclaimer */}
        {activeSection === 'disclaimer' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-200/80 flex items-center justify-center shrink-0 text-amber-800">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-amber-950 mb-2">
                    Official Healthcare Disclaimer
                  </h2>
                  <p className="text-sm leading-relaxed text-amber-900 mb-3">
                    <strong>AI HealthCheck is a clinical decision-support and educational health information prototype.</strong> It is not a licensed physician, clinical diagnostic device, or telemedicine consultation service. The outputs generated do not constitute medical diagnosis, formal prognosis, or personalized pharmaceutical prescriptions.
                  </p>
                  <p className="text-sm leading-relaxed text-amber-900">
                    Never disregard professional medical advice or delay seeking medical attention because of information viewed on this application. If you believe you are experiencing a life-threatening medical emergency, call your local emergency hotline immediately (112 in India, 911 in North America, 999 in the UK).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
                <h3 className="text-base font-bold text-[#00201c] mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  What AI HealthCheck Does
                </h3>
                <ul className="space-y-2.5 text-sm text-neutral-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Immediately halts evaluation and alerts user if severe red-flag symptoms are reported.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Evaluates standard criteria (e.g., Modified Centor score for sore throat) against recognized medical rules.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Maps clinical findings to 4 standardized tiers of care (Self-Care, Routine GP, Urgent Care, Emergency).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Supplies verified pharmacology monographs from DailyMed, openFDA, and WHO Essential Medicines.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
                <h3 className="text-base font-bold text-[#00201c] mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  What AI HealthCheck Never Does
                </h3>
                <ul className="space-y-2.5 text-sm text-neutral-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Never issues personalized prescription dosages or tells patients to start antibiotics without a doctor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Never provides false reassurance or assumes non-selected symptoms are absent.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Never fabricates medical facts, research citations, or randomized diagnostic percentages.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Never sells or monetizes user symptoms or health information to pharmaceutical brokers.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Content Section 2: Clinical Governance */}
        {activeSection === 'governance' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs">
              <h2 className="text-2xl font-bold text-[#00201c] mb-4">
                Clinical Evidence Framework & Rule Hierarchy
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Unlike unconstrained conversational AI models that may hallucinate treatments or guess diseases probabilistically, 
                AI HealthCheck operates on a <strong>two-layer architecture</strong>:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 rounded-xl border border-[#00685f]/30 bg-[#f4fffc]">
                  <span className="px-2.5 py-1 rounded bg-[#00685f] text-white text-xs font-bold uppercase tracking-wider">
                    Layer 1: Deterministic Engine
                  </span>
                  <h4 className="text-base font-bold text-[#00201c] mt-3 mb-2">
                    Hard-Coded Clinical Rules & Red-Flag Intercepts
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Prior to any disease evaluation, inputs pass through deterministic rule checks for 
                    life-threatening presentations (e.g., chest pain with dyspnea, acute neurological deficits, stridor). 
                    When detected, the system immediately halts and initiates emergency response protocols.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-purple-200 bg-purple-50/50">
                  <span className="px-2.5 py-1 rounded bg-purple-700 text-white text-xs font-bold uppercase tracking-wider">
                    Layer 2: Grounded Synthesizer
                  </span>
                  <h4 className="text-base font-bold text-purple-950 mt-3 mb-2">
                    Evidence Explanation & Plain English Translation
                  </h4>
                  <p className="text-xs text-purple-900 leading-relaxed">
                    Once differential matches and care levels are bounded by validated scores (such as the Centor score), 
                    Gemini AI is employed exclusively to explain clinical reasoning in clear, compassionate, and accessible language, 
                    strictly anchored to MedlinePlus and NHS sources.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#00201c] mb-4">
                Ontologies & Reference Data Sources
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-neutral-200 rounded-xl overflow-hidden">
                  <thead className="bg-neutral-100/90 text-neutral-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4 border-b border-neutral-200">Organization / Source</th>
                      <th className="py-3 px-4 border-b border-neutral-200">Clinical Focus</th>
                      <th className="py-3 px-4 border-b border-neutral-200">Standard / Scope</th>
                      <th className="py-3 px-4 border-b border-neutral-200">Update Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 bg-white">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-neutral-900">MedlinePlus (US National Library of Medicine)</td>
                      <td className="py-3 px-4 text-neutral-600">Patient Health Information & Diagnostic Guides</td>
                      <td className="py-3 px-4 text-neutral-600">Public Domain / NIH Peer Reviewed</td>
                      <td className="py-3 px-4 text-neutral-500 font-mono">Quarterly</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-neutral-900">National Health Service (NHS England)</td>
                      <td className="py-3 px-4 text-neutral-600">Symptom Triaging & Red-Flag Guidance</td>
                      <td className="py-3 px-4 text-neutral-600">Open Government Licence (OGL v3.0)</td>
                      <td className="py-3 px-4 text-neutral-500 font-mono">Continuous</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-neutral-900">World Health Organization (WHO)</td>
                      <td className="py-3 px-4 text-neutral-600">ICD-11 Classification & Essential Medicines</td>
                      <td className="py-3 px-4 text-neutral-600">International Public Health Directives</td>
                      <td className="py-3 px-4 text-neutral-500 font-mono">Annual Review</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-neutral-900">DailyMed & openFDA</td>
                      <td className="py-3 px-4 text-neutral-600">Prescription and OTC Medication Monographs</td>
                      <td className="py-3 px-4 text-neutral-600">FDA Structured Product Labeling (SPL)</td>
                      <td className="py-3 px-4 text-neutral-500 font-mono">Monthly Synced</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-neutral-900">Ministry of Health & Family Welfare (MoHFW India)</td>
                      <td className="py-3 px-4 text-neutral-600">Standard Treatment Guidelines & 112 Protocol</td>
                      <td className="py-3 px-4 text-neutral-600">National Health Mission Directives</td>
                      <td className="py-3 px-4 text-neutral-500 font-mono">Regular</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Real-time Upstream API Telemetry (Stage 2 / Phase 4) */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#00201c] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Real-Time Upstream Source Telemetry & Freshness Monitor
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Live status, latency, and permitted rate limits for openFDA, RxNorm (NIH), DailyMed, and MoHFW APIs.
                    </p>
                  </div>
                  <button
                    onClick={loadSourceStatuses}
                    disabled={isLoadingSources}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
                  >
                    <svg className={`w-3.5 h-3.5 ${isLoadingSources ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{isLoadingSources ? 'Pinging APIs...' : 'Refresh Upstream Status'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sourceStatuses.map((src) => (
                    <div
                      key={src.id}
                      className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-bold text-xs text-neutral-900">{src.sourceName}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              src.status === 'ONLINE'
                                ? 'bg-emerald-100 text-emerald-800'
                                : src.status === 'DEGRADED'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            {src.status === 'LOCAL_ONLY' ? 'Verified Offline' : src.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 font-mono break-all mb-2">
                          {src.apiEndpoint}
                        </p>
                        <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                          {src.notes}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-neutral-200/80 flex flex-wrap items-center justify-between text-[11px] text-neutral-500 font-medium">
                        <span>Rate Limit: {src.rateLimitInfo}</span>
                        <span>{src.latencyMs ? `${src.latencyMs}ms response` : 'Zero delay'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Section 3: Data Privacy */}
        {activeSection === 'privacy' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#00685f]/10 text-[#00685f] flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#00201c]">
                    Privacy Architecture & Data Sovereignty
                  </h2>
                  <p className="text-xs text-neutral-500">Zero Commercial Tracking • Local Ephemeral Memory</p>
                </div>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Health information is exceptionally sensitive. AI HealthCheck was engineered from day one 
                with privacy-by-design principles, complying with Indian Digital Personal Data Protection (DPDP) Act, 
                EU GDPR, and HIPAA data de-identification standards.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/60">
                  <h4 className="text-sm font-bold text-neutral-900 mb-2">1. No Compulsory Sign-Up</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Assessments can be performed completely anonymously. You do not need to provide your legal name, 
                    phone number, national ID, or credit card to perform a symptom check.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/60">
                  <h4 className="text-sm font-bold text-neutral-900 mb-2">2. Local Browser Storage</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Your assessment history is saved primarily within your browser's private local storage. 
                    You have one-click authority to completely purge session records at any moment.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/60">
                  <h4 className="text-sm font-bold text-neutral-900 mb-2">3. No Advertising Pixels</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    This platform contains zero third-party marketing pixels, advertising networks, or social tracking cookies. 
                    Clinical queries are never repurposed for ad retargeting.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Manage Your Device Health Data</h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    Purge all local session records, cached assessments, and temporary preferences from this browser.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete all saved assessment history from this device?')) {
                      localStorage.clear();
                      alert('All local health check history has been deleted.');
                    }
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Clear Device Session Records
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Section 4: Emergency Directory */}
        {activeSection === 'emergency-dir' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs">
              <h2 className="text-2xl font-bold text-[#00201c] mb-2">
                Verified Global & National Emergency Helplines
              </h2>
              <p className="text-sm text-neutral-600 mb-6">
                All numbers below are verified direct public safety emergency dispatch hotlines. 
                Keep these numbers accessible in case of life-threatening events.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* India Direct Hotlines */}
                <div className="p-5 rounded-xl border-2 border-[#00685f]/30 bg-[#f4fffc]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-[#00685f] uppercase tracking-wider flex items-center gap-1.5">
                      🇮🇳 India (Primary Region)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00685f] text-white">
                      Verified
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200">
                      <div>
                        <div className="text-xs text-neutral-500 font-semibold">National Emergency Response</div>
                        <div className="text-lg font-black text-neutral-900">112</div>
                      </div>
                      <a href="tel:112" className="px-3 py-1.5 bg-[#00685f] text-white text-xs font-bold rounded-md hover:bg-[#005149]">
                        Call 112
                      </a>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200">
                      <div>
                        <div className="text-xs text-neutral-500 font-semibold">Ambulance Service</div>
                        <div className="text-lg font-black text-neutral-900">102 / 108</div>
                      </div>
                      <a href="tel:108" className="px-3 py-1.5 bg-neutral-800 text-white text-xs font-bold rounded-md hover:bg-neutral-900">
                        Call 108
                      </a>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200">
                      <div>
                        <div className="text-xs text-neutral-500 font-semibold">Women's Safety Helpline</div>
                        <div className="text-lg font-black text-neutral-900">1091 / 181</div>
                      </div>
                      <a href="tel:181" className="px-3 py-1.5 bg-neutral-800 text-white text-xs font-bold rounded-md hover:bg-neutral-900">
                        Call 181
                      </a>
                    </div>
                  </div>
                </div>

                {/* International Hotlines */}
                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/70">
                  <span className="font-bold text-sm text-neutral-700 uppercase tracking-wider block mb-3">
                    Global Direct Hotlines
                  </span>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200">
                      <div>
                        <div className="text-xs text-neutral-500 font-semibold">🇺🇸 United States & Canada</div>
                        <div className="text-lg font-black text-neutral-900">911</div>
                      </div>
                      <a href="tel:911" className="px-3 py-1.5 bg-neutral-800 text-white text-xs font-bold rounded-md hover:bg-neutral-900">
                        Call 911
                      </a>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200">
                      <div>
                        <div className="text-xs text-neutral-500 font-semibold">🇬🇧 United Kingdom</div>
                        <div className="text-lg font-black text-neutral-900">999 (Emergency) / 111 (NHS)</div>
                      </div>
                      <a href="tel:999" className="px-3 py-1.5 bg-neutral-800 text-white text-xs font-bold rounded-md hover:bg-neutral-900">
                        Call 999
                      </a>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200">
                      <div>
                        <div className="text-xs text-neutral-500 font-semibold">🇪🇺 European Union</div>
                        <div className="text-lg font-black text-neutral-900">112</div>
                      </div>
                      <a href="tel:112" className="px-3 py-1.5 bg-neutral-800 text-white text-xs font-bold rounded-md hover:bg-neutral-900">
                        Call 112
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-white border border-neutral-200 text-center">
          <h3 className="text-xl font-bold text-[#00201c] mb-2">
            Ready to Begin an Evidence-Informed Assessment?
          </h3>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto mb-6">
            Review symptoms with our guided intake questionnaire, verified rules, and personalized safe care guidance.
          </p>
          <button
            onClick={() => onNavigate('symptom-checker')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00685f] hover:bg-[#005149] text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
          >
            Start Symptom Assessment Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
