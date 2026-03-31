"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  const sn = s / 100;
  const ln = l / 100;

  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;

  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function ColorSwatch({ color, label }: { color: string; label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 rounded-lg border border-border shrink-0"
        style={{ backgroundColor: color }}
      />
      <div className="flex-1 min-w-0">
        {label && <div className="text-xs text-text-muted">{label}</div>}
        <div className="text-sm font-mono text-text">{color.toUpperCase()}</div>
      </div>
      <CopyButton text={color.toUpperCase()} />
    </div>
  );
}

export function ColorPaletteTool() {
  const [baseColor, setBaseColor] = useState("#3B82F6");

  const [h, s, l] = hexToHsl(baseColor);

  const palettes = [
    {
      name: "보색 (Complementary)",
      colors: [
        { hex: baseColor, label: "기본" },
        { hex: hslToHex(h + 180, s, l), label: "보색" },
      ],
    },
    {
      name: "유사색 (Analogous)",
      colors: [
        { hex: hslToHex(h - 30, s, l), label: "-30deg" },
        { hex: baseColor, label: "기본" },
        { hex: hslToHex(h + 30, s, l), label: "+30deg" },
      ],
    },
    {
      name: "삼각색 (Triadic)",
      colors: [
        { hex: baseColor, label: "기본" },
        { hex: hslToHex(h + 120, s, l), label: "+120deg" },
        { hex: hslToHex(h + 240, s, l), label: "+240deg" },
      ],
    },
    {
      name: "명도 변화 (Shades)",
      colors: [
        { hex: hslToHex(h, s, 90), label: "가장 밝게" },
        { hex: hslToHex(h, s, 70), label: "밝게" },
        { hex: hslToHex(h, s, 50), label: "중간" },
        { hex: hslToHex(h, s, 30), label: "어둡게" },
        { hex: hslToHex(h, s, 15), label: "가장 어둡게" },
      ],
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-1">기본 색상</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-12 h-12 rounded-lg border border-border cursor-pointer"
          />
          <input
            type="text"
            value={baseColor.toUpperCase()}
            onChange={(e) => {
              const v = e.target.value;
              if (/^#[0-9A-Fa-f]{6}$/.test(v)) setBaseColor(v);
            }}
            className="px-4 py-2 border border-border rounded-lg bg-surface font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <span className="text-sm text-text-muted">
            HSL({h}, {s}%, {l}%)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {palettes.map((palette) => (
          <div key={palette.name} className="bg-surface-muted rounded-lg p-4 border border-border">
            <h3 className="text-sm font-semibold text-text mb-3">{palette.name}</h3>
            <div className="space-y-3">
              {palette.colors.map((c, i) => (
                <ColorSwatch key={i} color={c.hex} label={c.label} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
