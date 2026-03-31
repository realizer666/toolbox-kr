"use client";

import { useState, useCallback } from "react";

const emojis = [
  // 표정
  { emoji: "😀", keywords: ["웃음", "기쁨", "행복", "smile", "표정"] },
  { emoji: "😂", keywords: ["폭소", "웃음", "눈물", "laugh", "표정"] },
  { emoji: "🥹", keywords: ["감동", "눈물", "표정"] },
  { emoji: "😍", keywords: ["사랑", "하트눈", "좋아", "표정"] },
  { emoji: "🥰", keywords: ["사랑", "행복", "하트", "표정"] },
  { emoji: "😊", keywords: ["미소", "행복", "부끄", "표정"] },
  { emoji: "😎", keywords: ["쿨", "멋짐", "선글라스", "표정"] },
  { emoji: "🤔", keywords: ["생각", "고민", "의문", "표정"] },
  { emoji: "😢", keywords: ["슬픔", "눈물", "울음", "표정"] },
  { emoji: "😭", keywords: ["대성통곡", "울음", "슬픔", "표정"] },
  { emoji: "😡", keywords: ["화남", "분노", "짜증", "표정"] },
  { emoji: "🤯", keywords: ["놀람", "충격", "대박", "표정"] },
  { emoji: "😱", keywords: ["놀람", "공포", "무서움", "표정"] },
  { emoji: "🥱", keywords: ["하품", "졸림", "지루", "표정"] },
  { emoji: "😴", keywords: ["잠", "졸림", "수면", "표정"] },
  { emoji: "🤗", keywords: ["포옹", "환영", "반가움", "표정"] },
  { emoji: "🤭", keywords: ["킥킥", "웃음", "숨김", "표정"] },
  { emoji: "😏", keywords: ["능글", "음흉", "씨익", "표정"] },
  { emoji: "🙄", keywords: ["한심", "무시", "눈굴림", "표정"] },
  { emoji: "😤", keywords: ["화남", "콧김", "답답", "표정"] },

  // 손/몸
  { emoji: "👍", keywords: ["좋아요", "엄지", "추천", "손"] },
  { emoji: "👎", keywords: ["싫어요", "비추", "손"] },
  { emoji: "👏", keywords: ["박수", "칭찬", "축하", "손"] },
  { emoji: "🙏", keywords: ["부탁", "감사", "기도", "손"] },
  { emoji: "✌️", keywords: ["브이", "승리", "평화", "손"] },
  { emoji: "🤞", keywords: ["행운", "손가락", "손"] },
  { emoji: "👋", keywords: ["인사", "안녕", "손흔들기", "손"] },
  { emoji: "💪", keywords: ["힘", "근육", "화이팅", "몸"] },
  { emoji: "🤝", keywords: ["악수", "협력", "합의", "손"] },
  { emoji: "🫶", keywords: ["하트", "손하트", "사랑", "손"] },

  // 동물
  { emoji: "🐶", keywords: ["강아지", "개", "멍멍이", "동물"] },
  { emoji: "🐱", keywords: ["고양이", "냥이", "동물"] },
  { emoji: "🐻", keywords: ["곰", "곰돌이", "동물"] },
  { emoji: "🦊", keywords: ["여우", "동물"] },
  { emoji: "🐼", keywords: ["판다", "동물"] },
  { emoji: "🐷", keywords: ["돼지", "동물"] },
  { emoji: "🐸", keywords: ["개구리", "동물"] },
  { emoji: "🦋", keywords: ["나비", "동물"] },
  { emoji: "🐢", keywords: ["거북이", "동물"] },
  { emoji: "🐳", keywords: ["고래", "동물"] },

  // 음식
  { emoji: "🍕", keywords: ["피자", "음식"] },
  { emoji: "🍔", keywords: ["햄버거", "버거", "음식"] },
  { emoji: "🍣", keywords: ["초밥", "스시", "음식"] },
  { emoji: "🍜", keywords: ["라면", "국수", "음식"] },
  { emoji: "🍚", keywords: ["밥", "쌀", "음식"] },
  { emoji: "🍰", keywords: ["케이크", "디저트", "음식"] },
  { emoji: "☕", keywords: ["커피", "카페", "음식"] },
  { emoji: "🍺", keywords: ["맥주", "술", "음식"] },
  { emoji: "🧋", keywords: ["버블티", "음료", "음식"] },
  { emoji: "🍎", keywords: ["사과", "과일", "음식"] },

  // 여행
  { emoji: "✈️", keywords: ["비행기", "여행", "출장"] },
  { emoji: "🚗", keywords: ["자동차", "차", "드라이브", "여행"] },
  { emoji: "🏖️", keywords: ["해변", "바다", "휴가", "여행"] },
  { emoji: "🏔️", keywords: ["산", "등산", "여행"] },
  { emoji: "🗼", keywords: ["타워", "도쿄", "여행"] },
  { emoji: "🌍", keywords: ["지구", "세계", "여행"] },
  { emoji: "🚀", keywords: ["로켓", "우주", "여행"] },
  { emoji: "🏠", keywords: ["집", "가정", "여행"] },
  { emoji: "⛺", keywords: ["캠핑", "텐트", "여행"] },
  { emoji: "🎡", keywords: ["관람차", "놀이공원", "여행"] },

  // 물건
  { emoji: "📱", keywords: ["핸드폰", "스마트폰", "물건"] },
  { emoji: "💻", keywords: ["노트북", "컴퓨터", "물건"] },
  { emoji: "📸", keywords: ["카메라", "사진", "물건"] },
  { emoji: "🎧", keywords: ["헤드폰", "이어폰", "음악", "물건"] },
  { emoji: "💡", keywords: ["아이디어", "전구", "물건"] },
  { emoji: "📚", keywords: ["책", "공부", "독서", "물건"] },
  { emoji: "🎁", keywords: ["선물", "생일", "물건"] },
  { emoji: "💰", keywords: ["돈", "금전", "물건"] },
  { emoji: "🔑", keywords: ["열쇠", "키", "물건"] },
  { emoji: "⏰", keywords: ["시계", "알람", "시간", "물건"] },

  // 기호
  { emoji: "❤️", keywords: ["하트", "사랑", "기호"] },
  { emoji: "💔", keywords: ["실연", "깨진하트", "기호"] },
  { emoji: "⭐", keywords: ["별", "스타", "기호"] },
  { emoji: "🔥", keywords: ["불", "핫", "인기", "기호"] },
  { emoji: "✅", keywords: ["확인", "체크", "완료", "기호"] },
  { emoji: "❌", keywords: ["취소", "엑스", "거절", "기호"] },
  { emoji: "⚠️", keywords: ["경고", "주의", "기호"] },
  { emoji: "💯", keywords: ["백점", "완벽", "기호"] },
  { emoji: "🎵", keywords: ["음악", "노래", "기호"] },
  { emoji: "🎉", keywords: ["축하", "파티", "기호"] },
  { emoji: "💬", keywords: ["대화", "말풍선", "채팅", "기호"] },
  { emoji: "🏆", keywords: ["트로피", "우승", "1등", "기호"] },
  { emoji: "📌", keywords: ["핀", "고정", "중요", "기호"] },
  { emoji: "🚫", keywords: ["금지", "안됨", "기호"] },
  { emoji: "♻️", keywords: ["재활용", "환경", "기호"] },
];

