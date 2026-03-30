"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/utils";

interface Deductions {
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  total: number;
}

function calculateDeductions(annualSalary: number): Deductions {
  const monthlySalary = annualSalary / 12;

  // 2026년 기준 요율 (근사치)
  const nationalPension = Math.min(monthlySalary * 0.045, 265500);
  const healthInsurance = monthlySalary * 0.03545;
  const longTermCare = healthInsurance * 0.1295;
  const employmentInsurance = monthlySalary * 0.009;

  // 간이세액표 근사 계산
  let incomeTax = 0;
  const taxableIncome = annualSalary - annualSalary * 0.15;
  if (taxableIncome <= 14000000) incomeTax = taxableIncome * 0.06;
  else if (taxableIncome <= 50000000) incomeTax = 840000 + (taxableIncome - 14000000) * 0.15;
  else if (taxableIncome <= 88000000) incomeTax = 6240000 + (taxableIncome - 50000000) * 0.24;
  else if (taxableIncome <= 150000000) incomeTax = 15360000 + (taxableIncome - 88000000) * 0.35;
  else incomeTax = 37060000 + (taxableIncome - 150000000) * 0.38;

  const monthlyIncomeTax = Math.max(incomeTax / 12, 0);
  const localIncomeTax = monthlyIncomeTax * 0.1;

  const total = nationalPension + healthInsurance + longTermCare + employmentInsurance + monthlyIncomeTax + localIncomeTax;

  return {
    nationalPension: Math.round(nationalPension),
    healthInsurance: Math.round(healthInsurance),
    longTermCare: Math.round(longTermCare),
    employmentInsurance: Math.round(employmentInsurance),
    incomeTax: Math.round(monthlyIncomeTax),
    localIncomeTax: Math.round(localIncomeTax),
    total: Math.round(total),
  };
}

export function SalaryCalculatorTool() {
  const [salary, setSalary] = useState("");

  const annualSalary = Number(salary) * 10000;
  const monthlySalary = annualSalary / 12;
  const deductions = annualSalary > 0 ? calculateDeductions(annualSalary) : null;
  const netMonthly = deductions ? Math.round(monthlySalary - deductions.total) : 0;

  const items = deductions
    ? [
        { label: "국민연금", value: deductions.nationalPension },
        { label: "건강보험", value: deductions.healthInsurance },
        { label: "장기요양보험", value: deductions.longTermCare },
        { label: "고용보험", value: deductions.employmentInsurance },
        { label: "소득세", value: deductions.incomeTax },
        { label: "지방소득세", value: deductions.localIncomeTax },
      ]
    : [];

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-1">연봉 (만원)</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="예: 5000"
          className="w-full max-w-xs px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {deductions && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-primary-50 rounded-lg p-4 border border-primary-100 mb-4">
              <div className="text-sm text-text-muted mb-1">월 실수령액</div>
              <div className="text-3xl font-bold text-primary-600">
                {formatNumber(netMonthly)}원
              </div>
            </div>
            <div className="bg-surface-muted rounded-lg p-4 border border-border">
              <div className="text-sm text-text-muted mb-1">월 공제 합계</div>
              <div className="text-xl font-bold text-red-500">
                -{formatNumber(deductions.total)}원
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-text mb-3">공제 내역 (월)</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-text-muted">{item.label}</span>
                  <span className="text-sm font-medium text-text">
                    {formatNumber(item.value)}원
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-surface-muted rounded-lg border border-border">
        <p className="text-xs text-text-muted">
          2026년 기준 세율 및 보험료율로 계산한 근사치입니다.
          부양가족 수, 비과세 항목 등에 따라 실제 금액과 차이가 있을 수 있습니다.
        </p>
      </div>
    </div>
  );
}
