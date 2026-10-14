/**
 * AI HealthCheck - Main Application Entry & Routing
 * Conforming to Google Stitch AI design system, clinical governance rules, and emergency safety protocols.
 */

import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { SymptomChecker } from './components/SymptomChecker';
import { ResultsDashboard } from './components/ResultsDashboard';
import { EmergencyScreen } from './components/EmergencyScreen';
import { HealthLibrary } from './components/HealthLibrary';
import { MedicineInfo } from './components/MedicineInfo';
import { AboutAndSafety } from './components/AboutAndSafety';
import { AssessmentHistoryModal } from './components/AssessmentHistoryModal';
import { AssessmentInput, TriageAnalysisResult, EmergencyRedFlagAlert } from './types/clinical';
import { ApiService } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [assessmentInput, setAssessmentInput] = useState<AssessmentInput | null>(null);
  const [analysisResult, setAnalysisResult] = useState<TriageAnalysisResult | null>(null);
  const [emergencyAlert, setEmergencyAlert] = useState<EmergencyRedFlagAlert | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [prefilledSymptom, setPrefilledSymptom] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Navigate to a specific tab
  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch direct emergency mode (from 112 button or top banner)
  const handleTriggerEmergency = (customAlert?: EmergencyRedFlagAlert) => {
    const alertData: EmergencyRedFlagAlert = customAlert || {
      isEmergency: true,
      primaryTrigger: 'Immediate Emergency Assistance Requested',
      clinicalRationale: 'Direct emergency assistance was requested or a life-threatening symptom presentation was triggered.',
      emergencyDirectives: [
        {
          step: 1,
          title: 'Sit Upright & Rest',
          description: 'Cease physical exertion immediately. Sit in a comfortable, upright position.',
          rule: 'Do not lie flat',
        },
        {
          step: 2,
          title: 'Unlock Entry Door',
          description: 'Ensure paramedics or first responders can enter without obstruction.',
          rule: 'Unobstructed access',
        },
        {
          step: 3,
          title: 'Gather Medications',
          description: 'Have current prescriptions and known allergies ready for triage personnel.',
          rule: 'List known allergies',
        },
      ],
      whatNotToDo: [
        {
          title: 'Do not drive yourself to hospital',
          description: 'Wait for paramedic transport equipped with life-support tools and oxygen.',
        },
        {
          title: 'Do not delay to browse internet',
          description: 'Time-to-treatment directly impacts critical outcomes.',
        },
      ],
      dispatchDirectory: [
        { dialNumber: '112', label: 'India National Emergency / SOS', region: 'India' },
        { dialNumber: '108', label: 'India Free Emergency Ambulance', region: 'India' },
        { dialNumber: '911', label: 'United States & Canada', region: 'US / Canada' },
      ],
    };
    setEmergencyAlert(alertData);
    setActiveTab('home');
  };

  // Handle assessment submission from SymptomChecker
  const handleAssessmentComplete = async (input: AssessmentInput) => {
    setIsAnalyzing(true);
    setAssessmentInput(input);
    setErrorMessage(null);

    try {
      // 1. Submit intake to server / clinical engine
      const submitRes = await ApiService.submitAssessment(input);

      // 2. Clinical Emergency Gate
      if (submitRes.isEmergency && submitRes.triageResult.emergencyAlert) {
        setEmergencyAlert(submitRes.triageResult.emergencyAlert);
        setAnalysisResult(submitRes.triageResult);
        return;
      }

      // 3. Complete analysis
      setAnalysisResult(submitRes.triageResult);
      setEmergencyAlert(null);
      setActiveTab('symptom-checker');
    } catch (err: any) {
      console.error('Assessment analysis failed:', err);
      setErrorMessage(
        'An unexpected error occurred while analyzing the clinical intake. Safe offline fallback has been activated.'
      );
    } finally {
      setIsAnalyzing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Start assessment from Home page search input
  const handleAnalyzeFromHome = (symptomsText: string) => {
    setPrefilledSymptom(symptomsText);
    setAnalysisResult(null);
    setActiveTab('symptom-checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Re-open saved assessment from history
  const handleSelectHistoryAssessment = (result: TriageAnalysisResult, input?: AssessmentInput) => {
    setAnalysisResult(result);
    if (input) {
      setAssessmentInput(input);
    }
    setEmergencyAlert(result.emergencyAlert?.isEmergency ? result.emergencyAlert : null);
    setActiveTab('symptom-checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to new assessment
  const handleStartNewAssessment = () => {
    setAnalysisResult(null);
    setAssessmentInput(null);
    setEmergencyAlert(null);
    setPrefilledSymptom('');
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-neutral-800 antialiased selection:bg-[#00685f] selection:text-white">
      {/* Header */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onEmergencyClick={() => handleTriggerEmergency()}
      />

      {/* Global Error Banner if any */}
      {errorMessage && (
        <div className="bg-red-50 border-b border-red-200 p-4 text-center">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 text-xs font-semibold text-red-800">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-600 hover:text-red-900 font-bold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {/* Loading State during Analysis */}
        {isAnalyzing ? (
          <div className="flex-1 w-full min-h-[calc(100vh-4rem-3.5rem)] flex flex-col items-center justify-center px-4 py-16 bg-[#f8faf9]">
            <div className="max-w-md w-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-[#00685f]/20 border-t-[#00685f] animate-spin mb-4"></div>
              <h2 className="text-xl font-extrabold text-[#00201c] mb-2">Analyzing Symptoms...</h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                Evaluating reported symptoms against evidence-backed clinical protocols and checking safety precautions.
              </p>
              <div className="text-xs text-neutral-400 font-medium">Please wait a moment</div>
            </div>
          </div>
        ) : emergencyAlert && emergencyAlert.isEmergency ? (
          /* CRITICAL EMERGENCY OVERLAY / VIEW */
          <EmergencyScreen
            alert={emergencyAlert}
            onAcknowledge={() => setEmergencyAlert(null)}
            onStartOver={handleStartNewAssessment}
          />
        ) : activeTab === 'home' ? (
          <HomePage onAnalyze={handleAnalyzeFromHome} />
        ) : activeTab === 'symptom-checker' ? (
          analysisResult && assessmentInput ? (
            <ResultsDashboard
              result={analysisResult}
              assessmentInput={assessmentInput}
              onEditSymptoms={() => {
                setAnalysisResult(null);
                setActiveTab('symptom-checker');
              }}
              onStartNew={handleStartNewAssessment}
            />
          ) : (
            <SymptomChecker
              initialSymptomText={prefilledSymptom}
              onSubmit={handleAssessmentComplete}
              onEmergencyTrigger={() => handleTriggerEmergency()}
              onCancel={() => handleNavigate('home')}
              isSubmitting={isAnalyzing}
            />
          )
        ) : activeTab === 'health-library' ? (
          <HealthLibrary
            onStartTriageForCondition={(sym) => handleAnalyzeFromHome(sym)}
            onEmergencyClick={() => handleTriggerEmergency()}
          />
        ) : activeTab === 'medicine-information' ? (
          <MedicineInfo
            onNavigateToSymptomChecker={() => handleNavigate('symptom-checker')}
            onEmergencyClick={() => handleTriggerEmergency()}
          />
        ) : activeTab === 'about-and-safety' ? (
          <AboutAndSafety
            onNavigate={handleNavigate}
            onEmergencyClick={() => handleTriggerEmergency()}
          />
        ) : (
          <HomePage onAnalyze={handleAnalyzeFromHome} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onEmergencyClick={() => handleTriggerEmergency()}
      />

      {/* Assessment History Modal */}
      <AssessmentHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectAssessment={handleSelectHistoryAssessment}
      />
    </div>
  );
}
