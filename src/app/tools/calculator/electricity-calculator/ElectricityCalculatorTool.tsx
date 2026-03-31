"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/utils";

function calculateElectricity(kwh: number) {
  if (kwh <= 0) return null;

  // Base charge
  let baseCharge: number;
  if (kwh <= 200) baseCharge = 910;
  else if (kwh <= 400) baseCharge = 1600;
  else baseCharge = 7300;

  // Usage charge (progressive)
  let usageCharge = 0;
  const tiers: { limit: number; rate: number; used: number }[] = [];

  // Tier 1: 0-200
  const tier1 = Math.min(kwh, 200);
  const tier1Charge = tier1 * 120;
  usageCharge += tier1Charge;
  tiers.push({ limit: 200, rate: 120, used: tier1 });

  // Tier 2: 201-400
  if (kwh > 200) {
    const tier2 = Math.min(kwh - 200, 200);
    const tier2Charge = tier2 * 214.6;
    usageCharge += tier2Charge;
    tiers.push({ limit: 400, rate: 214.6, used: tier2 });
  }

  // Tier 3: 401+
  if (kwh > 400) {
    const tier3 = kwh - 400;
    const tier3Charge = tier3 * 307.3;
    usageCharge += tier3Charge;
    tiers.push({ limit: Infinity, rate: 307.3, used: tier3 });
  }

  const subtotal = baseCharge + usageCharge;
  const vat = Math.floor(subtotal * 0.1);
  const fund = Math.floor(subtotal * 0.037);
  const total = subtotal + vat + fund;

  return { baseCharge, usageCharge: Math.floor(usageCharge), tiers, subtotal, vat, fund, total };
}

export function ElectricityCalculatorTool() {
  const [kwh, setKwh] = useState("");

  const result = calculateElectricity(Number(kwh));

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">월 사용량 (kWh)</label>
            <input
              type="number"
              value={kwh}
              onChange={(e) => setKwh(e.target.value)}
              placeholder="예: 350"
              min="0"
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="bg-surface-muted rounded-lg p-3 border border-border">
            <div className="text-xs text-text-muted mb-2">2026년 주택용 전기요금 누진제</div>
            <div className="space-y-1 text-xs">
              {[
                { range: "1~200 kWh", rate: "120원/kWh", base: "기본료 910원" },
                { range: "201~400 kWh", rate: "214.6원/kWh", base: "기본료 1,600원" },
                { range: "401 kWh~", rate: "307.3원/kWh", base: "기본료 7,300원" },
              ].map((row) => (
                <div key={row.range} className="flex justify-between text-text-muted">
                  <span>{row.range}</span>
                  <span>{row.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {result ? (
            <div className="space-y-3">
              <div className="bg-surface-muted rounded-lg p-4 border border-border text-center">
                <div className="text-sm text-text-muted mb-1">예상 전기요금</div>
                <div className="text-4xl font-bold text-text">{formatNumber(result.total)}원</div>
              </div>

              <div className="bg-surface-muted rounded-lg p-4 border border-border space-y-2 text-sm">
                <div className="flex justify-between text-text-muted">
                  <span>기본요금</span>
                  <span className="font-medium text-text">{formatNumber(result.baseCharge)}원</span>
                </div>
                {result.tiers.map((tier, i) => (
                  <div key={i} className="flex justify-between text-text-muted">
                    <span>
                      {i + 1}단계 ({tier.used}kWh x {tier.rate}원)
                    </span>
                    <span className="font-medium text-text">
                      {formatNumber(Math.floor(tier.used * tier.rate))}원
                    </span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 flex justify-between text-text-muted">
                  <span>소계</span>
                  <span className="font-medium text-text">{formatNumber(result.subtotal)}원</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>부가세 (10%)</span>
                  <span className="font-medium text-text">{formatNumber(result.vat)}원</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>전력기반기금 (3.7%)</span>
                  <span className="font-medium text-text">{formatNumber(result.fund)}원</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold text-text">
                  <span>합계</span>
                  <span>{formatNumber(result.total)}원</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-text-muted text-sm">
              월 사용량을 입력하면 전기요금이 계산됩니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
