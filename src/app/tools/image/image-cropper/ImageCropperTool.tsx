"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export function ImageCropperTool() {
  const [imageSrc, setImageSrc] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(100);
  const [cropH, setCropH] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageSrc(result);
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
        setCropX(0);
        setCropY(0);
        setCropW(img.width);
        setCropH(img.height);
        imgRef.current = img;
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  }

  const drawPreview = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    // Draw the full image scaled to fit canvas, then draw crop rectangle overlay
    const maxW = 500;
    const scale = Math.min(maxW / img.width, 400 / img.height, 1);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Dim outside crop area
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clear crop area to show original
    const sx = cropX * scale;
    const sy = cropY * scale;
    const sw = cropW * scale;
    const sh = cropH * scale;
    ctx.clearRect(sx, sy, sw, sh);
    ctx.drawImage(img, cropX, cropY, cropW, cropH, sx, sy, sw, sh);

    // Draw crop border
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(sx, sy, sw, sh);
  }, [cropX, cropY, cropW, cropH]);

  useEffect(() => {
    if (imageSrc) {
      drawPreview();
    }
  }, [imageSrc, cropX, cropY, cropW, cropH, drawPreview]);

  function handleCrop() {
    const img = imgRef.current;
    if (!img) return;

    const offscreen = document.createElement("canvas");
    offscreen.width = cropW;
    offscreen.height = cropH;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = offscreen.toDataURL("image/png");
    link.click();
  }

  return (
    <div>
      <div>
        <label className="block text-sm font-medium text-text mb-2">이미지 선택</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-text file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-border file:text-sm file:bg-surface-muted file:text-text hover:file:bg-surface"
        />
      </div>

      {imageSrc && (
        <div className="mt-6">
          <div className="mb-4 text-sm text-text-muted">
            원본 크기: {imageSize.width} x {imageSize.height}px
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">X (px)</label>
              <input
                type="number"
                min={0}
                max={imageSize.width}
                value={cropX}
                onChange={(e) => setCropX(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Y (px)</label>
              <input
                type="number"
                min={0}
                max={imageSize.height}
                value={cropY}
                onChange={(e) => setCropY(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">너비 (px)</label>
              <input
                type="number"
                min={1}
                max={imageSize.width}
                value={cropW}
                onChange={(e) => setCropW(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">높이 (px)</label>
              <input
                type="number"
                min={1}
                max={imageSize.height}
                value={cropH}
                onChange={(e) => setCropH(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-text mb-2">미리보기</label>
            <div className="border border-border rounded-lg bg-surface-muted p-4 overflow-auto">
              <canvas ref={canvasRef} />
            </div>
          </div>

          <button
            onClick={handleCrop}
            className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            잘라서 다운로드
          </button>
        </div>
      )}
    </div>
  );
}
