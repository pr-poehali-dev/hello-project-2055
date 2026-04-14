import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  hero: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/977f4c3c-6efd-48df-aa8b-7158d1d942e8.jpg",
  trend1: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/8bc30cb0-59c0-439e-b435-e42582407453.jpg",
  trend2: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/7dffcc1e-6383-4605-b386-f6ac38531933.jpg",
  person: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/2f14c353-4443-43d8-9be9-a6e7cc3cc4d2.jpg",
};

const NAV_ITEMS = ["Главная", "Тренды", "Новинки", "Иконы Моды", "Контакты"];

const TRENDS = [
  { id: 1, img: IMAGES.trend1, category: "Силуэт", title: "Структурированный минимализм", season: "Весна 2025" },
  { id: 2, img: IMAGES.trend2, category: "Аксессуары", title: "Золото и жемчуг", season: "Весна 2025" },
  { id: 3, img: IMAGES.hero, category: "Вечерняя мода", title: "Драматический шёлк", season: "Лето 2025" },
  { id: 4, img: IMAGES.trend1, category: "Цвет", title: "Слоновая кость и беж", season: "Весна 2025" },
  { id: 5, img: IMAGES.trend2, category: "Материалы", title: "Бархат и атлас", season: "Лето 2025" },
  { id: 6, img: IMAGES.hero, category: "Деталь", title: "Открытая спина", season: "Лето 2025" },
];

const NOVELTIES = [
  { id: 1, img: IMAGES.trend1, brand: "Maison Margiela", title: "Artisanal SS25", price: "от 280 000 ₽", tag: "Новинка" },
  { id: 2, img: IMAGES.trend2, brand: "Valentino", title: "Couture Gold Edition", price: "от 450 000 ₽", tag: "Эксклюзив" },
  { id: 3, img: IMAGES.hero, brand: "Dior", title: "La Nuit Éternelle", price: "от 380 000 ₽", tag: "Лимитед" },
  { id: 4, img: IMAGES.trend2, brand: "Chanel", title: "Le Noir Absolu", price: "от 520 000 ₽", tag: "Новинка" },
];

