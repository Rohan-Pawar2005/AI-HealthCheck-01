/**
 * Medicine Information & Drug Safety Monograph - Exact Stitch AI Design Specification (Image 11)
 * Authoritative, non-prescriptive pharmacology monographs sourced from DailyMed (NLM), openFDA, and WHO Essential Medicines.
 */

import React, { useState, useEffect } from 'react';
import { MedicineMonograph } from '../types/clinical';
import { ApiService } from '../services/api';

interface MedicineInfoProps {
  initialSearchQuery?: string;
  onNavigateToSymptomChecker?: () => void;
  onEmergencyClick?: () => void;
}

export const MedicineInfo: React.FC<MedicineInfoProps> = ({
  initialSearchQuery = '',
  onNavigateToSymptomChecker,
  onEmergencyClick,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'otc' | 'rx' | 'warnings'>('all');
  const [medicines, setMedicines] = useState<MedicineMonograph[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineMonograph | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadMedicines();
  }, [searchQuery, selectedFilter]);

  const loadMedicines = async () => {
    setIsLoading(true);
    try {
      const data = await ApiService.searchMedicines(searchQuery, selectedFilter);
      const list = data.results || [];
      setMedicines(list);
      if (list.length > 0 && !selectedMedicine) {
        setSelectedMedicine(list[0]);
      } else if (list.length > 0 && selectedMedicine) {
        const exists = list.find((m) => m.rxcui === selectedMedicine.rxcui);
        if (!exists) setSelectedMedicine(list[0]);
      }
    } catch (err) {
      console.error('Error loading medicines:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#f8faf9] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans text-neutral-800">
      <div className="max-w-7xl mx-auto">
        {/* Top Clinical Header Strip */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e6f4f1] text-[#00685f] tracking-wide uppercase border border-[#00685f]/20">
                  <span className="w-2 h-2 rounded-full bg-[#00685f] animate-pulse"></span>
                  DailyMed & openFDA Knowledge Base
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  v2025.1 • WHO Model List of Essential Medicines
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00201c] tracking-tight">
                Medicine Safety & Reference Monographs
              </h1>
              <p className="mt-2 text-base text-neutral-600 max-w-3xl leading-relaxed">
                Objective, evidence-based medication summaries including indications, standard dosage principles, 
                boxed warnings, cross-interactions, and contraindications. 
                <strong className="text-neutral-900 font-semibold"> Not personalized prescription advice.</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {onNavigateToSymptomChecker && (
                <button
                  onClick={onNavigateToSymptomChecker}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00685f] hover:bg-[#005149] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Launch Assessment First
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Global Safety Precaution Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-900 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1 text-sm leading-relaxed">
            <h3 className="font-bold text-amber-950 text-base mb-1">
              Safety Mandatory: Safe Medication Principles
            </h3>
            <p>
              Always read the product manufacturer packaging insert before ingestion. 
              Never exceed the maximum 24-hour ceiling dose. Avoid combining multiple products containing acetaminophen (paracetamol) 
              due to severe acute hepatotoxicity risks. Patients with hypertension, renal impairment, gastrointestinal ulcers, or pregnancy 
              must consult a registered medical practitioner or licensed pharmacist.
            </p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 relative">
              <label htmlFor="med-search" className="sr-only">Search generic or brand name</label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="med-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by generic (e.g., Paracetamol, Amoxicillin, Ibuprofen) or brand name..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:border-transparent bg-neutral-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-neutral-400 hover:text-neutral-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="md:col-span-4 flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All Regimens
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('otc')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedFilter === 'otc'
                    ? 'bg-white text-[#00685f] shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                OTC Non-Rx
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('rx')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedFilter === 'rx'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Rx Only
              </button>
            </div>
          </div>
        </div>

        {/* Main Monograph Interface: Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Monograph Index */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Indexed Monographs ({medicines.length})
              </h2>
              <span className="text-xs text-neutral-400 font-mono">RxNorm / NLM Synced</span>
            </div>

            {isLoading ? (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-8 text-center">
                <div className="w-8 h-8 border-3 border-[#00685f] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-xs text-neutral-500 font-medium">Querying DailyMed index...</p>
              </div>
            ) : medicines.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-neutral-300 p-8 text-center">
                <p className="text-sm font-semibold text-neutral-700 mb-1">No monographs matched</p>
                <p className="text-xs text-neutral-500 mb-4">Try searching "paracetamol", "amoxicillin", or reset filter.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('all');
                  }}
                  className="text-xs text-[#00685f] font-semibold hover:underline cursor-pointer"
                >
                  Reset Search Criteria
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {medicines.map((med) => {
                  const isSelected = selectedMedicine?.rxcui === med.rxcui;
                  return (
                    <button
                      key={med.rxcui}
                      onClick={() => setSelectedMedicine(med)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#00685f] shadow-md ring-2 ring-[#00685f]/15'
                          : 'bg-white hover:bg-neutral-50/80 border-neutral-200/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#00685f]">
                          {med.genericName}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            med.legalStatus === 'OTC'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}
                        >
                          {med.legalStatus}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 font-medium mb-2">
                        {med.clinicalClass}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {med.brandNames.slice(0, 3).map((brand, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-600"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Active Drug Monograph Specification */}
          <div className="lg:col-span-8">
            {selectedMedicine ? (
              <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden">
                {/* Monograph Header */}
                <div className="p-6 sm:p-8 bg-gradient-to-r from-neutral-50 to-[#eef8f6] border-b border-neutral-200/80">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#00685f] text-white">
                        {selectedMedicine.legalStatus} Monograph
                      </span>
                      <span className="text-xs font-mono text-neutral-500">
                        RxCUI: {selectedMedicine.rxcui} • ATC: {selectedMedicine.atcCode}
                      </span>
                    </div>
                    {selectedMedicine.sourceRegistries?.[0] && (
                      <a
                        href={selectedMedicine.sourceRegistries[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00685f] hover:text-[#005149] hover:underline"
                      >
                        <span>{selectedMedicine.sourceRegistries[0].title}</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00201c]">
                    {selectedMedicine.genericName}
                    {selectedMedicine.usSynonym && (
                      <span className="text-lg font-normal text-neutral-500 ml-2">
                        ({selectedMedicine.usSynonym})
                      </span>
                    )}
                  </h2>
                  <p className="text-sm font-semibold text-[#00685f] mt-1">
                    Therapeutic Class: {selectedMedicine.clinicalClass}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 items-center text-xs text-neutral-600">
                    <span className="font-semibold text-neutral-700">Common Brand Names:</span>
                    {selectedMedicine.brandNames.map((brand, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white border border-neutral-200 rounded-md font-medium text-neutral-800"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Monograph Body */}
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Indications & Primary Purpose */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00685f]"></span>
                      Clinical Description & Approved Indications
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 font-medium mb-3">
                      {selectedMedicine.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMedicine.regulatedIndications.map((ind, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#e6f4f1] text-[#00685f] rounded-lg text-xs font-semibold"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Critical Daily Ceilings & Dosage Thresholds */}
                  <div className="p-5 rounded-xl border border-red-200 bg-red-50/50">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-1.5 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Maximum Daily Ceiling Dose & Toxicity Threshold
                    </h4>
                    <p className="text-sm font-bold text-red-950 leading-relaxed">
                      {selectedMedicine.criticalDoseThreshold}
                    </p>
                    {selectedMedicine.emergencyToxicology && (
                      <div className="mt-3 pt-3 border-t border-red-200/70 text-xs text-red-900 space-y-1">
                        <div><strong>Antidote / Reversal:</strong> {selectedMedicine.emergencyToxicology.antidote}</div>
                        <div><strong>Mechanism:</strong> {selectedMedicine.emergencyToxicology.mechanism}</div>
                      </div>
                    )}
                  </div>

                  {/* Contraindications & High-Risk Groups */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Absolute & Relative Contraindications
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedMedicine.absoluteContraindications.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-lg border border-neutral-200/80 bg-neutral-50/50 text-xs text-neutral-700 font-medium"
                        >
                          <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Significant Drug Interactions */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Notable Drug-Drug & Substance Interactions
                    </h3>
                    <div className="space-y-2">
                      {selectedMedicine.drugInteractions.map((interact, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200 bg-white text-xs text-neutral-700"
                        >
                          <span
                            className={`px-2 py-0.5 rounded font-semibold uppercase text-[10px] shrink-0 ${
                              interact.riskLevel === 'Overdose Hazard' || interact.riskLevel === 'High'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {interact.riskLevel}
                          </span>
                          <div className="flex-1">
                            <strong className="text-neutral-900">{interact.substance}:</strong> {interact.effect}
                            <span className="text-[10px] text-neutral-400 ml-2 font-mono">({interact.source})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pediatric Guidance */}
                  {selectedMedicine.pediatricGuidance && (
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                        Pediatric & Age-Specific Caution
                      </h4>
                      <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                        {selectedMedicine.pediatricGuidance}
                      </p>
                    </div>
                  )}

                  {/* Provenance & Citation Metadata */}
                  <div className="p-4 rounded-xl bg-neutral-100/80 border border-neutral-200/70 text-xs text-neutral-600 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-neutral-800">Evidence Standard:</span> {selectedMedicine.evidenceStandard}
                      <span className="mx-2">•</span>
                      <span>Last Revision: {selectedMedicine.lastRevision}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono">
                      RxNorm RxCUI: {selectedMedicine.rxcui}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center text-neutral-500">
                Select a medication from the directory to view its clinical monograph.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
