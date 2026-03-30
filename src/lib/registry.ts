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
