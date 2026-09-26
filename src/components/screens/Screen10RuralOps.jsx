import React, { useState } from "react";
import { 
  Network, 
  ArrowRight, 
  ArrowLeft, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Stethoscope, 
  RefreshCw, 
  Activity, 
  TrendingUp, 
  Layers, 
  Radio,
  MapPin,
  Sparkles
} from "lucide-react";
import { soundManager } from "../../utils/audio";

export default function Screen10RuralOps({ onNext, onBack }) {
  const [selectedHub, setSelectedHub] = useState("dist-1");

  const phcNodes = [
    { id: "phc-1", name: "Chandrapur PHC", screened: 34, referable: 6, recapture: 2, status: "Active" },
    { id: "phc-2", name: "Ballarpur Sub-Center", screened: 28, referable: 5, recapture: 3, status: "Active" },
    { id: "phc-3", name: "Warora Health Post", screened: 22, referable: 4, recapture: 1, status: "Active" },
    { id: "phc-4", name: "Chimur Rural Clinic", screened: 25, referable: 5, recapture: 3, status: "Active" },
    { id: "phc-5", name: "Bhadravati Mobile Van", screened: 19, referable: 3, recapture: 2, status: "Active" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#222B30]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D95338] uppercase font-bold tracking-wider mb-1">
            <Network className="w-3.5 h-3.5" /> Stage 9: Rural Deployment & Tele-Ophthalmology Grid
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#F7F4EE]">
            Rural Screening Operations & Telemedicine Network
          </h2>
          <p className="text-xs text-[#8D99AE]">
            Multi-node PHC screening topology connecting rural primary care with central ophthalmic triage specialists.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#162925] border border-[#2EC4B6]/50 text-xs font-mono text-[#2EC4B6] font-bold shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-pulse" />
            5 PHC Nodes Live
          </span>
        </div>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        
        <div className="bg-[#141A1D] border border-[#222B30] p-4 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-[#8D99AE] text-xs font-mono mb-1">
            <span>Screened Today</span>
            <Users className="w-3.5 h-3.5 text-[#2EC4B6]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F7F4EE]">128</div>
          <div className="text-[10px] text-[#2EC4B6] font-mono mt-1">↑ +18% vs weekly avg</div>
        </div>

        <div className="bg-[#141A1D] border border-[#222B30] p-4 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-[#8D99AE] text-xs font-mono mb-1">
            <span>Referable Cases</span>
            <AlertTriangle className="w-3.5 h-3.5 text-[#D95338]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#D95338]">23</div>
          <div className="text-[10px] text-[#8D99AE] font-mono mt-1">18.0% of cohort</div>
        </div>

        <div className="bg-[#141A1D] border border-[#222B30] p-4 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-[#8D99AE] text-xs font-mono mb-1">
            <span>Recapture Req.</span>
            <RefreshCw className="w-3.5 h-3.5 text-[#E09F3E]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#E09F3E]">11</div>
          <div className="text-[10px] text-[#8D99AE] font-mono mt-1">8.6% quality gate</div>
        </div>

        <div className="bg-[#141A1D] border border-[#222B30] p-4 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-[#8D99AE] text-xs font-mono mb-1">
            <span>Pending Reviews</span>
            <Clock className="w-3.5 h-3.5 text-[#A2B2C2]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F7F4EE]">7</div>
          <div className="text-[10px] text-[#2EC4B6] font-mono mt-1">&lt; 15 min wait time</div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-[#141A1D] border border-[#222B30] p-4 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-[#8D99AE] text-xs font-mono mb-1">
            <span>Avg AI Time</span>
            <Activity className="w-3.5 h-3.5 text-[#2EC4B6]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#2EC4B6]">4.8s</div>
          <div className="text-[10px] text-[#8D99AE] font-mono mt-1">Local edge inference</div>
        </div>

      </div>

      {/* Network Topology Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left: Interactive 3-Tier Network Flow (8 Cols) */}
        <div className="lg:col-span-8 bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#222B30]">
            <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2">
              <Network className="w-4 h-4 text-[#2EC4B6]" /> Telemedicine Referral Flow Architecture
            </h3>
            <span className="text-xs font-mono text-[#8D99AE]">District Hub: Pune / Nagpur</span>
          </div>

          {/* Animated 3-Tier Step Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
            
            {/* Tier 1: Rural PHC */}
            <div className="p-4 rounded-xl bg-[#0E1214] border border-[#2C3940] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-[#1E2528] px-2 py-0.5 rounded text-[#2EC4B6]">
                  Tier 1: PHC Edge
                </span>
                <span className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-ping" />
              </div>
              <h4 className="font-bold text-xs text-[#F7F4EE]">Rural Screening Nodes</h4>
              <p className="text-[11px] text-[#8D99AE] leading-relaxed">
                ASHA / Health Worker captures non-mydriatic fundus photo. Local AI quality check & edge preprocessing in 4.8s.
              </p>
              <div className="text-[10px] font-mono text-[#2EC4B6] pt-1 border-t border-[#1E2528]">
                ✓ Normal (82%) Discharged
              </div>
            </div>

            {/* Tier 2: District Triage Gateway */}
            <div className="p-4 rounded-xl bg-[#0E1214] border border-[#E09F3E]/40 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-[#1E2528] px-2 py-0.5 rounded text-[#E09F3E]">
                  Tier 2: Triage Hub
                </span>
                <Radio className="w-3.5 h-3.5 text-[#E09F3E] animate-pulse" />
              </div>
              <h4 className="font-bold text-xs text-[#F7F4EE]">District Tele-Gateway</h4>
              <p className="text-[11px] text-[#8D99AE] leading-relaxed">
                Prioritizes Referable (Level 2+) dockets with Grad-CAM heatmaps over low-bandwidth rural 4G link.
              </p>
              <div className="text-[10px] font-mono text-[#E09F3E] pt-1 border-t border-[#1E2528]">
                ⚡ AI-Prioritized Queue
              </div>
            </div>

            {/* Tier 3: Specialist Doctor */}
            <div className="p-4 rounded-xl bg-[#0E1214] border border-[#D95338]/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-[#1E2528] px-2 py-0.5 rounded text-[#D95338]">
                  Tier 3: Specialist
                </span>
                <Stethoscope className="w-3.5 h-3.5 text-[#D95338]" />
              </div>
              <h4 className="font-bold text-xs text-[#F7F4EE]">Tele-Ophthalmologist</h4>
              <p className="text-[11px] text-[#8D99AE] leading-relaxed">
                Doctor reviews Grad-CAM evidence in 18s per case. Signs digital referral docket for tertiary hospital OCT/Laser.
              </p>
              <div className="text-[10px] font-mono text-[#D95338] pt-1 border-t border-[#1E2528]">
                👨‍⚕️ 10x Specialist Capacity
              </div>
            </div>

          </div>

          {/* Node Status Table */}
          <div className="pt-2">
            <span className="text-xs font-mono text-[#8D99AE] block mb-2">Connected Rural Screening Centers:</span>
            <div className="space-y-1.5">
              {phcNodes.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#0E1214] border border-[#1E2528] text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2EC4B6]" />
                    <span className="text-[#F7F4EE] font-medium">{node.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#8D99AE]">
                    <span>Screened: <strong className="text-[#F7F4EE]">{node.screened}</strong></span>
                    <span>Referrals: <strong className="text-[#D95338]">{node.referable}</strong></span>
                    <span>Recaptures: <strong className="text-[#E09F3E]">{node.recapture}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Program Capacity Simulation Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#222B30]">
              <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#E09F3E]" /> Program Capacity
              </h3>
              <span className="text-[10px] font-mono text-[#8D99AE] bg-[#1E2528] px-2 py-0.5 rounded">
                SIMULATION
              </span>
            </div>

            <div className="text-center py-2 bg-[#0E1214] rounded-xl border border-[#222B30]">
              <span className="text-[10px] font-mono text-[#8D99AE] uppercase block">
                Annual Program Screening Capacity
              </span>
              <div className="text-3xl font-extrabold font-mono text-[#2EC4B6] mt-1">
                100,000+
              </div>
              <span className="text-xs text-[#A2B2C2] block mt-0.5">
                Patients / Year (50 PHC Grid)
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1E2528]">
                <span className="text-[#8D99AE]">Turnaround Time</span>
                <span className="text-[#2EC4B6] font-bold">&lt; 15 mins (vs 21 days)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E2528]">
                <span className="text-[#8D99AE]">Doctor Productivity</span>
                <span className="text-[#F7F4EE] font-bold">10x Increase</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E2528]">
                <span className="text-[#8D99AE]">Cost Per Screen</span>
                <span className="text-[#E09F3E] font-bold">₹18 (vs ₹450 clinic)</span>
              </div>
            </div>

            <div className="p-3 bg-[#182328] rounded-xl border border-[#2C3940] text-[11px] text-[#8D99AE] space-y-1">
              <span className="text-[#E09F3E] font-semibold block font-mono">Program Capacity Simulation:</span>
              <p>
                Calculated based on 50 non-mydriatic camera units deployed at block-level PHCs with centralized tele-ophthalmology triage.
              </p>
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
          <ArrowLeft className="w-4 h-4" /> Back to Clinical Report
        </button>

        <button
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-sm shadow-xl shadow-[#D95338]/25 flex items-center gap-2 transition-all group"
        >
          <span>WORKFLOW SIMULATION</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
