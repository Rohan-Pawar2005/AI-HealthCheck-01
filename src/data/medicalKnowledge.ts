/**
 * Peer-Reviewed Clinical Reference Knowledge Graph
 * Sourced from MedlinePlus (NIH), NHS Health A-Z, WHO, CDC, DailyMed, openFDA & MoHFW (India)
 */

import { SymptomOntology, HealthArticle, MedicineMonograph } from '../types/clinical';

export const RECOGNIZED_SYMPTOMS: SymptomOntology[] = [
  {
    id: 'sore_throat',
    name: 'Sore throat',
    commonName: 'Pharyngalgia',
    snomedCode: '267102003',
    icd11Code: 'MD32',
    category: 'ent',
  },
  {
    id: 'fever_mild',
    name: 'Mild fever 100.4°F (38°C)',
    commonName: 'Pyrexia (Mild)',
    snomedCode: '386661006',
    icd11Code: 'MG26',
    category: 'systemic',
  },
  {
    id: 'cough_dry',
    name: 'Dry cough',
    commonName: 'Non-productive cough',
    snomedCode: '49727002',
    icd11Code: 'MD11.1',
    category: 'respiratory',
  },
  {
    id: 'cough_productive',
    name: 'Persistent productive cough',
    commonName: 'Productive phlegm cough',
    snomedCode: '284523002',
    icd11Code: 'MD11.0',
    category: 'respiratory',
  },
  {
    id: 'dysphagia_liquids',
    name: 'Difficulty swallowing liquids',
    commonName: 'Odynophagia',
    snomedCode: '68154008',
    icd11Code: 'MD50',
    category: 'ent',
  },
  {
    id: 'swollen_lymph_nodes',
    name: 'Swollen neck glands',
    commonName: 'Cervical lymphadenopathy',
    snomedCode: '30746008',
    icd11Code: 'BD93',
    category: 'ent',
  },
  {
    id: 'runny_nose',
    name: 'Runny nose / Sneezing',
    commonName: 'Rhinorrhea',
    snomedCode: '64531003',
    icd11Code: 'MD12',
    category: 'respiratory',
  },
  {
    id: 'ear_pain',
    name: 'Ear pain or fullness',
    commonName: 'Otalgia',
    snomedCode: '271807003',
    icd11Code: 'AA90',
    category: 'ent',
  },
  {
    id: 'fatigue',
    name: 'Tiredness / Fatigue',
    commonName: 'Asthenia / Malaise',
    snomedCode: '84229001',
    icd11Code: 'MG22',
    category: 'systemic',
  },
  {
    id: 'headache_mild',
    name: 'Headache',
    commonName: 'Cephalea',
    snomedCode: '25064002',
    icd11Code: '8A80',
    category: 'neurological',
  },
  {
    id: 'heartburn_acid',
    name: 'Heartburn / Acid regurgitation',
    commonName: 'Pyrosis',
    snomedCode: '698065002',
    icd11Code: 'MD51',
    category: 'gastrointestinal',
  },
  {
    id: 'abdominal_discomfort',
    name: 'Mild abdominal discomfort',
    commonName: 'Epigastric distress',
    snomedCode: '21522001',
    icd11Code: 'MD81',
    category: 'gastrointestinal',
  },
  // EMERGENCY RED FLAG SYMPTOMS
  {
    id: 'chest_pain_radiating',
    name: 'Severe chest tightness radiating to arm or jaw',
    commonName: 'Acute ischemic chest pain',
    snomedCode: '29857009',
    icd11Code: 'MD30.0',
    category: 'respiratory',
    isRedFlagTrigger: true,
    redFlagReason: 'Potential acute coronary syndrome (myocardial infarction) or aortic dissection requiring emergency intervention.',
  },
  {
    id: 'dyspnea_severe',
    name: 'Severe shortness of breath or audible stridor / gasping',
    commonName: 'Acute respiratory distress',
    snomedCode: '230145002',
    icd11Code: 'MD11.4',
    category: 'respiratory',
    isRedFlagTrigger: true,
    redFlagReason: 'Critical airway compromise, acute asthma exacerbation, or pulmonary embolism requiring urgent oxygenation.',
  },
  {
    id: 'drooling_inability_swallow',
    name: 'Inability to swallow saliva (uncontrolled drooling)',
    commonName: 'Severe acute dysphagia / epiglottitis',
    snomedCode: '44600008',
    icd11Code: 'MD50',
    category: 'ent',
    isRedFlagTrigger: true,
    redFlagReason: 'Risk of impending complete airway obstruction (e.g., epiglottitis or peritonsillar abscess).',
  },
  {
    id: 'cyanosis',
    name: 'Cyanosis (blue tint around lips or fingernails)',
    commonName: 'Peripheral and central cyanosis',
    snomedCode: '3415004',
    icd11Code: 'NE80',
    category: 'systemic',
    isRedFlagTrigger: true,
    redFlagReason: 'Severe arterial hypoxemia requiring immediate emergency resuscitation.',
  },
  {
    id: 'confusion_altered_mental',
    name: 'Profound confusion, sudden delirium, or loss of responsiveness',
    commonName: 'Acute encephalopathy / altered mental state',
    snomedCode: '419284004',
    icd11Code: 'MB23',
    category: 'neurological',
    isRedFlagTrigger: true,
    redFlagReason: 'Potential stroke, intracranial event, severe sepsis, or metabolic emergency.',
  },
  {
    id: 'facial_droop_arm_weakness',
    name: 'Sudden facial drooping, arm weakness, or slurred speech',
    commonName: 'Acute focal neurological deficit (FAST criteria)',
    snomedCode: '277540007',
    icd11Code: '8B20',
    category: 'neurological',
    isRedFlagTrigger: true,
    redFlagReason: 'High suspicion of acute cerebrovascular accident (ischemic or hemorrhagic stroke).',
  },
];