const FASHION_ICONS = [
  { id: 1, img: IMAGES.person, name: "Кейт Мосс", title: "Легенда британского стиля", quote: "«Мода — это не о платьях. Это о жизни.»" },
  { id: 2, img: IMAGES.hero, name: "Наоми Кэмпбелл", title: "Богиня подиума", quote: "«Красота — это уверенность, которую ты несёшь.»" },
  { id: 3, img: IMAGES.trend1, name: "Карин Ройтфельд", title: "Редактор-легенда Vogue", quote: "«Стиль — это то, что нельзя купить.»" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("Главная");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 4 + "px";
        cursorRef.current.style.top = e.clientY - 4 + "px";
      }
      if (cursorRingRef.current) {
        setTimeout(() => {
          if (cursorRingRef.current) {
            cursorRingRef.current.style.left = e.clientX - 16 + "px";
            cursorRingRef.current.style.top = e.clientY - 16 + "px";
          }
        }, 80);
      }
    };
    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setMenuOpen(false);
    const sectionMap: Record<string, string> = {
      "Главная": "section-hero",
      "Тренды": "section-trends",
      "Новинки": "section-novelties",
      "Иконы Моды": "section-icons",
      "Контакты": "section-contacts",
    };
    const el = document.getElementById(sectionMap[section]);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "#0C0A09", color: "#F2EBD9" }}>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={cursorRingRef} className="custom-cursor-ring hidden md:block" />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(12,10,9,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "22px",
              letterSpacing: "0.3em",
              color: "var(--gold)",
              cursor: "pointer",
            }}
            onClick={() => scrollToSection("Главная")}
          >
            MAISON
          </span>

          <div className="hidden md:flex items-center gap-10">
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

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--gold)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 flex flex-col gap-5"
            style={{ background: "rgba(12,10,9,0.98)", borderTop: "1px solid rgba(201,168,76,0.15)" }}
          >
            {NAV_ITEMS.map((item) => (
              <button key={item} onClick={() => scrollToSection(item)} className="nav-link text-left pt-4">
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section id="section-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${IMAGES.hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "brightness(0.3)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(12,10,9,0.1) 0%, rgba(12,10,9,0.75) 100%)" }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="animate-fade-up delay-100 text-xs tracking-[0.4em] uppercase mb-8" style={{ color: "var(--gold)" }}>
            Премиальный журнал о моде
          </p>
          <h1
            className="animate-fade-up delay-200"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(64px, 12vw, 160px)",
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              color: "#F2EBD9",
            }}
          >
            L'Art<br />
            <em style={{ color: "var(--gold)" }}>de Vivre</em>
          </h1>
          <p
            className="animate-fade-up delay-400 mt-10 text-sm tracking-widest uppercase"
            style={{ color: "rgba(242,235,217,0.45)" }}
          >
            Тренды · Новинки · Иконы Стиля
          </p>

          <div className="animate-fade-up delay-500 flex justify-center items-center mt-12 gap-4">
            <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
            <button
              onClick={() => scrollToSection("Тренды")}
              className="px-8 py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300"
              style={{ border: "1px solid var(--gold)", color: "var(--gold)", background: "transparent" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)";
                (e.currentTarget as HTMLButtonElement).style.color = "#0C0A09";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
              }}
            >
              Открыть журнал
            </button>
            <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "rgba(242,235,217,0.3)" }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── ТРЕНДЫ ─── */}
      <section id="section-trends" className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--gold)" }}>Сезон 2025</p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(42px, 6vw, 80px)",
              fontWeight: 300,
              color: "#F2EBD9",
            }}
          >
            Тренды Сезона
          </h2>
          <div className="gold-line mt-6 max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(201,168,76,0.12)" }}>
          {TRENDS.map((trend) => (
            <div key={trend.id} className="gallery-card group" style={{ background: "#0C0A09" }}>
              <div style={{ aspectRatio: "4/5", overflow: "hidden", position: "relative" }}>
                <img src={trend.img} alt={trend.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="gallery-overlay flex flex-col justify-end p-6">
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>{trend.category}</p>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", fontWeight: 300 }}>{trend.title}</h3>
                  <p className="text-xs tracking-widest mt-1" style={{ color: "rgba(242,235,217,0.5)" }}>{trend.season}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── НОВИНКИ ─── */}
      <section id="section-novelties" className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--gold)" }}>Коллекции</p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(42px, 6vw, 80px)",
                fontWeight: 300,
                color: "#F2EBD9",
              }}
            >
              Новинки
            </h2>
          </div>
          <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(242,235,217,0.3)" }}>
            Весна — Лето 2025
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(201,168,76,0.12)" }}>
          {NOVELTIES.map((item) => (
            <div key={item.id} className="gallery-card group cursor-pointer" style={{ background: "#0C0A09" }}>
              <div style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
                <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase"
                  style={{ background: "var(--gold)", color: "#0C0A09" }}
                >
                  {item.tag}
                </div>
                <div className="gallery-overlay flex flex-col justify-end p-5">
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{item.brand}</p>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "18px", fontWeight: 300 }}>{item.title}</h3>
                  <p className="text-xs mt-2" style={{ color: "rgba(242,235,217,0.5)" }}>{item.price}</p>
                </div>
              </div>
              <div className="p-5" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(201,168,76,0.5)" }}>{item.brand}</p>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "16px" }}>{item.title}</p>
                <p className="text-xs mt-2" style={{ color: "rgba(242,235,217,0.4)" }}>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── ИКОНЫ МОДЫ ─── */}
      <section id="section-icons" className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--gold)" }}>Легенды</p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(42px, 6vw, 80px)",
              fontWeight: 300,
              color: "#F2EBD9",
            }}
          >
            Иконы Моды
          </h2>
          <div className="gold-line mt-6 max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(201,168,76,0.12)" }}>
          {FASHION_ICONS.map((icon) => (
            <div key={icon.id} className="group" style={{ background: "#0C0A09" }}>
              <div className="gallery-card" style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
                <img
                  src={icon.img}
                  alt={icon.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" }}
                />
                <div className="gallery-overlay flex flex-col justify-end p-8">
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px", fontWeight: 300 }}>{icon.name}</h3>
                  <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "var(--gold)" }}>{icon.title}</p>
                </div>
              </div>
              <div className="p-6" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
                <p style={{ fontSize: "24px", color: "var(--gold)", marginBottom: "8px" }}>❝</p>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "16px",
                    fontStyle: "italic",
                    lineHeight: 1.7,
                    color: "rgba(242,235,217,0.65)",
                  }}
                >
                  {icon.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── КОНТАКТЫ ─── */}
      <section id="section-contacts" className="py-28 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--gold)" }}>Связь с редакцией</p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(42px, 6vw, 80px)",
              fontWeight: 300,
              color: "#F2EBD9",
            }}
          >
            Контакты
          </h2>
          <div className="gold-line mt-6 max-w-xs mx-auto mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {[
              { icon: "Mail", label: "Email редакции", value: "editor@maison.ru" },
              { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
              { icon: "MapPin", label: "Адрес", value: "Москва, Кузнецкий Мост, 7" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ border: "1px solid var(--gold)", color: "var(--gold)" }}
                >
                  <Icon name={c.icon} fallback="Mail" size={18} />
                </div>
                <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(242,235,217,0.4)" }}>{c.label}</p>
                <p className="text-sm" style={{ color: "#F2EBD9" }}>{c.value}</p>
              </div>
            ))}
          </div>

          <form className="flex flex-col gap-4 text-left" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(242,235,217,0.4)" }}>Ваше имя</label>
                <input
                  type="text"
                  placeholder="Имя Фамилия"
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: "1px solid rgba(201,168,76,0.25)", color: "#F2EBD9", caretColor: "var(--gold)" }}
                  onFocus={e => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.25)")}
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(242,235,217,0.4)" }}>Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: "1px solid rgba(201,168,76,0.25)", color: "#F2EBD9", caretColor: "var(--gold)" }}
                  onFocus={e => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.25)")}
                />
              </div>
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(242,235,217,0.4)" }}>Сообщение</label>
              <textarea
                rows={4}
                placeholder="Ваше сообщение..."
                className="w-full bg-transparent px-4 py-3 text-sm outline-none resize-none transition-all"
                style={{ border: "1px solid rgba(201,168,76,0.25)", color: "#F2EBD9", caretColor: "var(--gold)" }}
                onFocus={e => (e.target.style.borderColor = "var(--gold)")}
                onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.25)")}
              />
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="px-12 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-300"
                style={{ border: "1px solid var(--gold)", color: "var(--gold)", background: "transparent" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#0C0A09";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
                }}
              >
                Отправить сообщение
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 px-6 md:px-12" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "24px", letterSpacing: "0.3em", color: "var(--gold)" }}>
            MAISON
          </span>
          <p className="text-xs tracking-widest" style={{ color: "rgba(242,235,217,0.25)" }}>
            © 2025 MAISON. Все права защищены.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Telegram", "Pinterest"].map((s) => (
              <button key={s} className="nav-link text-xs">{s}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;