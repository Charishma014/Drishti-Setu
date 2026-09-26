import React, { useState } from "react";
import { 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Activity, 
  CheckSquare, 
  Square, 
  FileText, 
  Sparkles,
  HeartPulse,
  Clock,
  ShieldCheck
} from "lucide-react";
import { soundManager } from "../../utils/audio";

export default function Screen2Patient({ caseData, onUpdatePatient, onNext, onBack, demoCases, onSelectCase }) {
  const [patientData, setPatientData] = useState({
    id: caseData.patient.id,
    name: caseData.patient.name,
    age: caseData.patient.age,
    gender: caseData.patient.gender,
    diabetesDuration: caseData.patient.diabetesDuration,
    diabetesType: caseData.patient.diabetesType,
    hba1c: caseData.patient.hba1c,
    bloodGlucose: caseData.patient.bloodGlucose,
    phcLocation: caseData.patient.phcLocation,
    screeningDate: caseData.patient.screeningDate,
    visualAcuity: caseData.patient.visualAcuity,
    bloodPressure: caseData.patient.bloodPressure,
    consent: caseData.patient.consent,
    operatorName: caseData.patient.operatorName
  });

  const [hasConsent, setHasConsent] = useState(patientData.consent ?? true);
  const [consentError, setConsentError] = useState(false);

  const handleChange = (field, val) => {
    const updated = { ...patientData, [field]: val };
    setPatientData(updated);
    if (onUpdatePatient) onUpdatePatient(updated);
  };

  const handleContinue = () => {
    if (!hasConsent) {
      setConsentError(true);
      soundManager.playBeep(300, 0.2);
      return;
    }
    soundManager.playClick();
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#222B30]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D95338] uppercase font-bold tracking-wider mb-1">
            <User className="w-3.5 h-3.5" /> Stage 1: Patient Intake & Registration
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#F7F4EE]">
            Primary Health Centre Patient Registration
          </h2>
          <p className="text-xs text-[#8D99AE]">
            Record patient systemic vitals and obtain digital screening consent prior to retinal acquisition.
          </p>
        </div>

        {/* Quick Demo Case Switcher */}
        <div className="flex items-center gap-1.5 bg-[#141A1D] p-1.5 rounded-xl border border-[#222B30]">
          <span className="text-[10px] font-mono text-[#8D99AE] px-2 uppercase">Quick Load:</span>
          {demoCases.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                soundManager.playClick();
                onSelectCase(c);
                setPatientData({ ...c.patient });
                setHasConsent(true);
              }}
              className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-all ${
                caseData.id === c.id
                  ? "bg-[#D95338] text-white font-bold shadow"
                  : "text-[#8D99AE] hover:text-[#F7F4EE] hover:bg-[#1E2528]"
              }`}
            >
              {c.id === "case-1" ? "Case 1 (NPDR)" : c.id === "case-2" ? "Case 2 (No DR)" : "Case 3 (Blur)"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Intake Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Left 2 Cols: Demographics & Clinical History */}
        <div className="md:col-span-2 space-y-5 bg-[#141A1D] border border-[#222B30] rounded-2xl p-6 shadow-lg">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#222B30]">
            <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E09F3E]" /> Patient Demographics
            </h3>
            <span className="font-mono text-xs text-[#2EC4B6] bg-[#2EC4B6]/10 px-2.5 py-0.5 rounded-full border border-[#2EC4B6]/30">
              National Health ID / ABHA Linked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">Patient ID / ABHA</label>
              <input
                type="text"
                value={patientData.id}
                onChange={(e) => handleChange("id", e.target.value)}
                className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg px-3 py-2 text-sm text-[#F7F4EE] font-mono focus:outline-none focus:border-[#D95338]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">Full Name</label>
              <input
                type="text"
                value={patientData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg px-3 py-2 text-sm text-[#F7F4EE] font-semibold focus:outline-none focus:border-[#D95338]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">Age</label>
              <input
                type="number"
                value={patientData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg px-3 py-2 text-sm text-[#F7F4EE] focus:outline-none focus:border-[#D95338]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">Gender</label>
              <select
                value={patientData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg px-3 py-2 text-sm text-[#F7F4EE] focus:outline-none focus:border-[#D95338]"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">Screening Date</label>
              <input
                type="date"
                value={patientData.screeningDate}
                onChange={(e) => handleChange("screeningDate", e.target.value)}
                className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg px-3 py-2 text-sm text-[#F7F4EE] font-mono focus:outline-none focus:border-[#D95338]"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-[#222B30]">
            <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2 mb-3">
              <HeartPulse className="w-4 h-4 text-[#D95338]" /> Diabetes & Systemic History
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">Diabetes Duration</label>
                <input
                  type="text"
                  value={patientData.diabetesDuration}
                  onChange={(e) => handleChange("diabetesDuration", e.target.value)}
                  className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg px-3 py-2 text-sm text-[#F7F4EE] font-mono focus:outline-none focus:border-[#D95338]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">Type of Diabetes</label>
                <input
                  type="text"
                  value={patientData.diabetesType}
                  onChange={(e) => handleChange("diabetesType", e.target.value)}
                  className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg px-3 py-2 text-sm text-[#F7F4EE] focus:outline-none focus:border-[#D95338]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">HbA1c / Glucose</label>
                <input
                  type="text"
                  value={patientData.hba1c}
                  onChange={(e) => handleChange("hba1c", e.target.value)}
                  className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg px-3 py-2 text-sm text-[#E09F3E] font-bold font-mono focus:outline-none focus:border-[#D95338]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">Visual Acuity (Snellen)</label>
                <input
                  type="text"
                  value={patientData.visualAcuity}
                  onChange={(e) => handleChange("visualAcuity", e.target.value)}
                  className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg px-3 py-2 text-sm text-[#F7F4EE] font-mono focus:outline-none focus:border-[#D95338]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">Blood Pressure</label>
                <input
                  type="text"
                  value={patientData.bloodPressure}
                  onChange={(e) => handleChange("bloodPressure", e.target.value)}
                  className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg px-3 py-2 text-sm text-[#F7F4EE] font-mono focus:outline-none focus:border-[#D95338]"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Right Col: Screening Centre & Consent */}
        <div className="space-y-4">
          
          <div className="bg-[#141A1D] border border-[#222B30] rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="font-semibold text-[#F7F4EE] text-sm flex items-center gap-2 pb-2 border-b border-[#222B30]">
              <MapPin className="w-4 h-4 text-[#2EC4B6]" /> Facility & Operator
            </h3>

            <div>
              <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">PHC / Screening Unit</label>
              <textarea
                rows={2}
                value={patientData.phcLocation}
                onChange={(e) => handleChange("phcLocation", e.target.value)}
                className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg p-2.5 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#D95338]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8D99AE] mb-1.5">Field Operator / Health Worker</label>
              <input
                type="text"
                value={patientData.operatorName}
                onChange={(e) => handleChange("operatorName", e.target.value)}
                className="w-full bg-[#0E1214] border border-[#2C3940] rounded-lg px-3 py-2 text-xs text-[#F7F4EE] focus:outline-none focus:border-[#D95338]"
              />
            </div>

            <div className="p-3 bg-[#1B2428] rounded-xl border border-[#2A373E] text-xs text-[#8D99AE] space-y-1">
              <div className="text-[#F7F4EE] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2EC4B6]" /> Data Privacy Compliant
              </div>
              <div>ABDM compliant encrypted health record storage.</div>
            </div>
          </div>

          {/* Consent Box */}
          <div className={`p-4 rounded-2xl border transition-all ${
            consentError 
              ? "bg-red-950/30 border-red-500 shadow-lg shadow-red-500/10" 
              : "bg-[#141A1D] border-[#222B30]"
          }`}>
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <div 
                onClick={() => {
                  soundManager.playClick();
                  setHasConsent(!hasConsent);
                  setConsentError(false);
                }}
                className="mt-0.5"
              >
                {hasConsent ? (
                  <CheckSquare className="w-5 h-5 text-[#2EC4B6]" />
                ) : (
                  <Square className="w-5 h-5 text-[#8D99AE]" />
                )}
              </div>
              <div className="text-xs text-[#F7F4EE] leading-relaxed">
                <span className="font-semibold text-[#F7F4EE] block mb-0.5">
                  Patient Consent Obtained
                </span>
                <span className="text-[#8D99AE] text-[11px]">
                  Patient has been informed and consented to non-invasive digital retinal photography and AI-assisted screening analysis.
                </span>
              </div>
            </label>
            {consentError && (
              <p className="text-[11px] font-mono text-red-400 mt-2">
                * Required: Please check consent box to proceed.
              </p>
            )}
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
          <ArrowLeft className="w-4 h-4" /> Back to Welcome
        </button>

        <button
          onClick={handleContinue}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-sm shadow-xl shadow-[#D95338]/25 flex items-center gap-2 transition-all group"
        >
          <span>CONTINUE TO IMAGE ACQUISITION</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
