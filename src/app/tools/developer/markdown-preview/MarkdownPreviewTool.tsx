"use client";

import { useState } from "react";

function markdownToHtml(md: string): string {
  let html = md;

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim()}</code></pre>`;
  });

  // Blockquotes
  html = html.replace(/^>\s*(.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600">$1</blockquote>');

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, '<h6 class="text-sm font-bold mt-4 mb-2">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-sm font-bold mt-4 mb-2">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-base font-bold mt-4 mb-2">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 underline" target="_blank" rel="noopener noreferrer">$1</a>');

  // Unordered lists
  html = html.replace(/^-\s+(.+)$/gm, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul class="my-2">${match}</ul>`);

  // Paragraphs (lines that aren't already wrapped in tags)
  html = html.replace(/^(?!<[a-z])((?!^$).+)$/gm, "<p class=\"my-2\">$1</p>");

  return html;
}

const sampleMarkdown = `# 마크다운 미리보기

## 제목 2

**굵은 텍스트**와 *기울임 텍스트*

\`인라인 코드\`

\`\`\`js
const hello = "world";
console.log(hello);
\`\`\`

- 목록 항목 1
- 목록 항목 2

> 인용문

[링크](https://example.com)`;

export function MarkdownPreviewTool() {
  const [input, setInput] = useState(sampleMarkdown);

  const html = markdownToHtml(input);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">마크다운 입력</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="마크다운을 입력하세요..."
            className="w-full h-96 p-4 border border-border rounded-lg bg-surface text-text font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">미리보기</label>
          <div
            className="w-full h-96 p-4 border border-border rounded-lg bg-surface text-text text-sm overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