export const FREQUENT_SYMPTOMS_SUGGESTIONS = [
  'Sore throat',
  'Fever',
  'Dry cough',
  'Difficulty swallowing liquids',
  'Tiredness / Fatigue',
  'Headache',
  'Heartburn / Acid regurgitation',
  'Runny nose / Sneezing',
  'Swollen neck glands',
];

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'art-pharyngitis',
    slug: 'acute-pharyngitis-sore-throat',
    title: 'Acute Pharyngitis & Sore Throat',
    category: 'respiratory',
    sourceName: 'NHS Health A-Z',
    sourceUrl: 'https://www.nhs.uk/conditions/sore-throat/',
    reviewDate: 'Oct 2024',
    readTime: '4 min read',
    clinicalStandard: 'Centor Score Criteria Mapped',
    icdCode: 'ICD-10 Code: J02.9',
    summary:
      'Understanding common causes of throat pain, distinguishing self-limiting viral infections (e.g., Rhinovirus, Adenovirus) from Group A Streptococcal bacterial infections, and safe non-prescription home relief measures.',
    keyWarningSigns: [
      'Inability to swallow saliva or fluids (drooling)',
      'Acute difficulty breathing or audible stridor',
      'Severe stiff neck with high spiking fever',
      'Asymmetrical throat swelling pushing uvula to one side',
    ],
    imageAlt:
      'Photographic study of clinical ENT examination with throat light in clean clinical room',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZCWcZUAVxULiwxBLlK3kuiB-DVX3IDWEtSkorQ7n1M0TS-Bqtxs0J6T1DvKtJD9cq7ZJS1mp3fHlRLqPnE-wWllS4ISPV_LkmSDGSENTDkI1Vu_uLgkp30GeVS19fAYYv67zcJsz9y8wU43ERyQHbY2PwLozN2KT2Lh8Sh8N5pXOfAWjRF7l4XIBnGWRNtMYGocM4AEo8fnNFSp6j9DkPPtOM-mhS7mRl3DsjZ2ZgbdjAxoKZtqg',
  },
  {
    id: 'art-influenza',
    slug: 'seasonal-influenza-vs-common-cold',
    title: 'Seasonal Influenza (Flu) vs. Common Cold',
    category: 'infections',
    sourceName: 'CDC & WHO Combined',
    sourceUrl: 'https://www.cdc.gov/flu/symptoms/flu-vs-cold.htm',
    reviewDate: 'Nov 2024',
    readTime: '5 min read',
    clinicalStandard: 'CDC Protocol: Flu-2024-v3',
    icdCode: 'ICD-10 Code: J10.1',
    summary:
      'Differentiating between acute Influenza viruses (Type A and B) and common viral rhinitis. Prompt clinical identification aids in early antiviral eligibility windows (within 48 hours of onset).',
    keyWarningSigns: [
      'Sudden onset of high fever > 102°F (38.9°C)',
      'Severe generalized myalgia preventing getting out of bed',
      'Shortness of breath or persistent chest discomfort',
      'Bluish lips or fingertips (cyanosis)',
    ],
    comparisonTable: {
      title: 'Diagnostic Comparison Matrix',
      headers: ['Symptom / Metric', 'Seasonal Influenza (Flu)', 'Common Cold'],
      rows: [
        ['Onset Speed', 'Sudden (within hours)', 'Gradual (over 2-3 days)'],
        ['Fever Severity', 'High (100°F–104°F, lasts 3-4 days)', 'Rare in adults, mild in kids'],
        ['Myalgia (Body Aches)', 'Severe, generalized', 'Mild or slight discomfort'],
        ['Recovery Timeline', '7 to 14 days; fatigue lingers', '7 to 10 days generally'],
      ],
    },
    imageAlt: 'Comparison chart of viral influenza versus cold pathogens',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZbvM4gzMdeRZ4h2XXlb2-L9OgdZUAiMLaVwe4hk50fttLjtQs0n_9fJ7MsaEKdBJahqJsoel1ruWAFlMbROyaEVvAm4d5d4_-Ih3QOvgZ5iIsMc_hO2pgwdZB_XiOdMCgCs0Pxzp1qwUTUxj1I5zfoa5yW5DsSEjG-iyQklwHb1amHlyL-6CEolYm1K0U-BHaKbrY-57nB_hzZJqm-j3LH-vOmtBB6MOVo2SsBsG-RTEH8qrs6UI',
  },
  {
    id: 'art-gerd',
    slug: 'gastroesophageal-reflux-gerd-and-acid-reflux',
    title: 'Gastroesophageal Reflux (GERD) & Acid Reflux',
    category: 'digestive',
    sourceName: 'MedlinePlus (NLM / NIH)',
    sourceUrl: 'https://medlineplus.gov/gerd.html',
    reviewDate: 'Aug 2024',
    readTime: '6 min read',
    clinicalStandard: 'NLM ID: 1016832',
    icdCode: 'ICD-10 Code: K21.9',
    summary:
      'Chronic mucosal irritation caused by gastric acid refluxing into the esophagus. Covers dietary triggers, postural elevation of head of bed, and the crucial rule-out of acute coronary syndromes.',
    keyWarningSigns: [
      'Chest discomfort radiating to jaw, left arm, or back (Treat as Cardiac Emergency)',
      'Difficulty or pain when swallowing solid foods (dysphagia)',
      'Vomiting blood or coffee-ground material',
      'Unintended significant weight loss',
    ],
    imageAlt: 'Anatomical rendering of stomach lower esophageal sphincter and stomach lining',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCiwtXHEa21Aam49uLgur9vjP-I-7MkjYJtXcc5VDpKiVdZNMQkiA-rHID-4zPzKLIwNTGgT-_oCg403PPvf2aXCSrbt7phGcyT3Rz8UjI6F4BR3OB0ME9fk-UCLR0RNKZQt841WnkAIElR15PeLITJ4rEp0b9vf-hNKH0ikqsKxXnDJiGRLYWJBTqeRyfEQvSqTOgYvwEBd4325b3YFNiTdpSIs2HJsEod3jeNe9_pYr0h7uQiZU',
  },
  {
    id: 'art-hypertension',
    slug: 'hypertension-high-blood-pressure-guidelines',
    title: 'Hypertension (High Blood Pressure) - The Silent Risk',
    category: 'cardiovascular',
    sourceName: 'MoHFW India & WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/hypertension',
    reviewDate: 'Sep 2024',
    readTime: '5 min read',
    clinicalStandard: 'Clinical Guideline: WHO-CVD-2023',
    icdCode: 'ICD-10 Code: I10',
    summary:
      'Often asymptomatic until secondary cardiovascular involvement occurs. Outlines proper home blood pressure monitoring technique, systolic/diastolic thresholds, and dietary sodium reduction protocols.',
    keyWarningSigns: [
      'Systolic BP ≥ 180 mmHg or Diastolic ≥ 120 mmHg (Hypertensive Crisis)',
      'Severe sudden headache with visual disturbances',
      'Chest pain or sudden shortness of breath',
      'Numbness or weakness on one side of body',
    ],
    imageAlt: 'Blood pressure cuff and diagnostic heart monitoring display',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2fQ8-uzkT5a82t1bNHdsBM9mX1uqqfkUN9YuHiwO5tUkHHjCbS4sX9Q95msH4KFIaOB-pmzyByktcig9g8oxrkDNVN3U0j8ehIvMd_gcKDJ_CAOlM5d26Tk6_ZVvPBlPo8kzYsEViumFXgTEnmGeLlX90pj4YP5hr3hpUol6mNU3ZA4t82SWvjTvrdW_U7BLYk8_wjyWVAVwHF0KgioJ2KY4-IrzbFzc-rRpq5GbPOuKvww8Fgw0',
  },
];

