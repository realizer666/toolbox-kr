"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/utils";

type RepaymentType = "equal-payment" | "equal-principal";

export function LoanCalculatorTool() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [type, setType] = useState<RepaymentType>("equal-payment");

  const principal = Number(amount) * 10000;
  const monthlyRate = Number(rate) / 100 / 12;
  const totalMonths = Number(years) * 12;

  function calculate() {
    if (!principal || !monthlyRate || !totalMonths) return null;

    if (type === "equal-payment") {
      const monthly =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      const totalPayment = monthly * totalMonths;
      const totalInterest = totalPayment - principal;
      return { monthly, totalPayment, totalInterest };
    } else {
      const monthlyPrincipal = principal / totalMonths;
      const firstMonthInterest = principal * monthlyRate;
      const firstMonthly = monthlyPrincipal + firstMonthInterest;
      let totalInterest = 0;
      for (let i = 0; i < totalMonths; i++) {
        totalInterest += (principal - monthlyPrincipal * i) * monthlyRate;
      }
      const totalPayment = principal + totalInterest;
      return { monthly: firstMonthly, totalPayment, totalInterest };
    }
  }

  const result = calculate();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">대출 금액 (만원)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="예: 30000"
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">연 이자율 (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="예: 3.5"
              step="0.1"
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">대출 기간 (년)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="예: 30"
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-2">상환 방식</label>
            <div className="flex gap-2">
              <button
                onClick={() => setType("equal-payment")}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  type === "equal-payment" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"
                }`}
              >
                원리금 균등
              </button>
              <button
                onClick={() => setType("equal-principal")}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  type === "equal-principal" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"
                }`}
              >
                원금 균등
              </button>
            </div>
          </div>
        </div>

        <div>
          {result ? (
            <div className="space-y-3">
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
                <div className="text-sm text-text-muted mb-1">
                  {type === "equal-payment" ? "월 납입금" : "첫 달 납입금"}
                </div>
                <div className="text-3xl font-bold text-primary-600">
                  {formatNumber(Math.round(result.monthly))}원
                </div>
              </div>
              <div className="bg-surface-muted rounded-lg p-4 border border-border">
                <div className="text-sm text-text-muted mb-1">총 이자</div>
                <div className="text-xl font-bold text-text">
                  {formatNumber(Math.round(result.totalInterest))}원
                </div>
              </div>
              <div className="bg-surface-muted rounded-lg p-4 border border-border">
                <div className="text-sm text-text-muted mb-1">총 상환 금액</div>
                <div className="text-xl font-bold text-text">
                  {formatNumber(Math.round(result.totalPayment))}원
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-text-muted text-sm">
              금액, 이자율, 기간을 입력하면 결과가 표시됩니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
