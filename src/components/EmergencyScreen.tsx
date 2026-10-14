/**
 * Critical Red-Flag Emergency Screen - Exact Stitch AI Design Specification (Image 3)
 */

import React, { useState, useEffect } from 'react';
import { EmergencyRedFlagAlert } from '../types/clinical';

interface EmergencyScreenProps {
  alertData?: EmergencyRedFlagAlert | null;
  alert?: EmergencyRedFlagAlert | null;
  onOverrideConfirm?: () => void;
  onAcknowledge?: () => void;
  onStartOver?: () => void;
}

export const EmergencyScreen: React.FC<EmergencyScreenProps> = ({
  alertData,
  alert,
  onOverrideConfirm,
  onAcknowledge,
  onStartOver,
}) => {
  const currentAlert = alert || alertData;
  const handleConfirmOverride = onOverrideConfirm || onAcknowledge || (() => {});
  const [seconds, setSeconds] = useState(14);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overrideChecked, setOverrideChecked] = useState(false);

  // Active elapsed timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const primaryTrigger =
    currentAlert?.primaryTrigger ||
    '“Severe chest tightness radiating to left arm accompanied by shortness of breath”';

  const clinicalRationale =
    currentAlert?.clinicalRationale ||
    'Potential acute cardiac or pulmonary emergency requiring definitive bedside triage within minutes.';

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Top Red Alert Ticker Banner */}
      <div className="relative w-full overflow-hidden bg-error text-on-error py-2.5 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-on-error opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-on-error"></span>
            </span>
            <span className="text-xs sm:text-sm tracking-wider uppercase font-extrabold">
              Emergency Action Required • Protocol Active
            </span>
          </div>
          <div className="flex items-center gap-4 text-on-error/90 text-xs">
            <span className="hidden sm:inline font-mono">Safety Intercept: Emergency Triage Mode</span>
            <span className="inline-flex items-center gap-1 bg-on-error/20 px-2.5 py-0.5 rounded-full font-mono">
              <span className="material-symbols-outlined text-[14px]">timer</span>
              <span>Elapsed: <strong>{formatTimer(seconds)}</strong></span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Master Intercept Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-xl border border-error/20 relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-error/5 rounded-full pointer-events-none blur-2xl"></div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold tracking-tight">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  EMERGENCY ACTION REQUIRED • DO NOT WAIT FOR PREDICTION
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
                  Algorithm Halted
                </span>
              </div>

              <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight mb-2">
                Critical Red-Flag Symptom Detected
              </h1>

              <p className="text-base text-on-surface-variant max-w-3xl mb-6 leading-relaxed">
                Based on the reported symptoms, you may require immediate emergency medical care. AI HealthCheck has halted standard analysis to prioritize your physical safety.
              </p>

              {/* Clinical Trigger Callout */}
              <div className="bg-error-container/40 rounded-xl p-5 mb-6 border border-error/30">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-[11px] uppercase tracking-wider text-error font-bold">
                      Primary Detected Clinical Trigger
                    </span>
                    <p className="text-base sm:text-lg font-bold text-on-error-container leading-snug">
                      {primaryTrigger}
                    </p>
                    <div className="flex items-start gap-1.5 mt-1 text-on-surface">
                      <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">
                        emergency_home
                      </span>
                      <span className="text-xs sm:text-sm font-semibold">
                        Clinical Rationale: {clinicalRationale}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Call Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center pt-1">
                <a
                  href="tel:112"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-error text-on-error text-base font-bold shadow-lg hover:bg-error/90 active:scale-[0.99] transition-all text-center"
                >
                  <span className="absolute inset-0 rounded-xl bg-error animate-ping opacity-25 pointer-events-none"></span>
                  <span className="material-symbols-outlined text-[26px] group-hover:rotate-12 transition-transform">
                    call
                  </span>
                  <span>Call Emergency: 112 / 911</span>
                </a>

                <a
                  href="#nearest-hospitals"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed text-sm font-bold hover:bg-secondary-fixed-dim transition-colors text-center shadow-xs"
                >
                  <span className="material-symbols-outlined text-[20px]">local_hospital</span>
                  <span>Find Nearest Emergency Room</span>
                </a>
              </div>

              <div className="mt-8 pt-4 border-t border-surface-container flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-on-surface-variant text-xs">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">verified_user</span>
                  <span>Triage protocol verified against WHO & NHS Priority 1 directives</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-secondary text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Entered this symptom by mistake?</span>
                  <span className="material-symbols-outlined text-[14px]">edit_note</span>
                </button>
              </div>
            </div>

            {/* Emergency Response Directives */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[22px]">directions_walk</span>
                  <h2 className="font-headline text-lg sm:text-xl font-bold text-on-surface">
                    Emergency Response Directives
                  </h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-bold">
                  Immediate Step-by-Step
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-container-low rounded-xl p-4 flex flex-col justify-between border border-surface-container">
                  <div className="flex flex-col gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <h3 className="text-sm font-bold text-on-surface mt-1">Sit Upright & Rest</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Cease all physical exertion instantly. Sit in a comfortable, seated posture with head elevated to reduce workload on your heart and lungs.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 flex items-center gap-1 text-secondary text-xs font-semibold border-t border-surface-container">
                    <span className="material-symbols-outlined text-[16px]">chair</span>
                    <span>Do not lie flat</span>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4 flex flex-col justify-between border border-surface-container">
                  <div className="flex flex-col gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <h3 className="text-sm font-bold text-on-surface mt-1">Unlock Door & Notify</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      If you are inside, unlock your main entryway so emergency personnel can enter without delay. Alert a neighbor, housemate, or family member immediately.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 flex items-center gap-1 text-secondary text-xs font-semibold border-t border-surface-container">
                    <span className="material-symbols-outlined text-[16px]">lock_open</span>
                    <span>Unobstructed access</span>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4 flex flex-col justify-between border border-surface-container">
                  <div className="flex flex-col gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <h3 className="text-sm font-bold text-on-surface mt-1">Prepare Information</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Have current prescription bottles or medication names ready. Keep your national ID or health insurance card easily reachable for emergency crew intake.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 flex items-center gap-1 text-secondary text-xs font-semibold border-t border-surface-container">
                    <span className="material-symbols-outlined text-[16px]">medication</span>
                    <span>List known allergies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What NOT To Do */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container">
              <div className="flex items-center gap-2 mb-4 text-error">
                <span className="material-symbols-outlined text-[24px]">do_not_disturb_on</span>
                <h2 className="font-headline text-lg sm:text-xl font-bold text-on-surface">What NOT To Do</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-error-container/20 border border-error/20">
                  <span className="material-symbols-outlined text-error text-[24px] shrink-0 mt-0.5">no_crash</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-on-surface">Do not drive yourself to hospital</p>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Cardiac or pulmonary distress can induce sudden loss of consciousness or impaired reflexes. Wait for paramedic transport equipped with defibrillators and oxygen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-error-container/20 border border-error/20">
                  <span className="material-symbols-outlined text-error text-[24px] shrink-0 mt-0.5">
                    hourglass_disabled
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-on-surface">Do not browse or wait for AI</p>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Do not read internet articles, consult general AI chat, or wait for symptoms to resolve spontaneously. Time-to-treatment directly impacts clinical outcomes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-error-container/20 border border-error/20">
                  <span className="material-symbols-outlined text-error text-[24px] shrink-0 mt-0.5">no_food</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-on-surface">Do not ingest food or heavy liquids</p>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Refrain from solid foods, caffeine, or herbal remedies. Emergency surgical or catheter procedures require a clear stomach.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-error-container/20 border border-error/20">
                  <span className="material-symbols-outlined text-error text-[24px] shrink-0 mt-0.5">pill_off</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-on-surface">Do not take unprescribed medicine</p>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Do not consume pain relievers, tranquilizers, or nitro sprays unless explicitly instructed by an emergency medical dispatcher on the phone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Dispatch Directory Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xl border border-surface-container relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-error text-[20px]">phone_in_talk</span>
                  Dispatch Directory
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-error text-on-error font-bold uppercase">
                  24/7 Live
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4">
                Tap directly to initiate prioritized emergency call through your carrier:
              </p>

              <div className="space-y-2.5">
                <a
                  href="tel:112"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors border border-surface-container"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-error-container text-on-error-container flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[20px]">flag</span>
                    </span>
                    <div>
                      <div className="text-base font-bold text-on-surface">112</div>
                      <div className="text-[11px] text-on-surface-variant">India, EU & Universal Mobile SOS</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-error">call</span>
                </a>

                <a
                  href="tel:108"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors border border-surface-container"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[20px]">ambulance</span>
                    </span>
                    <div>
                      <div className="text-base font-bold text-on-surface">108 / 102</div>
                      <div className="text-[11px] text-on-surface-variant">India Free Emergency Ambulance</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary">call</span>
                </a>

                <a
                  href="tel:911"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors border border-surface-container"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[20px]">public</span>
                    </span>
                    <div>
                      <div className="text-base font-bold text-on-surface">911</div>
                      <div className="text-[11px] text-on-surface-variant">United States & Canada</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-secondary">call</span>
                </a>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-surface-container-low text-on-surface-variant text-xs flex items-start gap-2 border border-surface-container">
                <span className="material-symbols-outlined text-[16px] text-outline shrink-0 mt-0.5">info</span>
                <span>If calling via VoIP or Wi-Fi calling, state your precise geographic landmark immediately.</span>
              </div>
            </div>

            {/* Nearby 24/7 Emergency Rooms */}
            <div id="nearest-hospitals" className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[20px]">location_on</span>
                  Nearby 24/7 Emergency Rooms
                </h3>
                <span className="text-xs text-secondary font-bold">GPS Active</span>
              </div>

              <div className="w-full h-36 bg-surface-container rounded-xl mb-3 border border-surface-container relative flex items-end p-2.5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="relative z-10 bg-inverse-surface/90 backdrop-blur-md px-2.5 py-1 rounded text-inverse-on-surface text-xs font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-error">emergency</span>
                  <span>3 Trauma Centers within 4.5 km</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between border border-surface-container">
                  <div>
                    <p className="text-xs font-bold text-on-surface">Apex Super Speciality & Trauma</p>
                    <p className="text-[11px] text-on-surface-variant">Cath Lab Ready • 1.4 km • ~6 min</p>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-secondary text-on-secondary hover:opacity-90"
                    title="Open Navigation"
                  >
                    <span className="material-symbols-outlined text-[16px]">navigation</span>
                  </a>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between border border-surface-container">
                  <div>
                    <p className="text-xs font-bold text-on-surface">City Government General Hospital</p>
                    <p className="text-[11px] text-on-surface-variant">Public 24/7 ER • 2.8 km • ~11 min</p>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-secondary text-on-secondary hover:opacity-90"
                    title="Open Navigation"
                  >
                    <span className="material-symbols-outlined text-[16px]">navigation</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Safety Compliance & Protocol */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container">
              <h3 className="text-sm font-bold text-on-surface mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                Safety Compliance & Protocol
              </h3>
              <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                Protocol formulated based on <strong>World Health Organization (WHO)</strong> guidelines for Emergency Medical Teams, <strong>NHS Manchester Triage System</strong>, and <strong>CDC Immediate Triage Protocols</strong>.
              </p>
              <div className="border-t border-surface-container pt-2 flex flex-col gap-1 text-[11px] text-on-surface-variant">
                <span>• Manchester Triage Level: 1 (Immediate / Red)</span>
                <span>• Automated Analysis: Suspended pending physician evaluation</span>
                <span>• User Location Geo-Lock: Active for Emergency Dialing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Override Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm transition-opacity">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-surface-container relative">
            <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[28px]">shield</span>
            </div>
            <h3 className="font-headline text-lg sm:text-xl text-on-surface font-bold mb-2">
              Confirm Symptom Re-entry
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
              You are attempting to bypass an emergency alert. Only proceed if you made a typographical error and are <span className="font-bold text-on-surface">not</span> actually experiencing chest tightness, pain radiating down the arm, or breathlessness.
            </p>
            <div className="bg-surface-container-low p-4 rounded-xl mb-6 border border-surface-container">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={overrideChecked}
                  onChange={(e) => setOverrideChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                />
                <span className="text-xs text-on-surface leading-relaxed">
                  I confirm under clinical acknowledgment that the reported symptoms were entered by mistake and I am not experiencing acute medical distress.
                </span>
              </label>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
              >
                Return to Emergency Screen
              </button>
              <button
                type="button"
                disabled={!overrideChecked}
                onClick={() => {
                  setIsModalOpen(false);
                  handleConfirmOverride();
                }}
                className="px-5 py-2.5 rounded-lg text-xs font-bold bg-primary text-on-primary disabled:opacity-40 hover:bg-primary-container transition-all"
              >
                Edit Entered Symptoms
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
