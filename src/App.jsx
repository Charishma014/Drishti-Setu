import React, { useState } from "react";
import Navbar from "./components/Navbar";
import StepNavigation from "./components/StepNavigation";
import { DEMO_CASES } from "./data/demoCases";
import { soundManager } from "./utils/audio";

// 12 Screens
import Screen1Welcome from "./components/screens/Screen1Welcome";
import Screen2Patient from "./components/screens/Screen2Patient";
import Screen3Acquisition from "./components/screens/Screen3Acquisition";
import Screen4Quality from "./components/screens/Screen4Quality";
import Screen5Analysis from "./components/screens/Screen5Analysis";
import Screen6Grading from "./components/screens/Screen6Grading";
import Screen7Explainable from "./components/screens/Screen7Explainable";
import Screen8Review from "./components/screens/Screen8Review";
import Screen9Report from "./components/screens/Screen9Report";
import Screen10RuralOps from "./components/screens/Screen10RuralOps";
import Screen11Simulink from "./components/screens/Screen11Simulink";
import Screen12Impact from "./components/screens/Screen12Impact";

// Modals
import ModifyGradeModal from "./components/Modals/ModifyGradeModal";
import RecaptureModal from "./components/Modals/RecaptureModal";
import TeleTransmitModal from "./components/Modals/TeleTransmitModal";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(12); // All steps accessible for seamless judging
  const [selectedCase, setSelectedCase] = useState(DEMO_CASES[0]); // Case 1 default
  const [customImageUrl, setCustomImageUrl] = useState(null);
  const [isAudioOn, setIsAudioOn] = useState(true);

  // Modals state
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isRecaptureModalOpen, setIsRecaptureModalOpen] = useState(false);
  const [isTransmitModalOpen, setIsTransmitModalOpen] = useState(false);

  // Navigation handlers
  const handleNext = () => {
    setCurrentStep((prev) => {
      const next = Math.min(12, prev + 1);
      setMaxUnlockedStep((max) => Math.max(max, next));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return next;
    });
  };

  const handleBack = () => {
    setCurrentStep((prev) => {
      const back = Math.max(1, prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return back;
    });
  };

  const handleReset = (step = 1) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectStep = (stepId) => {
    setCurrentStep(stepId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCase = (caseObj) => {
    setSelectedCase(caseObj);
    setCustomImageUrl(null); // Clear custom upload when switching preset
  };

  const handleUpdatePatient = (updatedPatient) => {
    setSelectedCase((prev) => ({
      ...prev,
      patient: updatedPatient
    }));
  };

  const handleUploadImage = (url) => {
    setCustomImageUrl(url);
  };

  const handleResetImage = () => {
    setCustomImageUrl(null);
  };

  const handleSaveModifiedGrade = (newLevel, overrideNotes) => {
    const levelTitles = {
      0: "LEVEL 0 — NO APPARENT DIABETIC RETINOPATHY",
      1: "LEVEL 1 — MILD NON-PROLIFERATIVE DIABETIC RETINOPATHY",
      2: "LEVEL 2 — MODERATE NON-PROLIFERATIVE DIABETIC RETINOPATHY",
      3: "LEVEL 3 — SEVERE NON-PROLIFERATIVE DIABETIC RETINOPATHY",
      4: "LEVEL 4 — PROLIFERATIVE DIABETIC RETINOPATHY"
    };

    setSelectedCase((prev) => ({
      ...prev,
      grading: {
        ...prev.grading,
        level: newLevel,
        levelTitle: levelTitles[newLevel] || `LEVEL ${newLevel}`,
        referable: newLevel >= 2
      },
      review: {
        ...prev.review,
        clinicalNotes: overrideNotes,
        defaultConfirmed: true
      }
    }));
  };

  const handleConfirmRecapture = () => {
    // Jump back to image acquisition with fresh exposure simulation
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleAudio = () => {
    const newState = soundManager.toggle();
    setIsAudioOn(newState);
  };

  return (
    <div className="min-h-screen bg-[#0E1214] text-[#F7F4EE] flex flex-col selection:bg-[#D95338] selection:text-white">
      
      {/* Top Persistent Medical Navbar */}
      <Navbar
        currentStep={currentStep}
        selectedCase={selectedCase}
        onSelectCase={handleSelectCase}
        onReset={handleReset}
        demoCases={DEMO_CASES}
        isAudioOn={isAudioOn}
        onToggleAudio={handleToggleAudio}
      />

      {/* Sequential 12-Step Progress Stepper */}
      <StepNavigation
        currentStep={currentStep}
        onSelectStep={handleSelectStep}
        maxUnlockedStep={maxUnlockedStep}
      />

      {/* Main Screening Content Stage */}
      <main className="flex-1 flex flex-col justify-start">
        {currentStep === 1 && (
          <Screen1Welcome
            onNext={handleNext}
            selectedCase={selectedCase}
            onSelectCase={handleSelectCase}
            demoCases={DEMO_CASES}
          />
        )}

        {currentStep === 2 && (
          <Screen2Patient
            caseData={selectedCase}
            onUpdatePatient={handleUpdatePatient}
            onNext={handleNext}
            onBack={handleBack}
            demoCases={DEMO_CASES}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentStep === 3 && (
          <Screen3Acquisition
            caseData={selectedCase}
            onNext={handleNext}
            onBack={handleBack}
            customImageUrl={customImageUrl}
            onUploadImage={handleUploadImage}
            onResetImage={handleResetImage}
            demoCases={DEMO_CASES}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentStep === 4 && (
          <Screen4Quality
            caseData={selectedCase}
            onNext={handleNext}
            onBack={handleBack}
            customImageUrl={customImageUrl}
            onRecaptureRequest={() => setIsRecaptureModalOpen(true)}
            onSelectCase={handleSelectCase}
            demoCases={DEMO_CASES}
          />
        )}

        {currentStep === 5 && (
          <Screen5Analysis
            caseData={selectedCase}
            onNext={handleNext}
            onBack={handleBack}
            customImageUrl={customImageUrl}
          />
        )}

        {currentStep === 6 && (
          <Screen6Grading
            caseData={selectedCase}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 7 && (
          <Screen7Explainable
            caseData={selectedCase}
            onNext={handleNext}
            onBack={handleBack}
            customImageUrl={customImageUrl}
          />
        )}

        {currentStep === 8 && (
          <Screen8Review
            caseData={selectedCase}
            onNext={handleNext}
            onBack={handleBack}
            onOpenModifyModal={() => setIsModifyModalOpen(true)}
            onOpenRecaptureModal={() => setIsRecaptureModalOpen(true)}
          />
        )}

        {currentStep === 9 && (
          <Screen9Report
            caseData={selectedCase}
            onNext={handleNext}
            onBack={handleBack}
            onReset={handleReset}
            onOpenTransmitModal={() => setIsTransmitModalOpen(true)}
          />
        )}

        {currentStep === 10 && (
          <Screen10RuralOps
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 11 && (
          <Screen11Simulink
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 12 && (
          <Screen12Impact
            onReset={handleReset}
            onJumpToStep={handleSelectStep}
          />
        )}
      </main>

      {/* Global Interactive Modals */}
      <ModifyGradeModal
        isOpen={isModifyModalOpen}
        onClose={() => setIsModifyModalOpen(false)}
        currentGrade={selectedCase.grading}
        onSave={handleSaveModifiedGrade}
      />

      <RecaptureModal
        isOpen={isRecaptureModalOpen}
        onClose={() => setIsRecaptureModalOpen(false)}
        onConfirmRecapture={handleConfirmRecapture}
      />

      <TeleTransmitModal
        isOpen={isTransmitModalOpen}
        onClose={() => setIsTransmitModalOpen(false)}
        caseData={selectedCase}
      />

      {/* Footer info tag (hidden in print) */}
      <footer className="py-3 px-4 border-t border-[#1C2428] text-center text-[11px] font-mono text-[#5C677D] print:hidden">
        <span>Drishti Setu • SIH26038 Explainable AI Retinopathy Screening • Department of Health & Family Welfare</span>
      </footer>

    </div>
  );
}
