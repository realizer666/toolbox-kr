"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

interface SpellingError {
  original: string;
  suggestion: string;
  reason: string;
}

const SPELLING_RULES: { pattern: RegExp; suggestion: string; reason: string }[] = [
  // 흔한 오타/맞춤법
  { pattern: /안능하세요/g, suggestion: "안녕하세요", reason: "'안녕하세요'가 올바른 표현입니다" },
  { pattern: /안녕하새요/g, suggestion: "안녕하세요", reason: "'안녕하세요'가 올바른 표현입니다" },
  { pattern: /안냥하세요/g, suggestion: "안녕하세요", reason: "'안녕하세요'가 올바른 표현입니다" },
  { pattern: /감사합니더/g, suggestion: "감사합니다", reason: "'감사합니다'가 올바른 표현입니다" },
  { pattern: /수고하십시요/g, suggestion: "수고하십시오", reason: "'수고하십시오'가 올바른 표현입니다" },
  { pattern: /고맙습니더/g, suggestion: "고맙습니다", reason: "'고맙습니다'가 올바른 표현입니다" },
  // -구/-고 구어체 교정
  { pattern: /이라구/g, suggestion: "이라고", reason: "'이라고'가 올바른 표현입니다" },
  { pattern: /했구/g, suggestion: "했고", reason: "'했고'가 올바른 표현입니다" },
  { pattern: /했구나/g, suggestion: "했구나", reason: "올바른 표현입니다" },
  { pattern: /라구요/g, suggestion: "라고요", reason: "'라고요'가 올바른 표현입니다" },
  { pattern: /다구요/g, suggestion: "다고요", reason: "'다고요'가 올바른 표현입니다" },
  { pattern: /한다구/g, suggestion: "한다고", reason: "'한다고'가 올바른 표현입니다" },
  { pattern: /그렇구/g, suggestion: "그렇고", reason: "'그렇고'가 올바른 표현입니다" },
  // 합니다요 등 잘못된 종결어미
  { pattern: /합니다요/g, suggestion: "합니다", reason: "'합니다'가 올바른 종결어미입니다" },
  { pattern: /입니다요/g, suggestion: "입니다", reason: "'입니다'가 올바른 종결어미입니다" },
  { pattern: /됩니다요/g, suggestion: "됩니다", reason: "'됩니다'가 올바른 종결어미입니다" },
  { pattern: /습니다요/g, suggestion: "습니다", reason: "'습니다'가 올바른 종결어미입니다" },
  // 낫다/낮다 혼동
  { pattern: /지능이 낫/g, suggestion: "지능이 낮", reason: "수준이 높고 낮을 때는 '낮다'입니다" },
  { pattern: /성적이 낫/g, suggestion: "성적이 낮", reason: "수준이 높고 낮을 때는 '낮다'입니다" },
  { pattern: /온도가 낫/g, suggestion: "온도가 낮", reason: "수준이 높고 낮을 때는 '낮다'입니다" },
  { pattern: /키가 낫/g, suggestion: "키가 낮", reason: "수준이 높고 낮을 때는 '낮다'입니다" },
  { pattern: /확률이 낫/g, suggestion: "확률이 낮", reason: "수준이 높고 낮을 때는 '낮다'입니다" },
  // 저능/저는 오타
  { pattern: /저능요/g, suggestion: "저는요", reason: "'저는요'가 올바른 표현입니다" },
  { pattern: /저능/g, suggestion: "저는", reason: "'저는'이 올바른 표현입니다 (오타 추정)" },
  // -시요/-시오
  { pattern: /하십시요/g, suggestion: "하십시오", reason: "'하십시오'가 올바른 표현입니다" },
  { pattern: /주십시요/g, suggestion: "주십시오", reason: "'주십시오'가 올바른 표현입니다" },
  { pattern: /계십시요/g, suggestion: "계십시오", reason: "'계십시오'가 올바른 표현입니다" },
  // -데요/-대요
  { pattern: /했데요/g, suggestion: "했대요", reason: "전달(인용)할 때는 '했대요'입니다" },
  { pattern: /간데요/g, suggestion: "간대요", reason: "전달(인용)할 때는 '간대요'입니다" },
  { pattern: /한데요/g, suggestion: "한대요", reason: "전달(인용)할 때는 '한대요'입니다" },
  // 맞는/맞는 → 맞는
  { pattern: /틀린거/g, suggestion: "틀린 거", reason: "'틀린 거'로 띄어 씁니다" },
  { pattern: /맞는거/g, suggestion: "맞는 거", reason: "'맞는 거'로 띄어 씁니다" },
  { pattern: /아닌거/g, suggestion: "아닌 거", reason: "'아닌 거'로 띄어 씁니다" },
  { pattern: /하는거/g, suggestion: "하는 거", reason: "'하는 거'로 띄어 씁니다" },
  { pattern: /되는거/g, suggestion: "되는 거", reason: "'되는 거'로 띄어 씁니다" },
  // 기타 구어체 교정
  { pattern: /머에요/g, suggestion: "뭐예요", reason: "'뭐예요'가 올바른 표현입니다" },
  { pattern: /뭐에요/g, suggestion: "뭐예요", reason: "'뭐예요'가 올바른 표현입니다" },
  { pattern: /아니에요/g, suggestion: "아니에요", reason: "올바른 표현입니다" },
  { pattern: /아니예요/g, suggestion: "아니에요", reason: "'아니에요'가 올바른 표현입니다" },
  { pattern: /됬어/g, suggestion: "됐어", reason: "'됐어'가 올바른 표현입니다" },
  { pattern: /했는대/g, suggestion: "했는데", reason: "'했는데'가 올바른 표현입니다" },
  { pattern: /인대요/g, suggestion: "인데요", reason: "'인데요'가 올바른 표현입니다" },
  { pattern: /건대요/g, suggestion: "건데요", reason: "'건데요'가 올바른 표현입니다" },
  { pattern: /같애/g, suggestion: "같아", reason: "'같아'가 올바른 표현입니다" },
  { pattern: /같애요/g, suggestion: "같아요", reason: "'같아요'가 올바른 표현입니다" },
  { pattern: /돼지/g, suggestion: "돼지", reason: "올바른 표현입니다 (동물)" },
  { pattern: /안돼지/g, suggestion: "안 되지", reason: "'안 되지'가 올바른 표현입니다" },
  // 됬/됐
  { pattern: /됬/g, suggestion: "됐", reason: "'되었'의 준말은 '됐'입니다" },
  { pattern: /됫/g, suggestion: "됐", reason: "'되었'의 준말은 '됐'입니다" },
  { pattern: /돼었/g, suggestion: "되었", reason: "'되었'이 올바른 표현입니다" },
  // 안 되다 / 안되다
  { pattern: /않될/g, suggestion: "안 될", reason: "'안 될'이 올바른 표현입니다" },
  { pattern: /안됩니다/g, suggestion: "안 됩니다", reason: "'안'과 '됩니다'는 띄어 씁니다" },
  { pattern: /안돼요/g, suggestion: "안 돼요", reason: "'안'과 '돼요'는 띄어 씁니다" },
  { pattern: /안되요/g, suggestion: "안 돼요", reason: "'안 돼요'가 올바른 표현입니다" },
  // 며칠
  { pattern: /몇일/g, suggestion: "며칠", reason: "'며칠'이 올바른 표현입니다" },
  { pattern: /몇칠/g, suggestion: "며칠", reason: "'며칠'이 올바른 표현입니다" },
  // 금세/금새
  { pattern: /금새/g, suggestion: "금세", reason: "'금시에'의 준말은 '금세'입니다" },
  // 어이없다
  { pattern: /어의없/g, suggestion: "어이없", reason: "'어이없다'가 올바른 표현입니다" },
  { pattern: /어의가 없/g, suggestion: "어이가 없", reason: "'어이가 없다'가 올바른 표현입니다" },
  // -히/-이 부사
  { pattern: /일일히/g, suggestion: "일일이", reason: "'일일이'가 올바른 표현입니다" },
  { pattern: /곰곰히/g, suggestion: "곰곰이", reason: "'곰곰이'가 올바른 표현입니다" },
  { pattern: /깨끗히/g, suggestion: "깨끗이", reason: "'깨끗이'가 올바른 표현입니다" },
  { pattern: /간간히/g, suggestion: "간간이", reason: "'간간이'가 올바른 표현입니다" },
  { pattern: /겹겹히/g, suggestion: "겹겹이", reason: "'겹겹이'가 올바른 표현입니다" },
  { pattern: /번번히/g, suggestion: "번번이", reason: "'번번이'가 올바른 표현입니다" },
  { pattern: /다달히/g, suggestion: "다달이", reason: "'다달이'가 올바른 표현입니다" },
  { pattern: /뚜렸히/g, suggestion: "뚜렷이", reason: "'뚜렷이'가 올바른 표현입니다" },
  // 사이시옷 오류
  { pattern: /댓가/g, suggestion: "대가", reason: "'대가'가 올바른 표현입니다" },
  { pattern: /갯수/g, suggestion: "개수", reason: "'개수'가 올바른 표현입니다" },
  { pattern: /겟수/g, suggestion: "개수", reason: "'개수'가 올바른 표현입니다" },
  { pattern: /숫자리/g, suggestion: "수자리", reason: "'수자리'가 올바른 표현입니다" },
  // 할게/할께
  { pattern: /할께/g, suggestion: "할게", reason: "'할게'가 올바른 표현입니다" },
  { pattern: /갈께/g, suggestion: "갈게", reason: "'갈게'가 올바른 표현입니다" },
  { pattern: /볼께/g, suggestion: "볼게", reason: "'볼게'가 올바른 표현입니다" },
  { pattern: /먹을께/g, suggestion: "먹을게", reason: "'먹을게'가 올바른 표현입니다" },
  { pattern: /줄께/g, suggestion: "줄게", reason: "'줄게'가 올바른 표현입니다" },
  // 할 거/할꺼
  { pattern: /할꺼/g, suggestion: "할 거", reason: "'할 거'가 올바른 표현입니다" },
  { pattern: /갈꺼/g, suggestion: "갈 거", reason: "'갈 거'가 올바른 표현입니다" },
  { pattern: /먹을꺼/g, suggestion: "먹을 거", reason: "'먹을 거'가 올바른 표현입니다" },
  { pattern: /볼꺼/g, suggestion: "볼 거", reason: "'볼 거'가 올바른 표현입니다" },
  // 역할/역활
  { pattern: /역활/g, suggestion: "역할", reason: "'역할'이 올바른 표현입니다" },
  // 어쨌든
  { pattern: /어쨋든/g, suggestion: "어쨌든", reason: "'어쨌든'이 올바른 표현입니다" },
  { pattern: /어쨌던/g, suggestion: "어쨌든", reason: "'어쨌든'이 올바른 표현입니다" },
  { pattern: /어쨋던/g, suggestion: "어쨌든", reason: "'어쨌든'이 올바른 표현입니다" },
  // 어차피
  { pattern: /어짜피/g, suggestion: "어차피", reason: "'어차피'가 올바른 표현입니다" },
  { pattern: /어째피/g, suggestion: "어차피", reason: "'어차피'가 올바른 표현입니다" },
  // 희한
  { pattern: /희안/g, suggestion: "희한", reason: "'희한'이 올바른 표현입니다" },
  // 설거지
  { pattern: /설겆이/g, suggestion: "설거지", reason: "'설거지'가 올바른 표현입니다" },
  { pattern: /설겆이/g, suggestion: "설거지", reason: "'설거지'가 올바른 표현입니다" },
  // 봬요/뵈요
  { pattern: /뵈요/g, suggestion: "봬요", reason: "'뵈어요'의 준말은 '봬요'입니다" },
  // 해야 될
  { pattern: /해야될/g, suggestion: "해야 될", reason: "'해야 될'로 띄어 씁니다" },
  { pattern: /해야할/g, suggestion: "해야 할", reason: "'해야 할'로 띄어 씁니다" },
  // 왠/웬
  { pattern: /왠지(?! 모르)/g, suggestion: "웬지", reason: "'웬지'가 올바른 표현입니다 (단, '왠지 모르게'는 '왠지')" },
  { pattern: /왠일/g, suggestion: "웬일", reason: "'웬일'이 올바른 표현입니다" },
  { pattern: /왠만/g, suggestion: "웬만", reason: "'웬만하면'이 올바른 표현입니다" },
  // 오랜만/오랫만
  { pattern: /오랫만/g, suggestion: "오랜만", reason: "'오랜만'이 올바른 표현입니다" },
  // 데/대
  { pattern: /되데/g, suggestion: "되대", reason: "'되대 (되다고 해)'가 올바른 표현입니다" },
  { pattern: /걸리는 데로/g, suggestion: "걸리는 대로", reason: "'대로'가 올바른 표현입니다" },
  // 않/안
  { pattern: /하지 안는/g, suggestion: "하지 않는", reason: "'않는'이 올바른 표현입니다" },
  { pattern: /하지 안고/g, suggestion: "하지 않고", reason: "'않고'가 올바른 표현입니다" },
  { pattern: /하지 안아/g, suggestion: "하지 않아", reason: "'않아'가 올바른 표현입니다" },
  // 로서/로써
  { pattern: /사람으로써/g, suggestion: "사람으로서", reason: "자격을 나타낼 때는 '으로서'입니다" },
  { pattern: /학생으로써/g, suggestion: "학생으로서", reason: "자격을 나타낼 때는 '으로서'입니다" },
  // 기타 자주 틀리는 표현
  { pattern: /구지/g, suggestion: "굳이", reason: "'굳이'가 올바른 표현입니다" },
  { pattern: /에이쁘/g, suggestion: "예쁘", reason: "'예쁘다'가 올바른 표현입니다" },
  { pattern: /이뻐/g, suggestion: "예뻐", reason: "'예쁘다'의 활용은 '예뻐'입니다" },
  { pattern: /병이 낳다/g, suggestion: "병이 낫다", reason: "'낫다'가 올바른 표현입니다" },
  { pattern: /나을수/g, suggestion: "나을 수", reason: "'나을 수'로 띄어 씁니다" },
  { pattern: /있슴/g, suggestion: "있음", reason: "'있음'이 올바른 표현입니다" },
  { pattern: /없슴/g, suggestion: "없음", reason: "'없음'이 올바른 표현입니다" },
  { pattern: /했늘때/g, suggestion: "했을 때", reason: "'했을 때'가 올바른 표현입니다" },
  { pattern: /그러므로써/g, suggestion: "그럼으로써", reason: "'그럼으로써'가 올바른 표현입니다" },
  { pattern: /벌써부터/g, suggestion: "벌써부터", reason: "올바른 표현입니다" },
  { pattern: /문안하/g, suggestion: "문안하", reason: "올바른 표현입니다" },
  { pattern: /의외로/g, suggestion: "의외로", reason: "올바른 표현입니다" },
  // 띄어쓰기
  { pattern: /그래서인지/g, suggestion: "그래서인지", reason: "올바른 표현입니다" },
  { pattern: /할수있/g, suggestion: "할 수 있", reason: "'할 수 있다'로 띄어 씁니다" },
  { pattern: /할수없/g, suggestion: "할 수 없", reason: "'할 수 없다'로 띄어 씁니다" },
  { pattern: /할수록/g, suggestion: "할수록", reason: "'할수록'은 붙여 씁니다" },
  { pattern: /못하겟/g, suggestion: "못하겠", reason: "'못하겠다'가 올바른 표현입니다" },
  { pattern: /잘못 됬/g, suggestion: "잘못됐", reason: "'잘못됐다'가 올바른 표현입니다" },
  { pattern: /잘못 됐/g, suggestion: "잘못됐", reason: "'잘못됐다'는 붙여 씁니다" },
  { pattern: /그동안에/g, suggestion: "그동안에", reason: "올바른 표현입니다" },
  // 맞히다/맞추다 혼동
  { pattern: /정답을 맞추/g, suggestion: "정답을 맞히", reason: "정답은 '맞히다'가 올바릅니다 (맞추다=조절하다)" },
  // 부치다/붙이다
  { pattern: /편지를 붙이/g, suggestion: "편지를 부치", reason: "편지는 '부치다'가 올바릅니다" },
  // 늘이다/늘리다
  { pattern: /고무줄을 늘리/g, suggestion: "고무줄을 늘이", reason: "'늘이다'가 올바릅니다 (물리적으로 길게)" },
];

