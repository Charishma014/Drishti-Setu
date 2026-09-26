// Realistic Clinical Demo Cases for Drishti Setu - SIH26038

export const DEMO_CASES = [
  {
    id: "case-1",
    label: "Case 1 (Main Demo) — Moderate NPDR",
    badge: "MODERATE NPDR (Level 2)",
    badgeColor: "amber",
    patient: {
      id: "DR-2026-0147",
      name: "Ananya Rao",
      age: 56,
      gender: "Female",
      diabetesDuration: "11 years",
      diabetesType: "Type 2 Diabetes Mellitus",
      hba1c: "8.2%",
      bloodGlucose: "184 mg/dL",
      phcLocation: "Chandrapur Rural Screening Centre, MH",
      screeningDate: "2026-09-09",
      visualAcuity: "OD: 6/12 | OS: 6/9",
      bloodPressure: "134/86 mmHg",
      consent: true,
      operatorName: "Sunil Verma (ASHA / PHC Health Tech)"
    },
    image: {
      eye: "Right Eye (OD)",
      resolution: "2240 × 1488 px",
      camera: "Portable Handheld Non-Mydriatic Fundus Camera (PHC-2)",
      captureMode: "Field Screening 45° (Macula & Disc Centered)",
      sensor: "14-bit Low-Noise CMOS",
      timestamp: "14:22:10 IST",
      fileSize: "4.2 MB",
      focusScore: 92,
      illuminationScore: 84,
      fovScore: 91,
      overallQuality: "GRADEABLE",
      isGradeable: true,
      qualityDetails: "Image quality is sufficient for automated screening.",
      enhancementNotes: "CLAHE contrast normalization applied to temporal arcade."
    },
    analysis: {
      opticDisc: { status: "Detected", x: 680, y: 360, cdr: "0.38 (Normal)", confidence: 97.8 },
      fovea: { status: "Detected & Clear", x: 380, y: 390, maculaStatus: "Intact, no center-involving edema", confidence: 95.4 },
      vessels: { status: "Segmented (Normal Caliber)", fractalDim: "1.43", tortuosity: "Mild", confidence: 96.1 },
      microaneurysms: { status: "Detected (8 lesions)", count: 8, severity: "Moderate", location: "Temporal arcade & parafoveal", confidence: 94.2 },
      exudates: { status: "Detected (4 clusters)", count: 4, severity: "Mild-Moderate", location: "Superior temporal quadrant", confidence: 91.8 },
      hemorrhages: { status: "Mild (Dot/Blot)", count: 5, severity: "Mild", location: "Inferior temporal", confidence: 92.6 },
      neovascularization: { status: "Not Detected", detected: false, nvd: false, nve: false, confidence: 99.1 },
      lesionsList: [
        { id: "MA-1", type: "Microaneurysm", x: 440, y: 310, radius: 10, label: "MA #1", color: "#EF4444" },
        { id: "MA-2", type: "Microaneurysm", x: 480, y: 330, radius: 11, label: "MA #2", color: "#EF4444" },
        { id: "MA-3", type: "Microaneurysm", x: 340, y: 440, radius: 9, label: "MA #3", color: "#EF4444" },
        { id: "MA-4", type: "Microaneurysm", x: 310, y: 360, radius: 12, label: "MA #4", color: "#EF4444" },
        { id: "MA-5", type: "Microaneurysm", x: 510, y: 280, radius: 10, label: "MA #5", color: "#EF4444" },
        { id: "MA-6", type: "Microaneurysm", x: 420, y: 460, radius: 8, label: "MA #6", color: "#EF4444" },
        { id: "EX-1", type: "Hard Exudate", x: 490, y: 290, radius: 16, label: "Exudate Cluster", color: "#FBBF24" },
        { id: "EX-2", type: "Hard Exudate", x: 530, y: 310, radius: 14, label: "Exudate #2", color: "#FBBF24" },
        { id: "HM-1", type: "Dot Hemorrhage", x: 360, y: 480, radius: 13, label: "Hemorrhage", color: "#DC2626" }
      ]
    },
    grading: {
      level: 2,
      levelTitle: "LEVEL 2 — MODERATE NON-PROLIFERATIVE DIABETIC RETINOPATHY",
      shortTitle: "Moderate NPDR",
      aiConfidence: 93.7,
      referable: true,
      referableText: "YES (Referral Recommended)",
      clinicalPriority: "OPHTHALMOLOGIST REVIEW RECOMMENDED",
      priorityLevel: "Tier 2 — Review within 14 days",
      icdrDescription: "More than just microaneurysms but less than severe NPDR (no 4-2-1 criteria met). Hard exudates and dot hemorrhages present in temporal quadrant.",
      validationTargets: {
        sensitivityTarget: ">90%",
        specificityTarget: ">85%",
        benchmarkLabel: "SIH26038 VALIDATION TARGETS"
      }
    },
    explainable: {
      gradCamHeatmapRegion: { cx: 430, cy: 370, r: 160, intensity: 0.88 },
      evidencePoints: [
        {
          title: "Microaneurysms",
          desc: "Detected in multiple retinal regions, concentrated along the superior and inferior temporal vascular arcades.",
          count: "8 punctate lesions",
          badge: "Confirmed"
        },
        {
          title: "Hard Exudates",
          desc: "Localized bright lipid deposits detected in the superior temporal quadrant (>1 disc diameter from fovea).",
          count: "4 clusters",
          badge: "Confirmed"
        },
        {
          title: "Hemorrhages",
          desc: "Small dot and blot hemorrhagic regions detected in the inferior quadrant.",
          count: "5 lesions",
          badge: "Mild"
        },
        {
          title: "Neovascularization",
          desc: "No evidence of abnormal fragile new vessels at optic disc (NVD) or elsewhere (NVE).",
          count: "0 lesions",
          badge: "Negative"
        }
      ],
      clinicalReasoning: "AI attention is heavily concentrated (84% gradient density) around the maculo-temporal arcade containing clusters of microaneurysms and hard exudates. The lesion profile strictly meets the International Clinical DR Severity criteria for Level 2 Moderate NPDR.",
      statusText: "CLINICALLY REVIEWABLE",
      confidence: "93.7%"
    },
    review: {
      reviewer: "Dr. Sunita Deshmukh, MD",
      reviewerRole: "Senior Tele-Ophthalmologist",
      reviewerReg: "MMC-2014/08/3412",
      hospital: "Maharashtra Tele-Ophthalmology Network / Pune Regional Eye Institute",
      defaultConfirmed: true,
      reviewTimeSec: 18,
      clinicalNotes: "Confirmed Level 2 Moderate NPDR. Fovea currently spared from macular edema. Schedule dilated biomicroscopy & OCT at District Hospital within 2 weeks. Maintain glycemic control."
    },
    report: {
      reportId: "DRS-2026-0147",
      generatedAt: "2026-09-09 14:23:45 IST",
      recommendation: "REFER TO OPHTHALMOLOGIST",
      reason: "Referable diabetic retinopathy detected (Level 2+). Ophthalmic evaluation and dilated examination recommended.",
      urgency: "Moderate Priority (Within 14 Days)",
      suggestedActions: [
        "Referral to District Telemedicine / Ophthalmology Hub for dilated slit-lamp fundus biomicroscopy",
        "Perform Optical Coherence Tomography (OCT) to rule out subclinical Diabetic Macular Edema (DME)",
        "Optimize systemic glycemic (HbA1c target < 7.0%) and blood pressure control with Primary Care Physician",
        "Repeat retinal imaging screening in 6 months post-specialist baseline"
      ]
    }
  },
  {
    id: "case-2",
    label: "Case 2 — Normal Retina (No DR)",
    badge: "NO DR (Level 0)",
    badgeColor: "emerald",
    patient: {
      id: "DR-2026-0089",
      name: "Rameshwar Patil",
      age: 49,
      gender: "Male",
      diabetesDuration: "3 years",
      diabetesType: "Type 2 Diabetes Mellitus",
      hba1c: "6.8%",
      bloodGlucose: "138 mg/dL",
      phcLocation: "Nanded Sub-District PHC, MH",
      screeningDate: "2026-09-09",
      visualAcuity: "OD: 6/6 | OS: 6/6",
      bloodPressure: "122/78 mmHg",
      consent: true,
      operatorName: "Kavita Shinde (Community Health Officer)"
    },
    image: {
      eye: "Left Eye (OS)",
      resolution: "2240 × 1488 px",
      camera: "Portable Handheld Non-Mydriatic Fundus Camera (PHC-2)",
      captureMode: "Field Screening 45° (Macula & Disc Centered)",
      sensor: "14-bit Low-Noise CMOS",
      timestamp: "11:15:32 IST",
      fileSize: "4.5 MB",
      focusScore: 95,
      illuminationScore: 91,
      fovScore: 94,
      overallQuality: "GRADEABLE",
      isGradeable: true,
      qualityDetails: "High clarity retinal image with optimal illumination and focus.",
      enhancementNotes: "Standard normalization applied."
    },
    analysis: {
      opticDisc: { status: "Detected & Sharp", x: 280, y: 360, cdr: "0.32 (Normal)", confidence: 99.2 },
      fovea: { status: "Detected & Normal", x: 560, y: 390, maculaStatus: "Normal foveal reflex", confidence: 98.1 },
      vessels: { status: "Segmented (Healthy)", fractalDim: "1.46", tortuosity: "None", confidence: 98.5 },
      microaneurysms: { status: "None Detected", count: 0, severity: "None", location: "None", confidence: 97.9 },
      exudates: { status: "None Detected", count: 0, severity: "None", location: "None", confidence: 98.4 },
      hemorrhages: { status: "None Detected", count: 0, severity: "None", location: "None", confidence: 98.8 },
      neovascularization: { status: "Not Detected", detected: false, nvd: false, nve: false, confidence: 99.8 },
      lesionsList: []
    },
    grading: {
      level: 0,
      levelTitle: "LEVEL 0 — NO APPARENT DIABETIC RETINOPATHY",
      shortTitle: "No DR (Healthy)",
      aiConfidence: 96.2,
      referable: false,
      referableText: "NO (Non-Referable)",
      clinicalPriority: "ROUTINE ANNUAL SCREENING",
      priorityLevel: "Routine — Repeat in 12 Months",
      icdrDescription: "No visible diabetic retinal abnormalities, microaneurysms, hemorrhages, or exudates. Normal vascular architecture.",
      validationTargets: {
        sensitivityTarget: ">90%",
        specificityTarget: ">85%",
        benchmarkLabel: "SIH26038 VALIDATION TARGETS"
      }
    },
    explainable: {
      gradCamHeatmapRegion: { cx: 400, cy: 375, r: 120, intensity: 0.35 },
      evidencePoints: [
        {
          title: "Retinal Background",
          desc: "Homogeneous retinal pigment epithelium without microvascular abnormalities.",
          count: "0 lesions",
          badge: "Healthy"
        },
        {
          title: "Optic Disc & Fovea",
          desc: "Sharp neuroretinal rim, healthy cup-to-disc ratio (0.32), crisp foveal avascular zone.",
          count: "Normal",
          badge: "Verified"
        },
        {
          title: "Vascular Caliber",
          desc: "Uniform arteriolar-to-venular ratio (~2:3) with no localized caliber irregularities.",
          count: "Normal",
          badge: "Verified"
        }
      ],
      clinicalReasoning: "No pathological features detected. Baseline activation remains low and uniform across the posterior pole, confirming the absence of diabetic retinopathy.",
      statusText: "CLINICALLY REVIEWABLE",
      confidence: "96.2%"
    },
    review: {
      reviewer: "Dr. Sunita Deshmukh, MD",
      reviewerRole: "Senior Tele-Ophthalmologist",
      reviewerReg: "MMC-2014/08/3412",
      hospital: "Maharashtra Tele-Ophthalmology Network",
      defaultConfirmed: true,
      reviewTimeSec: 12,
      clinicalNotes: "Verified Level 0 (No DR). Reassure patient. Continue standard diabetes management and schedule routine annual follow-up screening."
    },
    report: {
      reportId: "DRS-2026-0089",
      generatedAt: "2026-09-09 11:18:10 IST",
      recommendation: "ROUTINE ANNUAL RESCREENING",
      reason: "No diabetic retinopathy detected. Retinal examination within normal limits.",
      urgency: "Routine (12 Months)",
      suggestedActions: [
        "Maintain current glycemic control (HbA1c < 7.0%)",
        "Lifestyle & dietary counseling at local PHC",
        "Schedule next annual digital retinal screening in September 2027"
      ]
    }
  },
  {
    id: "case-3",
    label: "Case 3 (Quality Filter Demo) — Ungradeable / Poor Image",
    badge: "IMAGE UNGRADEABLE (Recapture Req.)",
    badgeColor: "rose",
    patient: {
      id: "DR-2026-0211",
      name: "Bhikaji Shinde",
      age: 64,
      gender: "Male",
      diabetesDuration: "16 years",
      diabetesType: "Type 2 Diabetes Mellitus",
      hba1c: "9.4%",
      bloodGlucose: "215 mg/dL",
      phcLocation: "Yavatmal Primary Health Unit, MH",
      screeningDate: "2026-09-09",
      visualAcuity: "OD: 6/18 | OS: 6/24",
      bloodPressure: "148/92 mmHg",
      consent: true,
      operatorName: "Pooja Jadhav (ASHA Health Worker)"
    },
    image: {
      eye: "Right Eye (OD)",
      resolution: "2240 × 1488 px",
      camera: "Portable Handheld Non-Mydriatic Fundus Camera (PHC-2)",
      captureMode: "Field Screening (Low Pupil Dilation)",
      sensor: "14-bit Low-Noise CMOS",
      timestamp: "15:40:02 IST",
      fileSize: "2.8 MB",
      focusScore: 48,
      illuminationScore: 42,
      fovScore: 54,
      overallQuality: "UNGRADEABLE",
      isGradeable: false,
      qualityDetails: "Severe motion blur and pupil edge shadowing detected. Image quality is insufficient for safe AI diagnosis.",
      reasons: [
        "Motion blur exceeding diagnostic threshold (Focus 48%)",
        "Uneven sub-optimal illumination due to un-dilated pupil shadowing",
        "Optic disc partially obscured by perimeter glare ring"
      ],
      recaptureGuidance: "Move camera 2–3 cm closer, dim ambient PHC lighting, ask patient to blink and fixate on green target LED, then recapture."
    },
    analysis: {
      opticDisc: { status: "Partially Obscured", x: 680, y: 360, cdr: "Uncertain", confidence: 51.2 },
      fovea: { status: "Low Contrast", x: 380, y: 390, maculaStatus: "Blur prevents lesion assessment", confidence: 48.0 },
      vessels: { status: "Low Definition", fractalDim: "N/A", tortuosity: "Indeterminate", confidence: 52.3 },
      microaneurysms: { status: "Indeterminate", count: 0, severity: "Indeterminate", location: "Uncertain", confidence: 45.0 },
      exudates: { status: "Indeterminate", count: 0, severity: "Indeterminate", location: "Uncertain", confidence: 42.0 },
      hemorrhages: { status: "Indeterminate", count: 0, severity: "Indeterminate", location: "Uncertain", confidence: 46.0 },
      neovascularization: { status: "Indeterminate", detected: false, nvd: false, nve: false, confidence: 50.0 },
      lesionsList: []
    },
    grading: {
      level: -1,
      levelTitle: "UNGRADEABLE — INSUFFICIENT QUALITY",
      shortTitle: "Ungradeable Image",
      aiConfidence: 45.0,
      referable: true,
      referableText: "RECAPTURE MANDATORY",
      clinicalPriority: "IMMEDIATE RECAPTURE AT PHC",
      priorityLevel: "Action Required: Immediate Recapture",
      icdrDescription: "Automated quality gate stopped downstream classification to prevent false negatives. The field operator must acquire a high-clarity fundus photograph.",
      validationTargets: {
        sensitivityTarget: ">90%",
        specificityTarget: ">85%",
        benchmarkLabel: "SIH26038 QUALITY GATEWAY"
      }
    },
    explainable: {
      gradCamHeatmapRegion: { cx: 400, cy: 375, r: 80, intensity: 0.2 },
      evidencePoints: [
        {
          title: "Quality Gate Triggered",
          desc: "Automated pre-filtering algorithm rejected image to safeguard patient diagnostic accuracy.",
          count: "Rejected",
          badge: "Quality Alert"
        },
        {
          title: "Operator Feedback",
          desc: "Adjust camera alignment, verify patient fixation on green fixation light, and re-trigger acquisition.",
          count: "Pending",
          badge: "Action Req"
        }
      ],
      clinicalReasoning: "Downstream AI inference halted by Drishti Setu's automated quality assurance model (Focus Score < 70%). This eliminates misdiagnosis caused by motion blur or cataract glare.",
      statusText: "RECAPTURE REQUIRED",
      confidence: "48.0%"
    },
    review: {
      reviewer: "Dr. Sunita Deshmukh, MD",
      reviewerRole: "Senior Tele-Ophthalmologist",
      reviewerReg: "MMC-2014/08/3412",
      hospital: "Maharashtra Tele-Ophthalmology Network",
      defaultConfirmed: false,
      reviewTimeSec: 8,
      clinicalNotes: "Image ungradeable due to severe blur. Requested immediate recapture with proper patient fixation."
    },
    report: {
      reportId: "DRS-2026-0211",
      generatedAt: "2026-09-09 15:42:15 IST",
      recommendation: "RECAPTURE FUNDUS IMAGE",
      reason: "Initial image ungradeable due to motion blur and illumination glare.",
      urgency: "Immediate Action at PHC",
      suggestedActions: [
        "Reposition patient in darkened screening room",
        "Clean camera lens with optical microfiber cloth",
        "Guide patient to focus on internal green LED fixation point",
        "Recapture both eyes and re-submit for AI evaluation"
      ]
    }
  }
];
