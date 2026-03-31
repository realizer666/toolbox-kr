"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function ColorPickerTool() {
  const [hex, setHex] = useState("#3b82f6");

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const hexStr = hex.toUpperCase();
  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";
  const hslStr = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "";

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="w-full sm:w-48 h-48 rounded-xl border border-border shadow-inner" style={{ backgroundColor: hex }} />
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">색상 선택</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-12 h-10 rounded cursor-pointer" />
              <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} className="flex-1 px-4 py-2 border border-border rounded-lg bg-surface font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>

          <div className="space-y-2">
            {[
              { label: "HEX", value: hexStr },
              { label: "RGB", value: rgbStr },
              { label: "HSL", value: hslStr },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 bg-surface-muted rounded-lg border border-border">
                <span className="text-xs font-medium text-text-muted w-10">{item.label}</span>
                <code className="flex-1 text-sm text-text">{item.value}</code>
                <CopyButton text={item.value} className="text-xs px-2 py-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
