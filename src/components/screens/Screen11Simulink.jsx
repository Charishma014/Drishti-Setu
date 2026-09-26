import React, { useState, useMemo } from "react";
import { 
  Sliders, 
  ArrowRight, 
  ArrowLeft, 
  Cpu, 
  Activity, 
  RotateCcw
} from "lucide-react";
import { soundManager } from "../../utils/audio";

export default function Screen11Simulink({ onNext, onBack }) {
  // Configurable Simulation Parameters (MathWorks / Simulink discrete-event queue model)
  const [patientVolume, setPatientVolume] = useState(150); // patients/day
  const [cameraSpeed, setCameraSpeed] = useState(6); // minutes per capture
  const [bandwidthMbps, setBandwidthMbps] = useState(4); // Mbps 4G link
  const [docReviewRate, setDocReviewRate] = useState(30); // cases / hour

  // Dynamic simulation calculations
  const simResults = useMemo(() => {
    const phcOperatingHours = 7; // 7 active screening hours per day
    const cameraMaxDaily = Math.floor((phcOperatingHours * 60) / cameraSpeed);
    const actualScreened = Math.min(patientVolume, cameraMaxDaily);

    // AI Quality Gate filter (8.6% recapture, 91.4% passed)
    const passedQuality = Math.round(actualScreened * 0.914);

    // Tele-transmission payload: ~4.2MB per referable case + GradCAM
    const referableCases = Math.round(passedQuality * 0.18); // 18% referable
    const uploadTimePerCaseSec = (4.2 * 8) / bandwidthMbps;
    const totalUploadTimeMinutes = (referableCases * uploadTimePerCaseSec) / 60;

    // Doctor capacity in available hours (assume 2.5 tele-doc hours/day allocated)
    const doctorAvailableHours = 2.5;
    const docCapacityDaily = Math.round(doctorAvailableHours * docReviewRate);
    const pendingBacklog = Math.max(0, referableCases - docCapacityDaily);
    const docUtilization = Math.min(100, Math.round((referableCases / docCapacityDaily) * 100));

    // Bottleneck evaluation
    let bottleneck = "Optimal Flow ✓";
    let bottleneckColor = "text-[#2EC4B6]";
    let bottleneckDesc = "System balanced. Zero queue accumulation and instant specialist turnaround.";

    if (patientVolume > cameraMaxDaily) {
      bottleneck = "PHC Camera Acquisition Limited ⚠️";
      bottleneckColor = "text-[#E09F3E]";
      bottleneckDesc = "Patient volume exceeds single camera throughput. Consider adding 2nd non-mydriatic camera.";
    } else if (bandwidthMbps < 1.5) {
      bottleneck = "Rural Bandwidth Constrained ⚠️";
      bottleneckColor = "text-[#E09F3E]";
      bottleneckDesc = "Low uplink speed slows Grad-CAM telemetry upload. Edge compression recommended.";
    } else if (docUtilization > 90) {
      bottleneck = "Specialist Review Saturation ⚠️";
      bottleneckColor = "text-[#D95338]";
      bottleneckDesc = "Referral volume nears doctor capacity. Route excess cases to secondary regional telemedicine hub.";
    }

    // Queue latency
    const avgLatencyMinutes = Math.max(5, Math.round(totalUploadTimeMinutes + (referableCases / docReviewRate) * 60 * 0.3));

    return {
      actualScreened,
      cameraMaxDaily,
      passedQuality,
      referableCases,
      doctorCapacity: docCapacityDaily,
      pendingBacklog,
      docUtilization,
      bottleneck,
      bottleneckColor,
      bottleneckDesc,
      avgLatencyMinutes,
      phcStaffUtilization: Math.min(100, Math.round((actualScreened / cameraMaxDaily) * 100))
    };
  }, [patientVolume, cameraSpeed, bandwidthMbps, docReviewRate]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#222B30]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D95338] uppercase font-bold tracking-wider mb-1">
            <Sliders className="w-3.5 h-3.5" /> Stage 10: MathWorks Simulink Discrete-Event Operations Model
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#F7F4EE]">
            Telemedicine Workflow & Capacity Simulation
          </h2>
          <p className="text-xs text-[#8D99AE]">
            Simulink-inspired queue dynamics model evaluating camera throughput, edge inference, uplink latency, and specialist capacity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#182328] border border-[#E09F3E]/40 text-xs font-mono text-[#E09F3E]">
            <Activity className="w-3.5 h-3.5" /> Live Model Solver: ODE45 / SimEvents
          </span>
        </div>
      </div>

      {/* Simulink Block Diagram Schematic */}
      <div className="bg-[#0E1214] border border-[#263138] rounded-2xl p-5 mb-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E2528]">
          <span className="text-xs font-mono uppercase text-[#8D99AE] flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[#2EC4B6]" /> Simulink Subsystem Block Pipeline
          </span>
          <span className="text-[11px] font-mono text-[#2EC4B6]">
            State: Continuous Execution
          </span>
        </div>

        {/* Visual Pipeline Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-mono">
          
          <div className="p-3 bg-[#141A1D] border border-[#2C3940] rounded-xl flex flex-col justify-between">
            <div className="text-[10px] text-[#8D99AE]">BLOCK 1</div>
            <div className="font-bold text-[#F7F4EE] my-1 text-[11px]">Patient Arrival</div>
            <div className="text-[10px] text-[#2EC4B6]">{patientVolume}/day</div>
          </div>

          <div className="p-3 bg-[#141A1D] border border-[#2C3940] rounded-xl flex flex-col justify-between">
            <div className="text-[10px] text-[#8D99AE]">BLOCK 2</div>
            <div className="font-bold text-[#F7F4EE] my-1 text-[11px]">Camera Acquire</div>
            <div className="text-[10px] text-[#E09F3E]">{cameraSpeed} min/pat</div>
          </div>

          <div className="p-3 bg-[#141A1D] border border-[#2C3940] rounded-xl flex flex-col justify-between">
            <div className="text-[10px] text-[#8D99AE]">BLOCK 3</div>
            <div className="font-bold text-[#F7F4EE] my-1 text-[11px]">Quality Filter</div>
            <div className="text-[10px] text-[#2EC4B6]">{simResults.passedQuality} passed</div>
          </div>

          <div className="p-3 bg-[#141A1D] border border-[#2C3940] rounded-xl flex flex-col justify-between">
            <div className="text-[10px] text-[#8D99AE]">BLOCK 4</div>
            <div className="font-bold text-[#F7F4EE] my-1 text-[11px]">Edge AI XAI</div>
            <div className="text-[10px] text-[#2EC4B6]">4.8s latency</div>
          </div>

          <div className="p-3 bg-[#141A1D] border border-[#2C3940] rounded-xl flex flex-col justify-between">
            <div className="text-[10px] text-[#8D99AE]">BLOCK 5</div>
            <div className="font-bold text-[#F7F4EE] my-1 text-[11px]">4G Tele-Link</div>
            <div className="text-[10px] text-[#E09F3E]">{bandwidthMbps} Mbps</div>
          </div>

          <div className="p-3 bg-[#141A1D] border border-[#D95338]/50 rounded-xl flex flex-col justify-between">
            <div className="text-[10px] text-[#D95338]">BLOCK 6</div>
            <div className="font-bold text-[#F7F4EE] my-1 text-[11px]">Doctor Triage</div>
            <div className="text-[10px] text-[#D95338]">{docReviewRate}/hr rate</div>
          </div>

        </div>

      </div>

      {/* Main Grid: Controls vs Computed Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left: 4 Interactive Sliders (6 Cols) */}
        <div className="lg:col-span-6 bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-[#222B30]">
            <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#E09F3E]" /> Dynamic Input Parameters
            </h3>
            <button
              onClick={() => {
                soundManager.playClick();
                setPatientVolume(150);
                setCameraSpeed(6);
                setBandwidthMbps(4);
                setDocReviewRate(30);
              }}
              className="text-[11px] font-mono text-[#8D99AE] hover:text-[#F7F4EE] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset Defaults
            </button>
          </div>

          {/* Slider 1: Patient Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#8D99AE]">Daily Patient Volume:</span>
              <span className="text-[#F7F4EE] font-bold">{patientVolume} patients/day</span>
            </div>
            <input
              type="range"
              min="20"
              max="350"
              step="10"
              value={patientVolume}
              onChange={(e) => {
                setPatientVolume(Number(e.target.value));
                soundManager.playBeep(450, 0.02);
              }}
              className="w-full accent-[#D95338] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#5C677D]">
              <span>20 (Low PHC)</span>
              <span>150 (Nominal)</span>
              <span>350 (Mass Camp)</span>
            </div>
          </div>

          {/* Slider 2: Camera Speed */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#8D99AE]">Fundus Camera Capture Time:</span>
              <span className="text-[#F7F4EE] font-bold">{cameraSpeed} min / patient</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="1"
              value={cameraSpeed}
              onChange={(e) => {
                setCameraSpeed(Number(e.target.value));
                soundManager.playBeep(520, 0.02);
              }}
              className="w-full accent-[#E09F3E] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#5C677D]">
              <span>2 min (Fast Auto)</span>
              <span>6 min (Standard)</span>
              <span>15 min (Difficult pupil)</span>
            </div>
          </div>

          {/* Slider 3: Bandwidth */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#8D99AE]">Rural Tele-Uplink Bandwidth:</span>
              <span className="text-[#F7F4EE] font-bold">{bandwidthMbps} Mbps</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="25"
              step="0.5"
              value={bandwidthMbps}
              onChange={(e) => {
                setBandwidthMbps(Number(e.target.value));
                soundManager.playBeep(600, 0.02);
              }}
              className="w-full accent-[#2EC4B6] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#5C677D]">
              <span>0.5 Mbps (2G/Poor)</span>
              <span>4 Mbps (Rural 4G)</span>
              <span>25 Mbps (Fiber/5G)</span>
            </div>
          </div>

          {/* Slider 4: Doctor Review Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#8D99AE]">Doctor Triage Capacity:</span>
              <span className="text-[#F7F4EE] font-bold">{docReviewRate} cases / hour</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={docReviewRate}
              onChange={(e) => {
                setDocReviewRate(Number(e.target.value));
                soundManager.playBeep(680, 0.02);
              }}
              className="w-full accent-[#D95338] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#5C677D]">
              <span>10 (Manual deep)</span>
              <span>30 (XAI Assisted)</span>
              <span>60 (Fast triage)</span>
            </div>
          </div>

        </div>

        {/* Right: Real-time Computed Simulation Results (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#222B30]">
              <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#2EC4B6]" /> Solved Operational Metrics
              </h3>
              <span className="text-xs font-mono text-[#E09F3E]">Real-time Calculation</span>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              
              <div className="p-3 bg-[#0E1214] rounded-xl border border-[#222B30]">
                <div className="text-[10px] text-[#8D99AE] uppercase">Screened / Day</div>
                <div className="text-xl font-bold text-[#F7F4EE] mt-0.5">
                  {simResults.actualScreened} <span className="text-xs font-normal text-[#8D99AE]">/ {patientVolume}</span>
                </div>
              </div>

              <div className="p-3 bg-[#0E1214] rounded-xl border border-[#222B30]">
                <div className="text-[10px] text-[#8D99AE] uppercase">Referrals Queued</div>
                <div className="text-xl font-bold text-[#D95338] mt-0.5">
                  {simResults.referableCases} <span className="text-xs font-normal text-[#8D99AE]">cases</span>
                </div>
              </div>

              <div className="p-3 bg-[#0E1214] rounded-xl border border-[#222B30]">
                <div className="text-[10px] text-[#8D99AE] uppercase">Doctor Utilization</div>
                <div className="text-xl font-bold text-[#2EC4B6] mt-0.5">
                  {simResults.docUtilization}%
                </div>
              </div>

              <div className="p-3 bg-[#0E1214] rounded-xl border border-[#222B30]">
                <div className="text-[10px] text-[#8D99AE] uppercase">Triage Turnaround</div>
                <div className="text-xl font-bold text-[#E09F3E] mt-0.5">
                  {simResults.avgLatencyMinutes} <span className="text-xs font-normal text-[#8D99AE]">mins</span>
                </div>
              </div>

            </div>

            {/* Bottleneck Diagnostic Banner */}
            <div className="p-3.5 rounded-xl bg-[#0E1214] border border-[#2C3940] space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#8D99AE]">Dynamic Bottleneck Status:</span>
                <span className={`font-bold ${simResults.bottleneckColor}`}>{simResults.bottleneck}</span>
              </div>
              <p className="text-[11px] text-[#A2B2C2] leading-relaxed font-sans">
                {simResults.bottleneckDesc}
              </p>
            </div>

            {/* Resource Utilization Meter */}
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#8D99AE]">PHC Camera Unit Load</span>
                <span className="text-[#F7F4EE]">{simResults.phcStaffUtilization}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#0E1214] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    simResults.phcStaffUtilization > 90 ? "bg-red-500" : "bg-[#2EC4B6]"
                  }`}
                  style={{ width: `${simResults.phcStaffUtilization}%` }}
                />
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
          className="px-5 py-2.5 rounded-xl bg-[#141A1D] hover:bg-[#1E2528] border border-[#222B30] text-[#8D99AE] hover:text-[#F7F4EE] text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Operations
        </button>

        <button
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-sm shadow-xl shadow-[#D95338]/25 flex items-center gap-2 transition-all group cursor-pointer"
        >
          <span>VIEW IMPACT & SUMMARY</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
