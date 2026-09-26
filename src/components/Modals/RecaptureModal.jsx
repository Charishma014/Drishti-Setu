import React from "react";
import { X, RefreshCw, AlertTriangle, ArrowRight, Camera } from "lucide-react";
import { soundManager } from "../../utils/audio";

export default function RecaptureModal({ isOpen, onClose, onConfirmRecapture }) {
  if (!isOpen) return null;

  const handleTrigger = () => {
    soundManager.playScan();
    onConfirmRecapture();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#141A1D] border border-red-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-[#F7F4EE]">
        
        <div className="flex items-center justify-between pb-3 border-b border-[#222B30]">
          <div className="flex items-center gap-2 text-red-400">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <h3 className="font-bold text-base font-serif">Request Fundus Recapture at PHC</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#1E2528] text-[#8D99AE] hover:text-[#F7F4EE]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-red-950/40 border border-red-500/30 p-4 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-red-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Operator Quality Alert
          </div>
          <p className="text-[#A2B2C2] leading-relaxed">
            The reviewing clinician has flagged image clarity as insufficient for definitive diagnostic sign-off.
          </p>
        </div>

        <div className="space-y-2 text-xs">
          <span className="font-mono text-[#E09F3E] font-semibold block">Instructions sent to PHC Operator:</span>
          <ul className="text-[#8D99AE] space-y-1.5 list-disc pl-4">
            <li>Dim room lighting to encourage physiological mydriasis (pupil dilation).</li>
            <li>Position camera lens 2–3 cm closer to corneal apex to eliminate peripheral shadow.</li>
            <li>Instruct patient to fixate on the internal green fixation target LED.</li>
          </ul>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#222B30]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#182024] hover:bg-[#202B30] text-xs font-mono text-[#8D99AE] hover:text-[#F7F4EE]"
          >
            Cancel
          </button>
          <button
            onClick={handleTrigger}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold shadow-md flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Transmit Recapture Order</span>
          </button>
        </div>

      </div>
    </div>
  );
}
