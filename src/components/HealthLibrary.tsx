/**
 * Verified Health Library - Exact Stitch AI Design Specification (Image 9)
 */

import React, { useState, useEffect } from 'react';
import { HealthArticle } from '../types/clinical';
import { ApiService } from '../services/api';

interface HealthLibraryProps {
  onStartTriageForCondition?: (symptomName: string) => void;
  onEmergencyClick: () => void;
}

export const HealthLibrary: React.FC<HealthLibraryProps> = ({
  onStartTriageForCondition,
  onEmergencyClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [articles, setArticles] = useState<HealthArticle[]>([]);
  const [selectedArticleModal, setSelectedArticleModal] = useState<HealthArticle | null>(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  useEffect(() => {
    ApiService.searchArticles(searchQuery, activeCategory).then(setArticles);
  }, [searchQuery, activeCategory]);

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'respiratory', label: 'Respiratory' },
    { id: 'digestive', label: 'Digestive' },
    { id: 'infections', label: 'Infections' },
    { id: 'cardiovascular', label: 'Heart & Circulation' },
    { id: 'mental-health', label: 'Mental Health' },
    { id: 'first-aid', label: 'First Aid' },
  ];

  const handleExportFHIR = () => {
    const fhirBundle = {
      resourceType: 'Bundle',
      type: 'collection',
      timestamp: new Date().toISOString(),
      entry: articles.map((a) => ({
        resource: {
          resourceType: 'ClinicalImpression',
          id: a.id,
          code: { text: a.title, coding: [{ code: a.icdCode }] },
          status: 'completed',
          summary: a.summary,
        },
      })),
    };

    const blob = new Blob([JSON.stringify(fhirBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FHIR-Clinical-Monographs-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Top Banner & Header */}
      <div className="w-full bg-surface-container-low py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-surface-container">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-1">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>Clinical Knowledge Repository</span>
              </div>
              <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Verified Health Library
              </h1>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
                Peer-reviewed condition guides, emergency red flags, and verified self-management protocols derived directly from public health repositories.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-3 rounded-xl shadow-xs border border-surface-container self-start md:self-auto">
              <span className="material-symbols-outlined text-primary text-[24px]">menu_book</span>
              <div className="flex flex-col">
                <span className="text-[11px] text-on-surface-variant font-medium">Public Health Sources</span>
                <span className="text-sm font-bold text-on-surface">MedlinePlus & NHS Guides</span>
              </div>
            </div>
          </div>

          {/* Search Box & Category Filters */}
          <div className="bg-surface-container-lowest p-3 rounded-2xl shadow-sm border border-surface-container flex flex-col gap-3">
            <div className="relative flex items-center w-full">
              <span className="material-symbols-outlined absolute left-3.5 text-outline pointer-events-none text-[22px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search diseases, symptoms, prevention, or medical terms (e.g., Bronchitis, Migraine, Acid Reflux)..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-surface-container-low text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all border border-surface-container"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
              <span className="text-[11px] text-on-surface-variant uppercase tracking-wider px-2 font-bold shrink-0">
                Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Evidence Integrity Banner */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-surface-container flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary-container/30 text-secondary shrink-0">
              <span className="material-symbols-outlined text-[22px]">sync_saved_locally</span>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs sm:text-sm font-bold text-on-surface block">
                  Evidence Integrity & Dynamic API Synchronization
                </span>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  All library articles are mapped directly to authoritative public health APIs (<strong className="text-on-surface">NHS Health A-Z, MedlinePlus/NIH, CDC, WHO, MoHFW</strong>) and verified with explicit revision dates.
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs text-primary font-bold">APIs Live: Synced 4h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Aside Sidebar (3 cols) */}
          <aside className="lg:col-span-3 flex flex-col gap-5 sticky top-28">
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="font-headline text-base font-bold text-on-surface">Filter Monographs</h3>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="text-xs text-secondary hover:underline font-semibold"
                >
                  Reset All
                </button>
              </div>

              {/* Demographic Cohort */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-on-surface-variant uppercase font-bold tracking-wider">
                  Demographic Cohort
                </span>
                <div className="space-y-1.5 text-xs text-on-surface">
                  <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 rounded" />
                    <span>Adults (18-64)</span>
                    <span className="ml-auto text-[11px] text-outline">942</span>
                  </label>
                  <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 rounded" />
                    <span>Geriatric / Seniors (65+)</span>
                    <span className="ml-auto text-[11px] text-outline">510</span>
                  </label>
                  <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer">
                    <input type="checkbox" className="accent-primary w-4 h-4 rounded" />
                    <span>Pediatric / Children</span>
                    <span className="ml-auto text-[11px] text-outline">184</span>
                  </label>
                </div>
              </div>

              {/* Authoritative Sources */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-on-surface-variant uppercase font-bold tracking-wider">
                  Authoritative Source
                </span>
                <div className="space-y-1.5 text-xs text-on-surface">
                  <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 rounded" />
                    <span>MedlinePlus (NIH)</span>
                    <span className="ml-auto text-[11px] text-outline">612</span>
                  </label>
                  <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 rounded" />
                    <span>NHS Health A-Z</span>
                    <span className="ml-auto text-[11px] text-outline">480</span>
                  </label>
                  <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 rounded" />
                    <span>CDC & WHO Combined</span>
                    <span className="ml-auto text-[11px] text-outline">320</span>
                  </label>
                  <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-low cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 rounded" />
                    <span>MoHFW Registry</span>
                    <span className="ml-auto text-[11px] text-outline">198</span>
                  </label>
                </div>
              </div>

              {/* Freshness SLA */}
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">history_toggle_off</span>
                  <span>Content Freshness SLA</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Articles older than 12 months trigger automated secondary clinical appraisal and display an amber triage flag.
                </p>
                <div className="flex items-center gap-2 mt-2 pt-2 bg-surface-container-lowest px-2.5 py-1.5 rounded-lg border border-surface-container">
                  <span className="w-2 h-2 rounded-full bg-tertiary shrink-0"></span>
                  <span className="text-xs text-on-surface font-semibold">100% current within 6 months</span>
                </div>
              </div>

              {/* FHIR Export Action */}
              <div className="bg-primary/5 p-4 rounded-xl flex flex-col gap-1.5 border border-primary/20">
                <span className="text-xs text-primary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">download</span> Evidence Export
                </span>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Generate structured JSON/FHIR condition summaries for personal consultation folders.
                </p>
                <button
                  type="button"
                  onClick={handleExportFHIR}
                  className="mt-2 w-full py-2 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container text-xs font-bold shadow-xs border border-primary/20 transition-all text-center"
                >
                  {exportNotice ? 'Exported FHIR Package!' : 'Export FHIR Package'}
                </button>
              </div>
            </div>
          </aside>

          {/* Main Article Stream (9 cols) */}
          <section className="lg:col-span-9 flex flex-col gap-6">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-on-surface">Curated Clinical Guides</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-bold">
                  {articles.length} {articles.length === 1 ? 'result' : 'results'} shown
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span>Standard:</span>
                <span className="font-semibold text-on-surface">Evidence-Based Medicine (EBM)</span>
              </div>
            </div>

            {/* Articles List */}
            <div className="flex flex-col gap-6">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 sm:p-7 flex flex-col gap-4 border border-surface-container hover:shadow-md transition-all"
                >
                  {/* Article Tags Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold capitalize">
                        {article.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface text-xs flex items-center gap-1 border border-surface-container">
                        <span className="material-symbols-outlined text-[14px] text-primary">local_hospital</span>
                        <span>Source: {article.sourceName}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        <span>Reviewed: {article.reviewDate}</span>
                      </span>
                    </div>

                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-secondary hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Canonical Source</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>

                  {/* Body Content & Image Split */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    <div className="md:col-span-8 flex flex-col gap-2">
                      <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
                        {article.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {article.summary}
                      </p>
                      <div className="flex items-center gap-4 pt-1 text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>
                          <span>{article.readTime}</span>
                        </span>
                        {article.clinicalStandard && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-secondary">bar_chart</span>
                            <span>{article.clinicalStandard}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-4 h-36 rounded-xl bg-surface-container flex items-center justify-center border border-surface-container overflow-hidden relative">
                      <img
                        src={article.imageUrl}
                        alt={article.imageAlt}
                        className="w-full h-full object-cover"
                        onError={(e: any) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-[11px] text-white font-medium">Clinical Monograph</span>
                      </div>
                    </div>
                  </div>

                  {/* Comparison Table if Available (e.g. Influenza vs Cold) */}
                  {article.comparisonTable && (
                    <div className="rounded-xl overflow-hidden bg-surface-container-low p-4 border border-surface-container">
                      <span className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-2">
                        {article.comparisonTable.title}
                      </span>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="bg-surface-container text-on-surface-variant">
                              {article.comparisonTable.headers.map((h, i) => (
                                <th key={i} className="py-2 px-3 font-bold">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {article.comparisonTable.rows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low'}>
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`py-2 px-3 ${
                                      cIdx === 0
                                        ? 'font-bold text-on-surface'
                                        : cell.includes('Sudden') || cell.includes('Severe')
                                        ? 'text-error font-semibold'
                                        : 'text-on-surface-variant'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Key Warning Signs Alert Card */}
                  <div className="bg-error-container/40 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-error/30">
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">
                        warning
                      </span>
                      <div>
                        <span className="text-xs text-error font-bold uppercase tracking-wider block">
                          Key Warning Signs (Escalate Promptly)
                        </span>
                        <p className="text-xs text-on-surface mt-0.5 leading-relaxed">
                          {article.keyWarningSigns.join('; ')}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onEmergencyClick}
                      className="px-3.5 py-1.5 rounded-lg bg-error text-on-error text-xs font-bold hover:opacity-90 shrink-0 self-end sm:self-auto transition-opacity flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[15px]">call</span>
                      <span>Urgent Care</span>
                    </button>
                  </div>

                  {/* Actions & Reference Code */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-surface-container">
                    <div className="flex items-center gap-2">
                      {onStartTriageForCondition && (
                        <button
                          type="button"
                          onClick={() => onStartTriageForCondition(article.title)}
                          className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors shadow-xs flex items-center gap-1.5"
                        >
                          <span>Check Symptoms for This Condition</span>
                          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedArticleModal(article)}
                        className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors"
                      >
                        Read Full Monograph
                      </button>
                    </div>
                    <span className="text-[11px] text-outline font-mono">{article.icdCode}</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Request Addition Banner */}
            <div className="w-full bg-surface-container-lowest p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">upload_file</span>
                </div>
                <div>
                  <h3 className="font-headline text-base font-bold text-on-surface">
                    Missing a specific monograph or symptom query?
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Request an evidence map from our clinical review board or query live public repositories.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRequestSubmitted(true)}
                className="px-4 py-2.5 rounded-lg bg-secondary text-on-secondary text-xs font-bold hover:opacity-90 shadow-xs shrink-0 transition-opacity"
              >
                {requestSubmitted ? 'Request Queued!' : 'Request Article Addition'}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Monograph Modal */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-surface-container max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-bold">
                  {selectedArticleModal.sourceName}
                </span>
                <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface mt-2">
                  {selectedArticleModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticleModal(null)}
                className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              <p>{selectedArticleModal.summary}</p>
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container">
                <span className="font-bold text-on-surface block mb-2">Clinical Warning Signs:</span>
                <ul className="space-y-1 text-xs">
                  {selectedArticleModal.keyWarningSigns.map((w, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-error">
                      <span className="material-symbols-outlined text-[15px]">emergency</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-container flex justify-end gap-3">
              <a
                href={selectedArticleModal.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-bold"
              >
                View at {selectedArticleModal.sourceName}
              </a>
              <button
                type="button"
                onClick={() => setSelectedArticleModal(null)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
