"use client";

import { useState, useRef, useEffect } from "react";

export function QrGeneratorTool() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text.trim()) { setQrUrl(""); return; }
    // Google Chart API로 QR코드 생성
    const url = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(text)}&choe=UTF-8`;
    setQrUrl(url);
  }, [text]);

  function handleDownload() {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrUrl;
    link.click();
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text mb-2">내용 입력</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="URL, 텍스트, 연락처 등을 입력하세요..."
            className="w-full h-48 p-4 border border-border rounded-lg bg-surface text-text resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="mt-3 flex gap-2">
            <button onClick={() => setText("https://")} className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-surface-muted transition-colors">URL</button>
            <button onClick={() => setText("tel:")} className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-surface-muted transition-colors">전화번호</button>
            <button onClick={() => setText("mailto:")} className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-surface-muted transition-colors">이메일</button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          {qrUrl ? (
            <>
              <div className="p-4 bg-white rounded-xl border border-border mb-4">
                <img src={qrUrl} alt="QR코드" width={250} height={250} />
              </div>
              <button onClick={handleDownload} className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
                이미지 다운로드
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-text-muted text-sm">
              내용을 입력하면 QR코드가 생성됩니다.
            </div>
          )}
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
