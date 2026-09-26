import React, { useEffect, useRef, useState } from "react";

export default function FundusCanvas({
  caseData,
  mode = "normal", // 'normal' | 'enhanced' | 'scanning' | 'gradcam' | 'lesions' | 'combined' | 'quality'
  width = 540,
  height = 540,
  interactive = true,
  customImageUrl = null,
  highlightLesionId = null,
  onSelectLesion = null,
  scanProgress = 0,
}) {
  const canvasRef = useRef(null);
  const [hoveredLesion, setHoveredLesion] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2 - 12;

    const isUngradeable = caseData?.id === "case-3" && !customImageUrl;
    const isNormalHealthy = caseData?.id === "case-2";

    // 1. Draw black background / viewport border
    ctx.clearRect(0, 0, width, height);

    // Save state for circular clipping
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    if (customImageUrl) {
      // Draw user uploaded image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = customImageUrl;
      img.onload = () => {
        ctx.drawImage(img, cx - radius, cy - radius, radius * 2, radius * 2);
        drawOverlays(ctx, cx, cy, radius);
      };
      return;
    }

    // 2. Base Fundus Background (Rich Retinal Orange/Red/Choroid)
    const baseGrad = ctx.createRadialGradient(
      cx - (isNormalHealthy ? 50 : -40),
      cy - 20,
      radius * 0.1,
      cx,
      cy,
      radius
    );

    if (mode === "enhanced") {
      // CLAHE Enhanced look: deeper contrast, normalized illumination
      baseGrad.addColorStop(0, "#C74B28");
      baseGrad.addColorStop(0.5, "#9A331A");
      baseGrad.addColorStop(0.85, "#681E0E");
      baseGrad.addColorStop(1, "#360C05");
    } else if (isUngradeable) {
      // Poor quality: washed out, hazy, dark perimeter shadow
      baseGrad.addColorStop(0, "#A65B42");
      baseGrad.addColorStop(0.4, "#6C3423");
      baseGrad.addColorStop(0.8, "#3B1B10");
      baseGrad.addColorStop(1, "#180904");
    } else {
      // Standard clinical fundus appearance
      baseGrad.addColorStop(0, "#D95E34");
      baseGrad.addColorStop(0.35, "#B84723");
      baseGrad.addColorStop(0.7, "#882A12");
      baseGrad.addColorStop(0.95, "#521408");
      baseGrad.addColorStop(1, "#2C0803");
    }

    ctx.fillStyle = baseGrad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // 3. Choroidal Tessellation (Subtle background texture)
    ctx.save();
    ctx.globalAlpha = mode === "enhanced" ? 0.35 : 0.2;
    for (let i = 0; i < 40; i++) {
      const tx = cx + (Math.sin(i * 99) * radius * 0.85);
      const ty = cy + (Math.cos(i * 77) * radius * 0.85);
      const grad = ctx.createRadialGradient(tx, ty, 5, tx, ty, 45);
      grad.addColorStop(0, "#5E180A");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(tx, ty, 45, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Coordinates configuration
    const isLeftEye = caseData?.image?.eye?.includes("Left") || false;
    const discX = isLeftEye ? cx - radius * 0.46 : cx + radius * 0.48;
    const discY = cy - radius * 0.05;
    const maculaX = isLeftEye ? cx + radius * 0.15 : cx - radius * 0.18;
    const maculaY = cy + radius * 0.04;

    // 4. Macula Lutea & Fovea Centralis
    const maculaGrad = ctx.createRadialGradient(maculaX, maculaY, 2, maculaX, maculaY, radius * 0.3);
    maculaGrad.addColorStop(0, "#3D0E06");
    maculaGrad.addColorStop(0.4, "#5C160B");
    maculaGrad.addColorStop(0.8, "#7E2312");
    maculaGrad.addColorStop(1, "transparent");
    ctx.fillStyle = maculaGrad;
    ctx.beginPath();
    ctx.arc(maculaX, maculaY, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Foveal reflex (tiny bright pinpoint reflex in center of fovea)
    if (!isUngradeable) {
      ctx.fillStyle = "rgba(255, 230, 200, 0.4)";
      ctx.beginPath();
      ctx.arc(maculaX, maculaY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Optic Disc (Neuroretinal rim & physiological cup)
    const discRadius = radius * 0.18;
    const discGrad = ctx.createRadialGradient(
      discX - 4,
      discY - 4,
      2,
      discX,
      discY,
      discRadius
    );
    discGrad.addColorStop(0, "#FFF3D6");
    discGrad.addColorStop(0.35, "#FCD38D");
    discGrad.addColorStop(0.7, "#E28B56");
    discGrad.addColorStop(0.95, "#C45B32");
    discGrad.addColorStop(1, "#8D341B");

    ctx.save();
    ctx.fillStyle = discGrad;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.ellipse(discX, discY, discRadius, discRadius * 1.12, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Physiological cup (inner pale center)
    const cupGrad = ctx.createRadialGradient(discX - 2, discY - 2, 1, discX, discY, discRadius * 0.45);
    cupGrad.addColorStop(0, "#FFFFFF");
    cupGrad.addColorStop(0.7, "#FFF4DD");
    cupGrad.addColorStop(1, "transparent");
    ctx.fillStyle = cupGrad;
    ctx.beginPath();
    ctx.arc(discX, discY, discRadius * 0.45, 0, Math.PI * 2);
    ctx.fill();

    // 6. Retinal Blood Vessels Architecture (Superior & Inferior Arcades + Nasal Branches)
    ctx.save();
    if (mode === "enhanced") {
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "#400A04";
    } else {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#5A1107";
    }

    const drawVesselTree = () => {
      const branches = [
        // Superior Temporal Arcade
        {
          start: [discX, discY],
          cp1: [discX - (isLeftEye ? -40 : 60), discY - 90],
          cp2: [maculaX + (isLeftEye ? 50 : -40), cy - radius * 0.55],
          end: [maculaX + (isLeftEye ? 130 : -140), cy - radius * 0.4],
          width: 5.5,
          color: "#4A0C06"
        },
        // Superior Temporal Sub-branches
        {
          start: [discX - (isLeftEye ? -40 : 60), discY - 90],
          cp1: [discX - (isLeftEye ? -20 : 30), discY - 140],
          cp2: [maculaX + (isLeftEye ? 90 : -90), cy - radius * 0.65],
          end: [cx + (isLeftEye ? 120 : -120), cy - radius * 0.75],
          width: 3.2,
          color: "#5E1208"
        },
        // Inferior Temporal Arcade
        {
          start: [discX, discY],
          cp1: [discX - (isLeftEye ? -45 : 65), discY + 85],
          cp2: [maculaX + (isLeftEye ? 40 : -45), cy + radius * 0.55],
          end: [maculaX + (isLeftEye ? 120 : -135), cy + radius * 0.45],
          width: 5.8,
          color: "#420A05"
        },
        // Inferior Temporal Sub-branch
        {
          start: [discX - (isLeftEye ? -45 : 65), discY + 85],
          cp1: [discX - (isLeftEye ? -20 : 30), discY + 130],
          cp2: [maculaX + (isLeftEye ? 70 : -75), cy + radius * 0.68],
          end: [cx + (isLeftEye ? 110 : -110), cy + radius * 0.78],
          width: 3.0,
          color: "#5E1208"
        },
        // Superior Nasal Branch
        {
          start: [discX, discY],
          cp1: [discX + (isLeftEye ? -70 : 60), discY - 80],
          cp2: [discX + (isLeftEye ? -110 : 90), discY - 120],
          end: [discX + (isLeftEye ? -140 : 120), cy - radius * 0.55],
          width: 4.2,
          color: "#4F0F07"
        },
        // Inferior Nasal Branch
        {
          start: [discX, discY],
          cp1: [discX + (isLeftEye ? -65 : 55), discY + 75],
          cp2: [discX + (isLeftEye ? -100 : 85), discY + 115],
          end: [discX + (isLeftEye ? -135 : 115), cy + radius * 0.52],
          width: 4.0,
          color: "#4F0F07"
        },
        // Macular Arterioles (Fine vessels reaching towards foveal border)
        {
          start: [discX - (isLeftEye ? -30 : 40), discY - 40],
          cp1: [maculaX + (isLeftEye ? -40 : 40), maculaY - 35],
          cp2: [maculaX + (isLeftEye ? -15 : 15), maculaY - 20],
          end: [maculaX + (isLeftEye ? -5 : 5), maculaY - 10],
          width: 1.8,
          color: "#6B180A"
        },
        {
          start: [discX - (isLeftEye ? -30 : 40), discY + 40],
          cp1: [maculaX + (isLeftEye ? -35 : 35), maculaY + 35],
          cp2: [maculaX + (isLeftEye ? -15 : 15), maculaY + 20],
          end: [maculaX + (isLeftEye ? -5 : 5), maculaY + 10],
          width: 1.8,
          color: "#6B180A"
        }
      ];

      branches.forEach(b => {
        ctx.beginPath();
        ctx.moveTo(b.start[0], b.start[1]);
        ctx.bezierCurveTo(b.cp1[0], b.cp1[1], b.cp2[0], b.cp2[1], b.end[0], b.end[1]);
        ctx.strokeStyle = mode === "enhanced" ? "#380602" : b.color;
        ctx.lineWidth = mode === "enhanced" ? b.width * 1.15 : b.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Central light reflex for arterioles
        if (b.width > 3.5 && !isUngradeable) {
          ctx.beginPath();
          ctx.moveTo(b.start[0], b.start[1]);
          ctx.bezierCurveTo(b.cp1[0], b.cp1[1], b.cp2[0], b.cp2[1], b.end[0], b.end[1]);
          ctx.strokeStyle = "rgba(255, 180, 160, 0.22)";
          ctx.lineWidth = b.width * 0.25;
          ctx.stroke();
        }
      });
    };

    drawVesselTree();
    ctx.restore();

    // 7. Render Retinal Lesions (if case has lesions and not ungradeable)
    if (caseData?.analysis?.lesionsList?.length > 0 && !isUngradeable) {
      caseData.analysis.lesionsList.forEach(lesion => {
        const lx = cx + (lesion.x - 400) * (radius / 300);
        const ly = cy + (lesion.y - 375) * (radius / 300);

        if (lesion.type === "Microaneurysm") {
          // Sharp tiny deep-red punctate microaneurysm
          ctx.save();
          ctx.fillStyle = mode === "enhanced" ? "#FF2200" : "#8A0B05";
          ctx.shadowColor = "#FF4422";
          ctx.shadowBlur = mode === "enhanced" ? 4 : 2;
          ctx.beginPath();
          ctx.arc(lx, ly, mode === "enhanced" ? 3.5 : 2.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (lesion.type === "Hard Exudate") {
          // Sharp yellowish-white waxy lipid deposit cluster
          ctx.save();
          const exGrad = ctx.createRadialGradient(lx, ly, 1, lx, ly, 6);
          exGrad.addColorStop(0, "#FFFFEE");
          exGrad.addColorStop(0.5, "#FCE38A");
          exGrad.addColorStop(1, "#E5A823");
          ctx.fillStyle = exGrad;
          ctx.beginPath();
          ctx.ellipse(lx, ly, 6, 4.5, 0.4, 0, Math.PI * 2);
          ctx.fill();
          // Satellite sub-deposit
          ctx.beginPath();
          ctx.arc(lx + 4, ly - 3, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (lesion.type === "Dot Hemorrhage") {
          // Darker red circular blot hemorrhage
          ctx.save();
          ctx.fillStyle = "#590403";
          ctx.beginPath();
          ctx.ellipse(lx, ly, 4.5, 3.5, 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
    }

    // 8. Handle Case 3 (Ungradeable Blur & Glare artifacts)
    if (isUngradeable) {
      ctx.save();
      // Heavy blur overlay simulation
      ctx.fillStyle = "rgba(60, 20, 10, 0.55)";
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      // Peripheral crescent glare artifact
      const glareGrad = ctx.createRadialGradient(
        cx - radius * 0.6,
        cy - radius * 0.6,
        10,
        cx - radius * 0.4,
        cy - radius * 0.4,
        radius * 0.9
      );
      glareGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      glareGrad.addColorStop(0.3, "rgba(255, 230, 200, 0.25)");
      glareGrad.addColorStop(0.7, "transparent");
      ctx.fillStyle = glareGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 9. Draw Overlays (GradCAM, Annotations, Scanners)
    drawOverlays(ctx, cx, cy, radius);

    ctx.restore(); // restore circular clip

    // 10. Outer Retinal Aperture Ring (Medical Device Style)
    ctx.save();
    ctx.strokeStyle = mode === "enhanced" ? "#2EC4B6" : "#3A4B54";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Scale graduation ticks on perimeter
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 18) {
      const x1 = cx + Math.cos(angle) * (radius - 2);
      const y1 = cy + Math.sin(angle) * (radius - 2);
      const isMajor = angle % (Math.PI / 6) < 0.01;
      const x2 = cx + Math.cos(angle) * (radius - (isMajor ? 9 : 5));
      const y2 = cy + Math.sin(angle) * (radius - (isMajor ? 9 : 5));

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isMajor ? "rgba(247, 244, 238, 0.5)" : "rgba(247, 244, 238, 0.2)";
      ctx.lineWidth = isMajor ? 1.5 : 1;
      ctx.stroke();
    }

    // Retinal Eye Label (OD/OS)
    ctx.fillStyle = "rgba(247, 244, 238, 0.85)";
    ctx.font = "600 12px 'JetBrains Mono', monospace";
    ctx.textAlign = "right";
    ctx.fillText(caseData?.image?.eye || "OD (Right Eye)", cx + radius - 15, cy + radius - 15);

    // FOV indicator
    ctx.textAlign = "left";
    ctx.fillText("FOV 45°", cx - radius + 15, cy + radius - 15);
    ctx.restore();

    function drawOverlays(context, centerX, centerY, rad) {
      // Grad-CAM Attention Heatmap
      if ((mode === "gradcam" || mode === "combined") && !isUngradeable) {
        context.save();
        const hm = caseData?.explainable?.gradCamHeatmapRegion || { cx: 430, cy: 370, r: 160, intensity: 0.88 };
        const hx = centerX + (hm.cx - 400) * (rad / 300);
        const hy = centerY + (hm.cy - 375) * (rad / 300);
        const hr = hm.r * (rad / 300);

        // Multi-tier thermal Gaussian gradient (Blue -> Cyan -> Green -> Yellow -> Red)
        const heatGrad = context.createRadialGradient(hx, hy, hr * 0.05, hx, hy, hr);
        if (caseData?.id === "case-1") {
          // Peak activation over microaneurysms / exudate zone
          heatGrad.addColorStop(0, "rgba(255, 0, 0, 0.78)");      // Hot Core Red
          heatGrad.addColorStop(0.25, "rgba(255, 140, 0, 0.65)"); // Orange
          heatGrad.addColorStop(0.5, "rgba(255, 230, 0, 0.45)");  // Yellow
          heatGrad.addColorStop(0.75, "rgba(0, 230, 120, 0.25)"); // Green
          heatGrad.addColorStop(0.92, "rgba(0, 160, 255, 0.12)"); // Cyan
          heatGrad.addColorStop(1, "transparent");
        } else {
          // Healthy normal baseline (low diffuse blue/green)
          heatGrad.addColorStop(0, "rgba(0, 200, 255, 0.28)");
          heatGrad.addColorStop(0.5, "rgba(0, 160, 200, 0.15)");
          heatGrad.addColorStop(1, "transparent");
        }

        context.fillStyle = heatGrad;
        context.beginPath();
        context.arc(hx, hy, hr, 0, Math.PI * 2);
        context.fill();

        // Secondary small focus hot-spot near foveal border
        if (caseData?.id === "case-1") {
          const subGrad = context.createRadialGradient(hx + 35, hy - 40, 2, hx + 35, hy - 40, hr * 0.4);
          subGrad.addColorStop(0, "rgba(255, 30, 30, 0.85)");
          subGrad.addColorStop(0.4, "rgba(255, 180, 0, 0.5)");
          subGrad.addColorStop(1, "transparent");
          context.fillStyle = subGrad;
          context.beginPath();
          context.arc(hx + 35, hy - 40, hr * 0.4, 0, Math.PI * 2);
          context.fill();
        }

        context.restore();
      }

      // Lesions Bounding Annotations & Evidence Pins
      if ((mode === "lesions" || mode === "combined") && caseData?.analysis?.lesionsList?.length > 0) {
        context.save();
        caseData.analysis.lesionsList.forEach((lesion, idx) => {
          const lx = centerX + (lesion.x - 400) * (rad / 300);
          const ly = centerY + (lesion.y - 375) * (rad / 300);
          const lrad = (lesion.radius || 10) * (rad / 300);
          const isSelected = highlightLesionId === lesion.id || hoveredLesion?.id === lesion.id;

          // Bounding circle / box
          context.strokeStyle = isSelected ? "#FFFFFF" : lesion.color || "#EF4444";
          context.lineWidth = isSelected ? 2.5 : 1.5;
          context.beginPath();
          context.arc(lx, ly, lrad + (isSelected ? 5 : 2), 0, Math.PI * 2);
          context.stroke();

          // Corner crosshairs / tick markers
          const tickLen = 4;
          context.beginPath();
          context.moveTo(lx - lrad - 5, ly);
          context.lineTo(lx - lrad - 5 - tickLen, ly);
          context.moveTo(lx + lrad + 5, ly);
          context.lineTo(lx + lrad + 5 + tickLen, ly);
          context.moveTo(lx, ly - lrad - 5);
          context.lineTo(lx, ly - lrad - 5 - tickLen);
          context.moveTo(lx, ly + lrad + 5);
          context.lineTo(lx, ly + lrad + 5 + tickLen);
          context.stroke();

          // Text Badge / Tag
          context.fillStyle = isSelected ? "#F7F4EE" : "rgba(20, 26, 29, 0.88)";
          const text = `#${idx + 1} ${lesion.type === "Microaneurysm" ? "MA" : lesion.type === "Hard Exudate" ? "EX" : "HM"}`;
          context.font = "bold 9px 'JetBrains Mono', monospace";
          const tw = context.measureText(text).width;

          context.fillStyle = isSelected ? "#D95338" : "rgba(16, 22, 25, 0.9)";
          context.beginPath();
          context.roundRect(lx + lrad + 6, ly - 7, tw + 8, 14, 3);
          context.fill();
          context.strokeStyle = isSelected ? "#FFFFFF" : lesion.color;
          context.lineWidth = 1;
          context.stroke();

          context.fillStyle = "#F7F4EE";
          context.fillText(text, lx + lrad + 10, ly + 3);
        });
        context.restore();
      }

      // Animated Medical Scanning Line & Laser Grid
      if (mode === "scanning") {
        context.save();
        const scanY = centerY - rad + (rad * 2 * (scanProgress / 100));

        // Scanning line with glowing gradient
        const laserGrad = context.createLinearGradient(centerX - rad, scanY, centerX + rad, scanY);
        laserGrad.addColorStop(0, "rgba(46, 196, 182, 0)");
        laserGrad.addColorStop(0.2, "rgba(46, 196, 182, 0.7)");
        laserGrad.addColorStop(0.5, "rgba(247, 244, 238, 0.95)");
        laserGrad.addColorStop(0.8, "rgba(46, 196, 182, 0.7)");
        laserGrad.addColorStop(1, "rgba(46, 196, 182, 0)");

        context.strokeStyle = laserGrad;
        context.lineWidth = 3;
        context.shadowColor = "#2EC4B6";
        context.shadowBlur = 12;
        context.beginPath();
        context.moveTo(centerX - rad, scanY);
        context.lineTo(centerX + rad, scanY);
        context.stroke();

        // Subtle matrix grid behind the scan
        context.strokeStyle = "rgba(46, 196, 182, 0.15)";
        context.lineWidth = 0.75;
        const gridSize = 28;
        for (let x = centerX - rad; x <= centerX + rad; x += gridSize) {
          context.beginPath();
          context.moveTo(x, centerY - rad);
          context.lineTo(x, scanY);
          context.stroke();
        }

        context.restore();
      }
    }
  }, [caseData, mode, width, height, customImageUrl, highlightLesionId, hoveredLesion, scanProgress]);

  const handleCanvasMouseMove = (e) => {
    if (!interactive || !caseData?.analysis?.lesionsList?.length) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2 - 12;

    const found = caseData.analysis.lesionsList.find(lesion => {
      const lx = cx + (lesion.x - 400) * (radius / 300);
      const ly = cy + (lesion.y - 375) * (radius / 300);
      const dist = Math.hypot(mouseX - lx, mouseY - ly);
      return dist <= (lesion.radius || 10) + 10;
    });

    setHoveredLesion(found || null);
  };

  const handleCanvasClick = () => {
    if (!interactive || !onSelectLesion || !caseData?.analysis?.lesionsList?.length) return;
    if (hoveredLesion) {
      onSelectLesion(hoveredLesion);
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center select-none">
      <canvas
        ref={canvasRef}
        className="rounded-full shadow-2xl transition-all duration-300 cursor-crosshair bg-[#0E1214]"
        style={{
          boxShadow: mode === "enhanced" 
            ? "0 0 35px rgba(46, 196, 182, 0.25), inset 0 0 20px rgba(0,0,0,0.8)" 
            : mode === "gradcam" 
            ? "0 0 35px rgba(217, 83, 56, 0.3), inset 0 0 20px rgba(0,0,0,0.8)" 
            : "0 10px 30px rgba(0,0,0,0.7), inset 0 0 20px rgba(0,0,0,0.8)"
        }}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={() => setHoveredLesion(null)}
        onClick={handleCanvasClick}
      />

      {/* Floating Hover Tooltip for Lesions */}
      {hoveredLesion && (
        <div 
          className="absolute z-20 pointer-events-none bg-[#13181B] border border-[#D95338] text-[#F7F4EE] px-3 py-1.5 rounded text-xs shadow-xl backdrop-blur-md"
          style={{ top: "15%", right: "-10px" }}
        >
          <div className="font-mono font-bold text-[#E09F3E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredLesion.color || "#EF4444" }} />
            {hoveredLesion.type}
          </div>
          <div className="text-[11px] text-[#A2B2C2] mt-0.5">{hoveredLesion.label}</div>
        </div>
      )}
    </div>
  );
}
