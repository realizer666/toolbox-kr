"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

const KOREAN_SENTENCES = [
  "모든 국민은 인간으로서의 존엄과 가치를 가지며 행복을 추구할 권리를 가진다.",
  "대한민국의 주권은 국민에게 있고 모든 권력은 국민으로부터 나온다.",
  "국가는 전통문화의 계승 발전과 민족문화의 창달에 노력하여야 한다.",
  "신체의 자유를 침해받지 아니하며 법률에 의하지 아니하고는 체포 구속 압수 수색을 받지 아니한다.",
  "모든 국민은 학문과 예술의 자유를 가지며 저작자 발명가 과학기술자와 예술가의 권리는 법률로써 보호한다.",
  "근로자는 근로조건의 향상을 위하여 자주적인 단결권 단체교섭권 및 단체행동권을 가진다.",
  "모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며 국가와 국민은 환경보전을 위하여 노력하여야 한다.",
  "국가는 사회보장 사회복지의 증진에 노력할 의무를 진다.",
  "모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.",
  "대한민국은 통일을 지향하며 자유민주적 기본질서에 입각한 평화적 통일 정책을 수립하고 이를 추진한다.",
  "국회는 국민의 보통 평등 직접 비밀선거에 의하여 선출된 국회의원으로 구성한다.",
  "대통령은 국가의 원수이며 외국에 대하여 국가를 대표한다.",
  "모든 국민은 법 앞에 평등하며 누구든지 성별 종교 또는 사회적 신분에 의하여 차별을 받지 아니한다.",
  "국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다.",
  "재산권의 행사는 공공복리에 적합하도록 하여야 한다.",
];

function generateParagraphs(count: number): string {
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = 3 + Math.floor(Math.random() * 3);
    const sentences: string[] = [];
    for (let j = 0; j < sentenceCount; j++) {
      sentences.push(KOREAN_SENTENCES[Math.floor(Math.random() * KOREAN_SENTENCES.length)]);
    }
    paragraphs.push(sentences.join(" "));
  }
  return paragraphs.join("\n\n");
}

export function LoremGeneratorTool() {
  const [count, setCount] = useState(3);
  const [text, setText] = useState("");

  function handleGenerate() {
    setText(generateParagraphs(count));
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">문단 수</label>
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-24 px-3 py-2 border border-border rounded-lg bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="mt-5 px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          생성하기
        </button>
      </div>

      {text && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-muted">{text.length}자</span>
            <CopyButton text={text} />
          </div>
          <textarea
            value={text}
            readOnly
            className="w-full h-64 p-4 border border-border rounded-lg bg-surface-muted text-text text-sm resize-y"
          />
        </div>
      )}
    </div>
  );
}
