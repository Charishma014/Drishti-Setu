import React from "react";
import { 
  Eye, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Brain, 
  Stethoscope, 
  Activity, 
  CheckCircle2
} from "lucide-react";
import { soundManager } from "../../utils/audio";

export default function Screen1Welcome({ onNext, onSelectCase, selectedCase, demoCases }) {
  return (
    <div className="w-full min-h-[calc(100vh-65px)] flex flex-col justify-center items-center px-4 py-8 max-w-6xl mx-auto">
      
      {/* Top SIH 2026 Problem Statement Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A2328] border border-[#2A373E] text-xs font-mono text-[#E09F3E] mb-6 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#E09F3E] animate-ping" />
        <span className="font-semibold">Smart India Hackathon 2026</span>
        <span className="text-[#8D99AE]">|</span>
        <span className="text-[#F7F4EE]">PS SIH26038: Explainable AI for DR Screening in Rural India</span>
      </div>

      {/* Main Hero Header */}
      <div className="text-center max-w-3xl space-y-3 mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D95338] to-[#9A331A] flex items-center justify-center shadow-xl shadow-[#D95338]/20 border border-[#E65A3C]/40">
            <Eye className="w-7 h-7 text-[#F7F4EE]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-serif text-[#F7F4EE]">
            Drishti <span className="text-[#D95338]">Setu</span>
          </h1>
        </div>

        <p className="text-xl md:text-2xl font-medium text-[#E09F3E] font-serif italic">
          “Bridging Rural Screening with Explainable Eye Care”
        </p>

        <p className="text-sm md:text-base text-[#8D99AE] max-w-2xl mx-auto leading-relaxed">
          AI-assisted diabetic retinopathy screening designed for primary healthcare centres (PHCs) and tele-ophthalmology workflows. Detects lesions, explains visual evidence, and prioritizes referable patients for specialist review.
        </p>
      </div>

      {/* 3 Key Capability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
        <div className="bg-[#141A1D] border border-[#222B30] hover:border-[#D95338]/50 p-5 rounded-2xl transition-all shadow-md group">
          <div className="w-10 h-10 rounded-xl bg-[#222B30] group-hover:bg-[#D95338]/20 text-[#D95338] flex items-center justify-center mb-3 transition-colors">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-[#F7F4EE] text-base mb-1">Image Quality Assessment</h3>
          <p className="text-xs text-[#8D99AE] leading-relaxed">
            Automated focus, illumination, and FOV verification. Instantly filters ungradeable images with real-time recapture guidance.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-[#2EC4B6]">
            <CheckCircle2 className="w-3.5 h-3.5" /> SIH Mandatory Quality Gate
          </div>
        </div>

        <div className="bg-[#141A1D] border border-[#222B30] hover:border-[#E09F3E]/50 p-5 rounded-2xl transition-all shadow-md group">
          <div className="w-10 h-10 rounded-xl bg-[#222B30] group-hover:bg-[#E09F3E]/20 text-[#E09F3E] flex items-center justify-center mb-3 transition-colors">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-[#F7F4EE] text-base mb-1">Explainable DR Grading</h3>
          <p className="text-xs text-[#8D99AE] leading-relaxed">
            International ICDR 5-tier classification backed by Grad-CAM attention heatmaps and specific lesion detections (MAs, Exudates, Hemorrhages).
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-[#E09F3E]">
            <Sparkles className="w-3.5 h-3.5" /> Visual Grad-CAM Evidence
          </div>
        </div>

        <div className="bg-[#141A1D] border border-[#222B30] hover:border-[#2EC4B6]/50 p-5 rounded-2xl transition-all shadow-md group">
          <div className="w-10 h-10 rounded-xl bg-[#222B30] group-hover:bg-[#2EC4B6]/20 text-[#2EC4B6] flex items-center justify-center mb-3 transition-colors">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-[#F7F4EE] text-base mb-1">Human-in-the-Loop Review</h3>
          <p className="text-xs text-[#8D99AE] leading-relaxed">
            Empowers ophthalmologists with pre-screened triage, verifiable clinician stamps, and automated bilingual referral reports.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-[#2EC4B6]">
            <CheckCircle2 className="w-3.5 h-3.5" /> Tele-Ophthalmology Triage
          </div>
        </div>
      </div>

      {/* Demo Patient Pre-Selector for Quick Judging */}
      <div className="w-full max-w-4xl bg-[#111619] border border-[#1E2528] rounded-2xl p-4 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8D99AE] flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#D95338]" /> Select Demonstration Patient Case:
          </span>
          <span className="text-[11px] font-mono text-[#A2B2C2]">
            Ready for 3-minute jury presentation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {demoCases.map((c) => {
            const isSelected = selectedCase.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectCase(c);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-[#1A2328] border-[#D95338] shadow-md ring-1 ring-[#D95338]/60"
                    : "bg-[#141A1D] border-[#222B30] hover:border-[#3A4B54] opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-[#F7F4EE]">{c.patient.name}</span>
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                    c.badgeColor === "amber" ? "bg-[#D95338]/20 text-[#E65A3C]" :
                    c.badgeColor === "emerald" ? "bg-[#2EC4B6]/20 text-[#2EC4B6]" : "bg-red-950/60 text-red-400"
                  }`}>
                    {c.grading.shortTitle}
                  </span>
                </div>
                <div className="text-[11px] text-[#8D99AE] flex items-center justify-between">
                  <span>{c.patient.id}</span>
                  <span>Age {c.patient.age} • {c.patient.gender}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
        <button
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className="w-full sm:w-2/3 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-base shadow-xl shadow-[#D95338]/25 hover:shadow-[#D95338]/40 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>START SCREENING</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            const mainCase = demoCases.find(c => c.id === "case-1") || demoCases[0];
            onSelectCase(mainCase);
            onNext();
          }}
          className="w-full sm:w-1/3 py-3.5 px-4 rounded-xl bg-[#182024] hover:bg-[#202B30] border border-[#2C3940] hover:border-[#D95338]/60 text-[#F7F4EE] font-medium text-xs transition-all text-center cursor-pointer"
        >
          VIEW DEMO CASE
        </button>
      </div>

      {/* Rural Mission Note */}
      <p className="text-[11px] text-[#5C677D] mt-6 text-center font-mono">
        Designed for National Programme for Control of Blindness & Visual Impairment (NPCBVI) • Ayushman Arogya Mandir / Rural PHC Network
      </p>

    </div>
  );
}
