import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, ShieldCheck, Radio, Phone, Building, Sparkles } from "lucide-react";
import { soundManager } from "../../utils/audio";

export default function TeleTransmitModal({ isOpen, onClose, caseData }) {
  const [stage, setStage] = useState("encrypting"); // 'encrypting' | 'uploading' | 'delivered'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStage("encrypting");
      setProgress(0);
      return;
    }

    soundManager.playScan();
    setStage("encrypting");
    setProgress(20);

    const t1 = setTimeout(() => {
      setStage("uploading");
      setProgress(65);
    }, 600);

    const t2 = setTimeout(() => {
      setStage("delivered");
      setProgress(100);
      soundManager.playSuccess();
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#141A1D] border border-[#2C3940] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-[#F7F4EE]">
        
        <div className="flex items-center justify-between pb-3 border-b border-[#222B30]">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#2EC4B6] animate-pulse" />
            <h3 className="font-bold text-base font-serif">Tele-Transmission Gateway</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#1E2528] text-[#8D99AE] hover:text-[#F7F4EE]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Display */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#8D99AE]">
              {stage === "encrypting" && "Encrypting FHIR & Grad-CAM DICOM Payload..."}
              {stage === "uploading" && "Transmitting over Rural 4G Secure Link..."}
              {stage === "delivered" && "Delivered to District Hospital Triage Queue ✓"}
            </span>
            <span className="text-[#2EC4B6] font-bold">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-[#0E1214] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D95338] via-[#E09F3E] to-[#2EC4B6] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {stage === "delivered" ? (
          <div className="space-y-3 animate-fadeIn text-xs">
            <div className="p-3.5 bg-[#162925] border border-[#2EC4B6]/40 rounded-xl space-y-1.5">
              <div className="font-bold text-[#2EC4B6] flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Tele-Referral Dossier Dispatched
              </div>
              <p className="text-[#A2B2C2]">
                Referral ticket <strong className="text-[#F7F4EE]">#TREF-2026-0941</strong> generated and added to Dr. Sunita Deshmukh's high-priority review queue.
              </p>
            </div>

            <div className="p-3 bg-[#0E1214] border border-[#222B30] rounded-xl space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between text-[#8D99AE]">
                <span>Destination Center:</span>
                <span className="text-[#F7F4EE]">District Eye Hospital, Pune</span>
              </div>
              <div className="flex items-center justify-between text-[#8D99AE]">
                <span>Automated SMS Alert:</span>
                <span className="text-[#2EC4B6]">Sent to +91 98231 •••• (Patient)</span>
              </div>
              <div className="flex items-center justify-between text-[#8D99AE]">
                <span>Security Cipher:</span>
                <span className="text-[#E09F3E]">AES-256 GCM (ABDM Compliant)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-10 h-10 border-2 border-[#2EC4B6] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-[#8D99AE]">Establishing TLS 1.3 Telemedicine Tunnel...</span>
          </div>
        )}

        <div className="flex items-center justify-end pt-3 border-t border-[#222B30]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2EC4B6] hover:bg-[#28b0a3] text-[#0E1214] text-xs font-mono font-bold shadow-md"
          >
            {stage === "delivered" ? "Done" : "Cancel"}
          </button>
        </div>

      </div>
    </div>
  );
}
