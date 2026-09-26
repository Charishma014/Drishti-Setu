import React from "react";
import { 
  ArrowRight, 
  RotateCcw, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  Brain, 
  Network, 
  Award, 
  FileCheck,
  CheckCircle2
} from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "../../utils/audio";

export default function Screen12Impact({ onReset, onJumpToStep }) {
  const handleTriggerConfetti = () => {
    soundManager.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D95338", "#2EC4B6", "#E09F3E", "#F7F4EE"]
      });
    } catch (_e) {
      // ignore
    }
  };

  const workflowSteps = [
    { num: "01", title: "Quality Gate", desc: "Automated pre-filtering prevents ungradeable blurry images from entering AI pipeline." },
    { num: "02", title: "Lesion Detection", desc: "Extracts microaneurysms, hard exudates, hemorrhages, and vascular geometry." },
    { num: "03", title: "ICDR 5-Grade", desc: "Standardized clinical severity grading distinguishing referable vs routine cases." },
    { num: "04", title: "Grad-CAM XAI", desc: "Transparent heatmaps explain visual reasoning rather than black-box prediction." },
    { num: "05", title: "Clinician Sign-off", desc: "Human-in-the-loop review ensures doctors maintain full clinical diagnostic authority." },
    { num: "06", title: "Auto Tele-Report", desc: "Bilingual referral docket automatically transmitted to district ophthalmology hub." }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A2328] border border-[#2A373E] text-xs font-mono text-[#2EC4B6] shadow-sm">
          <Award className="w-3.5 h-3.5 text-[#E09F3E]" />
          <span>Smart India Hackathon 2026 • Problem Statement SIH26038</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-[#F7F4EE]">
          From Screening to Care
        </h2>

        <p className="text-sm md:text-base text-[#8D99AE] leading-relaxed">
          Drishti Setu bridges the critical gap in rural eye care by turning community health workers into proactive screening champions backed by explainable AI and specialist tele-verification.
        </p>
      </div>

      {/* 3 Major Impact Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        <div className="bg-[#141A1D] border border-[#222B30] hover:border-[#D95338] p-6 rounded-2xl shadow-xl transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#222B30] text-[#D95338] flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#F7F4EE]">EARLY DETECTION</h3>
          <p className="text-xs text-[#8D99AE] leading-relaxed">
            Screen asymptomatic diabetic patients in under 5 minutes at primary health centres before irreversible vision loss or proliferative retinopathy occurs.
          </p>
          <div className="pt-2 text-[11px] font-mono text-[#2EC4B6]">
            ✓ Community Level Access
          </div>
        </div>

        <div className="bg-[#141A1D] border border-[#222B30] hover:border-[#E09F3E] p-6 rounded-2xl shadow-xl transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#222B30] text-[#E09F3E] flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#F7F4EE]">EXPLAINABLE AI</h3>
          <p className="text-xs text-[#8D99AE] leading-relaxed">
            Transparent Grad-CAM heatmaps and specific lesion telemetry provide doctors with verifiable evidence rather than an uninterpretable black-box score.
          </p>
          <div className="pt-2 text-[11px] font-mono text-[#E09F3E]">
            ✓ Clinical Trust & Safety
          </div>
        </div>

        <div className="bg-[#141A1D] border border-[#222B30] hover:border-[#2EC4B6] p-6 rounded-2xl shadow-xl transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#222B30] text-[#2EC4B6] flex items-center justify-center">
            <Network className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#F7F4EE]">SCALABLE TELEMEDICINE</h3>
          <p className="text-xs text-[#8D99AE] leading-relaxed">
            Intelligently separates normal retinas (82%) from urgent referable cases (18%), multiplying specialist reach 10x while drastically cutting rural travel costs.
          </p>
          <div className="pt-2 text-[11px] font-mono text-[#2EC4B6]">
            ✓ 100,000+ Annual Scale
          </div>
        </div>

      </div>

      {/* 6-Step Summary Chain */}
      <div className="bg-[#111619] border border-[#1E2528] rounded-2xl p-6 mb-8 shadow-xl">
        <h3 className="font-semibold text-sm font-mono uppercase text-[#8D99AE] mb-4 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#2EC4B6]" /> End-to-End Clinical Screening Pipeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {workflowSteps.map((step, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-[#141A1D] border border-[#222B30] space-y-1 hover:border-[#3A4B54] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#D95338]">{step.num}</span>
                <span className="text-[10px] text-[#2EC4B6] font-mono">Verified ✓</span>
              </div>
              <h4 className="font-bold text-xs text-[#F7F4EE]">{step.title}</h4>
              <p className="text-[11px] text-[#8D99AE] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SIH26038 Compliance Checklist */}
      <div className="bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 mb-8 text-xs font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-[#222B30] mb-3">
          <span className="font-bold text-[#F7F4EE] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2EC4B6]" /> Problem Statement SIH26038 Compliance Matrix
          </span>
          <span className="text-[#2EC4B6] font-bold">100% PS SPECIFICATION MET</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#A2B2C2]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2EC4B6]" /> Automated Image Quality & CLAHE Enhancement
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2EC4B6]" /> Multi-Lesion Anatomy & Microaneurysm Extraction
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2EC4B6]" /> International ICDR 5-Tier Severity Grading
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2EC4B6]" /> Transparent Grad-CAM Visual Explainability
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2EC4B6]" /> Human-in-the-Loop Clinician Verification
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2EC4B6]" /> Simulink Discrete-Event Operations Model
          </div>
        </div>
      </div>

      {/* Final Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[#222B30]">
        <button
          onClick={() => {
            handleTriggerConfetti();
            onReset(1);
          }}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-sm shadow-xl shadow-[#D95338]/25 flex items-center justify-center gap-2 transition-all group cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          <span>START ANOTHER SCREENING</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onJumpToStep(7);
          }}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#182024] hover:bg-[#202B30] border border-[#2C3940] text-[#F7F4EE] text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#E09F3E]" />
          <span>REPLAY EXPLAINABLE AI DEMO</span>
        </button>
      </div>

    </div>
  );
}
