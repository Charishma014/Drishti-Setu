import React, { useState, useEffect } from "react";
import { 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Activity, 
  Eye, 
  Target, 
  Scan, 
  CheckCheck,
  AlertCircle
} from "lucide-react";
import FundusCanvas from "../FundusCanvas";
import { soundManager } from "../../utils/audio";

export default function Screen5Analysis({
  caseData,
  onNext,
  onBack,
  customImageUrl
}) {
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [showLesionOverlay, setShowLesionOverlay] = useState(true);

  const modules = [
    { name: "Optic Disc Localization", result: caseData.analysis.opticDisc.status, detail: `CDR: ${caseData.analysis.opticDisc.cdr || "N/A"}` },
    { name: "Fovea Centralis Localization", result: caseData.analysis.fovea.status, detail: caseData.analysis.fovea.maculaStatus },
    { name: "Vessel Architecture Segmentation", result: caseData.analysis.vessels.status, detail: `Fractal Dim: ${caseData.analysis.vessels.fractalDim}` },
    { name: "Microaneurysm Detection", result: caseData.analysis.microaneurysms.status, detail: `${caseData.analysis.microaneurysms.count || 0} lesions` },
    { name: "Hard Exudate Detection", result: caseData.analysis.exudates.status, detail: `${caseData.analysis.exudates.count || 0} clusters` },
    { name: "Hemorrhage Detection", result: caseData.analysis.hemorrhages.status, detail: `${caseData.analysis.hemorrhages.count || 0} lesions` },
    { name: "Neovascularization Assessment", result: caseData.analysis.neovascularization.status, detail: caseData.analysis.neovascularization.detected ? "Detected" : "Not Detected (No NVD/NVE)" }
  ];

  useEffect(() => {
    setIsScanning(true);
    setScanProgress(0);
    setActiveModuleIdx(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          soundManager.playSuccess();
          return 100;
        }
        const nextVal = prev + 5;
        const currentIdx = Math.min(Math.floor((nextVal / 100) * modules.length), modules.length - 1);
        setActiveModuleIdx(currentIdx);
        if (nextVal % 20 === 0) {
          soundManager.playScan();
        }
        return nextVal;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [caseData]);

  const handleReplayScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setActiveModuleIdx(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#222B30]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D95338] uppercase font-bold tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5" /> Stage 4: Deep Retinal Feature Extraction
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#F7F4EE]">
            AI Multi-Lesion & Anatomy Localization
          </h2>
          <p className="text-xs text-[#8D99AE]">
            Multi-task deep learning architecture extracting optic disc, macula, and diabetic microvascular lesions.
          </p>
        </div>

        <div>
          {isScanning ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18252A] border border-[#E09F3E]/60 text-xs font-mono text-[#E09F3E] animate-pulse">
              <Scan className="w-3.5 h-3.5 animate-spin" />
              Inference in progress ({scanProgress}%)
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162925] border border-[#2EC4B6]/50 text-xs font-mono text-[#2EC4B6] font-bold">
              <CheckCheck className="w-4 h-4 text-[#2EC4B6]" />
              Analysis Complete (342ms)
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left Fundus Retinal View (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-xl relative">
          
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#8D99AE]">
              <Target className="w-3.5 h-3.5 text-[#D95338]" />
              <span>Anatomical Landmarks & Lesions</span>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                setShowLesionOverlay(!showLesionOverlay);
              }}
              className="text-[11px] font-mono text-[#E09F3E] hover:underline flex items-center gap-1"
            >
              {showLesionOverlay ? "Hide Annotations" : "Show Annotations"}
            </button>
          </div>

          {/* Canvas with Scanning Laser effect or Lesion pins */}
          <div className="my-2">
            <FundusCanvas
              caseData={caseData}
              mode={isScanning ? "scanning" : (showLesionOverlay ? "lesions" : "normal")}
              scanProgress={scanProgress}
              width={340}
              height={340}
              customImageUrl={customImageUrl}
            />
          </div>

          <div className="w-full flex items-center justify-between mt-3 pt-3 border-t border-[#222B30] text-[11px] font-mono text-[#8D99AE]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> MA
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] ml-2" /> Exudates
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] ml-2" /> Hemorrhages
            </div>
            {!isScanning && (
              <button
                onClick={handleReplayScan}
                className="text-[#2EC4B6] hover:underline"
              >
                Replay AI Scan
              </button>
            )}
          </div>

        </div>

        {/* Right Processing Modules (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#222B30]">
              <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#E09F3E]" /> Clinical Extraction Modules
              </h3>
              <span className="text-xs font-mono text-[#8D99AE]">
                {isScanning ? `${activeModuleIdx + 1}/7 Running` : "7/7 Verified"}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-[#0E1214] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D95338] via-[#E09F3E] to-[#2EC4B6] transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>

            {/* Modules List */}
            <div className="space-y-2 pt-1">
              {modules.map((m, idx) => {
                const isDone = scanProgress >= ((idx + 1) / modules.length) * 100;
                const isActive = activeModuleIdx === idx && isScanning;

                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-[#1C252A] border-[#E09F3E] text-[#F7F4EE] ring-1 ring-[#E09F3E]/40"
                        : isDone
                        ? "bg-[#141D20] border-[#2EC4B6]/30 text-[#F7F4EE]"
                        : "bg-[#0E1214] border-[#1E2528] text-[#5C677D] opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[#2EC4B6]" />
                        ) : isActive ? (
                          <div className="w-3.5 h-3.5 border-2 border-[#E09F3E] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <span className="text-[10px] font-mono text-[#5C677D]">{idx + 1}</span>
                        )}
                      </div>
                      <span className="font-medium">{m.name}</span>
                    </div>

                    <div className="text-right font-mono">
                      {isDone ? (
                        <div className="text-[#2EC4B6] font-semibold text-[11px]">{m.result}</div>
                      ) : isActive ? (
                        <span className="text-[#E09F3E] text-[10px] animate-pulse">Scanning...</span>
                      ) : (
                        <span className="text-[#4A5560] text-[10px]">Queued</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Quick Summary Card */}
          {!isScanning && (
            <div className="bg-[#182226] border border-[#2C3940] rounded-2xl p-4 text-xs space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between text-[#F7F4EE] font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#E09F3E]" /> Feature Extraction Summary:
                </span>
                <span className="font-mono text-[#2EC4B6]">Ready for Severity Grade</span>
              </div>
              <p className="text-[#8D99AE] text-[11px] leading-relaxed">
                {caseData.id === "case-1"
                  ? "Multiple microaneurysms and hard lipid exudate clusters detected in the temporal retinal arcade. Optic disc and fovea center spared."
                  : caseData.id === "case-2"
                  ? "Clean retinal background with no microvascular microaneurysms or exudative deposits. Normal vascular tree."
                  : "Feature confidence reduced due to optical blur artifacts."}
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
          <ArrowLeft className="w-4 h-4" /> Back to Quality
        </button>

        <button
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-sm shadow-xl shadow-[#D95338]/25 flex items-center gap-2 transition-all group"
        >
          <span>VIEW DR SEVERITY</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
