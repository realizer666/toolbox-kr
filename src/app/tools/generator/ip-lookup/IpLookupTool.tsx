"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

export function IpLookupTool() {
  const [ip, setIp] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userAgent, setUserAgent] = useState("");
  const [screenInfo, setScreenInfo] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    setUserAgent(navigator.userAgent);
    setScreenInfo(`${window.screen.width} x ${window.screen.height}`);
  }, []);

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="bg-surface-muted rounded-lg p-6 border border-border text-center">
        <div className="text-sm text-text-muted mb-2">내 IP 주소</div>
        {loading ? (
          <div className="text-2xl font-bold text-text-muted animate-pulse">조회 중...</div>
        ) : error ? (
          <div className="text-lg text-red-500">IP를 가져올 수 없습니다.</div>
        ) : (
          <>
            <div className="text-4xl font-bold text-text mb-3 font-mono">{ip}</div>
            <CopyButton text={ip} />
          </>
        )}
      </div>

      {userAgent && (
        <div className="bg-surface-muted rounded-lg p-4 border border-border">
          <div className="text-sm font-medium text-text mb-1">User Agent</div>
          <div className="text-xs text-text-muted break-all">{userAgent}</div>
        </div>
      )}

      {screenInfo && (
        <div className="bg-surface-muted rounded-lg p-4 border border-border">
          <div className="text-sm font-medium text-text mb-1">화면 해상도</div>
          <div className="text-lg font-mono text-text">{screenInfo}</div>
        </div>
      )}
    </div>
  );
}