const categories = ["전체", "표정", "손", "동물", "음식", "여행", "물건", "기호"];

export function EmojiSearchTool() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);

  const handleCopy = useCallback(async (emoji: string) => {
    try {
      await navigator.clipboard.writeText(emoji);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = emoji;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedEmoji(emoji);
    setTimeout(() => setCopiedEmoji(null), 1500);
  }, []);

  const filtered = emojis.filter((e) => {
    const matchesCategory = category === "전체" || e.keywords.some((k) => k.includes(category) || category.includes(k));
    const matchesQuery = !query || e.keywords.some((k) => k.includes(query)) || e.emoji.includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이모지 검색 (예: 웃음, 사랑, 커피...)"
            className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-primary-600 text-white"
                  : "border border-border hover:bg-surface-muted text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {filtered.map((e) => (
            <button
              key={e.emoji}
              onClick={() => handleCopy(e.emoji)}
              className="relative flex flex-col items-center justify-center p-3 rounded-lg border border-border hover:bg-surface-muted transition-colors aspect-square text-2xl"
              title={e.keywords.join(", ")}
            >
              {e.emoji}
              {copiedEmoji === e.emoji && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-primary-600 text-white px-2 py-0.5 rounded whitespace-nowrap">
                  복사됨!
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-text-muted text-sm">
          검색 결과가 없습니다.
        </div>
      )}

      <div className="mt-4 text-sm text-text-muted text-center">
        이모지를 클릭하면 클립보드에 복사됩니다. (총 {filtered.length}개)
      </div>
    </div>
  );
}