function checkSpelling(text: string): SpellingError[] {
  const errors: SpellingError[] = [];
  const seen = new Set<string>();

  for (const rule of SPELLING_RULES) {
    const matches = text.match(rule.pattern);
    if (matches) {
      for (const match of matches) {
        if (match === rule.suggestion) continue;
        const key = `${match}->${rule.suggestion}`;
        if (seen.has(key)) continue;
        seen.add(key);
        errors.push({
          original: match,
          suggestion: rule.suggestion,
          reason: rule.reason,
        });
      }
    }
  }

  return errors;
}

function applyFixes(text: string): string {
  let result = text;
  for (const rule of SPELLING_RULES) {
    if (rule.suggestion !== rule.pattern.source) {
      result = result.replace(rule.pattern, rule.suggestion);
    }
  }
  return result;
}

export function SpellingCheckerTool() {
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState<SpellingError[]>([]);
  const [checked, setChecked] = useState(false);

  function handleCheck() {
    const found = checkSpelling(input);
    setErrors(found);
    setChecked(true);
  }

  function handleAutoFix() {
    setInput(applyFixes(input));
    setErrors([]);
    setChecked(false);
  }

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setChecked(false);
        }}
        placeholder="맞춤법을 검사할 텍스트를 입력하세요..."
        className="w-full h-48 p-4 border border-border rounded-lg bg-surface text-text resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />

      <div className="flex gap-2 mt-3 mb-4">
        <button
          onClick={handleCheck}
          disabled={!input.trim()}
          className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          검사하기
        </button>
        {errors.length > 0 && (
          <button
            onClick={handleAutoFix}
            className="px-4 py-2 text-sm rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
          >
            자동 교정
          </button>
        )}
        <CopyButton text={input} />
      </div>

      {checked && (
        <div className="mt-4">
          {errors.length === 0 ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              맞춤법 오류가 발견되지 않았습니다.
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-text-muted">
                {errors.length}개의 오류가 발견되었습니다.
              </p>
              {errors.map((error, i) => (
                <div
                  key={i}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="line-through text-red-600">
                      {error.original}
                    </span>
                    <span className="text-text-muted">→</span>
                    <span className="font-semibold text-green-700">
                      {error.suggestion}
                    </span>
                  </div>
                  <p className="text-text-muted text-xs">{error.reason}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-surface-muted rounded-lg border border-border">
        <p className="text-xs text-text-muted">
          이 도구는 자주 틀리는 한국어 맞춤법 규칙 80개+를 기반으로 검사합니다.
          완벽한 검사를 위해서는 국립국어원 맞춤법 검사기를 함께 활용해주세요.
        </p>
      </div>
    </div>
  );
}