export const MEDICINE_DATABASE: MedicineMonograph[] = [
  {
    rxcui: 161,
    genericName: 'Paracetamol',
    brandNames: ['Dolo-650', 'Calpol', 'Crocin', 'Tylenol', 'Panadol'],
    usSynonym: 'Acetaminophen',
    atcCode: 'N02BE01',
    legalStatus: 'OTC',
    clinicalClass: 'Centrally-acting Analgesic & Antipyretic',
    description:
      'Synthetic non-opioid, centrally acting analgesic and antipyretic agent. First-line therapy for mild somatic nociceptive pain and thermoregulatory resetting.',
    evidenceStandard: 'USP / IP Monograph (Indian Pharmacopoeia 2022)',
    lastRevision: 'Q1 2025',
    criticalDoseThreshold:
      'Adult daily exposure must NEVER exceed 4,000 mg (4 grams) across all concurrent sources within a 24-hour cycle. In patients with chronic alcohol consumption (≥ 3 drinks/day) or baseline hepatic risk, strict lower thresholds (2,000–3,000 mg/day) apply.',
    regulatedIndications: [
      'Pyrexia Reduction: Re-sets elevated hypothalamic thermoregulatory set-point in viral or bacterial fevers.',
      'Mild-to-Moderate Somatosensory Pain: Cephalea, dental extraction pain, muscular sprains, and early osteoarthritic discomfort.',
      'NSAID Intolerance Alternative: Preferred when peptic ulcers, renal impairment, or platelet disorders preclude Ibuprofen.',
    ],
    absoluteContraindications: [
      'Severe Acute Hepatic Impairment: Fulminant viral hepatitis, decompensated cirrhosis (Child-Pugh Class C).',
      'Known Hypersensitivity: Previous urticaria, angioedema, or Stevens-Johnson syndrome to Acetaminophen salts.',
      'Concomitant Acetaminophen Cocktailing: Multi-symptom cold/sinus preparations containing unlabeled Paracetamol components.',
    ],
    metabolism: {
      description:
        'Primary elimination pathways occur via hepatic glucuronidation (55%) and sulfation (30%). Less than 5-10% undergoes CYP2E1 oxidation to produce NAPQI, safely neutralized by cellular glutathione during therapeutic dosing.',
      pathways: [
        { name: 'Glucuronide Conjugation', percentage: 55, note: 'Nontoxic renal clearance', color: '#00685f' },
        { name: 'Sulfate Conjugation', percentage: 30, note: 'Nontoxic renal clearance', color: '#008378' },
        { name: 'CYP2E1 Oxidation (NAPQI)', percentage: 10, note: 'Requires Glutathione neutralization', color: '#ba1a1a' },
      ],
    },
    drugInteractions: [
      {
        substance: 'Warfarin & Coumarins',
        riskLevel: 'High',
        effect: 'Prolonged daily usage exceeding 2,000 mg may inhibit prothrombin synthesis and elevate INR, increasing systemic bleeding risk.',
        source: 'DailyMed Section 7.1',
      },
      {
        substance: 'Multi-Symptom Cold Elixirs',
        riskLevel: 'Overdose Hazard',
        effect: 'Frequent inadvertent double-dosing occurs when taking brand-name syrups containing unhighlighted acetaminophen alongside single-agent tablets.',
        source: 'FDA Drug Safety Communication',
      },
      {
        substance: 'Chronic Alcohol Consumption (≥ 3 drinks/day)',
        riskLevel: 'High',
        effect: 'Induction of CYP2E1 hepatic enzyme leads to accelerated formation of toxic metabolite NAPQI and glutathione depletion.',
        source: 'openFDA Drug Label Warning',
      },
    ],
    pediatricGuidance:
      'Pediatric dosing is strictly governed by body mass: 10–15 mg/kg per dose every 4 to 6 hours (maximum 5 doses or 75 mg/kg within 24 hours). Never estimate using adult spoons, standard kitchen utensils, or age alone. Use calibrated oral syringes.',
    regionalDifferences: [
      {
        region: 'India (IP Monograph)',
        regulatoryBody: 'CDSCO Regulated',
        monographDetails: 'Commonly dispensed as 500 mg or 650 mg tablets (e.g., Dolo-650, Calpol 500). Sold freely OTC; fixed-dose combination bans instituted for irrational combinations.',
      },
      {
        region: 'United States (USP)',
        regulatoryBody: 'US FDA Regulated',
        monographDetails: 'Marketed as Acetaminophen (Tylenol). Standard formulation is 325 mg; Extra Strength is 500 mg. FDA enforces a 325 mg limit per dosage unit in prescription combination products.',
      },
      {
        region: 'United Kingdom (BP)',
        regulatoryBody: 'MHRA Regulated',
        monographDetails: 'Pack sizes strictly capped to 16 tablets in non-pharmacy retail, or 32 tablets in community pharmacies to reduce deliberate toxic self-poisoning incidents.',
      },
    ],
    emergencyToxicology: {
      triggerDose: '> 7.5 g in adults or > 150 mg/kg in children within 8 hours',
      antidote: 'N-Acetylcysteine (NAC) - IV or Oral',
      mechanism: 'Replenishes intracellular hepatic glutathione stores. High clinical efficacy if administered within 8 hours of ingestion. Rumack-Matthew Nomogram plotting required.',
      emergencyCall: 'Call 112 (India / EU) or 911 (US) immediately.',
    },
    sourceRegistries: [
      { title: 'DailyMed Package Insert', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=paracetamol' },
      { title: 'RxNorm Concept: 161', url: 'https://mor.nlm.nih.gov/RxNav/search?searchBy=RXCUI&searchTerm=161' },
      { title: 'WHO Model List of Essential Medicines (EML)', url: 'https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines/essential-medicines-lists' },
    ],
  },
  {
    rxcui: 7052,
    genericName: 'Amoxicillin',
    brandNames: ['Amoxil', 'Mox', 'Novamox', 'Augmentin (when with clavulanate)'],
    atcCode: 'J01CA04',
    legalStatus: 'Rx',
    clinicalClass: 'Moderate-Spectrum Beta-Lactam Penicillin Antibiotic',
    description:
      'Bactericidal beta-lactam antibiotic that inhibits bacterial cell wall synthesis. Requires clinical prescription and microbial sensitivity evaluation.',
    evidenceStandard: 'USP / IP Monograph',
    lastRevision: 'Q4 2024',
    criticalDoseThreshold:
      'Prescription-only medication. Requires individualized dosing determined by a licensed physician based on creatinine clearance and infection severity.',
    regulatedIndications: [
      'Confirmed Streptococcal pharyngitis (after rapid antigen detection test or throat culture).',
      'Acute bacterial otitis media and acute bacterial sinusitis meeting CDC diagnostic thresholds.',
      'Uncomplicated lower respiratory tract infections caused by susceptible Streptococcus pneumoniae.',
    ],
    absoluteContraindications: [
      'Documented Penicillin / Beta-Lactam Hypersensitivity: Risk of severe anaphylaxis, urticaria, bronchospasm.',
      'Infectious Mononucleosis: High incidence of non-allergic maculopapular rash when administered during EBV infection.',
    ],
    metabolism: {
      description: 'Renally cleared; approximately 60% of oral dose excreted unchanged in urine within 6 to 8 hours.',
      pathways: [
        { name: 'Renal Glomerular Filtration & Tubular Secretion', percentage: 60, note: 'Eliminated unchanged', color: '#00685f' },
        { name: 'Hepatic Conversion to Penicilloic Acid', percentage: 20, note: 'Inactive metabolites', color: '#008378' },
      ],
    },
    drugInteractions: [
      {
        substance: 'Oral Contraceptives',
        riskLevel: 'Moderate',
        effect: 'Potential reduction in enterohepatic circulation of estrogens, though clinical significance is variable.',
        source: 'DailyMed',
      },
      {
        substance: 'Allopurinol',
        riskLevel: 'Moderate',
        effect: 'Substantially increased incidence of cutaneous rashes in patients taking both agents.',
        source: 'FDA Label Warning',
      },
    ],
    pediatricGuidance:
      'Dosing calculated based on mg/kg/day in 2 or 3 divided doses under direct pediatric supervision. Completion of entire prescribed duration is mandatory.',
    regionalDifferences: [
      {
        region: 'India (CDSCO / MoHFW)',
        regulatoryBody: 'Schedule H1 Drug',
        monographDetails: 'Strictly prescription-only. Schedule H1 warning label displayed to combat antimicrobial resistance (AMR). Over-the-counter dispensing is prohibited by law.',
      },
      {
        region: 'United States & UK',
        regulatoryBody: 'FDA / MHRA',
        monographDetails: 'Prescription-only. Antimicrobial stewardship guidelines discourage empirical use for uncomplicated upper respiratory infections.',
      },
    ],
    sourceRegistries: [
      { title: 'DailyMed Amoxicillin SPL', url: 'https://dailymed.nlm.nih.gov/' },
      { title: 'RxNorm Concept: 7052', url: 'https://mor.nlm.nih.gov/RxNav/' },
    ],
  },
  {
    rxcui: 20610,
    genericName: 'Cetirizine Hydrochloride',
    brandNames: ['Zyrtec', 'Cetzine', 'Alerid', 'Okacet'],
    atcCode: 'R06AE07',
    legalStatus: 'OTC',
    clinicalClass: 'Second-Generation Peripheral H1-Antihistamine',
    description:
      'Selectively antagonizes peripheral histamine H1 receptors. Offers relief from allergic rhinitis and chronic urticaria with significantly lower sedation than diphenhydramine.',
    evidenceStandard: 'USP / IP Monograph',
    lastRevision: 'Q3 2024',
    criticalDoseThreshold:
      'Adult standard daily dose: 10 mg once daily. In renal impairment (eGFR 10-30 mL/min), reduce dose to 5 mg once daily or every 48 hours.',
    regulatedIndications: [
      'Seasonal Allergic Rhinitis (Hay Fever): Alleviates sneezing, rhinorrhea, nasal pruritus, and ocular itching.',
      'Perennial Allergic Rhinitis: Chronic environmental allergen symptom control.',
      'Chronic Idiopathic Urticaria: Relieves pruritus and reduces wheal count.',
    ],
    absoluteContraindications: [
      'Severe End-Stage Renal Disease (eGFR < 10 mL/min or hemodialysis).',
      'Known hypersensitivity to Cetirizine, Hydroxyzine, or piperazine derivatives.',
    ],
    metabolism: {
      description: 'Minimally metabolized in the liver; eliminated primarily (70%) via renal clearance unchanged.',
      pathways: [
        { name: 'Renal Excretion Unchanged', percentage: 70, note: 'Primary elimination route', color: '#00685f' },
        { name: 'Hepatic Oxidative Dealkylation', percentage: 10, note: 'Minor metabolic route', color: '#008378' },
      ],
    },
    drugInteractions: [
      {
        substance: 'Alcohol & CNS Depressants',
        riskLevel: 'Moderate',
        effect: 'Additive central nervous system depression; caution advised when operating machinery.',
        source: 'FDA Drug Insert',
      },
    ],
    pediatricGuidance:
      'Children aged 2 to 6 years: 2.5 mg once daily, max 5 mg daily. Children 6 years and older: 5 to 10 mg daily depending on clinical indication.',
    regionalDifferences: [
      {
        region: 'India & US & UK',
        regulatoryBody: 'CDSCO / FDA / MHRA',
        monographDetails: 'Widely accessible over-the-counter for allergic indications in standard 10 mg tablet or oral syrup formulations.',
      },
    ],
    sourceRegistries: [
      { title: 'DailyMed Cetirizine Insert', url: 'https://dailymed.nlm.nih.gov/' },
      { title: 'RxNorm Concept: 20610', url: 'https://mor.nlm.nih.gov/RxNav/' },
    ],
  },
  {
    rxcui: 8640,
    genericName: 'Oral Rehydration Salts (ORS)',
    brandNames: ['Electral', 'Pedialyte', 'WHO ORS', 'Hydralyte'],
    atcCode: 'A07CA',
    legalStatus: 'WHO_ESSENTIAL',
    clinicalClass: 'Reduced-Osmolarity Glucose-Electrolyte Formulation',
    description:
      'Scientifically balanced sodium, potassium, chloride, citrate, and anhydrous glucose solution. Uses intact intestinal SGLT-1 co-transporters to pull water across the bowel wall during diarrhea.',
    evidenceStandard: 'WHO / UNICEF Reduced Osmolarity Formula (245 mOsm/L)',
    lastRevision: 'Q2 2024',
    criticalDoseThreshold:
      'Safe for oral replacement. Dissolve precisely in 1.0 Liter of clean drinking water. Do NOT concentrate by adding less water or mixing with juices or milk.',
    regulatedIndications: [
      'First-line therapy for mild to moderate dehydration caused by acute secretory diarrhea or viral gastroenteritis.',
      'Fluid and electrolyte replacement following strenuous exertion in hot climates.',
    ],
    absoluteContraindications: [
      'Severe shock with hemodynamic collapse (requires immediate IV fluids like Ringer Lactate).',
      'Paralytic ileus or intractable repetitive projectile vomiting.',
    ],
    metabolism: {
      description: 'Rapidly absorbed via small intestine sodium-glucose coupled transport; maintains isotonic vascular hydration.',
      pathways: [
        { name: 'Jejunal SGLT-1 Co-transport', percentage: 95, note: 'Active mucosal absorption', color: '#00855d' },
      ],
    },
    drugInteractions: [],
    pediatricGuidance:
      'Offer small sips (5-10 mL) every 2-5 minutes in infants and toddlers after each loose stool. Continue normal breastfeeding or age-appropriate feeding.',
    regionalDifferences: [
      {
        region: 'Global / WHO EML',
        regulatoryBody: 'WHO Recommended Essential Medicine',
        monographDetails: 'Standard formulation: Sodium chloride 2.6g, Glucose anhydrous 13.5g, Potassium chloride 1.5g, Trisodium citrate 2.9g per 1 Liter.',
      },
    ],
    sourceRegistries: [
      { title: 'WHO Essential Medicines Diarrhea Guidelines', url: 'https://www.who.int/' },
      { title: 'Indian Academy of Pediatrics ORS Policy', url: 'https://iapindia.org/' },
    ],
  },
];
