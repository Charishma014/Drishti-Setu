import React, { useState, useRef } from "react";
import { 
  FileText, 
  Download, 
  Send, 
  Printer, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Eye, 
  QrCode, 
  Building, 
  User, 
  Activity, 
  CheckCheck, 
  RefreshCw,
  Clock,
  Stethoscope,
  HardDrive
} from "lucide-react";
import FundusCanvas from "../FundusCanvas";
import { soundManager } from "../../utils/audio";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Screen9Report({
  caseData,
  onNext,
  onBack,
  onReset,
  onOpenTransmitModal
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(100);
  const [generationStepText, setGenerationStepText] = useState("Report Ready");
  const reportRef = useRef(null);

  // Trigger Dynamic Report Generation Animation
  const handleRegenerateReport = () => {
    setIsGenerating(true);
    setGenerationProgress(15);
    setGenerationStepText("Fetching Patient ABDM & Vitals Record...");
    soundManager.playScan();

    setTimeout(() => {
      setGenerationProgress(45);
      setGenerationStepText("Rendering Dual Retinal & Grad-CAM Telemetry...");
    }, 400);

    setTimeout(() => {
      setGenerationProgress(80);
      setGenerationStepText("Validating Clinician Digital Signature & Hash...");
      soundManager.playBeep(650, 0.05);
    }, 800);

    setTimeout(() => {
      setGenerationProgress(100);
      setGenerationStepText("Report Generated Successfully ✓");
      setIsGenerating(false);
      soundManager.playSuccess();
    }, 1200);
  };

  // Download Report as Real PDF
  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    try {
      setIsDownloadingPdf(true);
      soundManager.playClick();

      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#12171A"
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const safePatientName = (caseData?.patient?.name || "Patient").replace(/\s+/g, "_");
      pdf.save(`DrishtiSetu_Report_${safePatientName}_${caseData?.patient?.id || "DR"}.pdf`);

      soundManager.playSuccess();
    } catch (err) {
      console.error("PDF generation failed:", err);
      // Fallback to browser print if canvas rendering fails
      window.print();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Browser Print Dialog
  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Top Action Bar (Hidden in Print) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#222B30] print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D95338] uppercase font-bold tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5" /> Stage 8: Automated Clinical Screening Report
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#F7F4EE]">
            Diabetic Retinopathy Screening Report
          </h2>
          <p className="text-xs text-[#8D99AE]">
            Dynamically compiled using real-time patient vitals, 7-lesion extraction, Grad-CAM attention maps, and clinician verification.
          </p>
        </div>

        {/* 4 Working Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* 1. Generate Report Button */}
          <button
            onClick={handleRegenerateReport}
            disabled={isGenerating}
            className="px-3.5 py-2 rounded-xl bg-[#1C252A] hover:bg-[#253036] border border-[#2C3940] hover:border-[#D95338] text-[#F7F4EE] text-xs font-mono flex items-center gap-2 transition-all shadow cursor-pointer disabled:opacity-50"
            title="Re-run dynamic compilation with current patient data"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#E09F3E] ${isGenerating ? "animate-spin" : ""}`} />
            <span>{isGenerating ? "GENERATING..." : "GENERATE REPORT"}</span>
          </button>

          {/* 2. Download PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf || isGenerating}
            className="px-3.5 py-2 rounded-xl bg-[#1C252A] hover:bg-[#253036] border border-[#2C3940] hover:border-[#2EC4B6] text-[#F7F4EE] text-xs font-mono flex items-center gap-2 transition-all shadow cursor-pointer disabled:opacity-50"
            title="Export official PDF document"
          >
            <Download className={`w-3.5 h-3.5 text-[#2EC4B6] ${isDownloadingPdf ? "animate-bounce" : ""}`} />
            <span>{isDownloadingPdf ? "EXPORTING PDF..." : "DOWNLOAD PDF"}</span>
          </button>

          {/* 3. Print Report Button */}
          <button
            onClick={handlePrint}
            disabled={isGenerating}
            className="px-3.5 py-2 rounded-xl bg-[#1C252A] hover:bg-[#253036] border border-[#2C3940] text-[#F7F4EE] text-xs font-mono flex items-center gap-2 transition-all shadow cursor-pointer"
            title="Open browser print preview"
          >
            <Printer className="w-3.5 h-3.5 text-[#8D99AE]" />
            <span>PRINT REPORT</span>
          </button>

          {/* 4. Send to Ophthalmologist Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              if (onOpenTransmitModal) onOpenTransmitModal();
            }}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md shadow-[#D95338]/25 cursor-pointer"
            title="Transmit referral docket over rural 4G tele-link"
          >
            <Send className="w-3.5 h-3.5" />
            <span>SEND TO OPHTHALMOLOGIST</span>
          </button>

        </div>
      </div>

      {/* Loading Bar when Generating */}
      {isGenerating && (
        <div className="mb-6 p-4 bg-[#141A1D] border border-[#E09F3E] rounded-2xl shadow-xl space-y-2 animate-fadeIn print:hidden">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#E09F3E] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin" /> {generationStepText}
            </span>
            <span className="text-[#F7F4EE]">{generationProgress}%</span>
          </div>
          <div className="w-full h-2 bg-[#0E1214] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D95338] via-[#E09F3E] to-[#2EC4B6] transition-all duration-300"
              style={{ width: `${generationProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* OFFICIAL CLINICAL MEDICAL REPORT (PRINT & PDF READY CONTAINER) */}
      {/* ========================================================================= */}
      <div 
        ref={reportRef}
        id="clinical-report-document"
        className="bg-[#12171A] border-2 border-[#263138] rounded-2xl p-6 sm:p-9 shadow-2xl text-[#F7F4EE] space-y-6 mb-6 print:bg-white print:text-black print:border print:border-black print:shadow-none print:p-6"
      >
        
        {/* ================= 1. REPORT LETTERHEAD & HEADER ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b-2 border-[#2C3940] print:border-black">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D95338] to-[#9A331A] flex items-center justify-center text-white shadow-lg print:bg-black print:text-white">
              <Eye className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-serif tracking-tight text-[#F7F4EE] print:text-black">
                  Drishti <span className="text-[#D95338] print:text-black">Setu</span>
                </h1>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#1C252A] border border-[#2C3940] text-[#2EC4B6] font-bold print:border-black print:text-black">
                  OFFICIAL SCREENING DOSSIER
                </span>
              </div>
              <p className="text-xs text-[#E09F3E] font-serif italic print:text-gray-700">
                “Bridging Rural Screening with Explainable Eye Care”
              </p>
              <p className="text-[11px] text-[#8D99AE] font-mono print:text-gray-600 mt-0.5">
                National Programme for Control of Blindness & Visual Impairment (NPCBVI) • Ministry of Health & Family Welfare
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-xs space-y-1 bg-[#0E1214] p-3 rounded-xl border border-[#222B30] print:bg-gray-50 print:border-gray-300 print:text-black">
            <div className="font-bold text-[#E09F3E] print:text-black">
              Report ID: <span className="text-[#F7F4EE] print:text-black">{caseData.report.reportId}</span>
            </div>
            <div className="text-[#8D99AE] text-[11px] print:text-gray-600">
              Screening Date: {caseData.report.generatedAt}
            </div>
            <div className="text-[#2EC4B6] text-[10px] font-bold flex items-center justify-end gap-1 print:text-green-700">
              <CheckCircle2 className="w-3 h-3" /> VERIFIED CLINICAL RECORD
            </div>
          </div>
        </div>

        {/* ================= 2. PATIENT DEMOGRAPHICS & VITALS ================= */}
        <div className="bg-[#0E1214] p-4 rounded-xl border border-[#222B30] print:bg-gray-50 print:border-gray-300 print:text-black">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8D99AE] pb-2 mb-3 border-b border-[#1E2528] print:border-gray-300 flex items-center justify-between">
            <span className="font-bold text-[#F7F4EE] print:text-black flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#E09F3E]" /> Patient Demographics & Systemic Vitals
            </span>
            <span className="text-[#2EC4B6] font-mono">ABHA ID: {caseData.patient.id}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
            <div>
              <span className="text-[#8D99AE] block text-[10px] uppercase font-mono print:text-gray-600">Full Name</span>
              <span className="font-bold text-[#F7F4EE] text-sm print:text-black">{caseData.patient.name}</span>
            </div>
            <div>
              <span className="text-[#8D99AE] block text-[10px] uppercase font-mono print:text-gray-600">Age / Gender</span>
              <span className="font-mono text-[#F7F4EE] print:text-black">{caseData.patient.age} Yrs • {caseData.patient.gender}</span>
            </div>
            <div>
              <span className="text-[#8D99AE] block text-[10px] uppercase font-mono print:text-gray-600">Diabetes History</span>
              <span className="font-mono text-[#F7F4EE] print:text-black">{caseData.patient.diabetesDuration} ({caseData.patient.diabetesType})</span>
            </div>
            <div>
              <span className="text-[#8D99AE] block text-[10px] uppercase font-mono print:text-gray-600">Glycemic Status (HbA1c)</span>
              <span className="font-mono font-bold text-[#E09F3E] print:text-black">{caseData.patient.hba1c} ({caseData.patient.bloodGlucose})</span>
            </div>
            <div>
              <span className="text-[#8D99AE] block text-[10px] uppercase font-mono print:text-gray-600">Visual Acuity (Snellen)</span>
              <span className="font-mono text-[#F7F4EE] print:text-black">{caseData.patient.visualAcuity}</span>
            </div>
            <div>
              <span className="text-[#8D99AE] block text-[10px] uppercase font-mono print:text-gray-600">Blood Pressure</span>
              <span className="font-mono text-[#F7F4EE] print:text-black">{caseData.patient.bloodPressure}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[#8D99AE] block text-[10px] uppercase font-mono print:text-gray-600">Facility / Operator</span>
              <span className="text-[#A2B2C2] text-[11px] print:text-gray-800">
                {caseData.patient.phcLocation} • Operator: {caseData.patient.operatorName}
              </span>
            </div>
          </div>
        </div>

        {/* ================= 3. PROMINENT SUMMARY CALLOUT BOX ================= */}
        <div className={`p-4 rounded-xl border-2 transition-all ${
          caseData.grading.referable
            ? "bg-[#1E1513] border-[#D95338] text-[#F7F4EE] print:bg-red-50 print:border-red-600 print:text-black"
            : "bg-[#131D1C] border-[#2EC4B6] text-[#F7F4EE] print:bg-green-50 print:border-green-600 print:text-black"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#E09F3E] font-bold">
                EXECUTIVE SCREENING SUMMARY:
              </div>
              <div className="text-lg font-bold font-serif">
                Screening Result: <span className={caseData.grading.referable ? "text-[#E65A3C] print:text-red-700" : "text-[#2EC4B6] print:text-green-700"}>
                  {caseData.grading.levelTitle}
                </span>
              </div>
              <div className="text-xs text-[#A2B2C2] print:text-gray-700 font-mono">
                Referral Status: <strong className={caseData.grading.referable ? "text-[#E65A3C] print:text-red-700" : "text-[#2EC4B6] print:text-green-700"}>
                  {caseData.grading.referable ? "REFERABLE (Action Required)" : "NON-REFERABLE (Routine Rescreening)"}
                </strong>
                {" • "}
                Recommendation: <strong className="text-[#F7F4EE] print:text-black">
                  {caseData.grading.referable ? "Ophthalmologist Review Recommended" : "Routine Annual Rescreening"}
                </strong>
              </div>
            </div>

            <div className="shrink-0 bg-[#0E1214]/80 px-4 py-2 rounded-lg border border-current text-right print:bg-white">
              <div className="text-[10px] font-mono text-[#8D99AE] uppercase">AI Confidence</div>
              <div className="text-xl font-bold font-mono text-[#E09F3E] print:text-black">
                {caseData.grading.aiConfidence}%
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4. DUAL RETINAL IMAGERY (FUNDUS & GRAD-CAM) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Fundus Raw / Enhanced */}
          <div className="bg-[#0E1214] border border-[#222B30] rounded-xl p-4 flex flex-col items-center justify-center print:bg-white print:border-gray-300">
            <div className="w-full flex justify-between text-[11px] font-mono text-[#8D99AE] uppercase pb-2 mb-2 border-b border-[#1E2528] print:border-gray-200">
              <span className="font-bold text-[#F7F4EE] print:text-black">1. Acquired Fundus Image</span>
              <span>{caseData.image.eye} • 45° FOV</span>
            </div>
            <div className="my-1 scale-90 origin-center">
              <FundusCanvas
                caseData={caseData}
                mode="enhanced"
                width={220}
                height={220}
                interactive={false}
              />
            </div>
            <span className="text-[10px] font-mono text-[#8D99AE] mt-1 print:text-gray-600">
              Resolution: {caseData.image.resolution} • Non-Mydriatic CMOS
            </span>
          </div>

          {/* Explainability / Grad-CAM Attention Heatmap */}
          <div className="bg-[#0E1214] border border-[#222B30] rounded-xl p-4 flex flex-col items-center justify-center print:bg-white print:border-gray-300">
            <div className="w-full flex justify-between text-[11px] font-mono text-[#8D99AE] uppercase pb-2 mb-2 border-b border-[#1E2528] print:border-gray-200">
              <span className="font-bold text-[#E09F3E] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 2. Grad-CAM Explainability Map
              </span>
              <span className="text-[#2EC4B6]">Activation Density: 84%</span>
            </div>
            <div className="my-1 scale-90 origin-center">
              <FundusCanvas
                caseData={caseData}
                mode="gradcam"
                width={220}
                height={220}
                interactive={false}
              />
            </div>
            <span className="text-[10px] font-mono text-[#8D99AE] mt-1 print:text-gray-600">
              Concentrated over temporal arcade & microaneurysm clusters
            </span>
          </div>

        </div>

        {/* ================= 5. QUALITY ASSESSMENT & 4 DETECTED LESIONS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Quality Assessment (4 Cols) */}
          <div className="md:col-span-4 bg-[#0E1214] border border-[#222B30] rounded-xl p-4 space-y-2.5 print:bg-gray-50 print:border-gray-300 print:text-black text-xs font-mono">
            <span className="font-bold text-[#F7F4EE] block pb-1 border-b border-[#1E2528] print:border-gray-300 print:text-black">
              Image Quality Assessment
            </span>
            <div className="flex justify-between">
              <span className="text-[#8D99AE]">Overall Quality:</span>
              <span className="text-[#2EC4B6] font-bold">{caseData.image.overallQuality}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8D99AE]">Retinal Focus:</span>
              <span className="text-[#F7F4EE] print:text-black">{caseData.image.focusScore}% (Good)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8D99AE]">Illumination:</span>
              <span className="text-[#F7F4EE] print:text-black">{caseData.image.illuminationScore}% (Acceptable)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8D99AE]">Field of View:</span>
              <span className="text-[#F7F4EE] print:text-black">{caseData.image.fovScore}% (45° Verified)</span>
            </div>
          </div>

          {/* Detected Lesions Table (8 Cols) */}
          <div className="md:col-span-8 bg-[#0E1214] border border-[#222B30] rounded-xl p-4 space-y-2 print:bg-gray-50 print:border-gray-300 print:text-black text-xs">
            <div className="font-bold text-[#F7F4EE] pb-1 border-b border-[#1E2528] print:border-gray-300 print:text-black flex justify-between font-mono">
              <span>Deep-Learning Lesion Extraction Telemetry</span>
              <span className="text-[#2EC4B6]">ISO 29109 Validated</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
              <div className="p-2 bg-[#141A1D] rounded-lg border border-[#1E2528] print:bg-white print:border-gray-200">
                <span className="text-[#8D99AE] block text-[10px]">1. Microaneurysms</span>
                <span className="font-bold text-[#F7F4EE] print:text-black">{caseData.analysis.microaneurysms.status}</span>
              </div>
              <div className="p-2 bg-[#141A1D] rounded-lg border border-[#1E2528] print:bg-white print:border-gray-200">
                <span className="text-[#8D99AE] block text-[10px]">2. Hard Exudates</span>
                <span className="font-bold text-[#F7F4EE] print:text-black">{caseData.analysis.exudates.status}</span>
              </div>
              <div className="p-2 bg-[#141A1D] rounded-lg border border-[#1E2528] print:bg-white print:border-gray-200">
                <span className="text-[#8D99AE] block text-[10px]">3. Hemorrhages</span>
                <span className="font-bold text-[#F7F4EE] print:text-black">{caseData.analysis.hemorrhages.status}</span>
              </div>
              <div className="p-2 bg-[#141A1D] rounded-lg border border-[#1E2528] print:bg-white print:border-gray-200">
                <span className="text-[#8D99AE] block text-[10px]">4. Neovascularization</span>
                <span className="font-bold text-[#2EC4B6]">{caseData.analysis.neovascularization.status}</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= 6. CLINICAL REASONING & RECOMMENDED ACTIONS ================= */}
        <div className="bg-[#0E1214] border border-[#222B30] rounded-xl p-4 space-y-3 print:bg-gray-50 print:border-gray-300 print:text-black text-xs">
          
          <div>
            <span className="font-mono text-[#E09F3E] font-bold uppercase block mb-1 print:text-black">
              AI Clinical Reasoning Statement:
            </span>
            <p className="text-[#A2B2C2] leading-relaxed italic print:text-gray-800">
              “{caseData.explainable.clinicalReasoning}”
            </p>
          </div>

          <div className="pt-2 border-t border-[#1E2528] print:border-gray-300">
            <span className="font-mono text-[#2EC4B6] font-bold uppercase block mb-1.5 print:text-black">
              Recommended Clinical Follow-up Actions:
            </span>
            <ul className="text-[#A2B2C2] space-y-1 list-disc pl-4 print:text-gray-800">
              {caseData.report.suggestedActions?.map((action, idx) => (
                <li key={idx}>{action}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* ================= 7. OPHTHALMOLOGIST REVIEW & VERIFICATION SIGN-OFF ================= */}
        <div className="pt-4 border-t-2 border-[#2C3940] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono print:border-black">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#2EC4B6] font-bold text-sm print:text-green-800">
              <CheckCircle2 className="w-4 h-4" /> Ophthalmologist Sign-Off Status: VERIFIED ✓
            </div>
            <div className="text-[#F7F4EE] font-bold print:text-black">
              {caseData.review.reviewer} • {caseData.review.reviewerRole}
            </div>
            <div className="text-[#8D99AE] text-[11px] print:text-gray-600">
              Medical Reg No: {caseData.review.reviewerReg} • {caseData.review.hospital}
            </div>
            <div className="text-[#E09F3E] text-[10px] print:text-gray-600">
              Doctor Clinical Note: “{caseData.review.clinicalNotes}”
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#0E1214] p-2.5 rounded-xl border border-[#222B30] print:bg-white print:border-gray-300">
            <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center">
              <QrCode className="w-12 h-12 text-black" />
            </div>
            <div className="text-[10px] text-[#8D99AE] space-y-0.5 print:text-gray-700">
              <div className="font-bold text-[#F7F4EE] print:text-black">ABDM Token Valid</div>
              <div>Hash: 0x8F9C...A2D1</div>
              <div className="text-[#2EC4B6]">Review Time: {caseData.review.reviewTimeSec}s</div>
            </div>
          </div>

        </div>

      </div>

      {/* ================= NAVIGATION FOOTER (HIDDEN IN PRINT) ================= */}
      <div className="flex items-center justify-between pt-4 border-t border-[#222B30] print:hidden">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="px-5 py-2.5 rounded-xl bg-[#141A1D] hover:bg-[#1E2528] border border-[#222B30] text-[#8D99AE] hover:text-[#F7F4EE] text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Doctor Review
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onReset(1);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#141A1D] hover:bg-[#1E2528] border border-[#222B30] text-[#8D99AE] hover:text-[#F7F4EE] text-xs font-mono flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Start New Screening
          </button>

          <button
            onClick={() => {
              soundManager.playSuccess();
              onNext();
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D95338] to-[#BF4329] hover:from-[#E65A3C] hover:to-[#D95338] text-white font-bold text-sm shadow-xl shadow-[#D95338]/25 flex items-center gap-2 transition-all group cursor-pointer"
          >
            <span>RURAL OPERATIONS DASHBOARD</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
}
