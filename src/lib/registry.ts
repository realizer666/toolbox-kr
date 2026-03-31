export interface ToolDefinition {
  id: string;
  categoryId: string;
  path: string;
  name: string;
  description: string;
  longDescription: string;
  keywords: string[];
  icon: string;
  isNew?: boolean;
  relatedToolIds?: string[];
}

export interface CategoryDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
}

export const categories: CategoryDefinition[] = [
  {
    id: "text",
    name: "텍스트 도구",
    description:
      "글자수 세기, 맞춤법 검사, 텍스트 변환 등 다양한 텍스트 관련 도구",
    icon: "✏️",
    path: "/tools/text",
  },
  {
    id: "image",
    name: "이미지 도구",
    description:
      "이미지 리사이즈, 포맷 변환, 압축 등 다양한 이미지 관련 도구",
    icon: "🖼️",
    path: "/tools/image",
  },
  {
    id: "calculator",
    name: "계산기",
    description:
      "대출 이자, 연봉 실수령액, BMI, 단위 변환 등 생활 계산기 모음",
    icon: "🔢",
    path: "/tools/calculator",
  },
  {
    id: "developer",
    name: "개발자 도구",
    description:
      "JSON 포맷터, Base64 변환, 색상 추출 등 개발에 유용한 도구 모음",
    icon: "💻",
    path: "/tools/developer",
  },
  {
    id: "generator",
    name: "생성 도구",
    description:
      "QR코드, 비밀번호, 로렘입숨 등 다양한 생성 도구 모음",
    icon: "⚡",
    path: "/tools/generator",
  },
];

