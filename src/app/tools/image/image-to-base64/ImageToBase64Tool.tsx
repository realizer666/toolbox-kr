"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

export function ImageToBase64Tool() {
  const [base64, setBase64] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    setBase64("");
    setDataUrl("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 선택할 수 있습니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setDataUrl(result);
      // Extract base64 part after the comma
      const b64 = result.split(",")[1] || "";
      setBase64(b64);
    };
    reader.onerror = () => {
      setError("파일 읽기 중 오류가 발생했습니다.");
    };
    reader.readAsDataURL(file);
  }

  const imgTag = dataUrl ? `<img src="${dataUrl}" />` : "";

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

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
      )}

      {base64 && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Base64 문자열</label>
            <textarea
              value={base64}
              readOnly
              className="w-full h-32 p-4 border border-border rounded-lg bg-surface-muted text-text font-mono text-xs resize-y"
            />
            <div className="mt-2"><CopyButton text={base64} /></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">img 태그 예시</label>
            <textarea
              value={imgTag}
              readOnly
              className="w-full h-20 p-4 border border-border rounded-lg bg-surface-muted text-text font-mono text-xs resize-y"
            />
            <div className="mt-2"><CopyButton text={imgTag} /></div>
          </div>

          {dataUrl && (
            <div>
              <label className="block text-sm font-medium text-text mb-2">미리보기</label>
              <div className="p-4 border border-border rounded-lg bg-surface-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dataUrl} alt="미리보기" className="max-w-full max-h-64 object-contain" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
