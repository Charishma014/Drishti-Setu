import React, { useState } from "react";
import { 
  Camera, 
  Upload, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Eye, 
  Sparkles,
  Info,
  Maximize2,
  HardDrive
} from "lucide-react";
import FundusCanvas from "../FundusCanvas";
import { soundManager } from "../../utils/audio";

export default function Screen3Acquisition({
  caseData,
  onNext,
  onBack,
  customImageUrl,
  onUploadImage,
  onResetImage,
  demoCases,
  onSelectCase
}) {
  const [selectedEye, setSelectedEye] = useState(caseData.image.eye.includes("Left") ? "Left" : "Right");
  const [isSimulatingCapture, setIsSimulatingCapture] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    soundManager.playScan();
    const url = URL.createObjectURL(file);
    if (onUploadImage) onUploadImage(url, file.name);
  };

  const handleSimulateCapture = () => {
    setIsSimulatingCapture(true);
    soundManager.playScan();
    setTimeout(() => {
      setIsSimulatingCapture(false);
      soundManager.playSuccess();
    }, 900);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#222B30]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D95338] uppercase font-bold tracking-wider mb-1">
            <Camera className="w-3.5 h-3.5" /> Stage 2: Retinal Fundus Acquisition
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#F7F4EE]">
            Digital Non-Mydriatic Fundus Capture
          </h2>
          <p className="text-xs text-[#8D99AE]">
            Acquiring 45° posterior pole fundus photograph from portable primary health centre camera.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182322] border border-[#2EC4B6]/40 text-xs font-mono text-[#2EC4B6]">
            <CheckCircle2 className="w-3.5 h-3.5" /> Image Received & Buffered
          </span>
        </div>
      </div>

      {/* Main Acquisition Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Central Retinal Viewport (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#141A1D] border border-[#222B30] rounded-2xl p-6 shadow-xl relative min-h-[440px]">
          
          {/* Top Bar inside Viewport */}
          <div className="w-full flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className="flex bg-[#0E1214] p-1 rounded-lg border border-[#2C3940]">
                <button
                  onClick={() => {
                    setSelectedEye("Right");
                    soundManager.playClick();
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded font-medium transition-all ${
                    selectedEye === "Right" ? "bg-[#D95338] text-white" : "text-[#8D99AE]"
                  }`}
                >
                  OD (Right Eye)
                </button>
                <button
                  onClick={() => {
                    setSelectedEye("Left");
                    soundManager.playClick();
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded font-medium transition-all ${
                    selectedEye === "Left" ? "bg-[#D95338] text-white" : "text-[#8D99AE]"
                  }`}
                >
                  OS (Left Eye)
                </button>
              </div>
            </div>

            <div className="text-xs font-mono text-[#8D99AE] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-pulse" />
              <span>LIVE BUFFER</span>
            </div>
          </div>

          {/* Retinal Canvas */}
          <div className="relative my-auto">
            {isSimulatingCapture ? (
              <div className="w-[360px] h-[360px] rounded-full bg-[#0E1214] flex flex-col items-center justify-center border border-[#D95338] animate-pulse">
                <Camera className="w-12 h-12 text-[#D95338] animate-bounce mb-3" />
                <span className="text-xs font-mono text-[#F7F4EE]">Acquiring Flash Exposure...</span>
              </div>
            ) : (
              <FundusCanvas
                caseData={caseData}
                mode="normal"
                width={360}
                height={360}
                customImageUrl={customImageUrl}
              />
            )}
          </div>

          {/* Quick Preset / Demo Switcher below Canvas */}
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#8D99AE]">
            <span>Active Preset:</span>
            <span className="text-[#F7F4EE] font-semibold">{caseData.label}</span>
          </div>

        </div>

        {/* Right Details & Upload Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Hardware & Image Metadata */}
          <div className="bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-3">
            <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2 pb-2 border-b border-[#222B30]">
              <HardDrive className="w-4 h-4 text-[#E09F3E]" /> Acquisition Telemetry
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#1E2528]">
                <span className="text-[#8D99AE]">Selected Eye</span>
                <span className="font-mono text-[#F7F4EE] font-semibold">{caseData.image.eye}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E2528]">
                <span className="text-[#8D99AE]">Resolution</span>
                <span className="font-mono text-[#F7F4EE]">{caseData.image.resolution}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E2528]">
                <span className="text-[#8D99AE]">Camera Device</span>
                <span className="font-mono text-[#F7F4EE]">{caseData.image.camera}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E2528]">
                <span className="text-[#8D99AE]">Capture Mode</span>
                <span className="font-mono text-[#F7F4EE]">{caseData.image.captureMode}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E2528]">
                <span className="text-[#8D99AE]">Sensor Array</span>
                <span className="font-mono text-[#F7F4EE]">{caseData.image.sensor}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8D99AE]">Patient ABHA Link</span>
                <span className="font-mono text-[#2EC4B6] font-bold">{caseData.patient.id}</span>
              </div>
            </div>
          </div>

          {/* Action Box: Upload / Presets */}
          <div className="bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-3">
            <h3 className="font-semibold text-[#F7F4EE] text-xs uppercase font-mono tracking-wider text-[#8D99AE]">
              Acquisition Source
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* File Upload Button */}
              <label className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1C252A] border border-[#2C3940] hover:border-[#D95338] text-center cursor-pointer transition-all hover:bg-[#222D33] group">
                <Upload className="w-5 h-5 text-[#D95338] mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-[#F7F4EE]">UPLOAD IMAGE</span>
                <span className="text-[10px] text-[#8D99AE]">JPG, PNG, DICOM</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Demo Image Reload */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  if (onResetImage) onResetImage();
                  handleSimulateCapture();
                }}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1C252A] border border-[#2C3940] hover:border-[#2EC4B6] text-center transition-all hover:bg-[#222D33] group"
              >
                <Sparkles className="w-5 h-5 text-[#2EC4B6] mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-[#F7F4EE]">USE DEMO IMAGE</span>
                <span className="text-[10px] text-[#8D99AE]">Realistic Fundus</span>
              </button>
            </div>

            {/* Quick Demo Case Switcher */}
            <div className="pt-2">
              <span className="text-[10px] font-mono text-[#8D99AE] block mb-1.5">Load Alternate Case:</span>
              <div className="grid grid-cols-3 gap-1.5">
                {demoCases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      soundManager.playClick();
                      onSelectCase(c);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-mono text-center truncate transition-all ${
                      caseData.id === c.id
                        ? "bg-[#D95338] text-white font-bold"
                        : "bg-[#0E1214] text-[#8D99AE] border border-[#222B30] hover:text-[#F7F4EE]"
                    }`}
                  >
                    {c.id === "case-1" ? "1: NPDR" : c.id === "case-2" ? "2: Normal" : "3: Blur"}
                  </button>
                ))}
              </div>
            </div>

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
          <ArrowLeft className="w-4 h-4" /> Back to Patient
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-sm shadow-xl shadow-[#D95338]/25 flex items-center gap-2 transition-all group"
        >
          <span>RUN IMAGE QUALITY CHECK</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