export const tools: ToolDefinition[] = [
  {
    id: "character-counter",
    categoryId: "text",
    path: "/tools/text/character-counter",
    name: "글자수 세기",
    description:
      "텍스트의 글자수, 단어수, 문장수, 바이트수를 실시간으로 세어줍니다.",
    longDescription:
      "글자수 세기 도구는 입력한 텍스트의 전체 글자수, 공백 제외 글자수, 단어수, 문장수, 줄수, 바이트수를 실시간으로 계산합니다. 블로그 글, 자기소개서, 리포트 등 글자수 제한이 있는 글을 작성할 때 유용합니다. 한글, 영문, 숫자, 특수문자를 모두 정확하게 세어주며, UTF-8 기준 바이트수도 함께 확인할 수 있습니다.",
    keywords: [
      "글자수 세기",
      "글자수 계산기",
      "문자수 세기",
      "바이트 계산",
      "단어수 세기",
      "글자수 카운터",
    ],
    icon: "#️⃣",
    relatedToolIds: ["text-converter", "duplicate-line-remover"],
  },
  {
    id: "spelling-checker",
    categoryId: "text",
    path: "/tools/text/spelling-checker",
    name: "맞춤법 검사기",
    description: "한국어 맞춤법과 띄어쓰기를 검사하고 교정해줍니다.",
    longDescription:
      "맞춤법 검사기는 한국어 텍스트의 맞춤법 오류와 띄어쓰기 오류를 찾아 교정 제안을 해줍니다. 자주 틀리는 한국어 표현, 띄어쓰기 규칙, 외래어 표기법 등을 검사하여 정확한 글쓰기를 도와줍니다.",
    keywords: [
      "맞춤법 검사",
      "맞춤법 검사기",
      "띄어쓰기 검사",
      "한국어 맞춤법",
      "맞춤법 교정",
    ],
    icon: "✅",
    relatedToolIds: ["character-counter", "text-converter"],
  },
  {
    id: "text-converter",
    categoryId: "text",
    path: "/tools/text/text-converter",
    name: "텍스트 변환기",
    description:
      "대소문자 변환, 띄어쓰기 추가/제거, 역순 변환 등 다양한 텍스트 변환을 지원합니다.",
    longDescription:
      "텍스트 변환기는 다양한 형태의 텍스트 변환을 한 곳에서 처리할 수 있는 도구입니다. 대문자/소문자 변환, 첫 글자 대문자, 띄어쓰기 추가 및 제거, 줄바꿈과 쉼표 변환, 텍스트 역순 변환 등 자주 사용하는 텍스트 변환 기능을 제공합니다.",
    keywords: [
      "텍스트 변환",
      "대소문자 변환",
      "텍스트 변환기",
      "대문자 변환",
      "소문자 변환",
    ],
    icon: "🔄",
    relatedToolIds: ["character-counter", "line-break-remover"],
  },
  {
    id: "duplicate-line-remover",
    categoryId: "text",
    path: "/tools/text/duplicate-line-remover",
    name: "중복 줄 제거",
    description:
      "텍스트에서 중복된 줄을 찾아 제거하고, 고유한 줄만 남겨줍니다.",
    longDescription:
      "중복 줄 제거 도구는 텍스트에서 중복된 줄을 자동으로 찾아 제거합니다. 대소문자 무시, 앞뒤 공백 무시, 빈 줄 제거 등의 옵션을 제공하며, 데이터 정리나 목록 정리 시 유용합니다. 원본 순서를 유지하면서 중복만 제거합니다.",
    keywords: [
      "중복 줄 제거",
      "중복 제거",
      "중복 텍스트 제거",
      "중복 행 삭제",
    ],
    icon: "🧹",
    relatedToolIds: ["line-break-remover", "character-counter"],
  },
  {
    id: "line-break-remover",
    categoryId: "text",
    path: "/tools/text/line-break-remover",
    name: "줄바꿈 제거",
    description:
      "텍스트의 줄바꿈을 제거하거나 공백으로 변환합니다.",
    longDescription:
      "줄바꿈 제거 도구는 텍스트에서 줄바꿈 문자를 제거하거나 공백으로 대체합니다. PDF에서 복사한 텍스트, 이메일에서 복사한 텍스트 등에서 불필요한 줄바꿈을 정리할 때 유용합니다. 연속 빈 줄만 제거하는 옵션도 제공합니다.",
    keywords: [
      "줄바꿈 제거",
      "줄바꿈 삭제",
      "엔터 제거",
      "개행 제거",
      "텍스트 줄바꿈",
    ],
    icon: "↩️",
    relatedToolIds: ["duplicate-line-remover", "text-converter"],
  },
  // 이미지 도구
  {
    id: "image-resizer",
    categoryId: "image",
    path: "/tools/image/image-resizer",
    name: "이미지 리사이즈",
    description: "이미지 크기를 원하는 사이즈로 조절합니다.",
    longDescription:
      "이미지 리사이즈 도구는 이미지의 가로, 세로 크기를 원하는 픽셀 또는 비율로 조절합니다. 블로그, SNS, 쇼핑몰 등에 맞는 이미지 크기로 쉽게 변환할 수 있습니다. 비율 유지 옵션을 제공하며, 모든 처리는 브라우저에서 이루어져 개인정보가 보호됩니다.",
    keywords: ["이미지 리사이즈", "사진 크기 조절", "이미지 크기 변환", "사진 리사이즈"],
    icon: "📐",
    isNew: true,
    relatedToolIds: ["image-compressor", "image-converter"],
  },
  {
    id: "image-compressor",
    categoryId: "image",
    path: "/tools/image/image-compressor",
    name: "이미지 압축",
    description: "이미지 파일 용량을 줄여줍니다. 화질은 최대한 유지합니다.",
    longDescription:
      "이미지 압축 도구는 JPEG, PNG, WebP 이미지의 파일 크기를 줄여줍니다. 품질 조절 슬라이더를 통해 원하는 수준으로 압축할 수 있으며, 압축 전후 용량을 비교할 수 있습니다. 웹사이트 로딩 속도 개선, 이메일 첨부 용량 줄이기 등에 유용합니다.",
    keywords: ["이미지 압축", "사진 용량 줄이기", "이미지 용량 줄이기", "사진 압축"],
    icon: "🗜️",
    isNew: true,
    relatedToolIds: ["image-resizer", "image-converter"],
  },
  {
    id: "image-converter",
    categoryId: "image",
    path: "/tools/image/image-converter",
    name: "이미지 포맷 변환",
    description: "PNG, JPG, WebP 등 이미지 포맷을 변환합니다.",
    longDescription:
      "이미지 포맷 변환 도구는 PNG, JPEG, WebP, BMP 등 다양한 이미지 형식 간 변환을 지원합니다. 특정 포맷이 필요한 경우 간편하게 변환할 수 있습니다. 모든 변환은 브라우저에서 처리되어 서버에 이미지가 업로드되지 않습니다.",
    keywords: ["이미지 변환", "PNG JPG 변환", "이미지 포맷 변환", "사진 형식 변환", "WebP 변환"],
    icon: "🔄",
    isNew: true,
    relatedToolIds: ["image-resizer", "image-compressor"],
  },
  // 계산기
  {
    id: "loan-calculator",
    categoryId: "calculator",
    path: "/tools/calculator/loan-calculator",
    name: "대출 이자 계산기",
    description: "대출 원리금 균등상환, 원금 균등상환 월 납입금을 계산합니다.",
    longDescription:
      "대출 이자 계산기는 대출 금액, 이자율, 대출 기간을 입력하면 월 납입금, 총 이자, 총 상환 금액을 계산합니다. 원리금 균등상환과 원금 균등상환 방식을 모두 지원하며, 상환 스케줄도 함께 확인할 수 있습니다.",
    keywords: ["대출 이자 계산기", "대출 계산기", "월 납입금 계산", "주택담보대출 계산기", "이자 계산"],
    icon: "🏦",
    isNew: true,
    relatedToolIds: ["salary-calculator", "bmi-calculator"],
  },
  {
    id: "salary-calculator",
    categoryId: "calculator",
    path: "/tools/calculator/salary-calculator",
    name: "연봉 실수령액 계산기",
    description: "연봉에서 세금과 4대보험을 공제한 실수령액을 계산합니다.",
    longDescription:
      "연봉 실수령액 계산기는 연봉을 입력하면 소득세, 지방소득세, 국민연금, 건강보험, 장기요양보험, 고용보험 등을 공제한 월 실수령액을 계산합니다. 2026년 기준 세율과 보험료율을 적용하여 정확한 실수령액을 확인할 수 있습니다.",
    keywords: ["연봉 실수령액", "연봉 계산기", "실수령액 계산기", "세후 연봉", "월급 계산기"],
    icon: "💰",
    isNew: true,
    relatedToolIds: ["loan-calculator", "bmi-calculator"],
  },
  {
    id: "bmi-calculator",
    categoryId: "calculator",
    path: "/tools/calculator/bmi-calculator",
    name: "BMI 계산기",
    description: "키와 체중으로 체질량지수(BMI)를 계산하고 비만도를 확인합니다.",
    longDescription:
      "BMI 계산기는 키(cm)와 체중(kg)을 입력하면 체질량지수(BMI)를 계산하고, 저체중/정상/과체중/비만 여부를 판정합니다. 대한비만학회 기준과 WHO 기준을 모두 제공하며, 건강한 체중 범위도 함께 안내합니다.",
    keywords: ["BMI 계산기", "체질량지수", "비만도 계산", "BMI 측정", "체중 계산기"],
    icon: "⚖️",
    isNew: true,
    relatedToolIds: ["salary-calculator", "loan-calculator"],
  },
  {
    id: "unit-converter",
    categoryId: "calculator",
    path: "/tools/calculator/unit-converter",
    name: "단위 변환기",
    description: "길이, 무게, 온도, 면적 등 다양한 단위를 변환합니다.",
    longDescription:
      "단위 변환기는 길이(cm, m, km, inch, ft), 무게(g, kg, lb, oz), 온도(°C, °F, K), 면적(㎡, 평, 에이커), 부피(L, mL, 갤런) 등 다양한 단위 간 변환을 지원합니다. 일상생활과 업무에서 자주 필요한 단위 변환을 빠르게 처리할 수 있습니다.",
    keywords: ["단위 변환", "단위 변환기", "cm inch 변환", "평 제곱미터", "온도 변환"],
    icon: "📏",
    isNew: true,
    relatedToolIds: ["bmi-calculator", "loan-calculator"],
  },
  // 개발자 도구
  {
    id: "json-formatter",
    categoryId: "developer",
    path: "/tools/developer/json-formatter",
    name: "JSON 포맷터",
    description: "JSON 데이터를 보기 좋게 정렬하고 검증합니다.",
    longDescription:
      "JSON 포맷터는 압축된 JSON 데이터를 들여쓰기하여 보기 좋게 정리하거나, 반대로 압축(minify)할 수 있습니다. JSON 문법 오류도 자동으로 검출하여 알려줍니다. API 개발, 데이터 분석 등에서 JSON을 다룰 때 유용합니다.",
    keywords: ["JSON 포맷터", "JSON 정렬", "JSON 뷰어", "JSON 검증", "JSON beautify"],
    icon: "{ }",
    isNew: true,
    relatedToolIds: ["base64-converter", "color-picker"],
  },
  {
    id: "base64-converter",
    categoryId: "developer",
    path: "/tools/developer/base64-converter",
    name: "Base64 인코더/디코더",
    description: "텍스트를 Base64로 인코딩하거나 디코딩합니다.",
    longDescription:
      "Base64 인코더/디코더는 일반 텍스트를 Base64 형식으로 변환하거나, Base64로 인코딩된 문자열을 원래 텍스트로 복원합니다. API 통신, 이메일 인코딩, 데이터 전송 등에서 자주 사용되는 Base64 변환을 간편하게 처리할 수 있습니다.",
    keywords: ["Base64 변환", "Base64 인코딩", "Base64 디코딩", "Base64 인코더"],
    icon: "🔐",
    isNew: true,
    relatedToolIds: ["json-formatter", "color-picker"],
  },
  {
    id: "color-picker",
    categoryId: "developer",
    path: "/tools/developer/color-picker",
    name: "색상 변환기",
    description: "HEX, RGB, HSL 색상 코드를 상호 변환합니다.",
    longDescription:
      "색상 변환기는 HEX, RGB, HSL 등 다양한 색상 코드 형식을 상호 변환합니다. 웹 디자인, 앱 개발 등에서 색상 코드가 필요할 때 유용합니다. 색상 미리보기도 함께 제공합니다.",
    keywords: ["색상 변환", "HEX RGB 변환", "색상 코드", "컬러 피커", "색상 추출"],
    icon: "🎨",
    isNew: true,
    relatedToolIds: ["json-formatter", "base64-converter"],
  },
  {
    id: "url-encoder",
    categoryId: "developer",
    path: "/tools/developer/url-encoder",
    name: "URL 인코더/디코더",
    description: "URL 특수문자를 인코딩하거나 디코딩합니다.",
    longDescription:
      "URL 인코더/디코더는 URL에 포함된 특수문자, 한글 등을 퍼센트 인코딩으로 변환하거나, 인코딩된 URL을 원래 형태로 복원합니다. 웹 개발, API 호출, 링크 공유 등에서 URL을 다룰 때 유용합니다.",
    keywords: ["URL 인코딩", "URL 디코딩", "URL 인코더", "퍼센트 인코딩", "URL 변환"],
    icon: "🔗",
    isNew: true,
    relatedToolIds: ["base64-converter", "json-formatter"],
  },
  // 생성 도구
  {
    id: "qr-generator",
    categoryId: "generator",
    path: "/tools/generator/qr-generator",
    name: "QR코드 생성기",
    description: "URL, 텍스트 등으로 QR코드를 생성합니다.",
    longDescription:
      "QR코드 생성기는 URL, 텍스트, 연락처 정보 등을 QR코드로 변환합니다. 생성된 QR코드는 PNG 이미지로 다운로드할 수 있습니다. 명함, 포스터, 웹사이트 등에 활용할 수 있습니다.",
    keywords: ["QR코드 생성", "QR코드 만들기", "QR코드 생성기", "QR코드 변환"],
    icon: "📱",
    isNew: true,
    relatedToolIds: ["password-generator", "lorem-generator"],
  },
  {
    id: "password-generator",
    categoryId: "generator",
    path: "/tools/generator/password-generator",
    name: "비밀번호 생성기",
    description: "안전한 랜덤 비밀번호를 생성합니다.",
    longDescription:
      "비밀번호 생성기는 영문 대소문자, 숫자, 특수문자를 조합한 안전한 랜덤 비밀번호를 생성합니다. 길이와 포함할 문자 종류를 설정할 수 있으며, 비밀번호 강도도 함께 표시합니다. 생성된 비밀번호는 서버에 저장되지 않습니다.",
    keywords: ["비밀번호 생성기", "랜덤 비밀번호", "비밀번호 만들기", "안전한 비밀번호"],
    icon: "🔑",
    isNew: true,
    relatedToolIds: ["qr-generator", "lorem-generator"],
  },
  {
    id: "lorem-generator",
    categoryId: "generator",
    path: "/tools/generator/lorem-generator",
    name: "한글 로렘입숨",
    description: "디자인/개발용 한글 더미 텍스트를 생성합니다.",
    longDescription:
      "한글 로렘입숨 생성기는 웹 디자인, 앱 개발, 인쇄물 제작 등에서 레이아웃 확인용으로 사용할 수 있는 한글 더미 텍스트를 생성합니다. 문단 수를 지정할 수 있으며, 자연스러운 한국어 문장으로 구성됩니다.",
    keywords: ["로렘입숨", "한글 로렘입숨", "더미 텍스트", "Lorem Ipsum 한글", "임시 텍스트"],
    icon: "📝",
    isNew: true,
    relatedToolIds: ["qr-generator", "password-generator"],
  },
  {
    id: "d-day-calculator",
    categoryId: "generator",
    path: "/tools/generator/d-day-calculator",
    name: "D-Day 계산기",
    description: "특정 날짜까지 남은 일수 또는 경과 일수를 계산합니다.",
    longDescription:
      "D-Day 계산기는 특정 날짜까지 남은 일수를 계산하거나, 특정 날짜로부터 경과한 일수를 확인할 수 있습니다. 시험일, 기념일, 프로젝트 마감일 등 다양한 상황에서 활용할 수 있습니다.",
    keywords: ["D-Day 계산기", "디데이 계산", "남은 날짜 계산", "날짜 계산기", "경과일 계산"],
    icon: "📅",
    isNew: true,
    relatedToolIds: ["qr-generator", "password-generator"],
  },
  // 추가 텍스트 도구
  {
    id: "korean-english-typo",
    categoryId: "text",
    path: "/tools/text/korean-english-typo",
    name: "한영 타자 변환기",
    description: "한글 ↔ 영문 오타를 자동으로 변환합니다.",
    longDescription:
      "한영 타자 변환기는 한영 전환을 깜빡하고 입력한 텍스트를 올바르게 변환합니다. 예를 들어 'ㅗ디ㅣㅐ'를 'hello'로, 'dkssudgktpdy'를 '안녕하세요'로 변환합니다. 한글 자판과 영문 자판 배열을 기반으로 정확하게 변환합니다.",
    keywords: ["한영 변환", "한영 타자 변환", "영한 변환", "한영키 오타", "타자 변환기"],
    icon: "⌨️",
    isNew: true,
    relatedToolIds: ["character-counter", "text-converter"],
  },
  // 추가 계산기
  {
    id: "age-calculator",
    categoryId: "calculator",
    path: "/tools/calculator/age-calculator",
    name: "나이 계산기",
    description: "생년월일로 만 나이와 한국 나이를 계산합니다.",
    longDescription:
      "나이 계산기는 생년월일을 입력하면 만 나이, 한국 나이(세는나이), 연 나이를 모두 계산합니다. 2023년부터 한국도 만 나이를 공식 사용하지만, 일상에서는 여전히 한국 나이를 사용하는 경우가 많아 두 가지를 모두 확인할 수 있습니다.",
    keywords: ["나이 계산기", "만나이 계산", "한국나이 계산", "나이 계산", "생년월일 나이"],
    icon: "🎂",
    isNew: true,
    relatedToolIds: ["bmi-calculator", "d-day-calculator"],
  },
  {
    id: "percent-calculator",
    categoryId: "calculator",
    path: "/tools/calculator/percent-calculator",
    name: "퍼센트 계산기",
    description: "할인율, 증감률, 비율 등 다양한 퍼센트 계산을 합니다.",
    longDescription:
      "퍼센트 계산기는 다양한 퍼센트 관련 계산을 지원합니다. A의 B%는 얼마인지, A에서 B로의 증감률, 할인 가격 계산, A가 B의 몇 %인지 등을 계산할 수 있습니다. 쇼핑 할인, 성적 계산, 사업 분석 등에 유용합니다.",
    keywords: ["퍼센트 계산기", "할인율 계산", "증감률 계산", "비율 계산", "% 계산기"],
    icon: "💹",
    isNew: true,
    relatedToolIds: ["loan-calculator", "salary-calculator"],
  },
  // 추가 개발자 도구
  {
    id: "regex-tester",
    categoryId: "developer",
    path: "/tools/developer/regex-tester",
    name: "정규식 테스터",
    description: "정규표현식을 실시간으로 테스트하고 매칭 결과를 확인합니다.",
    longDescription:
      "정규식 테스터는 정규표현식 패턴을 입력하면 테스트 문자열에서 매칭되는 부분을 실시간으로 하이라이트합니다. g, i, m 등의 플래그를 설정할 수 있으며, 매칭된 그룹 정보도 함께 표시합니다. 정규식을 학습하거나 디버깅할 때 유용합니다.",
    keywords: ["정규식 테스터", "정규표현식 테스트", "regex 테스터", "정규식 검사", "regex tester"],
    icon: "🔍",
    isNew: true,
    relatedToolIds: ["json-formatter", "url-encoder"],
  },
  // --- 16개 추가 도구 ---
  {
    id: "hash-generator",
    categoryId: "developer",
    path: "/tools/developer/hash-generator",
    name: "해시 생성기",
    description: "텍스트의 MD5, SHA-1, SHA-256 해시값을 생성합니다.",
    longDescription: "해시 생성기는 입력한 텍스트의 MD5, SHA-1, SHA-256 해시값을 계산합니다. 파일 무결성 검증, 비밀번호 해싱, 데이터 검증 등에 활용할 수 있습니다.",
    keywords: ["해시 생성기", "MD5 변환", "SHA256 해시", "해시값 계산"],
    icon: "🔒",
    isNew: true,
    relatedToolIds: ["base64-converter", "uuid-generator"],
  },
  {
    id: "uuid-generator",
    categoryId: "developer",
    path: "/tools/developer/uuid-generator",
    name: "UUID 생성기",
    description: "고유한 UUID (v4)를 생성합니다.",
    longDescription: "UUID 생성기는 고유한 UUID v4를 생성합니다. 데이터베이스 키, API 토큰, 세션 ID 등에 사용할 수 있는 고유 식별자를 만들어줍니다. 한번에 여러 개를 생성할 수도 있습니다.",
    keywords: ["UUID 생성기", "UUID 만들기", "GUID 생성", "고유 식별자"],
    icon: "🆔",
    isNew: true,
    relatedToolIds: ["hash-generator", "password-generator"],
  },
  {
    id: "html-entity",
    categoryId: "developer",
    path: "/tools/developer/html-entity",
    name: "HTML 엔티티 변환",
    description: "HTML 특수문자를 엔티티로 변환하거나 복원합니다.",
    longDescription: "HTML 엔티티 변환 도구는 <, >, &, \" 등의 HTML 특수문자를 엔티티 코드(&lt; &gt; &amp; 등)로 변환하거나, 반대로 엔티티를 원래 문자로 복원합니다.",
    keywords: ["HTML 엔티티", "HTML 특수문자", "HTML 인코딩", "HTML escape"],
    icon: "🏷️",
    isNew: true,
    relatedToolIds: ["url-encoder", "json-formatter"],
  },
  {
    id: "markdown-preview",
    categoryId: "developer",
    path: "/tools/developer/markdown-preview",
    name: "Markdown 미리보기",
    description: "Markdown 문법을 실시간으로 미리보기합니다.",
    longDescription: "Markdown 미리보기 도구는 Markdown 문법으로 작성한 텍스트를 실시간으로 HTML 렌더링하여 보여줍니다. README, 블로그 글, 문서 작성 시 결과를 미리 확인할 수 있습니다.",
    keywords: ["Markdown 미리보기", "마크다운 에디터", "마크다운 뷰어", "Markdown preview"],
    icon: "📋",
    isNew: true,
    relatedToolIds: ["json-formatter", "html-entity"],
  },
  {
    id: "timestamp-converter",
    categoryId: "developer",
    path: "/tools/developer/timestamp-converter",
    name: "타임스탬프 변환기",
    description: "Unix 타임스탬프와 날짜를 상호 변환합니다.",
    longDescription: "타임스탬프 변환기는 Unix 타임스탬프(초/밀리초)를 사람이 읽을 수 있는 날짜로 변환하거나, 날짜를 타임스탬프로 변환합니다. 현재 타임스탬프도 함께 표시합니다.",
    keywords: ["타임스탬프 변환", "Unix timestamp", "Epoch 변환", "시간 변환"],
    icon: "⏱️",
    isNew: true,
    relatedToolIds: ["json-formatter", "base64-converter"],
  },
  {
    id: "csv-json-converter",
    categoryId: "developer",
    path: "/tools/developer/csv-json-converter",
    name: "CSV ↔ JSON 변환",
    description: "CSV 데이터를 JSON으로, JSON을 CSV로 변환합니다.",
    longDescription: "CSV ↔ JSON 변환 도구는 CSV 형식의 데이터를 JSON 배열로 변환하거나, JSON 배열을 CSV로 변환합니다. 엑셀 데이터를 API용 JSON으로 변환할 때 유용합니다.",
    keywords: ["CSV JSON 변환", "CSV to JSON", "JSON to CSV", "데이터 변환"],
    icon: "📊",
    isNew: true,
    relatedToolIds: ["json-formatter", "html-entity"],
  },
  // 추가 이미지 도구
  {
    id: "image-to-base64",
    categoryId: "image",
    path: "/tools/image/image-to-base64",
    name: "이미지 → Base64 변환",
    description: "이미지 파일을 Base64 문자열로 변환합니다.",
    longDescription: "이미지 → Base64 변환 도구는 이미지 파일을 Base64 인코딩된 문자열로 변환합니다. HTML/CSS에 이미지를 직접 삽입하거나, API로 이미지를 전송할 때 사용합니다.",
    keywords: ["이미지 Base64", "이미지 Base64 변환", "이미지 인코딩", "Base64 이미지"],
    icon: "🔣",
    isNew: true,
    relatedToolIds: ["image-compressor", "base64-converter"],
  },
  {
    id: "image-cropper",
    categoryId: "image",
    path: "/tools/image/image-cropper",
    name: "이미지 자르기",
    description: "이미지를 원하는 영역만 잘라냅니다.",
    longDescription: "이미지 자르기 도구는 이미지에서 원하는 영역을 선택하여 잘라낼 수 있습니다. 프로필 사진, 썸네일, SNS 이미지 등 특정 크기에 맞게 이미지를 자를 때 유용합니다.",
    keywords: ["이미지 자르기", "사진 자르기", "이미지 크롭", "사진 크롭"],
    icon: "✂️",
    isNew: true,
    relatedToolIds: ["image-resizer", "image-compressor"],
  },
  // 추가 계산기
  {
    id: "date-calculator",
    categoryId: "calculator",
    path: "/tools/calculator/date-calculator",
    name: "날짜 계산기",
    description: "두 날짜 사이의 일수를 계산하거나, 날짜에 일수를 더합니다.",
    longDescription: "날짜 계산기는 두 날짜 사이의 일수, 주수, 개월수를 계산하거나, 특정 날짜에서 일수를 더하거나 빼서 결과 날짜를 구합니다. 계약 기간, 만기일, 근무일수 계산 등에 유용합니다.",
    keywords: ["날짜 계산기", "일수 계산", "두 날짜 사이", "날짜 더하기", "기간 계산"],
    icon: "📆",
    isNew: true,
    relatedToolIds: ["d-day-calculator", "age-calculator"],
  },
  {
    id: "electricity-calculator",
    categoryId: "calculator",
    path: "/tools/calculator/electricity-calculator",
    name: "전기요금 계산기",
    description: "월 전력 사용량으로 예상 전기요금을 계산합니다.",
    longDescription: "전기요금 계산기는 월 전력 사용량(kWh)을 입력하면 2026년 한국전력 누진제 요금 기준으로 예상 전기요금을 계산합니다. 구간별 요금과 부가세, 전력기반기금을 포함한 총액을 확인할 수 있습니다.",
    keywords: ["전기요금 계산기", "전기세 계산", "전기요금 누진제", "전력 요금 계산"],
    icon: "⚡",
    isNew: true,
    relatedToolIds: ["loan-calculator", "percent-calculator"],
  },
  {
    id: "zodiac-calculator",
    categoryId: "calculator",
    path: "/tools/calculator/zodiac-calculator",
    name: "별자리/띠 계산기",
    description: "생년월일로 별자리와 띠를 확인합니다.",
    longDescription: "별자리/띠 계산기는 생년월일을 입력하면 서양 별자리(12궁)와 한국 띠(12지)를 알려줍니다. 각 별자리와 띠의 특성 설명도 함께 제공합니다.",
    keywords: ["별자리 계산기", "띠 계산기", "별자리 확인", "나의 별자리", "12지 띠"],
    icon: "⭐",
    isNew: true,
    relatedToolIds: ["age-calculator", "d-day-calculator"],
  },
  // 추가 생성 도구
  {
    id: "color-palette",
    categoryId: "generator",
    path: "/tools/generator/color-palette",
    name: "색상 팔레트 생성기",
    description: "조화로운 색상 팔레트를 자동으로 생성합니다.",
    longDescription: "색상 팔레트 생성기는 기준 색상을 선택하면 보색, 유사색, 삼각색 등 조화로운 색상 조합을 자동으로 생성합니다. 웹 디자인, UI 디자인, 브랜딩 등에 활용할 수 있습니다.",
    keywords: ["색상 팔레트", "컬러 팔레트 생성", "색상 조합", "배색 생성기"],
    icon: "🌈",
    isNew: true,
    relatedToolIds: ["color-picker", "password-generator"],
  },
  {
    id: "emoji-search",
    categoryId: "generator",
    path: "/tools/generator/emoji-search",
    name: "이모지 검색기",
    description: "키워드로 이모지를 검색하고 복사합니다.",
    longDescription: "이모지 검색기는 한글 또는 영문 키워드로 이모지를 검색하고, 클릭 한번으로 복사할 수 있습니다. 자주 사용하는 이모지 카테고리별 목록도 제공합니다.",
    keywords: ["이모지 검색", "이모지 복사", "이모티콘 검색", "emoji 검색"],
    icon: "😀",
    isNew: true,
    relatedToolIds: ["qr-generator", "lorem-generator"],
  },
  {
    id: "random-picker",
    categoryId: "generator",
    path: "/tools/generator/random-picker",
    name: "랜덤 뽑기",
    description: "숫자, 이름, 항목을 랜덤으로 뽑아줍니다.",
    longDescription: "랜덤 뽑기 도구는 숫자 범위에서 랜덤 숫자를 뽑거나, 입력한 항목 중에서 랜덤으로 선택합니다. 추첨, 순서 정하기, 메뉴 정하기 등에 유용합니다.",
    keywords: ["랜덤 뽑기", "랜덤 숫자", "추첨기", "랜덤 선택", "무작위 뽑기"],
    icon: "🎲",
    isNew: true,
    relatedToolIds: ["password-generator", "qr-generator"],
  },
  {
    id: "ip-lookup",
    categoryId: "generator",
    path: "/tools/generator/ip-lookup",
    name: "내 IP 주소 확인",
    description: "현재 접속중인 IP 주소를 확인합니다.",
    longDescription: "내 IP 주소 확인 도구는 현재 사용중인 공인 IP 주소를 확인합니다. VPN 연결 확인, 네트워크 진단, IP 기반 서비스 설정 등에 유용합니다.",
    keywords: ["내 IP 확인", "IP 주소 조회", "공인 IP 확인", "내 아이피"],
    icon: "🌐",
    isNew: true,
    relatedToolIds: ["uuid-generator", "hash-generator"],
  },
  // 칼로리/열량 계산기
  {
    id: "calorie-calculator",
    categoryId: "calculator",
    path: "/tools/calculator/calorie-calculator",
    name: "칼로리 계산기",
    description: "하루 필요 칼로리와 목표별 권장 섭취량을 계산합니다.",
    longDescription:
      "칼로리 계산기는 성별, 나이, 키, 체중, 활동량을 입력하면 기초대사량(BMR)과 하루 필요 칼로리(TDEE)를 계산합니다. 체중 감량, 유지, 증량 등 목표에 따른 권장 칼로리 섭취량도 함께 제공합니다. Mifflin-St Jeor 공식을 사용합니다.",
    keywords: ["칼로리 계산기", "하루 칼로리", "기초대사량 계산", "TDEE 계산", "다이어트 칼로리"],
    icon: "🔥",
    isNew: true,
    relatedToolIds: ["bmi-calculator", "percent-calculator"],
  },
  {
    id: "food-calorie",
    categoryId: "calculator",
    path: "/tools/calculator/food-calorie",
    name: "음식 열량 계산기",
    description: "음식별 칼로리를 검색하고 하루 섭취량을 계산합니다.",
    longDescription:
      "음식 열량 계산기는 한국인이 자주 먹는 음식의 칼로리를 검색할 수 있습니다. 여러 음식을 추가하여 한 끼 또는 하루 총 섭취 칼로리를 계산할 수 있습니다. 다이어트, 식단 관리에 유용합니다.",
    keywords: ["음식 칼로리", "열량 계산기", "음식 열량", "칼로리 검색", "식단 칼로리"],
    icon: "🍽️",
    isNew: true,
    relatedToolIds: ["calorie-calculator", "bmi-calculator"],
  },
  // 생활 도구 - 주소
  {
    id: "address-converter",
    categoryId: "generator",
    path: "/tools/generator/address-converter",
    name: "영문주소 변환기",
    description: "한글 주소를 영문 주소로 변환하고 우편번호를 확인합니다.",
    longDescription:
      "영문주소 변환기는 한글 도로명주소 또는 지번주소를 검색하면 영문 주소와 우편번호를 함께 확인할 수 있습니다. 해외 직구, 해외 배송, 영문 서류 작성 등에서 영문 주소가 필요할 때 유용합니다. 도로명주소 데이터를 기반으로 정확한 영문 주소를 제공합니다.",
    keywords: ["영문주소 변환", "영어주소 변환기", "영문주소 검색", "우편번호 검색", "영문주소"],
    icon: "📮",
    isNew: true,
    relatedToolIds: ["ip-lookup", "qr-generator"],
  },
];

export function getToolsByCategory(categoryId: string): ToolDefinition[] {
  return tools.filter((tool) => tool.categoryId === categoryId);
}

export function getToolById(id: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getCategoryById(id: string): CategoryDefinition | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getAllTools(): ToolDefinition[] {
  return tools;
}

export function getRelatedTools(toolId: string): ToolDefinition[] {
  const tool = getToolById(toolId);
  if (!tool?.relatedToolIds) return [];
  return tool.relatedToolIds
    .map((id) => getToolById(id))
    .filter((t): t is ToolDefinition => t !== undefined);
}
