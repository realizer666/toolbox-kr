"use client";

import { useState, useRef } from "react";

type ImageFormat = "image/png" | "image/jpeg" | "image/webp" | "image/bmp";

const formats: { id: ImageFormat; label: string; ext: string }[] = [
  { id: "image/png", label: "PNG", ext: "png" },
  { id: "image/jpeg", label: "JPEG", ext: "jpg" },
  { id: "image/webp", label: "WebP", ext: "webp" },
  { id: "image/bmp", label: "BMP", ext: "bmp" },
];

export function ImageConverterTool() {
  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState<ImageFormat>("image/png");
  const [fileName, setFileName] = useState("");
  const [originalFormat, setOriginalFormat] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    setOriginalFormat(file.type);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleDownload() {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const ext = formats.find((f) => f.id === format)?.ext || "png";
      const dataUrl = canvas.toDataURL(format, 0.92);
      const link = document.createElement("a");
      link.download = `${fileName}.${ext}`;
      link.href = dataUrl;
      link.click();
    };
    img.src = image;
  }

  return (
    <div>
      <canvas ref={canvasRef} className="hidden" />

      {!image ? (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-surface-muted transition-colors">
          <div className="text-4xl mb-2">🔄</div>
          <p className="text-text-muted text-sm">이미지를 선택하세요</p>
          <p className="text-text-muted text-xs mt-1">PNG, JPG, WebP, BMP 지원</p>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      ) : (
        <div>
          <div className="mb-4 p-4 bg-surface-muted rounded-lg border border-border">
            <p className="text-sm text-text-muted mb-3">
              원본 형식: <strong className="text-text">{originalFormat || "알 수 없음"}</strong>
            </p>
            <label className="block text-sm font-medium text-text mb-2">변환할 형식</label>
            <div className="flex flex-wrap gap-2">
              {formats.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    format === f.id
                      ? "bg-primary-600 text-white border-primary-600"
                      : "border-border hover:bg-surface"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              {formats.find((f) => f.id === format)?.label}로 변환 및 다운로드
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
