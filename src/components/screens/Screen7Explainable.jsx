import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Activity, 
  Search,
  ShieldCheck
} from "lucide-react";
import FundusCanvas from "../FundusCanvas";
import { soundManager } from "../../utils/audio";

export default function Screen7Explainable({
  caseData,
  onNext,
  onBack,
  customImageUrl
}) {
  const [viewLayer, setViewLayer] = useState("gradcam"); // 'normal' | 'gradcam' | 'lesions' | 'combined'
  const [selectedLesion, setSelectedLesion] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#222B30]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D95338] uppercase font-bold tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Stage 6: Transparent Evidence & Explainable AI
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#F7F4EE]">
            Explainable AI — Why this result?
          </h2>
          <p className="text-xs text-[#8D99AE]">
            SIH26038 XAI Core: Providing ophthalmologists with transparent Grad-CAM activation maps and lesion-level verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#162925] border border-[#2EC4B6]/50 text-xs font-mono text-[#2EC4B6] font-bold shadow-md">
            <ShieldCheck className="w-4 h-4 text-[#2EC4B6]" />
            {caseData.explainable.statusText}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left Fundus & Layer Selector (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-xl">
          
          {/* Layer Selector Tabs */}
          <div className="w-full grid grid-cols-4 gap-1.5 mb-3 bg-[#0E1214] p-1.5 rounded-xl border border-[#2C3940]">
            <button
              onClick={() => {
                soundManager.playClick();
                setViewLayer("normal");
              }}
              className={`py-1.5 text-[11px] font-mono rounded-lg font-medium transition-all ${
                viewLayer === "normal"
                  ? "bg-[#1E2528] text-[#F7F4EE] border border-[#3A4B54]"
                  : "text-[#8D99AE] hover:text-[#F7F4EE]"
              }`}
            >
              Original
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setViewLayer("gradcam");
              }}
              className={`py-1.5 text-[11px] font-mono rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
                viewLayer === "gradcam"
                  ? "bg-[#D95338] text-white shadow-md shadow-[#D95338]/30"
                  : "text-[#8D99AE] hover:text-[#F7F4EE]"
              }`}
            >
              <Sparkles className="w-3 h-3" /> Grad-CAM
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setViewLayer("lesions");
              }}
              className={`py-1.5 text-[11px] font-mono rounded-lg font-medium transition-all ${
                viewLayer === "lesions"
                  ? "bg-[#1E2528] text-[#F7F4EE] border border-[#3A4B54]"
                  : "text-[#8D99AE] hover:text-[#F7F4EE]"
              }`}
            >
              Lesions
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setViewLayer("combined");
              }}
              className={`py-1.5 text-[11px] font-mono rounded-lg font-semibold transition-all ${
                viewLayer === "combined"
                  ? "bg-[#2EC4B6] text-[#0E1214]"
                  : "text-[#8D99AE] hover:text-[#F7F4EE]"
              }`}
            >
              Combined
            </button>
          </div>

          {/* Retinal Canvas */}
          <div className="my-2">
            <FundusCanvas
              caseData={caseData}
              mode={viewLayer}
              width={340}
              height={340}
              customImageUrl={customImageUrl}
              onSelectLesion={(lesion) => {
                soundManager.playClick();
                setSelectedLesion(lesion);
              }}
              highlightLesionId={selectedLesion?.id}
            />
          </div>

          {/* Heatmap Legend */}
          <div className="w-full flex items-center justify-between mt-2 pt-2 border-t border-[#222B30] text-[10px] font-mono text-[#8D99AE]">
            <span>Low Relevance</span>
            <div className="w-36 h-2 rounded-full bg-gradient-to-r from-blue-500 via-green-400 via-yellow-400 to-red-600" />
            <span className="text-red-400 font-bold">Peak Activation</span>
          </div>

        </div>

        {/* Right Explainability & Evidence Panel (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* AI Evidence Checklist */}
          <div className="bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#222B30]">
              <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#E09F3E]" /> Localized AI Clinical Evidence
              </h3>
              <span className="text-xs font-mono text-[#2EC4B6]">
                Confidence: {caseData.explainable.confidence}
              </span>
            </div>

            <div className="space-y-2">
              {caseData.explainable.evidencePoints?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-[#0E1214] border border-[#1E2528] text-xs flex items-start justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-[#F7F4EE] flex items-center gap-1.5">
                      <span className="text-[#D95338] font-mono">#{idx + 1}</span>
                      {item.title}
                    </div>
                    <p className="text-[11px] text-[#8D99AE] leading-relaxed">{item.desc}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                    item.badge === "Confirmed"
                      ? "bg-[#D95338]/20 text-[#E65A3C]"
                      : item.badge === "Negative" || item.badge === "Healthy" || item.badge === "Verified"
                      ? "bg-[#2EC4B6]/20 text-[#2EC4B6]"
                      : "bg-[#1E2528] text-[#8D99AE]"
                  }`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Clinical Reasoning Paragraph */}
          <div className="bg-[#182328] border border-[#2C3940] rounded-2xl p-4 space-y-2">
            <h4 className="font-semibold text-xs text-[#E09F3E] uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Clinical Reasoning Summary:
            </h4>
            <p className="text-xs text-[#F7F4EE] leading-relaxed font-sans">
              “{caseData.explainable.clinicalReasoning}”
            </p>
          </div>

          {/* SIH Clinician Advisory Note */}
          <div className="p-3 bg-[#141A1D] border border-[#222B30] rounded-xl text-[11px] text-[#8D99AE] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#2EC4B6] shrink-0 mt-0.5" />
            <span>
              <strong>Ophthalmologist Decision Support:</strong> Grad-CAM heatmaps highlight relevant features to aid expert verification. Final diagnosis remains with qualified clinicians.
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
          <ArrowLeft className="w-4 h-4" /> Back to Grade
        </button>

        <button
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-sm shadow-xl shadow-[#D95338]/25 flex items-center gap-2 transition-all group"
        >
          <span>SEND FOR CLINICAL REVIEW</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
