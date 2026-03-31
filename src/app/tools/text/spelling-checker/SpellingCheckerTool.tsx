"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

interface SpellingError {
  original: string;
  suggestion: string;
  reason: string;
  category: string;
}

const SPELLING_RULES: { pattern: RegExp; suggestion: string; reason: string; category: string }[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 제1장 총칙 - 소리대로 적되 어법에 맞도록
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 흔한 오타/잘못된 발음 표기
  { pattern: /안능하세요/g, suggestion: "안녕하세요", category: "오타", reason: "'안녕하세요'가 올바른 표현입니다" },
  { pattern: /안녕하새요/g, suggestion: "안녕하세요", category: "오타", reason: "'안녕하세요'가 올바른 표현입니다" },
  { pattern: /안냥하세요/g, suggestion: "안녕하세요", category: "오타", reason: "'안녕하세요'가 올바른 표현입니다" },
  { pattern: /감사합니더/g, suggestion: "감사합니다", category: "오타", reason: "'감사합니다'가 올바른 표현입니다" },
  { pattern: /고맙습니더/g, suggestion: "고맙습니다", category: "오타", reason: "'고맙습니다'가 올바른 표현입니다" },
  { pattern: /저능요/g, suggestion: "저는요", category: "오타", reason: "'저는요'가 올바른 표현입니다 (오타 추정)" },
  { pattern: /저능/g, suggestion: "저는", category: "오타", reason: "'저는'이 올바른 표현입니다 (오타 추정)" },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 제3장 소리에 관한 것
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 된소리 표기 (제5항)
  { pattern: /있슴/g, suggestion: "있음", category: "된소리", reason: "'있음'이 올바른 표현입니다 (제5항)" },
  { pattern: /없슴/g, suggestion: "없음", category: "된소리", reason: "'없음'이 올바른 표현입니다 (제5항)" },
  { pattern: /했슴/g, suggestion: "했음", category: "된소리", reason: "'했음'이 올바른 표현입니다" },

  // 구개음화 (제6항) - ㄷ,ㅌ이 모음 ㅣ 앞에서 ㅈ,ㅊ으로
  { pattern: /굳히/g, suggestion: "구지", category: "구개음화", reason: "발음은 [구지]이나 표기는 '굳이'입니다 (제6항)" },
  { pattern: /같히/g, suggestion: "같이", category: "구개음화", reason: "'같이'가 올바른 표기입니다" },
  { pattern: /걷히다/g, suggestion: "걷히다", category: "구개음화", reason: "올바른 표현입니다" },

  // 두음법칙 (제10~12항)
  { pattern: /녀자/g, suggestion: "여자", category: "두음법칙", reason: "두음법칙: 'ㄴ' → 'ㅇ' (제10항)" },
  { pattern: /녀성/g, suggestion: "여성", category: "두음법칙", reason: "두음법칙: 'ㄴ' → 'ㅇ' (제10항)" },
  { pattern: /뇨리/g, suggestion: "요리", category: "두음법칙", reason: "두음법칙: 'ㄴ' → 'ㅇ' (제10항)" },
  { pattern: /닉명/g, suggestion: "익명", category: "두음법칙", reason: "두음법칙: 'ㄴ' → 'ㅇ' (제11항)" },
  { pattern: /락원/g, suggestion: "낙원", category: "두음법칙", reason: "두음법칙: 어두의 'ㄹ' → 'ㄴ' (제11항)" },
  { pattern: /리유/g, suggestion: "이유", category: "두음법칙", reason: "두음법칙: 'ㄹ' → 'ㅇ' (제12항)" },
  { pattern: /량심/g, suggestion: "양심", category: "두음법칙", reason: "두음법칙: 'ㄹ' → 'ㅇ' (제12항)" },
  { pattern: /례절/g, suggestion: "예절", category: "두음법칙", reason: "두음법칙: 'ㄹ' → 'ㅇ' (제12항)" },
  { pattern: /류행/g, suggestion: "유행", category: "두음법칙", reason: "두음법칙: 'ㄹ' → 'ㅇ' (제12항)" },
  { pattern: /력사/g, suggestion: "역사", category: "두음법칙", reason: "두음법칙: 'ㄹ' → 'ㅇ' (제12항)" },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 제4장 형태에 관한 것
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 사이시옷 규정 (제30항) - 매우 중요
  { pattern: /댓가/g, suggestion: "대가", category: "사이시옷", reason: "사이시옷 불필요: '대가'가 올바릅니다 (제30항)" },
  { pattern: /갯수/g, suggestion: "개수", category: "사이시옷", reason: "사이시옷 불필요: '개수'가 올바릅니다 (제30항)" },
  { pattern: /겟수/g, suggestion: "개수", category: "사이시옷", reason: "'개수'가 올바른 표현입니다" },
  { pattern: /숫자리/g, suggestion: "수자리", category: "사이시옷", reason: "사이시옷 불필요 (제30항)" },
  { pattern: /곳간/g, suggestion: "곳간", category: "사이시옷", reason: "올바른 표현입니다 (사이시옷 인정)" },
  { pattern: /횟수/g, suggestion: "횟수", category: "사이시옷", reason: "올바른 표현입니다 (사이시옷 인정)" },

  // 용언 활용 - 되다/돼다 (제34~40항)
  { pattern: /됬/g, suggestion: "됐", category: "용언활용", reason: "'되었'의 준말은 '됐'입니다 (제35항)" },
  { pattern: /됫/g, suggestion: "됐", category: "용언활용", reason: "'되었'의 준말은 '됐'입니다" },
  { pattern: /돼었/g, suggestion: "되었", category: "용언활용", reason: "'되었'이 올바릅니다 ('돼'는 '되어'의 준말)" },
  { pattern: /됬어/g, suggestion: "됐어", category: "용언활용", reason: "'됐어'가 올바른 표현입니다" },
  { pattern: /안되요/g, suggestion: "안 돼요", category: "용언활용", reason: "'안 돼요'가 올바릅니다 ('되어요'→'돼요')" },
  { pattern: /안됩니다/g, suggestion: "안 됩니다", category: "용언활용", reason: "'안'과 '됩니다'는 띄어 씁니다" },
  { pattern: /안돼요/g, suggestion: "안 돼요", category: "용언활용", reason: "'안'과 '돼요'는 띄어 씁니다" },
  { pattern: /않될/g, suggestion: "안 될", category: "용언활용", reason: "'안 될'이 올바릅니다" },

  // -게/-께 (제53항 관련)
  { pattern: /할께/g, suggestion: "할게", category: "용언활용", reason: "'할게'가 올바릅니다 (ㄹ 뒤 된소리 아님)" },
  { pattern: /갈께/g, suggestion: "갈게", category: "용언활용", reason: "'갈게'가 올바릅니다" },
  { pattern: /볼께/g, suggestion: "볼게", category: "용언활용", reason: "'볼게'가 올바릅니다" },
  { pattern: /먹을께/g, suggestion: "먹을게", category: "용언활용", reason: "'먹을게'가 올바릅니다" },
  { pattern: /줄께/g, suggestion: "줄게", category: "용언활용", reason: "'줄게'가 올바릅니다" },
  { pattern: /올께/g, suggestion: "올게", category: "용언활용", reason: "'올게'가 올바릅니다" },

  // -거/-꺼
  { pattern: /할꺼/g, suggestion: "할 거", category: "용언활용", reason: "'할 거'가 올바릅니다 (의존명사 '거')" },
  { pattern: /갈꺼/g, suggestion: "갈 거", category: "용언활용", reason: "'갈 거'가 올바릅니다" },
  { pattern: /먹을꺼/g, suggestion: "먹을 거", category: "용언활용", reason: "'먹을 거'가 올바릅니다" },
  { pattern: /볼꺼/g, suggestion: "볼 거", category: "용언활용", reason: "'볼 거'가 올바릅니다" },

  // -히/-이 부사 (제51항)
  { pattern: /일일히/g, suggestion: "일일이", category: "부사", reason: "'-이' 부사: '일일이'가 올바릅니다 (제51항)" },
  { pattern: /곰곰히/g, suggestion: "곰곰이", category: "부사", reason: "'-이' 부사: '곰곰이'가 올바릅니다 (제51항)" },
  { pattern: /깨끗히/g, suggestion: "깨끗이", category: "부사", reason: "'-이' 부사: 받침 ㅅ 뒤는 '-이' (제51항)" },
  { pattern: /간간히/g, suggestion: "간간이", category: "부사", reason: "'-이' 부사: '간간이'가 올바릅니다 (제51항)" },
  { pattern: /겹겹히/g, suggestion: "겹겹이", category: "부사", reason: "'-이' 부사 (제51항)" },
  { pattern: /번번히/g, suggestion: "번번이", category: "부사", reason: "'-이' 부사 (제51항)" },
  { pattern: /다달히/g, suggestion: "다달이", category: "부사", reason: "'-이' 부사 (제51항)" },
  { pattern: /뚜렸히/g, suggestion: "뚜렷이", category: "부사", reason: "'-이' 부사 (제51항)" },
  { pattern: /가까히/g, suggestion: "가까이", category: "부사", reason: "'-이' 부사 (제51항)" },

  // 준말 (제32~40항)
  { pattern: /뵈요/g, suggestion: "봬요", category: "준말", reason: "'뵈어요'의 준말은 '봬요'입니다 (제35항)" },
  { pattern: /금새/g, suggestion: "금세", category: "준말", reason: "'금시에'의 준말은 '금세'입니다 (제34항)" },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 제5장 띄어쓰기 (가장 많이 틀리는 부분)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 조사 붙여쓰기 (제41항) - 조사는 앞말에 붙여 씀
  // (이건 올바른 것이므로 잘못된 띄어쓰기를 잡아야 함)

  // 의존명사 띄어쓰기 (제42항) - 반드시 띄어 씀
  { pattern: /할수있/g, suggestion: "할 수 있", category: "띄어쓰기", reason: "의존명사 '수'는 띄어 씁니다 (제42항)" },
  { pattern: /할수없/g, suggestion: "할 수 없", category: "띄어쓰기", reason: "의존명사 '수'는 띄어 씁니다 (제42항)" },
  { pattern: /할수/g, suggestion: "할 수", category: "띄어쓰기", reason: "의존명사 '수'는 띄어 씁니다 (제42항)" },
  { pattern: /될수/g, suggestion: "될 수", category: "띄어쓰기", reason: "의존명사 '수'는 띄어 씁니다 (제42항)" },
  { pattern: /있을수/g, suggestion: "있을 수", category: "띄어쓰기", reason: "의존명사 '수'는 띄어 씁니다 (제42항)" },
  { pattern: /나올수/g, suggestion: "나올 수", category: "띄어쓰기", reason: "의존명사 '수'는 띄어 씁니다 (제42항)" },
  { pattern: /할때/g, suggestion: "할 때", category: "띄어쓰기", reason: "의존명사 '때'는 띄어 씁니다 (제42항)" },
  { pattern: /했을때/g, suggestion: "했을 때", category: "띄어쓰기", reason: "의존명사 '때'는 띄어 씁니다 (제42항)" },
  { pattern: /하는데/g, suggestion: "하는데", category: "띄어쓰기", reason: "어미 '-는데'는 붙여 씁니다" },
  { pattern: /할것/g, suggestion: "할 것", category: "띄어쓰기", reason: "의존명사 '것'은 띄어 씁니다 (제42항)" },
  { pattern: /하는것/g, suggestion: "하는 것", category: "띄어쓰기", reason: "의존명사 '것'은 띄어 씁니다 (제42항)" },
  { pattern: /되는거/g, suggestion: "되는 거", category: "띄어쓰기", reason: "의존명사 '거'는 띄어 씁니다 (제42항)" },
  { pattern: /하는거/g, suggestion: "하는 거", category: "띄어쓰기", reason: "의존명사 '거'는 띄어 씁니다 (제42항)" },
  { pattern: /맞는거/g, suggestion: "맞는 거", category: "띄어쓰기", reason: "의존명사 '거'는 띄어 씁니다 (제42항)" },
  { pattern: /아닌거/g, suggestion: "아닌 거", category: "띄어쓰기", reason: "의존명사 '거'는 띄어 씁니다 (제42항)" },
  { pattern: /틀린거/g, suggestion: "틀린 거", category: "띄어쓰기", reason: "의존명사 '거'는 띄어 씁니다 (제42항)" },
  { pattern: /할만/g, suggestion: "할 만", category: "띄어쓰기", reason: "의존명사 '만'은 띄어 씁니다 (제42항)" },
  { pattern: /할뿐/g, suggestion: "할 뿐", category: "띄어쓰기", reason: "의존명사 '뿐'은 띄어 씁니다 (제42항)" },
  { pattern: /할줄/g, suggestion: "할 줄", category: "띄어쓰기", reason: "의존명사 '줄'은 띄어 씁니다 (제42항)" },
  { pattern: /할지/g, suggestion: "할지", category: "띄어쓰기", reason: "어미 '-ㄹ지'는 붙여 씁니다" },
  { pattern: /나을수/g, suggestion: "나을 수", category: "띄어쓰기", reason: "의존명사 '수'는 띄어 씁니다 (제42항)" },

  // 보조 용언 띄어쓰기 (제47항)
  { pattern: /해야될/g, suggestion: "해야 될", category: "띄어쓰기", reason: "보조 용언은 띄어 씁니다 (제47항)" },
  { pattern: /해야할/g, suggestion: "해야 할", category: "띄어쓰기", reason: "보조 용언은 띄어 씁니다 (제47항)" },
  { pattern: /하고있/g, suggestion: "하고 있", category: "띄어쓰기", reason: "보조 용언 '있다'는 띄어 씁니다 (제47항)" },
  { pattern: /해주세요/g, suggestion: "해 주세요", category: "띄어쓰기", reason: "보조 용언 '주다'는 띄어 씁니다 (제47항)" },
  { pattern: /해보세요/g, suggestion: "해 보세요", category: "띄어쓰기", reason: "보조 용언 '보다'는 띄어 씁니다 (제47항)" },
  { pattern: /해놓고/g, suggestion: "해 놓고", category: "띄어쓰기", reason: "보조 용언 '놓다'는 띄어 씁니다 (제47항)" },
  { pattern: /가버리/g, suggestion: "가 버리", category: "띄어쓰기", reason: "보조 용언 '버리다'는 띄어 씁니다 (제47항)" },
  { pattern: /먹어버리/g, suggestion: "먹어 버리", category: "띄어쓰기", reason: "보조 용언 '버리다'는 띄어 씁니다 (제47항)" },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 자주 틀리는 맞춤법 (제1장 원칙 적용)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 몇일/며칠
  { pattern: /몇일/g, suggestion: "며칠", category: "맞춤법", reason: "'며칠'이 올바릅니다 (소리와 형태)" },
  { pattern: /몇칠/g, suggestion: "며칠", category: "맞춤법", reason: "'며칠'이 올바릅니다" },

  // 어이/어의
  { pattern: /어의없/g, suggestion: "어이없", category: "맞춤법", reason: "'어이없다'가 올바릅니다" },
  { pattern: /어의가 없/g, suggestion: "어이가 없", category: "맞춤법", reason: "'어이가 없다'가 올바릅니다" },

  // 역할/역활
  { pattern: /역활/g, suggestion: "역할", category: "맞춤법", reason: "'역할'이 올바릅니다" },

  // 어쨌든
  { pattern: /어쨋든/g, suggestion: "어쨌든", category: "맞춤법", reason: "'어쨌든'이 올바릅니다" },
  { pattern: /어쨌던/g, suggestion: "어쨌든", category: "맞춤법", reason: "'어쨌든'이 올바릅니다" },
  { pattern: /어쨋던/g, suggestion: "어쨌든", category: "맞춤법", reason: "'어쨌든'이 올바릅니다" },

  // 어차피
  { pattern: /어짜피/g, suggestion: "어차피", category: "맞춤법", reason: "'어차피'가 올바릅니다" },
  { pattern: /어째피/g, suggestion: "어차피", category: "맞춤법", reason: "'어차피'가 올바릅니다" },

  // 희한
  { pattern: /희안/g, suggestion: "희한", category: "맞춤법", reason: "'희한'이 올바릅니다" },

  // 설거지
  { pattern: /설겆이/g, suggestion: "설거지", category: "맞춤법", reason: "'설거지'가 올바릅니다" },

  // 굳이/구지
  { pattern: /구지/g, suggestion: "굳이", category: "맞춤법", reason: "'굳이'가 올바릅니다 (표기는 형태소 원형 유지)" },

  // 왠/웬
  { pattern: /왠지(?! 모르)/g, suggestion: "웬지", category: "맞춤법", reason: "'웬지'가 올바릅니다 (단, '왠지 모르게'는 '왠지')" },
  { pattern: /왠일/g, suggestion: "웬일", category: "맞춤법", reason: "'웬일'이 올바릅니다" },
  { pattern: /왠만/g, suggestion: "웬만", category: "맞춤법", reason: "'웬만하면'이 올바릅니다" },

  // 오랜만/오랫만
  { pattern: /오랫만/g, suggestion: "오랜만", category: "맞춤법", reason: "'오랜만'이 올바릅니다" },

  // 이뻐/예뻐
  { pattern: /이뻐/g, suggestion: "예뻐", category: "맞춤법", reason: "'예쁘다'의 활용은 '예뻐'입니다" },

  // 낫다/낮다/났다 혼동
  { pattern: /지능이 낫/g, suggestion: "지능이 낮", category: "맞춤법", reason: "높고 낮을 때는 '낮다'입니다" },
  { pattern: /성적이 낫/g, suggestion: "성적이 낮", category: "맞춤법", reason: "높고 낮을 때는 '낮다'입니다" },
  { pattern: /온도가 낫/g, suggestion: "온도가 낮", category: "맞춤법", reason: "높고 낮을 때는 '낮다'입니다" },
  { pattern: /확률이 낫/g, suggestion: "확률이 낮", category: "맞춤법", reason: "높고 낮을 때는 '낮다'입니다" },
  { pattern: /병이 낳/g, suggestion: "병이 낫", category: "맞춤법", reason: "병이 '낫다'입니다 ('낳다'는 출산)" },

  // 맞히다/맞추다
  { pattern: /정답을 맞추/g, suggestion: "정답을 맞히", category: "맞춤법", reason: "정답은 '맞히다'입니다 ('맞추다'=조절)" },

  // 편지를 부치다
  { pattern: /편지를 붙이/g, suggestion: "편지를 부치", category: "맞춤법", reason: "편지는 '부치다'입니다" },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // -구/-고 구어체 교정
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { pattern: /이라구(?!나)/g, suggestion: "이라고", category: "구어체", reason: "'이라고'가 올바릅니다" },
  { pattern: /라구요/g, suggestion: "라고요", category: "구어체", reason: "'라고요'가 올바릅니다" },
  { pattern: /다구요/g, suggestion: "다고요", category: "구어체", reason: "'다고요'가 올바릅니다" },
  { pattern: /한다구/g, suggestion: "한다고", category: "구어체", reason: "'한다고'가 올바릅니다" },
  { pattern: /그렇구/g, suggestion: "그렇고", category: "구어체", reason: "'그렇고'가 올바릅니다" },

  // 잘못된 종결어미
  { pattern: /합니다요/g, suggestion: "합니다", category: "구어체", reason: "'합니다'가 올바른 종결어미입니다" },
  { pattern: /입니다요/g, suggestion: "입니다", category: "구어체", reason: "'입니다'가 올바른 종결어미입니다" },
  { pattern: /됩니다요/g, suggestion: "됩니다", category: "구어체", reason: "'됩니다'가 올바른 종결어미입니다" },
  { pattern: /습니다요/g, suggestion: "습니다", category: "구어체", reason: "'습니다'가 올바른 종결어미입니다" },

  // -시요/-시오 (제53항)
  { pattern: /하십시요/g, suggestion: "하십시오", category: "구어체", reason: "'하십시오'가 올바릅니다 (제53항)" },
  { pattern: /주십시요/g, suggestion: "주십시오", category: "구어체", reason: "'주십시오'가 올바릅니다" },
  { pattern: /계십시요/g, suggestion: "계십시오", category: "구어체", reason: "'계십시오'가 올바릅니다" },
  { pattern: /수고하십시요/g, suggestion: "수고하십시오", category: "구어체", reason: "'수고하십시오'가 올바릅니다" },

  // -대/-데 혼동
  { pattern: /했데요/g, suggestion: "했대요", category: "구어체", reason: "전달(인용)할 때는 '했대요'입니다" },
  { pattern: /했는대/g, suggestion: "했는데", category: "구어체", reason: "'했는데'가 올바릅니다" },
  { pattern: /인대요/g, suggestion: "인데요", category: "구어체", reason: "'인데요'가 올바릅니다" },
  { pattern: /건대요/g, suggestion: "건데요", category: "구어체", reason: "'건데요'가 올바릅니다" },

  // -같애/-같아
  { pattern: /같애/g, suggestion: "같아", category: "구어체", reason: "'같아'가 올바릅니다" },
  { pattern: /같애요/g, suggestion: "같아요", category: "구어체", reason: "'같아요'가 올바릅니다" },

  // 뭐예요/뭐에요
  { pattern: /뭐에요/g, suggestion: "뭐예요", category: "구어체", reason: "'뭐예요'가 올바릅니다" },
  { pattern: /머에요/g, suggestion: "뭐예요", category: "구어체", reason: "'뭐예요'가 올바릅니다" },
  { pattern: /아니예요/g, suggestion: "아니에요", category: "구어체", reason: "'아니에요'가 올바릅니다 (예외)" },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 외래어 표기법 (제3항, 제6장)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { pattern: /케잌/g, suggestion: "케이크", category: "외래어", reason: "외래어 표기법: '케이크'가 올바릅니다" },
  { pattern: /쥬스/g, suggestion: "주스", category: "외래어", reason: "외래어 표기법: '주스'가 올바릅니다" },
  { pattern: /쥬얼리/g, suggestion: "주얼리", category: "외래어", reason: "외래어 표기법: '주'로 표기합니다" },
  { pattern: /리더쉽/g, suggestion: "리더십", category: "외래어", reason: "외래어 표기법: '-십'이 올바릅니다" },
  { pattern: /멤버쉽/g, suggestion: "멤버십", category: "외래어", reason: "외래어 표기법: '-십'이 올바릅니다" },
  { pattern: /파트너쉽/g, suggestion: "파트너십", category: "외래어", reason: "외래어 표기법: '-십'이 올바릅니다" },
  { pattern: /메세지/g, suggestion: "메시지", category: "외래어", reason: "외래어 표기법: '메시지'가 올바릅니다" },
  { pattern: /악세사리/g, suggestion: "액세서리", category: "외래어", reason: "외래어 표기법: '액세서리'가 올바릅니다" },
  { pattern: /미씨/g, suggestion: "미시", category: "외래어", reason: "외래어는 된소리로 적지 않습니다" },
  { pattern: /바베큐/g, suggestion: "바비큐", category: "외래어", reason: "외래어 표기법: '바비큐'가 올바릅니다" },
  { pattern: /알콜/g, suggestion: "알코올", category: "외래어", reason: "외래어 표기법: '알코올'이 올바릅니다" },
  { pattern: /빠리/g, suggestion: "파리", category: "외래어", reason: "외래어 표기법: 된소리 불가 '파리'가 올바릅니다" },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 로서/로써 구분
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { pattern: /사람으로써/g, suggestion: "사람으로서", category: "맞춤법", reason: "자격·지위에는 '으로서'입니다" },
  { pattern: /학생으로써/g, suggestion: "학생으로서", category: "맞춤법", reason: "자격·지위에는 '으로서'입니다" },
  { pattern: /대표로써/g, suggestion: "대표로서", category: "맞춤법", reason: "자격·지위에는 '으로서'입니다" },
  { pattern: /도구로서/g, suggestion: "도구로써", category: "맞춤법", reason: "수단·도구에는 '으로써'입니다" },
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
          category: rule.category,
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

const CATEGORY_LABELS: Record<string, string> = {
  "오타": "🔤 오타",
  "된소리": "🔊 된소리",
  "구개음화": "🔊 구개음화",
  "두음법칙": "🔊 두음법칙",
  "사이시옷": "📝 사이시옷",
  "용언활용": "📝 용언 활용",
  "부사": "📝 부사 표기",
  "준말": "📝 준말",
  "띄어쓰기": "↔️ 띄어쓰기",
  "맞춤법": "✏️ 맞춤법",
  "구어체": "💬 구어체 교정",
  "외래어": "🌍 외래어 표기",
};

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

  // 카테고리별 그룹핑
  const grouped = errors.reduce<Record<string, SpellingError[]>>((acc, err) => {
    if (!acc[err.category]) acc[err.category] = [];
    acc[err.category].push(err);
    return acc;
  }, {});

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => { setInput(e.target.value); setChecked(false); }}
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
            <div className="space-y-4">
              <p className="text-sm font-medium text-text">
                {errors.length}개의 오류가 발견되었습니다.
              </p>

              {Object.entries(grouped).map(([cat, catErrors]) => (
                <div key={cat}>
                  <h3 className="text-sm font-semibold text-text mb-2">
                    {CATEGORY_LABELS[cat] || cat} ({catErrors.length})
                  </h3>
                  <div className="space-y-2">
                    {catErrors.map((error, i) => (
                      <div key={i} className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="line-through text-red-600">{error.original}</span>
                          <span className="text-text-muted">→</span>
                          <span className="font-semibold text-green-700">{error.suggestion}</span>
                        </div>
                        <p className="text-text-muted text-xs">{error.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-surface-muted rounded-lg border border-border">
        <p className="text-xs text-text-muted">
          한글 맞춤법 규정(제1~6장)을 기반으로 검사합니다.
          띄어쓰기, 사이시옷, 된소리, 두음법칙, 용언 활용, 외래어 표기법 등을 포함합니다.
          완벽한 검사를 위해서는 국립국어원 맞춤법 검사기를 함께 활용해주세요.
        </p>
      </div>
    </div>
  );
}
