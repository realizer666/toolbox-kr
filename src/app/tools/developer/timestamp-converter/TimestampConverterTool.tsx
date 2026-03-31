"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

export function TimestampConverterTool() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [timestamp, setTimestamp] = useState("");
  const [dateResult, setDateResult] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timestampResult, setTimestampResult] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleTimestampToDate() {
    const ts = Number(timestamp);
    if (isNaN(ts)) {
      setDateResult("유효하지 않은 타임스탬프입니다.");
      return;
    }
    const date = new Date(ts * 1000);
    setDateResult(date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }) + ` (UTC: ${date.toISOString()})`);
  }

  function handleDateToTimestamp() {
    if (!dateInput) {
      setTimestampResult("날짜를 선택하세요.");
      return;
    }
    const date = new Date(dateInput);
    const ts = Math.floor(date.getTime() / 1000);
    setTimestampResult(String(ts));
  }

  return (
    <div>
      <div className="mb-6 p-4 border border-border rounded-lg bg-surface-muted">
        <label className="block text-sm font-medium text-text mb-1">현재 Unix 타임스탬프</label>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-mono text-primary-600 font-bold">{now}</span>
          <CopyButton text={String(now)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border border-border rounded-lg bg-surface">
          <h3 className="text-sm font-medium text-text mb-3">타임스탬프 → 날짜</h3>
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="Unix 타임스탬프 (초)"
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={handleTimestampToDate}
            className="mt-3 px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            변환
          </button>
          {dateResult && (
            <div className="mt-3">
              <div className="p-3 border border-border rounded-lg bg-surface-muted font-mono text-sm text-text break-all">
                {dateResult}
              </div>
              <div className="mt-2"><CopyButton text={dateResult} /></div>
            </div>
          )}
        </div>

        <div className="p-4 border border-border rounded-lg bg-surface">
          <h3 className="text-sm font-medium text-text mb-3">날짜 → 타임스탬프</h3>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={handleDateToTimestamp}
            className="mt-3 px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            변환
          </button>
          {timestampResult && (
            <div className="mt-3">
              <div className="p-3 border border-border rounded-lg bg-surface-muted font-mono text-sm text-text">
                {timestampResult}
              </div>
              <div className="mt-2"><CopyButton text={timestampResult} /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
