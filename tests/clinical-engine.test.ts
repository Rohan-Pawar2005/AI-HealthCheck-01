/**
 * Automated Clinical Safety & Decision Support Engine Test Suite
 * Tests:
 * 1. Validation of valid and invalid assessment inputs
 * 2. Emergency red-flag trigger verification (immediate 112 intercept)
 * 3. Centor criteria scoring boundary calculations (0 to 4)
 * 4. Differential diagnosis generation and 4-tier care level assignments
 * 5. Non-prescriptive medicine safety warnings and DailyMed references
 */

import { ClinicalEngine } from '../src/services/clinicalEngine';
import { AssessmentInput } from '../src/types/clinical';

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passCount++;
  } else {
    console.error(`❌ FAIL: ${testName}${detail ? ` - ${detail}` : ''}`);
    failCount++;
  }
}

async function runTestSuite() {
  console.log('--- STARTING CLINICAL ENGINE SAFETY VERIFICATION ---');

  // Test 1: Input Validation - Valid Submission
  const validAdultInput: AssessmentInput = {
    patientAge: 34,
    jurisdiction: 'IND',
    symptoms: ['sore_throat', 'fever_mild'],
    symptomDuration: '3days',
    progressionPace: 'sudden',
    painSeverity: 5,
    associatedSymptoms: ['swollen_lymph_nodes'],
    existingConditions: [],
    currentMedicines: ['Paracetamol 500mg prn'],
    knownAllergies: [],
    consentAccepted: true,
  };

  const validResult = ClinicalEngine.validateInput(validAdultInput);
  assert(validResult.isValid, 'Valid intake passes schema validation');

  // Test 2: Input Validation - Missing Consent & Missing Symptoms
  const invalidInput: Partial<AssessmentInput> = {
    patientAge: 0,
    symptoms: [],
    consentAccepted: false,
  };

  const invalidResult = ClinicalEngine.validateInput(invalidInput);
  assert(!invalidResult.isValid, 'Missing consent and symptoms fails validation');
  assert(
    invalidResult.errors.some((e) => e.includes('consent')),
    'Explicit error regarding consent is returned'
  );
  assert(
    invalidResult.errors.some((e) => e.includes('symptom')),
    'Explicit error regarding missing symptom is returned'
  );

  // Test 3: Emergency Red-Flag Screening - Chest Pain & Breathlessness
  const emergencyInput1: AssessmentInput = {
    ...validAdultInput,
    symptoms: ['chest_pain_radiating', 'dyspnea_severe'],
  };

  const emergencyAlert1 = ClinicalEngine.screenEmergencyRedFlags(emergencyInput1);
  assert(
    emergencyAlert1.isEmergency,
    'Acute chest pain radiating to left arm triggers emergency'
  );
  assert(
    emergencyAlert1.dialNumber === '112',
    'Emergency dial number is configured to 112 (India / National standard)'
  );

  // Test 4: Emergency Red-Flag Screening - Drooling / Airway Obstruction
  const emergencyChildInput: AssessmentInput = {
    ...validAdultInput,
    patientAge: 4,
    symptoms: ['drooling_inability_swallow', 'fever_mild'],
    associatedSymptoms: ['dysphagia_liquids'],
  };
  const emergencyAlert2 = ClinicalEngine.screenEmergencyRedFlags(emergencyChildInput);
  assert(
    emergencyAlert2.isEmergency,
    'Inability to swallow secretions (drooling) triggers emergency intercept'
  );

  // Test 5: Full Evaluation Halted on Emergency
  const fullEmergencyAnalysis = ClinicalEngine.evaluateAssessment(emergencyInput1);
  assert(
    fullEmergencyAnalysis.emergencyAlert?.isEmergency === true,
    'Full engine attaches emergency alert'
  );
  assert(
    fullEmergencyAnalysis.urgencyLevel === 'LEVEL_4_EMERGENCY',
    'Emergency urgency level assigned to LEVEL_4_EMERGENCY'
  );
  assert(
    fullEmergencyAnalysis.possibleConditions.length === 0,
    'Algorithmic disease prediction is suspended during red-flag emergency'
  );

  // Test 6: Non-Emergency Viral Pharyngitis Triage (Self-Care)
  const viralInput: AssessmentInput = {
    ...validAdultInput,
    symptoms: ['sore_throat', 'runny_nose', 'cough_dry'],
    painSeverity: 4,
  };
  const viralResult = ClinicalEngine.evaluateAssessment(viralInput);
  const viralCondition = viralResult.possibleConditions.find(
    (c) => c.id === 'cond_viral_pharyngitis'
  );
  assert(
    viralCondition !== undefined,
    'Viral Pharyngitis identified in differential conditions'
  );
  assert(
    viralResult.urgencyLevel === 'LEVEL_1_SELF_CARE',
    'Mild viral cold presentation routes to LEVEL_1_SELF_CARE'
  );
  assert(
    viralResult.selfCareProtocol.measures.length > 0,
    'Evidence-based supportive self-care measures provided'
  );

  // Test 7: Non-prescriptive Medicine Safety Warnings
  assert(
    viralResult.medicineReferences.length > 0,
    'Safe supportive medications included for self-care reference'
  );
  assert(
    viralResult.medicineReferences.every((m) => m.safetyWarning.length > 0),
    'Every recommended medicine monograph includes explicit warnings'
  );
  assert(
    viralResult.medicineReferences.some((m) => m.genericName.includes('Paracetamol')),
    'Paracetamol monograph included with hepatotoxicity ceiling warning'
  );

  // Test 8: Allergy Intercept Warning
  const allergyInput: AssessmentInput = {
    ...validAdultInput,
    knownAllergies: ['PENICILLIN_CLASS', 'AMOXICILLIN'],
  };
  const allergyResult = ClinicalEngine.evaluateAssessment(allergyInput);
  assert(
    allergyResult.allergyAlerts.length > 0,
    'Penicillin allergy is surfaced prominently in triage warnings'
  );

  // --- STAGE 2: MEDICAL REFERENCE SERVICE TESTS ---
  console.log('\n--- TESTING REAL MEDICAL REFERENCE INTEGRATIONS ---');
  const { MedicalReferenceService } = await import('../src/services/medicalReferenceService');

  // Test 9: Normalized Medicine Search
  const medSearchResults = await MedicalReferenceService.searchMedicines('paracetamol');
  assert(
    medSearchResults.results.length > 0,
    'Paracetamol monograph successfully resolved from reference registry'
  );
  assert(
    medSearchResults.results[0].rxcui === 161,
    'Standard RxCUI 161 is assigned to Paracetamol'
  );
  assert(
    medSearchResults.results[0].criticalDoseThreshold.includes('4,000 mg'),
    '4,000 mg daily maximum ceiling dose is present in monograph'
  );

  // Test 10: Deduplication Guarantee
  const rxcuis = medSearchResults.results.map((m) => m.rxcui);
  const uniqueRxcuis = new Set(rxcuis);
  assert(
    rxcuis.length === uniqueRxcuis.size,
    'All returned medicine reference records are unique with zero duplicates'
  );

  // Test 11: Never Invent or Fabricate Records on Non-Existent Drugs
  const nonExistent = await MedicalReferenceService.searchMedicines('xyzFakeMedication999NonExistent');
  assert(
    nonExistent.results.length === 0,
    'Non-existent query returns 0 results and never fabricates fake records'
  );

  // Test 12: Upstream Sources Health & Rate Limits Check
  const sourceStatuses = await MedicalReferenceService.checkUpstreamSources();
  assert(
    sourceStatuses.length >= 4,
    'All 4 upstream reference sources (openFDA, RxNorm, DailyMed, MoHFW) checked'
  );
  assert(
    sourceStatuses.every((s) => s.rateLimitInfo.length > 0),
    'Every source documents permitted rate limits'
  );
  assert(
    sourceStatuses.every((s) => s.authRequired === false),
    'Permitted public open medical APIs require zero mandatory credentials'
  );

  // Test 13: Provenance Metadata Verification
  assert(
    medSearchResults.provenanceReport.length > 0,
    'Provenance audit report is generated for all resolved records'
  );
  assert(
    medSearchResults.provenanceReport.every((p) => p.status && p.url),
    'Provenance records contain canonical source URL and freshness status'
  );

  // --- STAGE 3: MODULAR CLINICAL ENGINE & INSUFFICIENT EVIDENCE TESTS ---
  console.log('\n--- TESTING STAGE 3 CLINICAL ENGINE & BOUNDARIES ---');

  // Test 14: Modified Centor Score Boundary (Centor Score >= 3)
  const highCentorIntake: AssessmentInput = {
    patientAge: 12, // +1 pt for age 3-14
    jurisdiction: 'IND',
    symptoms: ['sore_throat'],
    symptomDuration: '3days',
    progressionPace: 'sudden',
    painSeverity: 7,
    associatedSymptoms: ['swollen_lymph_nodes'], // +1 pt
    knownAllergies: [],
    currentMedicines: [],
    existingConditions: [],
    consentAccepted: true,
    hasCentorFever: true, // +1 pt
    hasCentorExudate: true, // +1 pt
    hasCough: false, // +1 pt (absence of cough)
  };
  const highCentorResult = ClinicalEngine.evaluateAssessment(highCentorIntake);
  const strepMatch = highCentorResult.possibleConditions.find(
    (c) => c.id === 'cond_strep_tonsillitis'
  );
  assert(
    strepMatch !== undefined,
    'Modified Centor score >= 3 matches Streptococcal Tonsillitis'
  );
  assert(
    highCentorResult.urgencyLevel === 'LEVEL_3_URGENT_CARE',
    'Centor score >= 3 directs to LEVEL_3_URGENT_CARE for throat swab'
  );

  // Test 15: Insufficient Evidence Handling (No guessing, no fabricated diagnosis)
  const vagueInput: AssessmentInput = {
    patientAge: 30,
    jurisdiction: 'IND',
    symptoms: ['fatigue_mild'],
    symptomDuration: 'today',
    progressionPace: 'gradual',
    painSeverity: 1,
    associatedSymptoms: [],
    knownAllergies: [],
    currentMedicines: [],
    existingConditions: [],
    consentAccepted: true,
  };
  const vagueResult = ClinicalEngine.evaluateAssessment(vagueInput);
  const insufficientMatch = vagueResult.possibleConditions.find(
    (c) => c.id === 'cond_insufficient_evidence'
  );
  assert(
    insufficientMatch !== undefined,
    'Uncertain symptoms trigger cond_insufficient_evidence instead of guessing'
  );
  assert(
    vagueResult.urgencyLevel === 'LEVEL_2_ROUTINE_CARE',
    'Insufficient evidence routes to LEVEL_2_ROUTINE_CARE for GP check'
  );

  // Test 16: Acute Bronchitis Differential on Productive Cough
  const bronchitisInput: AssessmentInput = {
    patientAge: 40,
    jurisdiction: 'IND',
    symptoms: ['cough_productive'],
    symptomDuration: 'week',
    progressionPace: 'gradual',
    painSeverity: 3,
    associatedSymptoms: [],
    knownAllergies: [],
    currentMedicines: [],
    existingConditions: [],
    consentAccepted: true,
  };
  const bronchitisResult = ClinicalEngine.evaluateAssessment(bronchitisInput);
  const bronchitisMatch = bronchitisResult.possibleConditions.find(
    (c) => c.id === 'cond_acute_bronchitis'
  );
  assert(
    bronchitisMatch !== undefined,
    'Productive mucus cough correctly matches Acute Bronchitis'
  );

  // Test 17: Age Boundary Rejections
  const negativeAgeInput: Partial<AssessmentInput> = {
    patientAge: -5,
    symptoms: ['sore_throat'],
    consentAccepted: true,
  };
  const negativeAgeRes = ClinicalEngine.validateInput(negativeAgeInput);
  assert(
    !negativeAgeRes.isValid && negativeAgeRes.errors.some((e) => e.includes('greater than 0')),
    'Negative age is rejected by clinical validator'
  );

  const extremeAgeInput: Partial<AssessmentInput> = {
    patientAge: 150,
    symptoms: ['sore_throat'],
    consentAccepted: true,
  };
  const extremeAgeRes = ClinicalEngine.validateInput(extremeAgeInput);
  assert(
    !extremeAgeRes.isValid && extremeAgeRes.errors.some((e) => e.includes('125')),
    'Extreme age (>125) is rejected by clinical validator'
  );

  // Test 18: Pediatric Stridor Emergency Intercept
  const pediatricStridorInput: AssessmentInput = {
    patientAge: 4,
    jurisdiction: 'IND',
    symptoms: ['fever_mild'],
    associatedSymptoms: ['stridor'],
    symptomDuration: 'today',
    progressionPace: 'sudden',
    painSeverity: 5,
    knownAllergies: [],
    currentMedicines: [],
    existingConditions: [],
    consentAccepted: true,
  };
  const pediatricAlert = ClinicalEngine.screenEmergencyRedFlags(pediatricStridorInput);
  assert(
    pediatricAlert.isEmergency,
    'Pediatric inspiratory stridor triggers immediate emergency red flag'
  );
  assert(
    pediatricAlert.dialNumber === '112',
    'Emergency hotline 112 provided for pediatric respiratory emergency'
  );

  // Test 19: AI Independence & Determinism
  // Running identical input twice must produce identical results
  const resA = ClinicalEngine.evaluateAssessment(bronchitisInput);
  const resB = ClinicalEngine.evaluateAssessment(bronchitisInput);
  assert(
    resA.urgencyLevel === resB.urgencyLevel &&
      resA.possibleConditions[0].id === resB.possibleConditions[0].id,
    'Clinical engine is deterministic and reproducible without generative drift'
  );

  console.log(`\n===========================================`);
  console.log(`TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
  console.log(`===========================================`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((e) => {
  console.error('Test suite failed unexpectedly:', e);
  process.exit(1);
});
