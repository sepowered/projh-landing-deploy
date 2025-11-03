"use client";
import { useEffect, useRef, useState } from "react";
import "./header.css";
import "./home.css";

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  /* 헤더 스크롤 업/다운 감춤 */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 100) {
        setIsHidden(y > lastScrollY.current);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 바깥 클릭 + ESC 닫기 */
  useEffect(() => {
    if (!isTeamOpen) return;
    const onDoc = (e) => {
      const dd = dropdownRef.current;
      const btn = buttonRef.current;
      if (!dd || !btn) return;
      if (!dd.contains(e.target) && !btn.contains(e.target)) {
        setIsTeamOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setIsTeamOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [isTeamOpen]);

  const teamMembers = [
    { name: "박다빈", url: "https://planner-dabinpark.notion.site" },
    { name: "노권후", url: "https://stile.im" },
    { name: "심정빈", url: "https://www.instagram.com/oneul_is_day/" },
    { name: "오정은", url: "https://www.behance.net/caf4d781/" },
    { name: "배준일", url: "https://ji009868.github.io/react-portfolio/" },
    { name: "김지현", url: "https://dmdhyunk.github.io/react-portfolio/" },
  ];

  return (
    <header className={`page-header ${isHidden ? "is-hidden" : ""}`}>
      {/* 로고 */}
      <div className="logo-wrapper">
        <a href="#main" aria-label="Go to Main">
          <img src="/logo.png" alt="Project H Logo" />
        </a>
      </div>

      {/* GNB */}
      <nav className="gnb-wrapper glass-box" aria-label="Primary">
        <a href="#main" className="nav-link">Main</a>
        <a href="#background" className="nav-link">Background</a>
        <a href="#value" className="nav-link">Value</a>
        <a href="#service" className="nav-link">Service</a>
        <a href="#video" className="nav-link">Video</a>
        <a href="#display" className="nav-link">Display</a>
      </nav>

      {/* 햄버거 + 드롭다운 */}
      <div className="hamburger-wrapper glass-box">
        <button
          ref={buttonRef}
          className="hamburger-btn"
          aria-label="Team Menu"
          aria-haspopup="true"
          aria-expanded={isTeamOpen}
          aria-controls="team-dropdown"
          onClick={() => setIsTeamOpen((v) => !v)}
        >
          <span className={`bar ${isTeamOpen ? "open" : ""}`} />
          <span className={`bar ${isTeamOpen ? "open" : ""}`} />
          <span className={`bar ${isTeamOpen ? "open" : ""}`} />
        </button>

        <div
          id="team-dropdown"
          ref={dropdownRef}
          className={`team-dropdown ${isTeamOpen ? "open" : ""}`}
          role="menu"
        >
          <ul className="team-list">
            {teamMembers.map((m) => (
              <li key={m.name}>
                <button
                  type="button"
                  className="member-item"
                  role="menuitem"
                  onClick={() =>
                    window.open(m.url, "_blank", "noopener,noreferrer")
                  }
                >
                  {m.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
