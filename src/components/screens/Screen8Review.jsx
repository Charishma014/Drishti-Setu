import React, { useState } from "react";
import { 
  Stethoscope, 
  CheckCircle2, 
  Edit3, 
  RefreshCw, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  FileText, 
  AlertCircle,
  Building,
  Sparkles
} from "lucide-react";
import { soundManager } from "../../utils/audio";

export default function Screen8Review({
  caseData,
  onNext,
  onBack,
  onOpenModifyModal,
  onOpenRecaptureModal
}) {
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [reviewerNotes, setReviewerNotes] = useState(caseData.review.clinicalNotes);
  const [confirmedTime, setConfirmedTime] = useState(caseData.review.reviewTimeSec);

  const handleConfirm = () => {
    setIsConfirmed(true);
    soundManager.playSuccess();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#222B30]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D95338] uppercase font-bold tracking-wider mb-1">
            <Stethoscope className="w-3.5 h-3.5" /> Stage 7: Tele-Ophthalmology Human-in-the-Loop Validation
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#F7F4EE]">
            Ophthalmologist Clinical Verification
          </h2>
          <p className="text-xs text-[#8D99AE]">
            SIH26038 Essential Principle: AI assists prioritization; final clinical verification remains with registered specialists.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isConfirmed ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#162925] border border-[#2EC4B6]/50 text-xs font-mono text-[#2EC4B6] font-bold shadow-md">
              <CheckCircle2 className="w-4 h-4 text-[#2EC4B6]" />
              Clinician Verified ✓
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E09F3E]/20 border border-[#E09F3E] text-xs font-mono text-[#E09F3E] font-bold">
              Pending Doctor Sign-off
            </span>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left Column: AI Recommendation Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#222B30]">
              <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D95338]" /> AI Triage Summary
              </h3>
              <span className="text-[10px] font-mono text-[#2EC4B6] bg-[#2EC4B6]/10 px-2 py-0.5 rounded border border-[#2EC4B6]/30">
                Confidence: {caseData.grading.aiConfidence}%
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#8D99AE] text-[10px] font-mono uppercase block mb-0.5">
                  AI Severity Classification
                </span>
                <span className="font-bold text-[#F7F4EE] text-sm block">
                  {caseData.grading.levelTitle}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1E2528]">
                <div>
                  <span className="text-[#8D99AE] text-[10px] font-mono uppercase block">Referable Triage</span>
                  <span className={`font-bold font-mono text-sm ${caseData.grading.referable ? "text-[#D95338]" : "text-[#2EC4B6]"}`}>
                    {caseData.grading.referable ? "YES (Referral)" : "NO (Routine)"}
                  </span>
                </div>
                <div>
                  <span className="text-[#8D99AE] text-[10px] font-mono uppercase block">Quality Grade</span>
                  <span className="font-bold font-mono text-sm text-[#2EC4B6]">
                    {caseData.image.overallQuality}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1E2528]">
                <span className="text-[#8D99AE] text-[10px] font-mono uppercase block mb-1">Key AI Lesion Evidence</span>
                <div className="text-[11px] text-[#A2B2C2] space-y-1">
                  <div>• {caseData.analysis.microaneurysms.status}</div>
                  <div>• {caseData.analysis.exudates.status}</div>
                  <div>• {caseData.analysis.hemorrhages.status}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Clinician Profile */}
          <div className="bg-[#141A1D] border border-[#222B30] rounded-2xl p-4 shadow-lg space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E272C] border border-[#2EC4B6]/40 flex items-center justify-center text-[#2EC4B6]">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#F7F4EE]">{caseData.review.reviewer}</h4>
                <p className="text-[11px] text-[#8D99AE]">{caseData.review.reviewerRole} • {caseData.review.reviewerReg}</p>
              </div>
            </div>
            <p className="text-[11px] text-[#5C677D] font-mono pt-2 border-t border-[#1E2528] flex items-center gap-1">
              <Building className="w-3.5 h-3.5" /> {caseData.review.hospital}
            </p>
          </div>

        </div>

        {/* Right Column: Interactive Review Console (7 Cols) */}
        <div className="lg:col-span-7 bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-4">
          
          <div className="flex items-center justify-between pb-2 border-b border-[#222B30]">
            <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#2EC4B6]" /> Clinician Action & Sign-Off
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#8D99AE]">
              <Clock className="w-3.5 h-3.5 text-[#E09F3E]" />
              <span>Review Time: {confirmedTime}s</span>
            </div>
          </div>

          {/* 3 Major Review Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={handleConfirm}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                isConfirmed
                  ? "bg-[#162925] border-[#2EC4B6] text-[#2EC4B6] shadow-md ring-1 ring-[#2EC4B6]/50 font-bold"
                  : "bg-[#0E1214] border-[#222B30] text-[#8D99AE] hover:text-[#F7F4EE] hover:border-[#3A4B54]"
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-[#2EC4B6]" />
              <span className="text-xs font-semibold">CONFIRM AI RESULT</span>
              <span className="text-[9px] text-[#8D99AE]">Accept Grade 2</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                if (onOpenModifyModal) onOpenModifyModal();
              }}
              className="p-3 rounded-xl bg-[#0E1214] border border-[#222B30] hover:border-[#E09F3E] text-center transition-all flex flex-col items-center justify-center gap-1.5 group"
            >
              <Edit3 className="w-5 h-5 text-[#E09F3E] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#F7F4EE]">MODIFY RESULT</span>
              <span className="text-[9px] text-[#8D99AE]">Adjust Grade / Notes</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                if (onOpenRecaptureModal) onOpenRecaptureModal();
              }}
              className="p-3 rounded-xl bg-[#0E1214] border border-[#222B30] hover:border-red-500 text-center transition-all flex flex-col items-center justify-center gap-1.5 group"
            >
              <RefreshCw className="w-5 h-5 text-red-400 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-xs font-semibold text-[#F7F4EE]">REQUEST RECAPTURE</span>
              <span className="text-[9px] text-[#8D99AE]">Send back to PHC</span>
            </button>
          </div>

          {/* Clinician Notes Editor */}
          <div>
            <label className="block text-xs font-mono text-[#8D99AE] mb-1.5 flex items-center justify-between">
              <span>Doctor Clinical Impression & Tele-Referral Notes:</span>
              <span className="text-[10px] text-[#2EC4B6]">Signed digitally</span>
            </label>
            <textarea
              rows={4}
              value={reviewerNotes}
              onChange={(e) => setReviewerNotes(e.target.value)}
              className="w-full bg-[#0E1214] border border-[#2C3940] rounded-xl p-3 text-xs text-[#F7F4EE] leading-relaxed focus:outline-none focus:border-[#2EC4B6]"
            />
          </div>

          {/* Clinician Verified Stamp Banner */}
          {isConfirmed && (
            <div className="p-3.5 rounded-xl bg-[#162423] border border-[#2EC4B6]/40 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#2EC4B6]/20 flex items-center justify-center text-[#2EC4B6]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2EC4B6]">
                    Result verified by clinician within intended human-in-the-loop workflow.
                  </div>
                  <div className="text-[10px] text-[#8D99AE] font-mono">
                    Electronic Signature Token: 0x8F9C...A2D1 • Triage Turnaround: 18s
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#222B30]">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="px-5 py-2.5 rounded-xl bg-[#141A1D] hover:bg-[#1E2528] border border-[#222B30] text-[#8D99AE] hover:text-[#F7F4EE] text-xs font-mono flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Explainable AI
        </button>

        <button
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-sm shadow-xl shadow-[#D95338]/25 flex items-center gap-2 transition-all group"
        >
          <span>GENERATE SCREENING REPORT</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
