"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeResult) => void;
        width: string;
        height: string;
      }) => { embed: (element: HTMLElement) => void };
    };
  }
}

interface DaumPostcodeResult {
  zonecode: string;        // 우편번호
  address: string;         // 기본 주소 (도로명)
  addressEnglish: string;  // 영문 주소
  roadAddress: string;     // 도로명 주소
  roadAddressEnglish: string; // 영문 도로명 주소
  jibunAddress: string;    // 지번 주소
  jibunAddressEnglish: string; // 영문 지번 주소
  bname: string;           // 법정동/법정리
  buildingName: string;    // 건물명
  sido: string;            // 시/도
  sigungu: string;         // 시/군/구
}

interface AddressResult {
  zonecode: string;
  roadAddress: string;
  roadAddressEnglish: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  buildingName: string;
}

export function AddressConverterTool() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [result, setResult] = useState<AddressResult | null>(null);
  const [detailAddress, setDetailAddress] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && !window.daum) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  function handleSearch() {
    if (!window.daum) return;

    const container = document.getElementById("postcode-container");
    if (!container) return;
    container.innerHTML = "";

    new window.daum.Postcode({
      oncomplete: (data: DaumPostcodeResult) => {
        setResult({
          zonecode: data.zonecode,
          roadAddress: data.roadAddress,
          roadAddressEnglish: data.roadAddressEnglish,
          jibunAddress: data.jibunAddress,
          jibunAddressEnglish: data.jibunAddressEnglish,
          buildingName: data.buildingName,
        });
        setDetailAddress("");
        container.innerHTML = "";
        container.style.display = "none";
      },
      width: "100%",
      height: "100%",
    }).embed(container);

    container.style.display = "block";
  }

  const fullEnglishAddress = result
    ? detailAddress
      ? `${detailAddress}, ${result.roadAddressEnglish}`
      : result.roadAddressEnglish
    : "";

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={handleSearch}
          disabled={!scriptLoaded}
          className="w-full sm:w-auto px-6 py-3 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
        >
          🔍 주소 검색하기
        </button>
      </div>

      {/* 다음 우편번호 검색 임베드 */}
      <div
        id="postcode-container"
        className="border border-border rounded-lg overflow-hidden mb-6"
        style={{ display: "none", height: "450px" }}
      />

      {result && (
        <div className="space-y-4">
          {/* 우편번호 */}
          <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-text-muted mb-1">우편번호</div>
                <div className="text-3xl font-bold text-primary-600">{result.zonecode}</div>
              </div>
              <CopyButton text={result.zonecode} />
            </div>
          </div>

          {/* 상세주소 입력 */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              상세주소 입력 (선택)
            </label>
            <input
              type="text"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="동/호수 입력 (예: 101동 1502호)"
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* 한글 주소 */}
          <div className="p-4 bg-surface-muted border border-border rounded-lg">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs text-text-muted mb-1">도로명 주소 (한글)</div>
                <div className="text-sm font-medium text-text">
                  {result.roadAddress}
                  {detailAddress && ` ${detailAddress}`}
                  {result.buildingName && ` (${result.buildingName})`}
                </div>
              </div>
              <CopyButton
                text={`${result.roadAddress}${detailAddress ? ` ${detailAddress}` : ""}${result.buildingName ? ` (${result.buildingName})` : ""}`}
              />
            </div>
          </div>

          {/* 영문 도로명 주소 */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs text-blue-600 mb-1">도로명 주소 (영문) ★</div>
                <div className="text-sm font-medium text-blue-900">
                  {fullEnglishAddress}
                </div>
              </div>
              <CopyButton text={fullEnglishAddress} />
            </div>
          </div>

          {/* 지번 주소 */}
          {result.jibunAddress && (
            <div className="p-4 bg-surface-muted border border-border rounded-lg">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs text-text-muted mb-1">지번 주소 (한글)</div>
                  <div className="text-sm text-text">{result.jibunAddress}</div>
                </div>
                <CopyButton text={result.jibunAddress} />
              </div>
            </div>
          )}

          {/* 영문 지번 주소 */}
          {result.jibunAddressEnglish && (
            <div className="p-4 bg-surface-muted border border-border rounded-lg">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs text-text-muted mb-1">지번 주소 (영문)</div>
                  <div className="text-sm text-text">{result.jibunAddressEnglish}</div>
                </div>
                <CopyButton text={result.jibunAddressEnglish} />
              </div>
            </div>
          )}

          <div className="p-4 bg-surface-muted rounded-lg border border-border">
            <p className="text-xs text-text-muted">
              해외 직구, 해외 배송 시 영문 도로명 주소(★)를 사용하세요.
              상세주소(동/호수)는 영문으로 직접 입력해주세요.
              (예: 101-dong 1502-ho, Apt 301)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
