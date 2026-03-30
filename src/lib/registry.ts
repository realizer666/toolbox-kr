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
