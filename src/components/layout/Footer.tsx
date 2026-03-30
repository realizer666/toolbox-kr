import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} 모두의도구. All rights reserved.
          </div>
          <nav className="flex gap-6 text-sm text-text-muted">
            <Link href="/about" className="hover:text-text transition-colors">
              소개
            </Link>
            <Link href="/about#privacy" className="hover:text-text transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/about#terms" className="hover:text-text transition-colors">
              이용약관
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
