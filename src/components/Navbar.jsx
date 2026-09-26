import React from "react";
import { 
  Eye, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Activity,
  Layers,
  Award
} from "lucide-react";
import { soundManager } from "../utils/audio";

export default function Navbar({
  currentStep,
  selectedCase,
  onSelectCase,
  onReset,
  demoCases,
  isAudioOn,
  onToggleAudio
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#0E1214]/95 backdrop-blur-md border-b border-[#222B30] text-[#F7F4EE] px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => onReset(1)}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#D95338] to-[#9A331A] text-white shadow-lg shadow-[#D95338]/20 border border-[#E65A3C]/40">
            <Eye className="w-5 h-5 text-[#F7F4EE]" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#2EC4B6] border-2 border-[#0E1214] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight font-serif text-[#F7F4EE]">
                Drishti <span className="text-[#D95338]">Setu</span>
              </h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#1C252A] border border-[#2C3940] text-[#E09F3E] font-bold tracking-wider">
                SIH26038
              </span>
            </div>
            <p className="text-xs text-[#8D99AE] tracking-normal font-sans">
              Bridging Rural Screening with Explainable Eye Care
            </p>
          </div>
        </div>

        {/* Center Case Selector for Judges */}
        <div className="hidden md:flex items-center gap-2 bg-[#141A1D] px-2 py-1.5 rounded-xl border border-[#222B30]">
          <span className="text-[11px] font-mono text-[#8D99AE] uppercase tracking-wider px-2 flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#E09F3E]" /> Case:
          </span>
          {demoCases.map((c) => {
            const isSelected = selectedCase.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectCase(c);
                }}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? c.badgeColor === "amber"
                      ? "bg-[#D95338] text-white shadow-md shadow-[#D95338]/30 font-semibold"
                      : c.badgeColor === "emerald"
                      ? "bg-[#2EC4B6] text-[#0E1214] font-bold shadow-md shadow-[#2EC4B6]/30"
                      : "bg-[#EF4444] text-white font-semibold"
                    : "text-[#8D99AE] hover:text-[#F7F4EE] hover:bg-[#1E2528]"
                }`}
              >
                {c.id === "case-1" && "Case 1: Moderate NPDR"}
                {c.id === "case-2" && "Case 2: No DR"}
                {c.id === "case-3" && "Case 3: Poor Quality"}
              </button>
            );
          })}
        </div>

        {/* Right Tools: Sound, Reset, Status */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              onToggleAudio();
              soundManager.playClick();
            }}
            title={isAudioOn ? "Mute audio cues" : "Unmute audio cues"}
            className="p-2 rounded-lg bg-[#141A1D] border border-[#222B30] text-[#8D99AE] hover:text-[#F7F4EE] hover:border-[#3A4B54] transition-all text-xs flex items-center gap-1"
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 text-[#2EC4B6]" /> : <VolumeX className="w-4 h-4 text-[#8D99AE]" />}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onReset(1);
            }}
            title="Restart screening workflow"
            className="px-3 py-1.5 rounded-lg bg-[#141A1D] border border-[#222B30] text-[#8D99AE] hover:text-[#F7F4EE] hover:border-[#D95338] transition-all text-xs font-mono flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-[#222B30]">
            <span className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-pulse" />
            <span className="text-xs font-mono text-[#A2B2C2]">PHC Triage Active</span>
          </div>
        </div>

      </div>
    </header>
  );
}
