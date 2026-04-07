/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";

const PRIMARY = "#1F64FC";

const NAV_ITEMS = [
  { label: "시민 참여", href: "#" },
  { label: "데이터", href: "#" },
  { label: "탄소중립 스마트도시", href: "#" },
  { label: "도시지표", href: "#" },
  { label: "스마트 시티맵", href: "#" },
  { label: "이용안내", href: "#" },
];

export default function Header() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header
      className="fixed top-0 left-0 w-full z-[100] bg-white"
      style={{ borderBottom: "1px solid #e6e6e6" }}
    >
      <div className="relative h-[80px] w-full flex items-center">

        {/* Logo */}
        <a
          href="#"
          className="absolute left-[180px] flex items-center gap-[4px]"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <img src="/TypeC_logo.svg" alt="EcoView Logo" width={38} height={38} className="flex-shrink-0" />
          <div className="flex flex-col w-[144px]">
            <span style={{ fontFamily: "Pretendard, sans-serif", fontWeight: 600, fontSize: "18px", lineHeight: 1.3, color: "#222" }}>
              광명시 통합플랫폼
            </span>
            <span style={{ fontFamily: "Pretendard, sans-serif", fontWeight: 700, fontSize: "18px", lineHeight: 1.2, color: PRIMARY, letterSpacing: "-0.72px" }}>
              ECOVIEW
            </span>
          </div>
        </a>

        {/* GNB Center */}
        <nav
          className="absolute flex items-center"
          style={{ left: "50%", top: "50%", transform: "translate(calc(-50% + 3px), -50%)", gap: "96px", whiteSpace: "nowrap" }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "1.5",
                color: hoveredItem === item.label ? PRIMARY : "#0f0f10",
                transition: "color 0.2s ease",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Alarm + User */}
        <div
          className="absolute flex items-center gap-[16px]"
          style={{ right: "180px", top: "50%", transform: "translateY(-50%)" }}
        >
          {/* Bell line icon */}
          <button
            className="w-[24px] h-[24px] flex items-center justify-center"
            style={{ color: "#555", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = PRIMARY)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          {/* User line icon + name */}
          <button
            className="flex items-center gap-[6px]"
            style={{ color: "#555", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = PRIMARY)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span style={{ fontFamily: "Pretendard, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "1.5", color: "inherit", whiteSpace: "nowrap" }}>
              홍길동
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
