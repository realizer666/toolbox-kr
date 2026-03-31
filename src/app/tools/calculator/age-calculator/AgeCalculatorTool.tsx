"use client";

import { useState } from "react";

export function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState("");

  function calculate() {
    if (!birthDate) return null;

    const birth = new Date(birthDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 만 나이
    let manAge = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      manAge--;
    }

    // 한국 나이 (세는나이)
    const koreanAge = today.getFullYear() - birth.getFullYear() + 1;

    // 연 나이
    const yearAge = today.getFullYear() - birth.getFullYear();

    // 다음 생일까지
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // 살아온 일수
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    // 띠
    const animals = ["원숭이", "닭", "개", "돼지", "쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양"];
    const zodiac = animals[birth.getFullYear() % 12];

    return { manAge, koreanAge, yearAge, daysToNextBirthday, totalDays, zodiac };
  }

  const result = calculate();

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-1">생년월일</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "만 나이", value: `${result.manAge}세`, highlight: true },
            { label: "한국 나이 (세는나이)", value: `${result.koreanAge}세`, highlight: false },
            { label: "연 나이", value: `${result.yearAge}세`, highlight: false },
            { label: "살아온 일수", value: `${result.totalDays.toLocaleString()}일`, highlight: false },
            { label: "다음 생일까지", value: `${result.daysToNextBirthday}일`, highlight: false },
            { label: "띠", value: `${result.zodiac}띠`, highlight: false },
          ].map((item) => (
            <div key={item.label} className={`rounded-lg p-4 border text-center ${item.highlight ? "bg-primary-50 border-primary-100" : "bg-surface-muted border-border"}`}>
              <div className={`text-2xl font-bold ${item.highlight ? "text-primary-600" : "text-text"}`}>{item.value}</div>
              <div className="text-xs text-text-muted mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
