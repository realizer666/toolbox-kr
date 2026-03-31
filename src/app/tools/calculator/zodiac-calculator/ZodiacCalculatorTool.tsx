"use client";

import { useState } from "react";

const westernZodiacs = [
  { name: "염소자리", emoji: "♑", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, desc: "책임감이 강하고 현실적인 성격" },
  { name: "물병자리", emoji: "♒", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, desc: "독창적이고 인도주의적인 성격" },
  { name: "물고기자리", emoji: "♓", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, desc: "감성적이고 상상력이 풍부한 성격" },
  { name: "양자리", emoji: "♈", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, desc: "열정적이고 도전적인 성격" },
  { name: "황소자리", emoji: "♉", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, desc: "성실하고 안정을 추구하는 성격" },
  { name: "쌍둥이자리", emoji: "♊", startMonth: 5, startDay: 21, endMonth: 6, endDay: 21, desc: "재치있고 다재다능한 성격" },
  { name: "게자리", emoji: "♋", startMonth: 6, startDay: 22, endMonth: 7, endDay: 22, desc: "가정적이고 감정이 풍부한 성격" },
  { name: "사자자리", emoji: "♌", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, desc: "자신감 넘치고 리더십 있는 성격" },
  { name: "처녀자리", emoji: "♍", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, desc: "분석적이고 완벽을 추구하는 성격" },
  { name: "천칭자리", emoji: "♎", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22, desc: "조화롭고 공정한 성격" },
  { name: "전갈자리", emoji: "♏", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21, desc: "열정적이고 통찰력 있는 성격" },
  { name: "사수자리", emoji: "♐", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21, desc: "자유분방하고 낙천적인 성격" },
];

const chineseZodiacs = [
  { name: "쥐띠", emoji: "🐭", desc: "영리하고 재치있는 성격" },
  { name: "소띠", emoji: "🐂", desc: "성실하고 끈기있는 성격" },
  { name: "호랑이띠", emoji: "🐅", desc: "용감하고 자신감 넘치는 성격" },
  { name: "토끼띠", emoji: "🐇", desc: "온화하고 예술적인 성격" },
  { name: "용띠", emoji: "🐉", desc: "카리스마 있고 활력 넘치는 성격" },
  { name: "뱀띠", emoji: "🐍", desc: "지혜롭고 신중한 성격" },
  { name: "말띠", emoji: "🐴", desc: "활동적이고 자유로운 성격" },
  { name: "양띠", emoji: "🐑", desc: "온순하고 예술적 감각이 뛰어난 성격" },
  { name: "원숭이띠", emoji: "🐵", desc: "재치있고 영리한 성격" },
  { name: "닭띠", emoji: "🐔", desc: "근면하고 용감한 성격" },
  { name: "개띠", emoji: "🐶", desc: "충직하고 정의로운 성격" },
  { name: "돼지띠", emoji: "🐷", desc: "너그럽고 성실한 성격" },
];

function getWesternZodiac(month: number, day: number) {
  for (const z of westernZodiacs) {
    if (z.startMonth === z.endMonth) {
      if (month === z.startMonth && day >= z.startDay && day <= z.endDay) return z;
    } else if (z.startMonth > z.endMonth) {
      // Capricorn wraps around year
      if ((month === z.startMonth && day >= z.startDay) || (month === z.endMonth && day <= z.endDay)) return z;
    } else {
      if ((month === z.startMonth && day >= z.startDay) || (month === z.endMonth && day <= z.endDay)) return z;
    }
  }
  return westernZodiacs[0];
}

function getChineseZodiac(year: number) {
  // 2020 was year of the rat (index 0)
  const index = ((year - 2020) % 12 + 12) % 12;
  return chineseZodiacs[index];
}

export function ZodiacCalculatorTool() {
  const [birthdate, setBirthdate] = useState("");

  const date = birthdate ? new Date(birthdate) : null;
  const western = date ? getWesternZodiac(date.getMonth() + 1, date.getDate()) : null;
  const chinese = date ? getChineseZodiac(date.getFullYear()) : null;

  return (
    <div>
      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-text mb-1">생년월일</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {western && chinese ? (
          <div className="space-y-4">
            <div className="bg-surface-muted rounded-lg p-6 border border-border text-center">
              <div className="text-5xl mb-2">{western.emoji}</div>
              <div className="text-sm text-text-muted mb-1">서양 별자리</div>
              <div className="text-2xl font-bold text-text">{western.name}</div>
              <div className="text-sm text-text-muted mt-1">{western.desc}</div>
            </div>

            <div className="bg-surface-muted rounded-lg p-6 border border-border text-center">
              <div className="text-5xl mb-2">{chinese.emoji}</div>
              <div className="text-sm text-text-muted mb-1">띠</div>
              <div className="text-2xl font-bold text-text">{chinese.name}</div>
              <div className="text-sm text-text-muted mt-1">{chinese.desc}</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 text-text-muted text-sm">
            생년월일을 입력하면 별자리와 띠를 알려드립니다.
          </div>
        )}
      </div>
    </div>
  );
}
