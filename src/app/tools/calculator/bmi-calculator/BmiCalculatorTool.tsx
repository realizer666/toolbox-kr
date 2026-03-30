"use client";

import { useState } from "react";

function getBmiCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "저체중", color: "text-blue-600" };
  if (bmi < 23) return { label: "정상", color: "text-green-600" };
  if (bmi < 25) return { label: "과체중", color: "text-yellow-600" };
  if (bmi < 30) return { label: "비만", color: "text-orange-600" };
  return { label: "고도비만", color: "text-red-600" };
}

export function BmiCalculatorTool() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const heightM = Number(height) / 100;
  const bmi = heightM > 0 && Number(weight) > 0 ? Number(weight) / (heightM * heightM) : 0;
  const category = bmi > 0 ? getBmiCategory(bmi) : null;

  const normalMin = heightM > 0 ? (18.5 * heightM * heightM).toFixed(1) : "0";
  const normalMax = heightM > 0 ? (23 * heightM * heightM).toFixed(1) : "0";

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">키 (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="예: 170"
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">체중 (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="예: 65"
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          {bmi > 0 && category ? (
            <div className="space-y-3">
              <div className="bg-surface-muted rounded-lg p-4 border border-border text-center">
                <div className="text-sm text-text-muted mb-1">BMI</div>
                <div className="text-4xl font-bold text-text">{bmi.toFixed(1)}</div>
                <div className={`text-lg font-semibold mt-1 ${category.color}`}>
                  {category.label}
                </div>
              </div>

              <div className="bg-surface-muted rounded-lg p-4 border border-border">
                <div className="text-sm text-text-muted mb-2">정상 체중 범위</div>
                <div className="text-lg font-medium text-text">
                  {normalMin}kg ~ {normalMax}kg
                </div>
              </div>

              <div className="bg-surface-muted rounded-lg p-3 border border-border">
                <div className="text-xs text-text-muted mb-2">대한비만학회 기준</div>
                <div className="space-y-1 text-xs">
                  {[
                    { range: "18.5 미만", label: "저체중" },
                    { range: "18.5 ~ 22.9", label: "정상" },
                    { range: "23.0 ~ 24.9", label: "과체중" },
                    { range: "25.0 ~ 29.9", label: "비만" },
                    { range: "30.0 이상", label: "고도비만" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-text-muted">
                      <span>{row.label}</span>
                      <span>{row.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-text-muted text-sm">
              키와 체중을 입력하면 BMI가 계산됩니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
