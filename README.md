# Drishti Setu (दृष्टि सेतु)
### Explainable AI for Diabetic Retinopathy Screening in Rural India
**Smart India Hackathon 2026 — Problem Statement SIH26038**

> *“Bridging Rural Screening with Explainable Eye Care”*

---

## 🎯 Executive Summary & Problem Context
In rural India, over **77 million people live with diabetes**, yet **80% of ophthalmologists reside in urban tertiary centers**. Less than **15% of rural diabetic patients receive annual retinal screenings**, leading to preventable blindness from Diabetic Retinopathy (DR).

**Core Challenges Addressed:**
1. **Scarcity of Specialists:** Rural Primary Healthcare Centres (PHCs) lack trained eye care specialists.
2. **Variable Fundus Image Quality:** Un-dilated pupils, camera shake, and cataracts cause blurry, ungradeable images.
3. **AI Black-Box Dilemma:** Clinicians hesitate to trust opaque deep learning models without visual justification.
4. **Telemedicine Latency:** High network latency when transmitting full uncompressed image files across rural bandwidth.

---

## 🔬 The Drishti Setu Solution

Drishti Setu is a clinically oriented, human-in-the-loop retinal screening workstation designed for block-level PHCs and tele-ophthalmology networks:

```
[Patient Intake (ABHA ID)]
        ↓
[Non-Mydriatic Fundus Capture (45° Field)]
        ↓
[Automated Quality Gate (Focus / Illum / FOV) + CLAHE Enhancement]
        ↓
[AI Retinal Feature Extraction (Optic Disc, Fovea, MAs, Exudates, Hemorrhages)]
        ↓
[ICDR 5-Tier Severity Classification (Level 0 – Level 4)]
        ↓
[Explainable AI (Grad-CAM Attention Heatmaps & Lesion Telemetry)]
        ↓
[Human-in-the-Loop Tele-Ophthalmologist Verification (18s Review)]
        ↓
[Automated Bilingual Referral Dossier & Tele-Transmission]
        ↓
[Simulink Telemedicine Queue Operations Model (100k+ Scale)]
```

---

## 🧭 12-Stage Demonstration Workflow

| Stage | Screen | Key Demonstration Features |
|---|---|---|
| **01** | **Welcome & Landing** | Problem Statement SIH26038 banner, 3 capability cards, 3 preloaded jury demo cases. |
| **02** | **Patient Registration** | Realistic demographics (Age, Gender, Duration, HbA1c 8.2%, BP), ABHA ID, digital consent toggle. |
| **03** | **Fundus Acquisition** | 45° Non-mydriatic fundus camera interface, OD/OS eye selector, telemetry, custom image upload. |
| **04** | **Quality Assessment** | Focus (92%), Illumination (84%), FOV (91%), CLAHE enhancement toggle, and recapture feedback for poor images. |
| **05** | **AI Retinal Analysis** | Animated scanning laser beam, 7 deep-learning clinical detection modules, lesion count telemetry. |
| **06** | **DR Severity Grade** | International ICDR 5-level scale, Level 2 highlight, 93.7% AI confidence, validation benchmark targets. |
| **07** | **Explainable AI (XAI)** | Grad-CAM activation heatmap, lesion bounding overlays, clinical reasoning paragraph, reviewable status. |
| **08** | **Doctor Review** | Human-in-the-loop console: Confirm AI result, Modify grade modal, Request recapture modal, electronic signature. |
| **09** | **Clinical Report** | Official medical dossier with QR code, Grad-CAM thumbnail, print/PDF download, and tele-transmission gateway. |
| **10** | **Rural Operations** | 5 PHC node grid, 128 screened / 23 referable, 3-tier network pipeline, 100,000+ program simulation. |
| **11** | **Simulink Simulation** | Discrete-event operations simulator: dynamic patient volume, camera speed, 4G bandwidth, doctor review rate sliders. |
| **12** | **Impact & Summary** | Value proposition pillars, 100% SIH26038 compliance matrix, confetti celebration, and restart screening. |

---

## 👥 Three Preloaded Jury Cases

1. **Case 1 (Main Demo) — Moderate NPDR (Level 2):**
   - Referable: **YES**
   - AI Confidence: **93.7%**
   - Microaneurysms: 8 punctate lesions
   - Hard Exudates: 4 lipid clusters
   - Quality: Passed (Focus 92%, Illumination 84%)

2. **Case 2 — Normal Healthy Retina (Level 0):**
   - Referable: **NO (Routine Rescreening in 12M)**
   - AI Confidence: **96.2%**
   - Healthy fovea & sharp optic disc rim

3. **Case 3 — Quality Filter Demo (Ungradeable):**
   - Focus: **48% (Severe Blur & Glare)**
   - Triggers Automated Pre-Filtering Quality Gate
   - Provides PHC Operator feedback: *"Move camera 2–3 cm closer and align green LED fixation."*

---

## 💻 Tech Stack & Architectural Highlights

- **Frontend & Workstation UI:** React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas API, Web Audio Synthesizer.
- **Retinal Synthesis & Canvas:** Physiologically accurate vascular tree branching, optic disc cup-to-disc ratio (CDR), macular pigment density, and Gaussian Grad-CAM thermal gradient engine.
- **Discrete Event Queue Modeling:** MathWorks / Simulink inspired ODE45 capacity solver calculating latency, queue depth, and operational bottlenecks.
- **Audio Feedback:** Non-intrusive Web Audio API synthetic cues for medical device tactile response (toggleable from navigation).

---

## 🚀 Running the Prototype Locally

```bash
# Clone or navigate to the project directory
cd "drisht setu"

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev

# Open browser at:
# http://127.0.0.1:5173/
```

---

## 📜 3-Minute SIH Jury Presentation Script

1. **Min 0:00 – 0:45 (Problem & Patient Intake):**
   * "Respected judges, DR is the leading cause of preventable blindness in India, but 80% of our rural population has no access to an eye specialist. Drishti Setu bridges this gap."
   * Show Screen 1 → Click **START SCREENING** → View Patient Registration with ABHA ID & Consent.

2. **Min 0:45 – 1:30 (Image Quality Gate & Enhancement):**
   * "In field conditions, blurry images cause catastrophic AI misdiagnosis. Drishti Setu's automated quality gate evaluates focus, illumination, and FOV before downstream analysis."
   * Show CLAHE enhancement contrast boost → Click **START RETINAL ANALYSIS**.

3. **Min 1:30 – 2:30 (Feature Extraction, ICDR Grade, & Explainable AI):**
   * "Watch our multi-lesion extractor identify 8 microaneurysms and 4 exudate clusters in 4.8 seconds."
   * Show Level 2 Moderate NPDR → Click **SEE WHY THE AI DECIDED THIS**.
   * Toggle Grad-CAM attention heatmap: "The AI is transparent—it shows the doctor exactly where the activation gradients peak."

4. **Min 2:30 – 3:30 (Human-in-the-Loop, Report, & Operations Simulation):**
   * Click **CONFIRM AI RESULT** → "Notice how Dr. Sunita Deshmukh verifies the case in 18 seconds."
   * Show generated report & click **TRANSMIT TO DISTRICT HUB**.
   * Switch to **Simulink Simulation** to demonstrate scaling to **100,000+ patients/year**.

---

**Developed for Smart India Hackathon 2026 | Problem Statement SIH26038**
