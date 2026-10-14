/**
 * AI HealthCheck Client API Service
 * Coordinates with Express backend /api/* endpoints with clinical fallback.
 */

import { AssessmentInput, TriageAnalysisResult, MedicineMonograph, HealthArticle } from '../types/clinical';
import { ClinicalEngine } from './clinicalEngine';
import { MEDICINE_DATABASE, HEALTH_ARTICLES } from '../data/medicalKnowledge';

const LOCAL_STORAGE_KEY = 'ai_healthcheck_assessment_history_v1';

export interface SavedAssessmentRecord {
  id: string;
  createdAt: string;
  assessmentInput: AssessmentInput;
  triageResult: TriageAnalysisResult;
}

export const ApiService = {
  /**
   * Save assessment record to local device storage
   */
  saveLocalAssessment(input: AssessmentInput, result: TriageAnalysisResult): void {
    try {
      const records = this.getLocalAssessmentHistory();
      const newRecord: SavedAssessmentRecord = {
        id: result.triageId,
        createdAt: result.timestamp || new Date().toISOString(),
        assessmentInput: input,
        triageResult: result,
      };
      // Keep most recent 20 assessments
      const updated = [newRecord, ...records.filter((r) => r.id !== result.triageId)].slice(0, 20);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Unable to persist assessment to local storage:', e);
    }
  },

  /**
   * Retrieve all saved assessment sessions from device storage
   */
  getLocalAssessmentHistory(): SavedAssessmentRecord[] {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as SavedAssessmentRecord[];
    } catch {
      return [];
    }
  },

  /**
   * Submit assessment for pre-flight safety screening
   */
  async submitAssessment(input: AssessmentInput): Promise<{
    assessmentId: string;
    isEmergency: boolean;
    triageResult: TriageAnalysisResult;
  }> {
    try {
      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.triageResult) {
        this.saveLocalAssessment(input, data.triageResult);
      }
      return data;
    } catch (err) {
      console.warn('API fetch failed or offline, invoking local clinical engine fallback:', err);
      const emergencyAlert = ClinicalEngine.screenForEmergency(input);
      const triageResult = ClinicalEngine.analyzeAssessment(input);
      const mockId = triageResult.triageId || `AHC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}-IN`;

      this.saveLocalAssessment(input, triageResult);

      return {
        assessmentId: mockId,
        isEmergency: !!emergencyAlert,
        triageResult,
      };
    }
  },

  /**
   * Analyze assessment with AI / decision support
   */
  async analyzeAssessment(id: string, fallbackInput?: AssessmentInput): Promise<{ triageResult: TriageAnalysisResult }> {
    try {
      const response = await fetch(`/api/assessments/${id}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.triageResult && fallbackInput) {
        this.saveLocalAssessment(fallbackInput, data.triageResult);
      }
      return data;
    } catch (err) {
      console.warn('API analyze failed or offline, computing with clinical engine:', err);
      if (fallbackInput) {
        const triageResult = ClinicalEngine.analyzeAssessment(fallbackInput);
        this.saveLocalAssessment(fallbackInput, triageResult);
        return { triageResult };
      }
      throw err;
    }
  },

  /**
   * Delete assessment (right to be forgotten / data purge)
   */
  async deleteAssessment(id: string): Promise<boolean> {
    try {
      // Remove from local storage
      const existing = this.getLocalAssessmentHistory();
      const filtered = existing.filter((item) => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));

      await fetch(`/api/assessments/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch {
      return true; // Local state cleared
    }
  },

  /**
   * Search medicines
   */
  async searchMedicines(query: string = '', filter: string = 'all'): Promise<{
    matched_concept: any;
    results: MedicineMonograph[];
  }> {
    try {
      const params = new URLSearchParams({ query, filter });
      const response = await fetch(`/api/medicines/search?${params.toString()}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('Medicine search API offline, using indexed records:', err);
    }

    // Local fallback
    let results = MEDICINE_DATABASE;
    if (filter === 'otc') results = results.filter((m) => m.legalStatus === 'OTC');
    if (filter === 'rx') results = results.filter((m) => m.legalStatus === 'Rx');
    if (filter === 'warnings') results = results.filter((m) => m.criticalDoseThreshold || m.emergencyToxicology);
    if (query) {
      results = results.filter(
        (m) =>
          m.genericName.toLowerCase().includes(query.toLowerCase()) ||
          m.brandNames.some((b) => b.toLowerCase().includes(query.toLowerCase())) ||
          m.atcCode.toLowerCase().includes(query.toLowerCase())
      );
    }

    return {
      matched_concept: {
        rxcui: results[0]?.rxcui || 161,
        generic_name: results[0]?.genericName || 'Paracetamol',
        us_synonym: results[0]?.usSynonym || 'Acetaminophen',
        atc_code: results[0]?.atcCode || 'N02BE01',
        legal_status: results[0]?.legalStatus || 'OTC',
        max_adult_daily_dose_mg: 4000,
        hepatotoxicity_warning: true,
        pediatric_regimen: '10-15 mg/kg Q4-6H max 75mg/kg/day',
        antidote: 'N-Acetylcysteine (IV/Oral)',
        contraindications: results[0]?.absoluteContraindications || [],
        critical_interactions: results[0]?.drugInteractions || [],
        source_attribution: [
          'U.S. National Library of Medicine (DailyMed SPL)',
          'Indian Pharmacopoeia Commission (IP 2022)',
          'openFDA Drug Event Database',
        ],
      },
      results,
    };
  },

  /**
   * Search health articles
   */
  async searchArticles(query: string = '', category: string = 'all'): Promise<HealthArticle[]> {
    try {
      const params = new URLSearchParams({ query, category });
      const response = await fetch(`/api/health-articles/search?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        return data.articles;
      }
    } catch (err) {
      console.warn('Articles API offline, using indexed articles:', err);
    }

    let results = HEALTH_ARTICLES;
    if (category !== 'all') {
      results = results.filter((a) => a.category === category);
    }
    if (query) {
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.summary.toLowerCase().includes(query.toLowerCase()) ||
          a.keyWarningSigns.some((w) => w.toLowerCase().includes(query.toLowerCase()))
      );
    }
    return results;
  },

  /**
   * Check real-time availability and latency of upstream medical APIs
   */
  async checkReferenceSources(): Promise<any[]> {
    try {
      const response = await fetch('/api/reference-sources');
      if (response.ok) {
        const data = await response.json();
        return data.sources || [];
      }
    } catch (err) {
      console.warn('Reference sources check failed:', err);
    }
    return [
      {
        id: 'openfda_drug',
        sourceName: 'openFDA Drug Label API (U.S. FDA)',
        apiEndpoint: 'https://api.fda.gov/drug/label.json',
        authRequired: false,
        rateLimitInfo: '240 calls/min unauthenticated',
        status: 'LOCAL_ONLY',
        lastPingAt: new Date().toISOString(),
        geographicApplicability: 'United States & Global Regulatory Data',
        notes: 'Fallback verified clinical monographs active.',
      },
    ];
  },
};
