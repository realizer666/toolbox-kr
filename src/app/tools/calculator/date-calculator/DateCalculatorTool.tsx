"use client";

import { useState } from "react";

function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

function diffDates(a: Date, b: Date) {
  const ms = Math.abs(b.getTime() - a.getTime());
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const remainDays = days % 7;

  let months = 0;
  let years = 0;
  const start = a < b ? a : b;
  const end = a < b ? b : a;
  years = end.getFullYear() - start.getFullYear();
  months = end.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (end.getDate() < start.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  return { days, weeks, remainDays, months: years * 12 + months, years, monthsOnly: months };
}

export function DateCalculatorTool() {
  const [mode, setMode] = useState<"diff" | "add">("diff");
  const today = new Date().toISOString().split("T")[0];
  const [date1, setDate1] = useState(today);
  const [date2, setDate2] = useState(today);
  const [baseDate, setBaseDate] = useState(today);
  const [daysInput, setDaysInput] = useState("0");
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  const diff = mode === "diff" && date1 && date2 ? diffDates(new Date(date1), new Date(date2)) : null;

  const resultDate =
    mode === "add" && baseDate
      ? (() => {
          const d = new Date(baseDate);
          const n = Number(daysInput) || 0;
          d.setDate(d.getDate() + (operation === "add" ? n : -n));
          return d;
        })()
      : null;

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {[
          { key: "diff" as const, label: "두 날짜 사이" },
          { key: "add" as const, label: "날짜 더하기/빼기" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.key
                ? "bg-primary-600 text-white"
                : "border border-border hover:bg-surface-muted text-text"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "diff" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">시작 날짜</label>
              <input
                type="date"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">종료 날짜</label>
              <input
                type="date"
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            {diff ? (
              <div className="space-y-3">
                <div className="bg-surface-muted rounded-lg p-4 border border-border text-center">
                  <div className="text-sm text-text-muted mb-1">날짜 차이</div>
                  <div className="text-4xl font-bold text-text">{diff.days.toLocaleString("ko-KR")}일</div>
                </div>
                <div className="bg-surface-muted rounded-lg p-4 border border-border space-y-2 text-sm">
                  {[
                    { label: "주", value: `${diff.weeks}주 ${diff.remainDays}일` },
                    { label: "개월", value: `약 ${diff.months}개월` },
                    {
                      label: "년",
                      value: `${diff.years}년 ${diff.monthsOnly}개월`,
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-text-muted">
                      <span>{row.label}</span>
                      <span className="font-medium text-text">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-text-muted text-sm">
                두 날짜를 선택하면 차이가 계산됩니다.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">기준 날짜</label>
              <input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">일수</label>
              <input
                type="number"
                value={daysInput}
                onChange={(e) => setDaysInput(e.target.value)}
                min="0"
                placeholder="예: 100"
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2">
              {[
                { key: "add" as const, label: "더하기 (+)" },
                { key: "subtract" as const, label: "빼기 (-)" },
              ].map((op) => (
                <button
                  key={op.key}
                  onClick={() => setOperation(op.key)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    operation === op.key
                      ? "bg-primary-600 text-white"
                      : "border border-border hover:bg-surface-muted text-text"
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            {resultDate ? (
              <div className="bg-surface-muted rounded-lg p-4 border border-border text-center">
                <div className="text-sm text-text-muted mb-1">결과 날짜</div>
                <div className="text-2xl font-bold text-text">{formatDate(resultDate)}</div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-text-muted text-sm">
                날짜와 일수를 입력하세요.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
