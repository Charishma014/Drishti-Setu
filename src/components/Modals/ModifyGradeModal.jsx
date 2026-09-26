import React, { useState } from "react";
import { X, CheckCircle2, Edit3, Stethoscope } from "lucide-react";
import { soundManager } from "../../utils/audio";

export default function ModifyGradeModal({ isOpen, onClose, currentGrade, onSave }) {
  const [selectedLevel, setSelectedLevel] = useState(currentGrade?.level ?? 2);
  const [overrideReason, setOverrideReason] = useState("Clinician adjusted grade based on subtle parafoveal microaneurysms visible on magnified inspection.");

  if (!isOpen) return null;

  const levels = [
    { level: 0, title: "Level 0 — No DR" },
    { level: 1, title: "Level 1 — Mild NPDR" },
    { level: 2, title: "Level 2 — Moderate NPDR" },
    { level: 3, title: "Level 3 — Severe NPDR" },
    { level: 4, title: "Level 4 — Proliferative DR" },
  ];

  const handleSave = () => {
    soundManager.playSuccess();
    onSave(selectedLevel, overrideReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#141A1D] border border-[#2C3940] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-[#F7F4EE]">
        
        <div className="flex items-center justify-between pb-3 border-b border-[#222B30]">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-[#E09F3E]" />
            <h3 className="font-bold text-base font-serif">Modify AI Severity Classification</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#1E2528] text-[#8D99AE] hover:text-[#F7F4EE]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#8D99AE]">
          As the reviewing clinician, you have full diagnostic authority to adjust the AI predicted grade and log your clinical rationale.
        </p>

        <div className="space-y-2">
          <label className="block text-xs font-mono text-[#8D99AE]">Select Overriding DR Level:</label>
          <div className="grid grid-cols-1 gap-1.5">
            {levels.map((lvl) => (
              <button
                key={lvl.level}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedLevel(lvl.level);
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  selectedLevel === lvl.level
                    ? "bg-[#1C252A] border-[#D95338] text-[#F7F4EE] font-bold ring-1 ring-[#D95338]/50"
                    : "bg-[#0E1214] border-[#1E2528] text-[#8D99AE] hover:text-[#F7F4EE]"
                }`}
              >
                <span>{lvl.title}</span>
                {selectedLevel === lvl.level && <CheckCircle2 className="w-4 h-4 text-[#D95338]" />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">Clinical Justification & Notes:</label>
          <textarea
            rows={3}
            value={overrideReason}
            onChange={(e) => setOverrideReason(e.target.value)}
            className="w-full bg-[#0E1214] border border-[#2C3940] rounded-xl p-3 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#D95338]"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#222B30]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#182024] hover:bg-[#202B30] text-xs font-mono text-[#8D99AE] hover:text-[#F7F4EE]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#D95338] hover:bg-[#E65A3C] text-white text-xs font-mono font-bold shadow-md shadow-[#D95338]/20"
          >
            Save Clinician Override
          </button>
        </div>

      </div>
    </div>
  );
}
