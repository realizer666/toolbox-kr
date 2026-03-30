"use client";

import { useState, useRef } from "react";

export function ImageResizerTool() {
  const [image, setImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepRatio, setKeepRatio] = useState(true);
  const [fileName, setFileName] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        setOriginalSize({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
        setImage(ev.target?.result as string);
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  function handleWidthChange(newWidth: number) {
    setWidth(newWidth);
    if (keepRatio && originalSize.width > 0) {
      setHeight(Math.round((newWidth / originalSize.width) * originalSize.height));
    }
  }

  function handleHeightChange(newHeight: number) {
    setHeight(newHeight);
    if (keepRatio && originalSize.height > 0) {
      setWidth(Math.round((newHeight / originalSize.height) * originalSize.width));
    }
  }

  function handleDownload() {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      const link = document.createElement("a");
      link.download = `resized_${fileName}`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = image;
  }

  return (
    <div>
      <canvas ref={canvasRef} className="hidden" />

      {!image ? (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-surface-muted transition-colors">
          <div className="text-4xl mb-2">📁</div>
          <p className="text-text-muted text-sm">이미지를 선택하세요</p>
          <p className="text-text-muted text-xs mt-1">PNG, JPG, WebP 지원</p>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      ) : (
        <div>
          <div className="flex flex-wrap items-center gap-4 mb-4 p-4 bg-surface-muted rounded-lg border border-border">
            <div>
              <label className="block text-xs text-text-muted mb-1">가로 (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="w-28 px-3 py-2 border border-border rounded-lg text-sm bg-surface"
              />
            </div>
            <div className="text-text-muted text-lg mt-4">×</div>
            <div>
              <label className="block text-xs text-text-muted mb-1">세로 (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-28 px-3 py-2 border border-border rounded-lg text-sm bg-surface"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-text mt-4">
              <input
                type="checkbox"
                checked={keepRatio}
                onChange={(e) => setKeepRatio(e.target.checked)}
              />
              비율 유지
            </label>
          </div>

          <div className="text-sm text-text-muted mb-4">
            원본: {originalSize.width} × {originalSize.height}px → 변환: {width} × {height}px
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              다운로드
            </button>
            <button
              onClick={() => { setImage(null); setFileName(""); }}
              className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-surface-muted transition-colors"
            >
              다른 이미지
            </button>
          </div>

          <div className="border border-border rounded-lg p-2 bg-surface-muted overflow-auto max-h-96">
            <img src={image} alt="미리보기" className="max-w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}
