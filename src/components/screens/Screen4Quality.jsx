import React, { useState } from "react";
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  Layers,
  HelpCircle,
  RefreshCw,
  Cpu
} from "lucide-react";
import FundusCanvas from "../FundusCanvas";
import { soundManager } from "../../utils/audio";

export default function Screen4Quality({
  caseData,
  onNext,
  onBack,
  customImageUrl,
  onRecaptureRequest,
  onSelectCase,
  demoCases
}) {
  const [viewMode, setViewMode] = useState("enhanced"); // 'normal' | 'enhanced'
  const isGradeable = caseData.image.isGradeable;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#222B30]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D95338] uppercase font-bold tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Stage 3: Automated Quality Gate & Enhancement
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#F7F4EE]">
            Fundus Image Quality Assessment
          </h2>
          <p className="text-xs text-[#8D99AE]">
            SIH26038 Automated Pre-Filtering Gate: Verifies focus, illumination, and field-of-view before AI lesion analysis.
          </p>
        </div>

        <div>
          {isGradeable ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162925] border border-[#2EC4B6]/50 text-xs font-mono text-[#2EC4B6] font-bold shadow-md">
              <CheckCircle2 className="w-4 h-4 text-[#2EC4B6]" />
              GRADEABLE IMAGE ✓
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500 text-xs font-mono text-red-400 font-bold shadow-md">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              IMAGE NOT GRADEABLE ⚠️
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left Fundus Canvas & View Toggle (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-xl">
          
          {/* Enhancement Switcher Tabs */}
          <div className="w-full flex items-center justify-between mb-4 bg-[#0E1214] p-1.5 rounded-xl border border-[#2C3940]">
            <button
              onClick={() => {
                soundManager.playClick();
                setViewMode("normal");
              }}
              className={`flex-1 py-1.5 text-xs font-mono rounded-lg font-medium transition-all ${
                viewMode === "normal"
                  ? "bg-[#1E2528] text-[#F7F4EE] border border-[#3A4B54] shadow"
                  : "text-[#8D99AE] hover:text-[#F7F4EE]"
              }`}
            >
              Original Raw Image
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setViewMode("enhanced");
              }}
              className={`flex-1 py-1.5 text-xs font-mono rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                viewMode === "enhanced"
                  ? "bg-[#2EC4B6] text-[#0E1214] shadow"
                  : "text-[#8D99AE] hover:text-[#F7F4EE]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> CLAHE Enhanced
            </button>
          </div>

          {/* Retinal Canvas */}
          <div className="my-2">
            <FundusCanvas
              caseData={caseData}
              mode={viewMode}
              width={340}
              height={340}
              customImageUrl={customImageUrl}
            />
          </div>

          <div className="mt-3 text-center">
            <p className="text-[11px] font-mono text-[#8D99AE]">
              {viewMode === "enhanced"
                ? "Adaptive histogram equalization (CLAHE) boosted microvascular contrast."
                : "Standard raw sensor exposure without contrast equalization."}
            </p>
          </div>

        </div>

        {/* Right Quality Assessment Panel (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Quality Metrics Breakdown */}
          <div className="bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center justify-between pb-2 border-b border-[#222B30]">
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#E09F3E]" /> Quality Assessment Metrics
              </span>
              <span className="text-xs font-mono text-[#8D99AE]">ISO/IEC 29109 Benchmark</span>
            </h3>

            {/* Metric 1: Focus */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#8D99AE] font-mono">1. Retinal Focus (Laplacian Gradient)</span>
                <span className={`font-mono font-bold ${
                  caseData.image.focusScore >= 80 ? "text-[#2EC4B6]" : caseData.image.focusScore >= 65 ? "text-[#E09F3E]" : "text-red-400"
                }`}>
                  {caseData.image.focusScore}% — {caseData.image.focusScore >= 80 ? "GOOD" : caseData.image.focusScore >= 65 ? "ACCEPTABLE" : "POOR (BLUR)"}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#0E1214] overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    caseData.image.focusScore >= 80 ? "bg-[#2EC4B6]" : caseData.image.focusScore >= 65 ? "bg-[#E09F3E]" : "bg-red-500"
                  }`}
                  style={{ width: `${caseData.image.focusScore}%` }}
                />
              </div>
            </div>

            {/* Metric 2: Illumination */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#8D99AE] font-mono">2. Illumination & Uniformity</span>
                <span className={`font-mono font-bold ${
                  caseData.image.illuminationScore >= 80 ? "text-[#2EC4B6]" : caseData.image.illuminationScore >= 65 ? "text-[#E09F3E]" : "text-red-400"
                }`}>
                  {caseData.image.illuminationScore}% — {caseData.image.illuminationScore >= 80 ? "GOOD" : caseData.image.illuminationScore >= 65 ? "ACCEPTABLE" : "UNEVEN SHADOW"}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#0E1214] overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    caseData.image.illuminationScore >= 80 ? "bg-[#2EC4B6]" : caseData.image.illuminationScore >= 65 ? "bg-[#E09F3E]" : "bg-red-500"
                  }`}
                  style={{ width: `${caseData.image.illuminationScore}%` }}
                />
              </div>
            </div>

            {/* Metric 3: FOV */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#8D99AE] font-mono">3. Field of View (45° Aperture)</span>
                <span className={`font-mono font-bold ${
                  caseData.image.fovScore >= 80 ? "text-[#2EC4B6]" : caseData.image.fovScore >= 65 ? "text-[#E09F3E]" : "text-red-400"
                }`}>
                  {caseData.image.fovScore}% — {caseData.image.fovScore >= 80 ? "GOOD" : caseData.image.fovScore >= 65 ? "ACCEPTABLE" : "PARTIAL / OCCLUDED"}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#0E1214] overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    caseData.image.fovScore >= 80 ? "bg-[#2EC4B6]" : caseData.image.fovScore >= 65 ? "bg-[#E09F3E]" : "bg-red-500"
                  }`}
                  style={{ width: `${caseData.image.fovScore}%` }}
                />
              </div>
            </div>

            {/* Processing Checklist */}
            <div className="pt-3 border-t border-[#222B30] space-y-1.5 text-xs font-mono">
              <div className="text-[11px] uppercase tracking-wider text-[#8D99AE] mb-1">Pre-processing Pipeline:</div>
              <div className="flex items-center gap-2 text-[#2EC4B6]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Focus assessment (Laplacian variance)
              </div>
              <div className="flex items-center gap-2 text-[#2EC4B6]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Illumination normalization
              </div>
              <div className="flex items-center gap-2 text-[#2EC4B6]">
                <CheckCircle2 className="w-3.5 h-3.5" /> CLAHE enhancement applied
              </div>
              <div className="flex items-center gap-2 text-[#2EC4B6]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Bilateral noise reduction
              </div>
              <div className="flex items-center gap-2 text-[#2EC4B6]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Circular retinal mask 45° verified
              </div>
            </div>

          </div>

          {/* Recapture / Feedback Box */}
          {!isGradeable ? (
            <div className="bg-red-950/40 border border-red-500/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                Image Quality Insufficient for AI Screening
              </div>
              <div className="text-xs text-[#F7F4EE] space-y-1 pl-7">
                {caseData.image.reasons?.map((r, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-red-400 font-bold">•</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#141A1D] border border-red-500/30 p-3 rounded-xl text-xs space-y-1">
                <span className="font-semibold text-[#E09F3E] block">Operator Guidance:</span>
                <p className="text-[#8D99AE]">{caseData.image.recaptureGuidance}</p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    if (onRecaptureRequest) onRecaptureRequest();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg"
                >
                  <RefreshCw className="w-4 h-4" /> RECAPTURE IMAGE AT PHC
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    const goodCase = demoCases.find(c => c.id === "case-1") || demoCases[0];
                    onSelectCase(goodCase);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-[#1E2528] hover:bg-[#253036] text-[#F7F4EE] text-xs font-mono"
                >
                  Switch to Case 1
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#162423] border border-[#2EC4B6]/40 rounded-2xl p-4 text-xs space-y-1">
              <div className="font-bold text-[#2EC4B6] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Quality Gate Passed
              </div>
              <p className="text-[#8D99AE]">
                Image quality metrics meet or exceed clinical screening standards. Ready for deep-learning retinal feature extraction.
              </p>
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
          <ArrowLeft className="w-4 h-4" /> Back to Acquisition
        </button>

        <button
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-sm shadow-xl shadow-[#D95338]/25 flex items-center gap-2 transition-all group"
        >
          <span>START RETINAL ANALYSIS</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
