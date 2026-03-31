"use client";

import { useState, useMemo } from "react";
import { formatNumber } from "@/lib/utils";

interface FoodItem {
  name: string;
  calorie: number; // per serving
  serving: string;
}

const FOOD_DB: FoodItem[] = [
  // 밥/면
  { name: "흰쌀밥 (1공기)", calorie: 300, serving: "210g" },
  { name: "현미밥 (1공기)", calorie: 310, serving: "210g" },
  { name: "라면", calorie: 500, serving: "1봉지" },
  { name: "짜장면", calorie: 650, serving: "1인분" },
  { name: "짬뽕", calorie: 530, serving: "1인분" },
  { name: "비빔밥", calorie: 550, serving: "1인분" },
  { name: "김밥 (1줄)", calorie: 400, serving: "1줄" },
  { name: "떡볶이", calorie: 480, serving: "1인분" },
  { name: "칼국수", calorie: 420, serving: "1인분" },
  { name: "냉면", calorie: 450, serving: "1인분" },
  { name: "볶음밥", calorie: 520, serving: "1인분" },
  { name: "카레라이스", calorie: 580, serving: "1인분" },
  // 고기/반찬
  { name: "삼겹살 (1인분)", calorie: 550, serving: "200g" },
  { name: "치킨 (반마리)", calorie: 700, serving: "반마리" },
  { name: "불고기", calorie: 400, serving: "1인분" },
  { name: "제육볶음", calorie: 450, serving: "1인분" },
  { name: "김치찌개", calorie: 250, serving: "1인분" },
  { name: "된장찌개", calorie: 200, serving: "1인분" },
  { name: "계란후라이 (1개)", calorie: 90, serving: "1개" },
  { name: "두부 (반모)", calorie: 80, serving: "150g" },
  { name: "김치 (1접시)", calorie: 30, serving: "50g" },
  // 빵/간식
  { name: "식빵 (1쪽)", calorie: 80, serving: "1쪽" },
  { name: "크로아상", calorie: 270, serving: "1개" },
  { name: "도넛", calorie: 300, serving: "1개" },
  { name: "붕어빵 (1개)", calorie: 150, serving: "1개" },
  { name: "호떡 (1개)", calorie: 250, serving: "1개" },
  { name: "과자 (포테이토칩)", calorie: 530, serving: "100g" },
  { name: "초콜릿바", calorie: 250, serving: "1개" },
  // 음료
  { name: "아메리카노", calorie: 5, serving: "1잔" },
  { name: "카페라떼", calorie: 180, serving: "1잔" },
  { name: "콜라 (캔)", calorie: 140, serving: "355ml" },
  { name: "맥주 (캔)", calorie: 150, serving: "355ml" },
  { name: "소주 (1병)", calorie: 400, serving: "360ml" },
  { name: "오렌지주스", calorie: 110, serving: "200ml" },
  { name: "우유", calorie: 130, serving: "200ml" },
  // 패스트푸드
  { name: "햄버거 (빅맥)", calorie: 550, serving: "1개" },
  { name: "피자 (1조각)", calorie: 270, serving: "1조각" },
  { name: "감자튀김 (중)", calorie: 380, serving: "1개" },
  { name: "핫도그", calorie: 300, serving: "1개" },
  // 과일
  { name: "사과 (1개)", calorie: 95, serving: "200g" },
  { name: "바나나 (1개)", calorie: 105, serving: "120g" },
  { name: "귤 (1개)", calorie: 40, serving: "100g" },
  { name: "딸기 (10개)", calorie: 50, serving: "150g" },
];

interface SelectedFood {
  food: FoodItem;
  quantity: number;
}

export function FoodCalorieTool() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<SelectedFood[]>([]);

  const filtered = useMemo(() => {
    if (!search.trim()) return FOOD_DB;
    return FOOD_DB.filter((f) => f.name.includes(search));
  }, [search]);

  const totalCalorie = selected.reduce(
    (sum, s) => sum + s.food.calorie * s.quantity,
    0
  );

  function addFood(food: FoodItem) {
    const existing = selected.find((s) => s.food.name === food.name);
    if (existing) {
      setSelected(
        selected.map((s) =>
          s.food.name === food.name ? { ...s, quantity: s.quantity + 1 } : s
        )
      );
    } else {
      setSelected([...selected, { food, quantity: 1 }]);
    }
  }

  function removeFood(name: string) {
    setSelected(selected.filter((s) => s.food.name !== name));
  }

  function updateQuantity(name: string, qty: number) {
    if (qty <= 0) return removeFood(name);
    setSelected(
      selected.map((s) => (s.food.name === name ? { ...s, quantity: qty } : s))
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 왼쪽: 음식 검색 */}
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="음식 검색 (예: 라면, 치킨, 밥...)"
            className="w-full px-4 py-2 border border-border rounded-lg bg-surface mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="h-80 overflow-y-auto border border-border rounded-lg">
            {filtered.map((food) => (
              <button
                key={food.name}
                onClick={() => addFood(food)}
                className="w-full flex justify-between items-center px-4 py-2 hover:bg-surface-muted transition-colors text-left border-b border-border last:border-b-0"
              >
                <div>
                  <span className="text-sm text-text">{food.name}</span>
                  <span className="text-xs text-text-muted ml-2">{food.serving}</span>
                </div>
                <span className="text-sm font-medium text-primary-600">
                  {food.calorie} kcal
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 오른쪽: 선택한 음식 목록 */}
        <div>
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-100 mb-4 text-center">
            <div className="text-sm text-text-muted mb-1">총 섭취 칼로리</div>
            <div className="text-4xl font-bold text-primary-600">
              {formatNumber(totalCalorie)}
            </div>
            <div className="text-sm text-text-muted">kcal</div>
          </div>

          {selected.length === 0 ? (
            <div className="text-center text-text-muted text-sm py-8">
              왼쪽에서 음식을 클릭하여 추가하세요
            </div>
          ) : (
            <div className="space-y-2">
              {selected.map((s) => (
                <div
                  key={s.food.name}
                  className="flex items-center gap-2 p-3 bg-surface-muted rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text">{s.food.name}</div>
                    <div className="text-xs text-text-muted">
                      {s.food.calorie} kcal × {s.quantity} = {formatNumber(s.food.calorie * s.quantity)} kcal
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(s.food.name, s.quantity - 1)}
                      className="w-7 h-7 rounded border border-border hover:bg-surface text-sm flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm">{s.quantity}</span>
                    <button
                      onClick={() => updateQuantity(s.food.name, s.quantity + 1)}
                      className="w-7 h-7 rounded border border-border hover:bg-surface text-sm flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFood(s.food.name)}
                    className="text-text-muted hover:text-red-500 text-sm ml-1"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                onClick={() => setSelected([])}
                className="w-full px-4 py-2 text-sm rounded-lg border border-border hover:bg-surface-muted transition-colors mt-2"
              >
                전체 초기화
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
