"use client";

import { useState } from "react";

type UnitCategory = "length" | "weight" | "temperature" | "area";

const unitData: Record<UnitCategory, { name: string; units: { id: string; label: string; toBase: (v: number) => number; fromBase: (v: number) => number }[] }> = {
  length: {
    name: "길이",
    units: [
      { id: "mm", label: "밀리미터 (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "cm", label: "센티미터 (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: "m", label: "미터 (m)", toBase: (v) => v, fromBase: (v) => v },
      { id: "km", label: "킬로미터 (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "in", label: "인치 (inch)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { id: "ft", label: "피트 (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: "mi", label: "마일 (mile)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    ],
  },
  weight: {
    name: "무게",
    units: [
      { id: "mg", label: "밀리그램 (mg)", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: "g", label: "그램 (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "kg", label: "킬로그램 (kg)", toBase: (v) => v, fromBase: (v) => v },
      { id: "t", label: "톤 (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "lb", label: "파운드 (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { id: "oz", label: "온스 (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    ],
  },
  temperature: {
    name: "온도",
    units: [
      { id: "c", label: "섭씨 (°C)", toBase: (v) => v, fromBase: (v) => v },
      { id: "f", label: "화씨 (°F)", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
      { id: "k", label: "켈빈 (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  area: {
    name: "면적",
    units: [
      { id: "sqm", label: "제곱미터 (m²)", toBase: (v) => v, fromBase: (v) => v },
      { id: "pyeong", label: "평", toBase: (v) => v * 3.30579, fromBase: (v) => v / 3.30579 },
      { id: "sqkm", label: "제곱킬로미터 (km²)", toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: "ha", label: "헥타르 (ha)", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
      { id: "acre", label: "에이커 (acre)", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      { id: "sqft", label: "제곱피트 (ft²)", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    ],
  },
};

const categoryList: { id: UnitCategory; label: string }[] = [
  { id: "length", label: "길이" },
  { id: "weight", label: "무게" },
  { id: "temperature", label: "온도" },
  { id: "area", label: "면적" },
];

export function UnitConverterTool() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState("cm");
  const [toUnit, setToUnit] = useState("in");
  const [value, setValue] = useState("");

  const units = unitData[category].units;

  function convert(): string {
    const v = Number(value);
    if (!value || isNaN(v)) return "";
    const from = units.find((u) => u.id === fromUnit);
    const to = units.find((u) => u.id === toUnit);
    if (!from || !to) return "";
    const baseValue = from.toBase(v);
    const result = to.fromBase(baseValue);
    return result % 1 === 0 ? result.toString() : result.toPrecision(8).replace(/\.?0+$/, "");
  }

  function handleCategoryChange(cat: UnitCategory) {
    setCategory(cat);
    const newUnits = unitData[cat].units;
    setFromUnit(newUnits[0].id);
    setToUnit(newUnits[1].id);
    setValue("");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {categoryList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              category === cat.id
                ? "bg-primary-600 text-white border-primary-600"
                : "border-border hover:bg-surface-muted"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-text mb-1">변환할 값</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="숫자 입력"
            className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-surface"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </div>

        <div className="text-2xl text-text-muted text-center py-2">→</div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">결과</label>
          <div className="w-full px-4 py-2 border border-border rounded-lg bg-surface-muted text-text font-medium min-h-[42px] mb-2">
            {convert() || "-"}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-surface"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
