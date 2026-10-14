/**
 * Assessment History Drawer / Modal
 * Allows patients to view previous triage sessions stored in device memory,
 * export reports, or purge records in accordance with medical privacy standards.
 */

import React, { useState, useEffect } from 'react';
import { TriageAnalysisResult, AssessmentInput } from '../types/clinical';
import { ApiService, SavedAssessmentRecord } from '../services/api';

interface AssessmentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAssessment: (result: TriageAnalysisResult, input?: AssessmentInput) => void;
}

export const AssessmentHistoryModal: React.FC<AssessmentHistoryModalProps> = ({
  isOpen,
  onClose,
  onSelectAssessment,
}) => {
  const [history, setHistory] = useState<SavedAssessmentRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  const loadHistory = () => {
    const list = ApiService.getLocalAssessmentHistory();
    setHistory(list);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this assessment record from your browser memory?')) {
      ApiService.deleteAssessment(id);
      loadHistory();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to permanently delete ALL saved assessment records on this device?')) {
      history.forEach((h) => ApiService.deleteAssessment(h.id));
      loadHistory();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-neutral-50 to-[#eef8f6] border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00685f]/10 text-[#00685f] flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#00201c]">Assessment History</h3>
              <p className="text-xs text-neutral-500">
                Encrypted local device storage • HIPAA De-Identified Sessions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-neutral-700">No Assessment Records Found</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Completed symptom assessments will appear here. No personal accounts or passwords required.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-500 pb-2 border-b border-neutral-100">
                <span>{history.length} Saved Assessment Session(s)</span>
                <button
                  onClick={handleClearAll}
                  className="text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                >
                  Purge All History
                </button>
              </div>

              {history.map((record) => (
                <div
                  key={record.id}
                  onClick={() => {
                    onSelectAssessment(record.triageResult, record.assessmentInput);
                    onClose();
                  }}
                  className="p-4 rounded-xl border border-neutral-200/90 hover:border-[#00685f] hover:shadow-xs transition-all cursor-pointer bg-white flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-900 group-hover:text-[#00685f]">
                        {record.assessmentInput.symptoms?.join(', ') || 'General Assessment'}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          record.triageResult.urgencyLevel === 'LEVEL_4_EMERGENCY'
                            ? 'bg-red-100 text-red-700'
                            : record.triageResult.urgencyLevel === 'LEVEL_3_URGENT_CARE'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {record.triageResult.urgencyTitle || record.triageResult.urgencyLevel}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-500 flex items-center gap-2 font-mono">
                      <span>{new Date(record.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Age: {record.assessmentInput.patientAge}</span>
                      <span>•</span>
                      <span>{record.triageResult.possibleConditions?.length || 0} condition matches</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDelete(record.id, e)}
                      title="Delete record"
                      className="p-2 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <span className="text-[#00685f] text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                      View Report &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};
