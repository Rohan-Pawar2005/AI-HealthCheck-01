/**
 * Clinical Data Models & FHIR-aligned Triage Types
 * AI HealthCheck - Evidence-Informed Clinical Decision Support
 */

export type TriageUrgencyLevel =
  | 'LEVEL_1_SELF_CARE'
  | 'LEVEL_2_ROUTINE_CARE'
  | 'LEVEL_3_URGENT_CARE'
  | 'LEVEL_4_EMERGENCY';

export interface SymptomOntology {
  id: string;
  name: string;
  commonName: string;
  snomedCode?: string;
  icd11Code?: string;
  category: 'respiratory' | 'systemic' | 'ent' | 'gastrointestinal' | 'neurological' | 'musculoskeletal';
  isRedFlagTrigger?: boolean;
  redFlagReason?: string;
}

export interface AssessmentInput {
  id?: string;
  patientAge: number;
  patientGender?: 'female' | 'male' | 'other' | 'undisclosed';
  jurisdiction: string; // e.g. "IND" (India), "USA", "GBR", "GLOBAL"
  symptoms: string[]; // Symptom IDs
  symptomDuration: 'today' | 'yesterday' | '3days' | 'week' | 'chronic';
  progressionPace: 'sudden' | 'gradual' | 'improving' | 'fluctuating';
  painSeverity: number; // 1 to 10
  associatedSymptoms: string[]; // e.g. ["dysphagia_liquids", "swollen_lymph_nodes"]
  knownAllergies: string[]; // e.g. ["PENICILLIN_CLASS", "SULFA"]
  currentMedicines: string[];
  existingConditions: string[];
  isPregnant?: boolean;
  freeTextDescription?: string;
  hasCough?: boolean;
  hasCentorFever?: boolean;
  hasCentorExudate?: boolean;
  hasCentorTenderNodes?: boolean;
  consentAccepted: boolean;
  createdAt?: string;
}

export interface MatchedEvidence {
  matchedReported: string[];
  absentRedFlags: string[];
}

export interface PossibleCondition {
  id: string;
  rank: number;
  conditionName: string;
  icd10Code: string;
  icd11Code?: string;
  matchTier: 'HIGH_OVERLAP' | 'MODERATE_OVERLAP' | 'ALTERNATIVE_CONSIDERATION';
  matchTierLabel: string;
  clinicalExplanation: string;
  matchedEvidence: MatchedEvidence;
  sourceReference: {
    sourceName: string;
    refId: string;
    canonicalUrl: string;
    reviewDate: string;
    clinicalStandard?: string;
  };
}

export interface SelfCareProtocol {
  title: string;
  measures: Array<{
    title: string;
    instruction: string;
  }>;
  sourceAttribution: string;
}

export interface EscalationCriteria {
  warningPoints: Array<{
    title: string;
    description: string;
  }>;
  emergencyContactNotice: string;
}

export interface EducationalMedicineRef {
  genericName: string;
  brandNames: string[];
  atcCode: string;
  legalStatus: 'OTC' | 'Rx' | 'WHO_ESSENTIAL';
  clinicalCategory: string;
  documentedUse: string;
  safetyWarning: string;
  contraindications: string[];
  allergyFlag?: string; // e.g., if user has penicillin allergy
  stewardshipNotice?: string;
  sourceAttribution: string;
}

export interface EmergencyRedFlagAlert {
  isEmergency: boolean;
  primaryTrigger: string;
  clinicalRationale: string;
  emergencyDirectives: Array<{
    step: number;
    title: string;
    description: string;
    rule: string;
  }>;
  whatNotToDo: Array<{
    title: string;
    description: string;
  }>;
  dispatchDirectory: Array<{
    dialNumber: string;
    label: string;
    region: string;
  }>;
}

export interface TriageAnalysisResult {
  triageId: string;
  timestamp: string;
  urgencyLevel: TriageUrgencyLevel;
  urgencyTitle: string;
  urgencyTimeline: string;
  preliminarySummary: string;
  clinicalReadout: string;
  possibleConditions: PossibleCondition[];
  selfCareProtocol: SelfCareProtocol;
  escalationCriteria: EscalationCriteria;
  medicineReferences: EducationalMedicineRef[];
  allergyAlerts: string[];
  emergencyAlert?: EmergencyRedFlagAlert;
  recoveryTimeline: Array<{
    phase: string;
    title: string;
    description: string;
    status: 'completed' | 'active' | 'upcoming';
  }>;
  clinicalLimitations: {
    governanceNotice: string;
    schemaContract: string;
    auditDate: string;
  };
}

export interface HealthArticle {
  id: string;
  slug: string;
  title: string;
  category: 'respiratory' | 'infections' | 'digestive' | 'cardiovascular' | 'mental-health' | 'first-aid';
  sourceName: string;
  sourceUrl: string;
  reviewDate: string;
  readTime: string;
  clinicalStandard?: string;
  icdCode: string;
  summary: string;
  fullBody?: string;
  keyWarningSigns: string[];
  imageAlt: string;
  imageUrl: string;
  comparisonTable?: {
    title: string;
    headers: string[];
    rows: Array<string[]>;
  };
}

export interface MedicineMonograph {
  rxcui: number;
  genericName: string;
  brandNames: string[];
  usSynonym?: string;
  atcCode: string;
  legalStatus: 'OTC' | 'Rx' | 'WHO_ESSENTIAL';
  clinicalClass: string;
  description: string;
  evidenceStandard: string;
  lastRevision: string;
  criticalDoseThreshold: string;
  regulatedIndications: string[];
  absoluteContraindications: string[];
  metabolism: {
    pathways: Array<{ name: string; percentage: number; note: string; color: string }>;
    description: string;
  };
  drugInteractions: Array<{
    substance: string;
    riskLevel: 'High' | 'Moderate' | 'Overdose Hazard';
    effect: string;
    source: string;
  }>;
  pediatricGuidance: string;
  regionalDifferences: Array<{
    region: string;
    regulatoryBody: string;
    monographDetails: string;
  }>;
  emergencyToxicology?: {
    triggerDose: string;
    antidote: string;
    mechanism: string;
    emergencyCall: string;
  };
  sourceRegistries: Array<{
    title: string;
    url: string;
  }>;
}
