import React from "react";
import { 
  BarChart3, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  Info,
  Layers,
  ChevronRight,
  Stethoscope
} from "lucide-react";
import { soundManager } from "../../utils/audio";

export default function Screen6Grading({ caseData, onNext, onBack }) {
  const levels = [
    {
      level: 0,
      title: "Level 0: No DR",
      subtitle: "No apparent diabetic retinopathy",
      criteria: "No microaneurysms, hemorrhages, or exudates.",
      referable: false,
      color: "emerald"
    },
    {
      level: 1,
      title: "Level 1: Mild NPDR",
      subtitle: "Mild Non-Proliferative DR",
      criteria: "Microaneurysms only. No other lesions.",
      referable: false,
      color: "blue"
    },
    {
      level: 2,
      title: "Level 2: Moderate NPDR",
      subtitle: "Moderate Non-Proliferative DR",
      criteria: "Microaneurysms, hard exudates, or dot hemorrhages (< 4-2-1 criteria).",
      referable: true,
      color: "amber"
    },
    {
      level: 3,
      title: "Level 3: Severe NPDR",
      subtitle: "Severe Non-Proliferative DR",
      criteria: "4-2-1 rule: >20 intraretinal hemorrhages in all 4 quadrants, or venous beading, or IRMA.",
      referable: true,
      color: "orange"
    },
    {
      level: 4,
      title: "Level 4: PDR",
      subtitle: "Proliferative Diabetic Retinopathy",
      criteria: "Neovascularization (NVD/NVE), preretinal/vitreous hemorrhage, fibrous proliferation.",
      referable: true,
      color: "red"
    }
  ];

  const currentLevel = caseData.grading.level;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#222B30]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D95338] uppercase font-bold tracking-wider mb-1">
            <BarChart3 className="w-3.5 h-3.5" /> Stage 5: International Clinical DR Classification
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#F7F4EE]">
            International Clinical DR Severity Assessment
          </h2>
          <p className="text-xs text-[#8D99AE]">
            Standardized 5-tier ICDR scale severity grading with automated referable triage flag.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {caseData.grading.referable ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D95338]/20 border border-[#D95338] text-xs font-mono text-[#E65A3C] font-bold shadow-md">
              <ShieldAlert className="w-4 h-4 text-[#D95338]" />
              REFERABLE DR: YES
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2EC4B6]/20 border border-[#2EC4B6] text-xs font-mono text-[#2EC4B6] font-bold shadow-md">
              <CheckCircle2 className="w-4 h-4 text-[#2EC4B6]" />
              NON-REFERABLE (ROUTINE)
            </span>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left Column: Predicted Severity Banner & Telemetry (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Grade Announcement Card */}
          <div className={`p-6 rounded-2xl border shadow-xl transition-all relative overflow-hidden ${
            currentLevel === 2
              ? "bg-gradient-to-br from-[#1C2327] to-[#141A1D] border-[#D95338] shadow-[#D95338]/10"
              : currentLevel === 0
              ? "bg-gradient-to-br from-[#141D20] to-[#0E1517] border-[#2EC4B6] shadow-[#2EC4B6]/10"
              : "bg-[#141A1D] border-[#222B30]"
          }`}>
            <div className="text-xs font-mono text-[#8D99AE] uppercase tracking-wider mb-2">
              Predicted Clinical Severity
            </div>

            <h3 className="text-xl md:text-2xl font-bold font-serif text-[#F7F4EE] leading-tight mb-2">
              {caseData.grading.levelTitle}
            </h3>

            <p className="text-xs text-[#A2B2C2] leading-relaxed mb-4">
              {caseData.grading.icdrDescription}
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#222B30]">
              <div className="p-3 bg-[#0E1214] rounded-xl border border-[#222B30]">
                <div className="text-[10px] font-mono text-[#8D99AE] uppercase">AI Confidence</div>
                <div className="text-xl font-bold font-mono text-[#E09F3E] mt-0.5">
                  {caseData.grading.aiConfidence}%
                </div>
              </div>

              <div className="p-3 bg-[#0E1214] rounded-xl border border-[#222B30]">
                <div className="text-[10px] font-mono text-[#8D99AE] uppercase">Referable Triage</div>
                <div className={`text-base font-bold font-mono mt-1 ${
                  caseData.grading.referable ? "text-[#D95338]" : "text-[#2EC4B6]"
                }`}>
                  {caseData.grading.referable ? "YES" : "NO"}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-[#1B252A] border border-[#2A373E] text-xs">
              <span className="text-[#8D99AE] block text-[10px] uppercase font-mono mb-0.5">
                Clinical Priority Recommendation
              </span>
              <span className="font-bold text-[#F7F4EE] flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-[#D95338]" />
                {caseData.grading.clinicalPriority}
              </span>
            </div>

          </div>

          {/* SIH Validation Targets Note */}
          <div className="p-4 bg-[#141A1D] border border-[#222B30] rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#E09F3E] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> SIH26038 Benchmark Targets
              </span>
              <span className="text-[10px] bg-[#1E2528] px-2 py-0.5 rounded text-[#8D99AE]">
                VALIDATION TARGETS
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 bg-[#0E1214] rounded-lg border border-[#1E2528]">
                <div className="text-[10px] text-[#8D99AE]">Target Sensitivity</div>
                <div className="font-bold text-[#2EC4B6]">{caseData.grading.validationTargets.sensitivityTarget}</div>
              </div>
              <div className="p-2 bg-[#0E1214] rounded-lg border border-[#1E2528]">
                <div className="text-[10px] text-[#8D99AE]">Target Specificity</div>
                <div className="font-bold text-[#2EC4B6]">{caseData.grading.validationTargets.specificityTarget}</div>
              </div>
            </div>
            <p className="text-[10px] text-[#5C677D] italic">
              * Note for Evaluators: AI provides triage assistance. Final diagnosis requires clinician review.
            </p>
          </div>

        </div>

        {/* Right Column: 5-Tier Scale Visualization (7 Cols) */}
        <div className="lg:col-span-7 bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-3">
          
          <div className="flex items-center justify-between pb-2 border-b border-[#222B30]">
            <h3 className="font-semibold text-[#F7F4EE] text-sm">
              ICDR 5-Level Severity Scale (International Standard)
            </h3>
            <span className="text-[11px] font-mono text-[#D95338] bg-[#D95338]/10 px-2 py-0.5 rounded border border-[#D95338]/30">
              Threshold: Level 2+ = Referable
            </span>
          </div>

          <div className="space-y-2.5">
            {levels.map((lvl) => {
              const isSelected = currentLevel === lvl.level;

              return (
                <div
                  key={lvl.level}
                  className={`p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-[#1C252A] border-[#D95338] ring-2 ring-[#D95338]/50 shadow-lg shadow-[#D95338]/15"
                      : "bg-[#0E1214] border-[#1E2528] opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                          isSelected
                            ? "bg-[#D95338] text-white"
                            : "bg-[#1E2528] text-[#8D99AE]"
                        }`}
                      >
                        {lvl.level}
                      </div>
                      <span className="font-bold text-xs text-[#F7F4EE]">{lvl.title}</span>
                      {lvl.referable && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#D95338]/20 text-[#E65A3C] font-semibold">
                          Referable
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <span className="text-[11px] font-mono text-[#2EC4B6] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> AI Predicted
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#8D99AE] pl-8 leading-normal">
                    {lvl.criteria}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-[#0E1214] rounded-xl border border-[#222B30] text-xs text-[#8D99AE] flex items-center justify-between">
            <span className="font-mono">Triage Rule:</span>
            <span className="text-[#F7F4EE]">
              Level 0-1 = Routine Rescreen in 12M | Level 2-4 = Specialist Referral
            </span>
          </div>

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
          <ArrowLeft className="w-4 h-4" /> Back to Analysis
        </button>

        <button
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-sm shadow-xl shadow-[#D95338]/25 flex items-center gap-2 transition-all group"
        >
          <span>SEE WHY THE AI DECIDED THIS</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
