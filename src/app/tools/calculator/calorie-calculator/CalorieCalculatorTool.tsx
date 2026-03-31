"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/utils";

type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active";

const activityOptions: { id: ActivityLevel; label: string; multiplier: number }[] = [
  { id: "sedentary", label: "거의 운동 안 함", multiplier: 1.2 },
  { id: "light", label: "가벼운 운동 (주 1-3회)", multiplier: 1.375 },
  { id: "moderate", label: "보통 운동 (주 3-5회)", multiplier: 1.55 },
  { id: "active", label: "활발한 운동 (주 6-7회)", multiplier: 1.725 },
  { id: "very-active", label: "매우 활발 (하루 2회+)", multiplier: 1.9 },
];

export function CalorieCalculatorTool() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");

  function calculate() {
    const a = Number(age);
    const h = Number(height);
    const w = Number(weight);
    if (!a || !h || !w) return null;

    // Mifflin-St Jeor
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const multiplier = activityOptions.find((o) => o.id === activity)!.multiplier;
    const tdee = bmr * multiplier;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      lose: Math.round(tdee - 500),
      maintain: Math.round(tdee),
      gain: Math.round(tdee + 500),
    };
  }

  const result = calculate();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">성별</label>
            <div className="flex gap-2">
              <button onClick={() => setGender("male")} className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${gender === "male" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"}`}>
                남성
              </button>
              <button onClick={() => setGender("female")} className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${gender === "female" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"}`}>
                여성
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">나이</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="예: 30" className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">키 (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="예: 170" className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">체중 (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="예: 70" className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">활동량</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)} className="w-full px-4 py-2 border border-border rounded-lg bg-surface">
              {activityOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          {result ? (
            <div className="space-y-3">
              <div className="bg-surface-muted rounded-lg p-4 border border-border">
                <div className="text-sm text-text-muted mb-1">기초대사량 (BMR)</div>
                <div className="text-2xl font-bold text-text">{formatNumber(result.bmr)} kcal</div>
                <p className="text-xs text-text-muted mt-1">아무것도 하지 않아도 소비되는 칼로리</p>
              </div>
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
                <div className="text-sm text-text-muted mb-1">하루 필요 칼로리 (TDEE)</div>
                <div className="text-3xl font-bold text-primary-600">{formatNumber(result.tdee)} kcal</div>
                <p className="text-xs text-text-muted mt-1">활동량을 포함한 총 소비 칼로리</p>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-text mb-3">목표별 권장 섭취량</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm text-green-800">체중 감량 (-0.5kg/주)</span>
                    <span className="font-bold text-green-700">{formatNumber(result.lose)} kcal</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm text-blue-800">체중 유지</span>
                    <span className="font-bold text-blue-700">{formatNumber(result.maintain)} kcal</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <span className="text-sm text-orange-800">체중 증량 (+0.5kg/주)</span>
                    <span className="font-bold text-orange-700">{formatNumber(result.gain)} kcal</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-text-muted text-sm">
              정보를 입력하면 칼로리가 계산됩니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
