"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/registry";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-surface sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary-600">
          모두의도구
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.path}
              className="text-text-muted hover:text-text transition-colors text-sm font-medium"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden p-2 text-text-muted"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-surface px-4 py-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.path}
              className="block py-2 text-text-muted hover:text-text text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
