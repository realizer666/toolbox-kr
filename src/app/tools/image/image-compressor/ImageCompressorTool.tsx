"use client";

import { useState, useRef } from "react";
import { formatNumber } from "@/lib/utils";

export function ImageCompressorTool() {
  const [image, setImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(0.7);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      compress(ev.target?.result as string, quality);
    };
    reader.readAsDataURL(file);
  }

  function compress(src: string, q: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", q);
      setCompressedUrl(dataUrl);
      const bytes = Math.round((dataUrl.length - "data:image/jpeg;base64,".length) * 0.75);
      setCompressedSize(bytes);
    };
    img.src = src;
  }

  function handleQualityChange(q: number) {
    setQuality(q);
    if (image) compress(image, q);
  }

  function handleDownload() {
    if (!compressedUrl) return;
    const link = document.createElement("a");
    link.download = `compressed_${fileName}`;
    link.href = compressedUrl;
    link.click();
  }

  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const reduction = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0;

  return (
    <div>
      <canvas ref={canvasRef} className="hidden" />

      {!image ? (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-surface-muted transition-colors">
          <div className="text-4xl mb-2">🗜️</div>
          <p className="text-text-muted text-sm">이미지를 선택하세요</p>
          <p className="text-text-muted text-xs mt-1">PNG, JPG, WebP 지원</p>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-surface-muted rounded-lg p-3 text-center border border-border">
              <div className="text-lg font-bold text-text">{formatBytes(originalSize)}</div>
              <div className="text-xs text-text-muted">원본 크기</div>
            </div>
            <div className="bg-surface-muted rounded-lg p-3 text-center border border-border">
              <div className="text-lg font-bold text-primary-600">{formatBytes(compressedSize)}</div>
              <div className="text-xs text-text-muted">압축 후</div>
            </div>
            <div className="bg-surface-muted rounded-lg p-3 text-center border border-border">
              <div className="text-lg font-bold text-green-600">{reduction}% 감소</div>
              <div className="text-xs text-text-muted">압축률</div>
            </div>
          </div>

          <div className="mb-4 p-4 bg-surface-muted rounded-lg border border-border">
            <label className="block text-sm font-medium text-text mb-2">
              품질: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={quality}
              onChange={(e) => handleQualityChange(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>낮은 품질 (작은 용량)</span>
              <span>높은 품질 (큰 용량)</span>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              다운로드
            </button>
            <button
              onClick={() => { setImage(null); setCompressedUrl(null); setFileName(""); }}
              className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-surface-muted transition-colors"
            >
              다른 이미지
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
