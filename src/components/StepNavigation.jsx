import React from "react";
import { 
  User, 
  Camera, 
  CheckCircle2, 
  Cpu, 
  BarChart3, 
  Sparkles, 
  Stethoscope, 
  FileText, 
  Network, 
  Sliders, 
  CheckCheck,
  ChevronRight
} from "lucide-react";
import { soundManager } from "../utils/audio";

export const WORKFLOW_STEPS = [
  { id: 1, key: "welcome", label: "Welcome", short: "Start", icon: Sparkles },
  { id: 2, key: "patient", label: "Patient Registration", short: "Patient", icon: User },
  { id: 3, key: "acquisition", label: "Image Capture", short: "Acquisition", icon: Camera },
  { id: 4, key: "quality", label: "Quality Assessment", short: "Quality", icon: CheckCircle2 },
  { id: 5, key: "analysis", label: "AI Retinal Analysis", short: "Analysis", icon: Cpu },
  { id: 6, key: "grading", label: "DR Severity Grade", short: "Grade", icon: BarChart3 },
  { id: 7, key: "explain", label: "Explainable AI", short: "Explain", icon: Sparkles },
  { id: 8, key: "review", label: "Doctor Review", short: "Review", icon: Stethoscope },
  { id: 9, key: "report", label: "Clinical Report", short: "Report", icon: FileText },
  { id: 10, key: "rural_ops", label: "Rural Operations", short: "Operations", icon: Network },
  { id: 11, key: "simulink", label: "Workflow Simulation", short: "Simulation", icon: Sliders },
  { id: 12, key: "impact", label: "Impact & Summary", short: "Impact", icon: CheckCheck },
];

export default function StepNavigation({ currentStep, onSelectStep, maxUnlockedStep = 12 }) {
  if (currentStep === 1) return null; // Hide progress bar on landing screen for maximum cinematic clean impact

  return (
    <nav aria-label="Screening workflow progress" className="w-full bg-[#111619] border-b border-[#1E2528] py-2 px-3 overflow-x-auto select-none no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[760px] gap-1">
        {WORKFLOW_STEPS.slice(1).map((step, idx) => {
          const isCurrent = currentStep === step.id;
          const isPassed = currentStep > step.id;
          const isClickable = step.id <= maxUnlockedStep || isPassed || isCurrent;
          const StepIcon = step.icon;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => {
                  if (isClickable) {
                    soundManager.playClick();
                    onSelectStep(step.id);
                  }
                }}
                disabled={!isClickable}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isCurrent
                    ? "bg-[#D95338] text-white font-semibold shadow-md shadow-[#D95338]/30 ring-1 ring-[#E65A3C]"
                    : isPassed
                    ? "text-[#2EC4B6] bg-[#162123] hover:bg-[#1C2C2F] border border-[#2EC4B6]/30"
                    : isClickable
                    ? "text-[#8D99AE] hover:text-[#F7F4EE] hover:bg-[#182024]"
                    : "text-[#4A5560] cursor-not-allowed opacity-50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    isCurrent
                      ? "bg-white text-[#D95338]"
                      : isPassed
                      ? "bg-[#2EC4B6] text-[#0E1214]"
                      : "bg-[#222B30] text-[#8D99AE]"
                  }`}
                >
                  {isPassed ? "✓" : step.id - 1}
                </div>
                <span className="whitespace-nowrap">{step.short}</span>
              </button>

              {idx < WORKFLOW_STEPS.length - 2 && (
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isPassed ? "text-[#2EC4B6]/40" : "text-[#2A343B]"}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
