"use client";

import { useState } from "react";

export function DdayCalculatorTool() {
  const today = new Date().toISOString().split("T")[0];
  const [targetDate, setTargetDate] = useState("");
  const [label, setLabel] = useState("");

  function calculate() {
    if (!targetDate) return null;
    const target = new Date(targetDate + "T00:00:00");
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  }

  const days = calculate();

  function getDayText(d: number): string {
    if (d === 0) return "D-Day!";
    if (d > 0) return `D-${d}`;
    return `D+${Math.abs(d)}`;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">이름 (선택)</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="예: 시험일, 결혼기념일, 프로젝트 마감"
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">날짜</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <p className="text-xs text-text-muted">오늘: {today}</p>
        </div>

        <div className="flex items-center justify-center">
          {days !== null ? (
            <div className="text-center">
              {label && <p className="text-lg text-text-muted mb-2">{label}</p>}
              <div className={`text-6xl font-bold mb-2 ${days === 0 ? "text-green-600" : days > 0 ? "text-primary-600" : "text-red-500"}`}>
                {getDayText(days)}
              </div>
              <p className="text-text-muted">
                {days > 0
                  ? `${days}일 남았습니다`
                  : days === 0
                  ? "오늘입니다!"
                  : `${Math.abs(days)}일 지났습니다`}
              </p>
            </div>
          ) : (
            <div className="text-text-muted text-sm">날짜를 선택하면 D-Day가 계산됩니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
