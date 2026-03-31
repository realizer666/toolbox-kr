import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.BAREUN_API_KEY || "";
const API_URL = "https://api.bareun.ai/bareun.RevisionService/CorrectError";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "텍스트를 입력해주세요." }, { status: 400 });
    }

    if (text.length > 5000) {
      return NextResponse.json({ error: "5000자 이하로 입력해주세요." }, { status: 400 });
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify({
        document: {
          content: text,
          language: "ko-KR",
        },
        encoding_type: "UTF32",
        custom_dict_names: [],
        config: {
          enable_sentence_check: true,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Bareun API error:", response.status, errorText);
      return NextResponse.json(
        { error: "맞춤법 검사 서비스에 일시적인 오류가 발생했습니다." },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Spelling check error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
