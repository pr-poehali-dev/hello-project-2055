import { useRef } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS, NEWS_FEED, TRENDS, NOVELTIES, GOLD, CREAM, DARK } from "./data";

interface SiteNavProps {
  scrolled: boolean;
  activeSection: string;
  scrollToSection: (s: string) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  scrollProgress: number;
  currentNewsIndex: number;
  newsExpanded: boolean;
  setNewsExpanded: (v: boolean) => void;
}

export default function SiteNav({
  scrolled,
  activeSection,
  scrollToSection,
  menuOpen,
  setMenuOpen,
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  scrollProgress,
  currentNewsIndex,
  newsExpanded,
  setNewsExpanded,
}: SiteNavProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const searchResults =
    searchQuery.length > 1
      ? [
          ...TRENDS.filter((t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase())
          ),
          ...NOVELTIES.filter(
            (n) =>
              n.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
              n.title.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        ].slice(0, 6)
      : [];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[100] h-[2px] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, var(--gold-dim), var(--gold-light))`,
        }}
      />

      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={cursorRingRef} className="custom-cursor-ring hidden md:block" />

      {/* ─── LIVE TICKER ─── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 py-2 px-6 flex items-center gap-6 overflow-hidden"
        style={{
          background: "rgba(12,10,9,0.92)",
          borderTop: "1px solid rgba(201,168,76,0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          className="shrink-0 text-xs tracking-widest uppercase px-2 py-1"
          style={{ background: GOLD, color: DARK }}
        >
          LIVE
        </span>
        <div className="overflow-hidden flex-1 relative h-5">
          {NEWS_FEED.map((n, i) => (
            <div
              key={n.id}
              className="absolute inset-0 flex items-center gap-3 transition-all duration-700"
              style={{
                opacity: i === currentNewsIndex ? 1 : 0,
                transform:
                  i === currentNewsIndex ? "translateY(0)" : "translateY(10px)",
              }}
            >
              {n.hot && (
                <span style={{ color: GOLD, fontSize: "10px" }}>●</span>
              )}
              <span
                className="text-xs tracking-wide"
                style={{ color: "rgba(242,235,217,0.7)" }}
              >
                {n.time}
              </span>
              <span className="text-xs">{n.text}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setNewsExpanded(!newsExpanded)}
          className="shrink-0 text-xs nav-link"
        >
          {newsExpanded ? "Свернуть" : "Все новости"}
        </button>
      </div>

      {/* News Expanded Panel */}
      {newsExpanded && (
        <div
          className="fixed bottom-10 left-0 right-0 z-39 max-h-64 overflow-y-auto"
          style={{
            background: "rgba(12,10,9,0.98)",
            borderTop: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          {NEWS_FEED.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-4 px-6 py-3"
              style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}
            >
              {n.hot && (
                <span style={{ color: GOLD, marginTop: 2 }}>●</span>
              )}
              <span
                className="text-xs shrink-0"
                style={{ color: "rgba(242,235,217,0.4)" }}
              >
                {n.time}
              </span>
              <span className="text-xs">{n.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* ─── NAVIGATION ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(12,10,9,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <span
            onClick={() => scrollToSection("Главная")}
            className="cursor-pointer"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "22px",
              letterSpacing: "0.3em",
              color: GOLD,
            }}
          >
            MAISON
          </span>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`nav-link ${activeSection === item ? "active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                color: searchOpen ? GOLD : "rgba(242,235,217,0.5)",
              }}
              className="transition-colors duration-200"
            >
              <Icon name={searchOpen ? "X" : "Search"} size={18} />
            </button>
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: GOLD }}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="px-6 pb-4 max-w-[1400px] mx-auto">
            <div className="relative">
              <input
                autoFocus
                type="text"
                placeholder="Поиск трендов, брендов, моделей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent py-3 px-4 text-sm outline-none"
                style={{
                  border: "1px solid rgba(201,168,76,0.3)",
                  color: CREAM,
                  caretColor: GOLD,
                }}
              />
              {searchResults.length > 0 && (
                <div
                  className="absolute top-full left-0 right-0 z-50 mt-1"
                  style={{
                    background: "rgba(12,10,9,0.98)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  {searchResults.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <Icon name="Search" size={12} style={{ color: GOLD }} />
                      <span className="text-sm">
                        {"brand" in r
                          ? `${(r as typeof NOVELTIES[0]).brand} — ${r.title}`
                          : r.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="lg:hidden px-6 pb-6 flex flex-col gap-4"
            style={{
              background: "rgba(12,10,9,0.98)",
              borderTop: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="nav-link text-left pt-3"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
