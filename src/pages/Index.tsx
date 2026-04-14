import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

/* ─── IMAGES ─── */
const IMG = {
  hero: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/977f4c3c-6efd-48df-aa8b-7158d1d942e8.jpg",
  trend1: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/8bc30cb0-59c0-439e-b435-e42582407453.jpg",
  trend2: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/7dffcc1e-6383-4605-b386-f6ac38531933.jpg",
  person: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/2f14c353-4443-43d8-9be9-a6e7cc3cc4d2.jpg",
  model: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/15c0b78a-68ea-44d3-8185-ceb8c1796d29.jpg",
  boutique: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/ce906048-6ae1-41bf-b6d2-4b1c4b82d03d.jpg",
  street: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/69bbfe0a-c624-4ac4-a99b-63cedb0d2ce8.jpg",
};

/* ─── DATA ─── */
const NAV_ITEMS = ["Главная", "Тренды", "Новинки", "Топ Моделей", "Иконы Моды", "Журнал", "Подиум", "Контакты"];

const TRENDS = [
  { id: 1, img: IMG.trend1, category: "Силуэт", title: "Структурированный минимализм", season: "Весна 2025", hot: true },
  { id: 2, img: IMG.trend2, category: "Аксессуары", title: "Золото и жемчуг", season: "Весна 2025", hot: true },
  { id: 3, img: IMG.hero, category: "Вечерняя мода", title: "Драматический шёлк", season: "Лето 2025", hot: false },
  { id: 4, img: IMG.street, category: "Стрит-стайл", title: "Парижский шик", season: "Весна 2025", hot: true },
  { id: 5, img: IMG.trend2, category: "Материалы", title: "Бархат и атлас", season: "Лето 2025", hot: false },
  { id: 6, img: IMG.model, category: "Подиум", title: "Авангард сезона", season: "Лето 2025", hot: false },
];

const NOVELTIES = [
  { id: 1, img: IMG.trend1, brand: "Maison Margiela", title: "Artisanal SS25", price: "от 280 000 ₽", tag: "Новинка", desc: "Деконструированный пиджак из переработанного кашемира, ручная работа, Париж" },
  { id: 2, img: IMG.trend2, brand: "Valentino", title: "Couture Gold Edition", price: "от 450 000 ₽", tag: "Эксклюзив", desc: "Вечернее платье с золотой вышивкой, лимитированная коллекция 12 штук" },
  { id: 3, img: IMG.hero, brand: "Dior", title: "La Nuit Éternelle", price: "от 380 000 ₽", tag: "Лимитед", desc: "Шёлковое платье с ручной вышивкой французских мастеров, тираж 30 экз." },
  { id: 4, img: IMG.boutique, brand: "Chanel", title: "Le Noir Absolu", price: "от 520 000 ₽", tag: "Новинка", desc: "Маленькое чёрное платье переосмыслено Вирджини Виар для нового века" },
  { id: 5, img: IMG.street, brand: "Bottega Veneta", title: "Intreccio Oro", price: "от 190 000 ₽", tag: "Новинка", desc: "Культовое плетение интречато в золотом исполнении, телячья кожа" },
  { id: 6, img: IMG.model, brand: "Balenciaga", title: "Void Collection", price: "от 95 000 ₽", tag: "Эксклюзив", desc: "Деструктивный авангард — новый сезон от Демны" },
];

const TOP_MODELS = [
  { id: 1, img: IMG.model, name: "Белла Хадид", country: "🇺🇸 США", rating: 98, followers: "52.1M", campaigns: 47, agency: "IMG Models", trend: "+2" },
  { id: 2, img: IMG.person, name: "Кендалл Дженнер", country: "🇺🇸 США", rating: 96, followers: "291M", campaigns: 38, agency: "Society Management", trend: "0" },
  { id: 3, img: IMG.street, name: "Адут Акеч", country: "🇦🇺 Австралия", rating: 95, followers: "2.1M", campaigns: 29, agency: "DNA Models", trend: "+5" },
  { id: 4, img: IMG.hero, name: "Палома Эльсессер", country: "🇺🇸 США", rating: 93, followers: "1.8M", campaigns: 24, agency: "Ford Models", trend: "+8" },
  { id: 5, img: IMG.trend1, name: "Ся Суй", country: "🇨🇳 Китай", rating: 91, followers: "3.2M", campaigns: 31, agency: "Elite Model", trend: "+3" },
  { id: 6, img: IMG.boutique, name: "Валентина Сампайо", country: "🇧🇷 Бразилия", rating: 90, followers: "4.5M", campaigns: 22, agency: "Storm Models", trend: "+1" },
  { id: 7, img: IMG.trend2, name: "Хайтон Дикон", country: "🇬🇧 Великобритания", rating: 88, followers: "890K", campaigns: 19, agency: "Next Models", trend: "+12" },
  { id: 8, img: IMG.model, name: "Иман Хаммам", country: "🇳🇱 Нидерланды", rating: 87, followers: "1.1M", campaigns: 17, agency: "Women Management", trend: "+4" },
];

const FASHION_ICONS = [
  { id: 1, img: IMG.person, name: "Кейт Мосс", title: "Легенда британского стиля", era: "1990 — наши дни", quote: "«Мода — это не о платьях. Это о жизни.»", insta: "61.4M", awards: 28 },
  { id: 2, img: IMG.hero, name: "Наоми Кэмпбелл", title: "Богиня подиума", era: "1986 — наши дни", quote: "«Красота — это уверенность, которую ты несёшь.»", insta: "12.2M", awards: 45 },
  { id: 3, img: IMG.street, name: "Карла Бруни", title: "Муза Valentino и Givenchy", era: "1987 — 2000", quote: "«Элегантность — это отказ.»", insta: "2.3M", awards: 19 },
  { id: 4, img: IMG.boutique, name: "Карин Ройтфельд", title: "Редактор-легенда Vogue Paris", era: "1978 — наши дни", quote: "«Стиль — это то, что нельзя купить.»", insta: "1.8M", awards: 34 },
  { id: 5, img: IMG.model, name: "Надя Ауэрманн", title: "Суперандрогин 90-х", era: "1990 — 2000", quote: "«Подиум — это моя сцена, моё всё.»", insta: "340K", awards: 16 },
  { id: 6, img: IMG.trend1, name: "Линда Евангелиста", title: "Икона трансформаций", era: "1984 — 2002", quote: "«Я не встаю с постели меньше чем за 10 000$.»", insta: "2.1M", awards: 52 },
];

const NEWS_FEED = [
  { id: 1, time: "2 мин назад", text: "Chanel анонсировала коллаборацию с Фаррелом Уильямсом", hot: true },
  { id: 2, time: "15 мин назад", text: "Белла Хадид возвращается на подиум после паузы", hot: true },
  { id: 3, time: "1 час назад", text: "Valentino представил новый аромат La Nuit Rose Couture", hot: false },
  { id: 4, time: "2 часа назад", text: "Paris Fashion Week 2025 — расписание показов опубликовано", hot: false },
  { id: 5, time: "3 часа назад", text: "LVMH зафиксировала рекордную выручку в I квартале 2025", hot: false },
  { id: 6, time: "5 часов назад", text: "Новый креативный директор Gucci представлен официально", hot: true },
  { id: 7, time: "6 часов назад", text: "Dior открывает флагман в Дубае на 3 этажа", hot: false },
  { id: 8, time: "8 часов назад", text: "Sustainable Fashion Week прошла в Стокгольме", hot: false },
];

const QUIZ_QUESTIONS = [
  {
    question: "Какой силуэт вам ближе?",
    options: ["Строгий и структурированный", "Свободный и романтичный", "Минималистичный", "Авангардный и смелый"],
    styles: ["classic", "romantic", "minimal", "avantgarde"],
  },
  {
    question: "Какой материал вы предпочитаете?",
    options: ["Твид и шерсть", "Шёлк и кружево", "Хлопок и лён", "Латекс и металл"],
    styles: ["classic", "romantic", "minimal", "avantgarde"],
  },
  {
    question: "Ваш любимый цвет в гардеробе?",
    options: ["Чёрный и белый", "Пастельные тона", "Нейтральные беж/серый", "Яркие акценты"],
    styles: ["classic", "romantic", "minimal", "avantgarde"],
  },
  {
    question: "Ваш fashion-idol?",
    options: ["Коко Шанель", "Одри Хепберн", "Миния Агихара", "Рей Кавакубо"],
    styles: ["classic", "romantic", "minimal", "avantgarde"],
  },
];

const STYLE_RESULTS: Record<string, { title: string; desc: string; brands: string[] }> = {
  classic: { title: "Классический Шик", desc: "Вы — воплощение вечной элегантности. Ваш стиль вне времени и трендов.", brands: ["Chanel", "Saint Laurent", "Max Mara"] },
  romantic: { title: "Романтичная Муза", desc: "Вы верите в красоту деталей — кружева, цветы и нежные оттенки.", brands: ["Valentino", "Dior", "Zimmermann"] },
  minimal: { title: "Современный Минимализм", desc: "Вы цените качество и простоту. Меньше — значит больше.", brands: ["The Row", "Bottega Veneta", "Jil Sander"] },
  avantgarde: { title: "Авангардный Визионер", desc: "Вы нарушаете правила и создаёте новые. Мода — ваш язык.", brands: ["Comme des Garçons", "Balenciaga", "Maison Margiela"] },
};

const RUNWAY_SHOWS = [
  { id: 1, brand: "Chanel", season: "Haute Couture AW25", date: "22 янв 2025", city: "Париж", img: IMG.boutique, views: "4.2M", status: "live" },
  { id: 2, brand: "Dior", season: "Prêt-à-Porter SS25", date: "28 фев 2025", city: "Париж", img: IMG.hero, views: "3.8M", status: "soon" },
  { id: 3, brand: "Valentino", season: "Couture SS25", date: "5 мар 2025", city: "Рим", img: IMG.trend2, views: "2.1M", status: "archive" },
  { id: 4, brand: "Balenciaga", season: "SS25 Show", date: "12 мар 2025", city: "Париж", img: IMG.model, views: "5.6M", status: "archive" },
  { id: 5, brand: "Gucci", season: "Cruise 2025", date: "20 апр 2025", city: "Рим", img: IMG.street, views: "1.9M", status: "soon" },
  { id: 6, brand: "Hermès", season: "SS25", date: "30 апр 2025", city: "Париж", img: IMG.trend1, views: "890K", status: "soon" },
];

const MAGAZINE_ARTICLES = [
  { id: 1, img: IMG.street, cat: "Стрит-стайл", title: "Парижская неделя моды: лучшие образы с улиц", author: "Мария Дюваль", date: "10 апр 2025", read: "6 мин" },
  { id: 2, img: IMG.boutique, cat: "Интервью", title: "Вирджини Виар: «Я создаю для женщин, а не для прессы»", author: "Анна Лебо", date: "8 апр 2025", read: "12 мин" },
  { id: 3, img: IMG.model, cat: "Тренды", title: "10 цветов, которые определят лето 2025", author: "Клод Мартен", date: "5 апр 2025", read: "4 мин" },
  { id: 4, img: IMG.hero, cat: "История моды", title: "Как Cristóbal Balenciaga изменил силуэт навсегда", author: "Пьер Фабре", date: "2 апр 2025", read: "15 мин" },
  { id: 5, img: IMG.trend1, cat: "Sustainability", title: "Зелёная мода: бренды, которые меняют индустрию", author: "Эмма Уотс", date: "30 мар 2025", read: "8 мин" },
  { id: 6, img: IMG.trend2, cat: "Красота", title: "Макияж с подиума: как повторить образы сезона дома", author: "Ноэми Дюбуа", date: "28 мар 2025", read: "5 мин" },
];

/* ─── COMPONENT ─── */
const Index = () => {
  const [activeSection, setActiveSection] = useState("Главная");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [trendFilter, setTrendFilter] = useState("Все");
  const [noveltyView, setNoveltyView] = useState<"grid" | "list">("grid");
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [savedItems, setSavedItems] = useState<Record<number, boolean>>({});
  const [modelFilter, setModelFilter] = useState("Рейтинг");
  const [expandedModel, setExpandedModel] = useState<number | null>(null);
  const [expandedIcon, setExpandedIcon] = useState<number | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<{ type: string; data: unknown } | null>(null);
  const [runwayFilter, setRunwayFilter] = useState("Все");
  const [newsExpanded, setNewsExpanded] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [counter, setCounter] = useState({ models: 0, brands: 0, shows: 0 });
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [darkMode] = useState(true);
  const [iconTab, setIconTab] = useState<"all" | "90s" | "modern">("all");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [activeArticle, setActiveArticle] = useState<typeof MAGAZINE_ARTICLES[0] | null>(null);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  /* scroll & cursor */
  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY;
      setScrolled(s > 60);
      setParallaxY(s * 0.4);
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (s / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 4 + "px";
        cursorRef.current.style.top = e.clientY - 4 + "px";
      }
      setTimeout(() => {
        if (cursorRingRef.current) {
          cursorRingRef.current.style.left = e.clientX - 16 + "px";
          cursorRingRef.current.style.top = e.clientY - 16 + "px";
        }
      }, 80);
    };
    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  /* animated counters */
  useEffect(() => {
    const targets = { models: 2840, brands: 347, shows: 1260 };
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounter({
        models: Math.round(targets.models * ease),
        brands: Math.round(targets.brands * ease),
        shows: Math.round(targets.shows * ease),
      });
      if (progress < 1) requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => requestAnimationFrame(tick), 800);
    return () => clearTimeout(timer);
  }, []);

  /* live news ticker */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((i) => (i + 1) % NEWS_FEED.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setMenuOpen(false);
    const map: Record<string, string> = {
      "Главная": "section-hero",
      "Тренды": "section-trends",
      "Новинки": "section-novelties",
      "Топ Моделей": "section-models",
      "Иконы Моды": "section-icons",
      "Журнал": "section-magazine",
      "Подиум": "section-runway",
      "Контакты": "section-contacts",
    };
    const el = document.getElementById(map[section]);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLike = (id: number) => setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSave = (id: number) => setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleQuizAnswer = useCallback((style: string) => {
    const newAnswers = [...quizAnswers, style];
    setQuizAnswers(newAnswers);
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const freq: Record<string, number> = {};
      newAnswers.forEach((a) => { freq[a] = (freq[a] || 0) + 1; });
      const result = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
      setQuizResult(result);
    }
  }, [quizAnswers, quizStep]);

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
    setQuizActive(false);
  };

  const filteredTrends = trendFilter === "Все" ? TRENDS : trendFilter === "Горячие" ? TRENDS.filter(t => t.hot) : TRENDS.filter(t => t.season.includes(trendFilter));
  const filteredRunway = runwayFilter === "Все" ? RUNWAY_SHOWS : RUNWAY_SHOWS.filter(s => s.status === runwayFilter.toLowerCase() || (runwayFilter === "Онлайн" && s.status === "live") || (runwayFilter === "Скоро" && s.status === "soon"));

  const searchResults = searchQuery.length > 1
    ? [...TRENDS.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())),
       ...NOVELTIES.filter(n => n.brand.toLowerCase().includes(searchQuery.toLowerCase()) || n.title.toLowerCase().includes(searchQuery.toLowerCase())),
      ].slice(0, 6)
    : [];

  const GOLD = "var(--gold)";
  const CREAM = "#F2EBD9";
  const DARK = "#0C0A09";

  /* ─── RENDER ─── */
  return (
    <div className="min-h-screen" style={{ background: DARK, color: CREAM }}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 z-[100] h-[2px] transition-all duration-100" style={{ width: `${scrollProgress}%`, background: `linear-gradient(90deg, var(--gold-dim), var(--gold-light))` }} />

      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={cursorRingRef} className="custom-cursor-ring hidden md:block" />

      {/* ─── LIVE TICKER ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 py-2 px-6 flex items-center gap-6 overflow-hidden" style={{ background: "rgba(12,10,9,0.92)", borderTop: "1px solid rgba(201,168,76,0.2)", backdropFilter: "blur(8px)" }}>
        <span className="shrink-0 text-xs tracking-widest uppercase px-2 py-1" style={{ background: GOLD, color: DARK }}>LIVE</span>
        <div className="overflow-hidden flex-1 relative h-5">
          {NEWS_FEED.map((n, i) => (
            <div
              key={n.id}
              className="absolute inset-0 flex items-center gap-3 transition-all duration-700"
              style={{ opacity: i === currentNewsIndex ? 1 : 0, transform: i === currentNewsIndex ? "translateY(0)" : "translateY(10px)" }}
            >
              {n.hot && <span style={{ color: GOLD, fontSize: "10px" }}>●</span>}
              <span className="text-xs tracking-wide" style={{ color: "rgba(242,235,217,0.7)" }}>{n.time}</span>
              <span className="text-xs">{n.text}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setNewsExpanded(!newsExpanded)} className="shrink-0 text-xs nav-link">
          {newsExpanded ? "Свернуть" : "Все новости"}
        </button>
      </div>

      {/* News Expanded Panel */}
      {newsExpanded && (
        <div className="fixed bottom-10 left-0 right-0 z-39 max-h-64 overflow-y-auto" style={{ background: "rgba(12,10,9,0.98)", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
          {NEWS_FEED.map((n) => (
            <div key={n.id} className="flex items-start gap-4 px-6 py-3" style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
              {n.hot && <span style={{ color: GOLD, marginTop: 2 }}>●</span>}
              <span className="text-xs shrink-0" style={{ color: "rgba(242,235,217,0.4)" }}>{n.time}</span>
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
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", letterSpacing: "0.3em", color: GOLD }}
          >
            MAISON
          </span>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button key={item} onClick={() => scrollToSection(item)} className={`nav-link ${activeSection === item ? "active" : ""}`}>
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(!searchOpen)} style={{ color: searchOpen ? GOLD : "rgba(242,235,217,0.5)" }} className="transition-colors duration-200">
              <Icon name={searchOpen ? "X" : "Search"} size={18} />
            </button>
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: GOLD }}>
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
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent py-3 px-4 text-sm outline-none"
                style={{ border: "1px solid rgba(201,168,76,0.3)", color: CREAM, caretColor: GOLD }}
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1" style={{ background: "rgba(12,10,9,0.98)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  {searchResults.map((r, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors">
                      <Icon name="Search" size={12} style={{ color: GOLD }} />
                      <span className="text-sm">{"brand" in r ? `${(r as typeof NOVELTIES[0]).brand} — ${r.title}` : r.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(12,10,9,0.98)", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
            {NAV_ITEMS.map((item) => (
              <button key={item} onClick={() => scrollToSection(item)} className="nav-link text-left pt-3">{item}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} id="section-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${IMG.hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "brightness(0.28)",
            transform: `translateY(${parallaxY}px)`,
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(12,10,9,0.1) 0%, rgba(12,10,9,0.8) 100%)" }} />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <p className="animate-fade-up delay-100 text-xs tracking-[0.5em] uppercase mb-6" style={{ color: GOLD }}>
            Премиальный журнал о моде — Весна-Лето 2025
          </p>
          <h1
            className="animate-fade-up delay-200"
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(60px, 12vw, 160px)", fontWeight: 300, lineHeight: 0.88, color: CREAM }}
          >
            L'Art<br /><em style={{ color: GOLD }}>de Vivre</em>
          </h1>

          {/* Counters */}
          <div className="animate-fade-up delay-300 flex justify-center gap-16 mt-14">
            {[
              { label: "Моделей", value: counter.models.toLocaleString() },
              { label: "Брендов", value: counter.brands.toLocaleString() },
              { label: "Показов", value: counter.shows.toLocaleString() },
            ].map((c) => (
              <div key={c.label} className="text-center">
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 4vw, 48px)", color: GOLD, fontWeight: 300 }}>{c.value}</div>
                <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "rgba(242,235,217,0.4)" }}>{c.label}</div>
              </div>
            ))}
          </div>

          <div className="animate-fade-up delay-500 flex flex-wrap justify-center gap-4 mt-12">
            <button
              onClick={() => scrollToSection("Тренды")}
              className="px-8 py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300"
              style={{ border: "1px solid var(--gold)", color: GOLD, background: "transparent" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = DARK; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
            >
              Открыть журнал
            </button>
            <button
              onClick={() => { setQuizActive(true); scrollToSection("Журнал"); }}
              className="px-8 py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300"
              style={{ border: "1px solid rgba(242,235,217,0.3)", color: "rgba(242,235,217,0.7)", background: "transparent" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(242,235,217,0.6)"; (e.currentTarget as HTMLButtonElement).style.color = CREAM; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(242,235,217,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(242,235,217,0.7)"; }}
            >
              Узнать свой стиль
            </button>
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "rgba(242,235,217,0.3)" }}>
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── ТРЕНДЫ ─── */}
      <section id="section-trends" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Сезон 2025</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, color: CREAM }}>Тренды Сезона</h2>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {["Все", "Горячие", "Весна", "Лето"].map((f) => (
              <button
                key={f}
                onClick={() => setTrendFilter(f)}
                className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  border: "1px solid",
                  borderColor: trendFilter === f ? GOLD : "rgba(201,168,76,0.2)",
                  color: trendFilter === f ? DARK : "rgba(242,235,217,0.5)",
                  background: trendFilter === f ? GOLD : "transparent",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(201,168,76,0.1)" }}>
          {filteredTrends.map((trend) => (
            <div key={trend.id} className="gallery-card group relative" style={{ background: DARK }}>
              {trend.hot && (
                <div className="absolute top-4 right-4 z-10 px-2 py-1 text-xs tracking-widest uppercase" style={{ background: GOLD, color: DARK }}>
                  🔥 Горячее
                </div>
              )}
              <div style={{ aspectRatio: "4/5", overflow: "hidden", position: "relative" }}>
                <img src={trend.img} alt={trend.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="gallery-overlay flex flex-col justify-end p-6">
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: GOLD }}>{trend.category}</p>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", fontWeight: 300 }}>{trend.title}</h3>
                  <p className="text-xs tracking-widest mt-1" style={{ color: "rgba(242,235,217,0.5)" }}>{trend.season}</p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => toggleLike(trend.id)}
                      className="flex items-center gap-1 text-xs transition-all duration-200"
                      style={{ color: likes[trend.id] ? GOLD : "rgba(242,235,217,0.6)" }}
                    >
                      <Icon name={likes[trend.id] ? "Heart" : "Heart"} size={14} />
                      {likes[trend.id] ? "Нравится" : "Лайк"}
                    </button>
                    <button
                      onClick={() => toggleSave(trend.id)}
                      className="flex items-center gap-1 text-xs transition-all duration-200"
                      style={{ color: savedItems[trend.id] ? GOLD : "rgba(242,235,217,0.6)" }}
                    >
                      <Icon name="Bookmark" size={14} />
                      {savedItems[trend.id] ? "Сохранено" : "Сохранить"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── НОВИНКИ ─── */}
      <section id="section-novelties" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Коллекции</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, color: CREAM }}>Новинки</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(242,235,217,0.4)" }}>Вид:</span>
            <button onClick={() => setNoveltyView("grid")} style={{ color: noveltyView === "grid" ? GOLD : "rgba(242,235,217,0.4)" }}>
              <Icon name="Grid3X3" size={16} />
            </button>
            <button onClick={() => setNoveltyView("list")} style={{ color: noveltyView === "list" ? GOLD : "rgba(242,235,217,0.4)" }}>
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>

        {noveltyView === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(201,168,76,0.1)" }}>
            {NOVELTIES.map((item) => (
              <div key={item.id} className="gallery-card group cursor-pointer" style={{ background: DARK }} onClick={() => setActiveModal({ type: "novelty", data: item })}>
                <div style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
                  <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase" style={{ background: GOLD, color: DARK }}>{item.tag}</div>
                  <div className="gallery-overlay flex flex-col justify-end p-5">
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: GOLD }}>{item.brand}</p>
                    <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px", fontWeight: 300 }}>{item.title}</h3>
                    <p className="text-xs mt-2" style={{ color: "rgba(242,235,217,0.6)" }}>{item.price}</p>
                    <div className="flex gap-3 mt-3">
                      <button className="flex items-center gap-1 text-xs" style={{ color: "rgba(242,235,217,0.7)" }} onClick={e => { e.stopPropagation(); toggleLike(item.id + 100); }}>
                        <Icon name="Heart" size={12} style={{ color: likes[item.id + 100] ? GOLD : undefined }} />
                        {likes[item.id + 100] ? "❤" : "Лайк"}
                      </button>
                      <button className="flex items-center gap-1 text-xs" style={{ color: "rgba(242,235,217,0.7)" }}>
                        <Icon name="Share2" size={12} />
                        Поделиться
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4" style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(201,168,76,0.5)" }}>{item.brand}</p>
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "16px" }}>{item.title}</p>
                  <p className="text-xs mt-1 line-clamp-2" style={{ color: "rgba(242,235,217,0.4)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-px" style={{ background: "rgba(201,168,76,0.1)" }}>
            {NOVELTIES.map((item) => (
              <div key={item.id} className="flex gap-6 p-6 group cursor-pointer transition-all duration-200" style={{ background: DARK }} onClick={() => setActiveModal({ type: "novelty", data: item })}
                onMouseEnter={e => (e.currentTarget.style.background = "#141210")}
                onMouseLeave={e => (e.currentTarget.style.background = DARK)}
              >
                <div className="shrink-0 w-20 h-20 overflow-hidden">
                  <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2 py-0.5 text-xs tracking-widest uppercase" style={{ background: GOLD, color: DARK }}>{item.tag}</span>
                    <span className="text-xs tracking-widest uppercase" style={{ color: GOLD }}>{item.brand}</span>
                  </div>
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px" }}>{item.title}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(242,235,217,0.4)" }}>{item.desc}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif", fontSize: "16px" }}>{item.price}</p>
                  <button className="mt-2 text-xs nav-link">Подробнее →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="gold-line" />

      {/* ─── ТОП МОДЕЛЕЙ ─── */}
      <section id="section-models" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Рейтинг в реальном времени</p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, color: CREAM }}>Топ Моделей</h2>
          <div className="gold-line mt-5 max-w-xs mx-auto" />
        </div>

        {/* Sort buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["Рейтинг", "Популярность", "Кампании"].map((f) => (
            <button
              key={f}
              onClick={() => setModelFilter(f)}
              className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                border: "1px solid",
                borderColor: modelFilter === f ? GOLD : "rgba(201,168,76,0.2)",
                color: modelFilter === f ? DARK : "rgba(242,235,217,0.5)",
                background: modelFilter === f ? GOLD : "transparent",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-px" style={{ background: "rgba(201,168,76,0.1)" }}>
          {TOP_MODELS.map((model, idx) => (
            <div key={model.id}>
              <div
                className="flex items-center gap-4 md:gap-6 p-5 cursor-pointer transition-all duration-300 group"
                style={{ background: expandedModel === model.id ? "#111009" : DARK }}
                onClick={() => setExpandedModel(expandedModel === model.id ? null : model.id)}
                onMouseEnter={e => { if (expandedModel !== model.id) (e.currentTarget as HTMLDivElement).style.background = "#0e0c0b"; }}
                onMouseLeave={e => { if (expandedModel !== model.id) (e.currentTarget as HTMLDivElement).style.background = DARK; }}
              >
                {/* Rank */}
                <div className="w-8 text-center shrink-0" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "24px", color: idx < 3 ? GOLD : "rgba(242,235,217,0.3)" }}>
                  {idx + 1}
                </div>

                {/* Photo */}
                <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 overflow-hidden" style={{ border: `1px solid ${idx < 3 ? GOLD : "rgba(201,168,76,0.2)"}` }}>
                  <img src={model.img} alt={model.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "18px" }}>{model.name}</p>
                    <span className="text-sm">{model.country}</span>
                    <span className="text-xs px-2 py-0.5" style={{ background: "rgba(201,168,76,0.1)", color: GOLD, border: "1px solid rgba(201,168,76,0.2)" }}>{model.agency}</span>
                  </div>
                  <p className="text-xs mt-1 hidden md:block" style={{ color: "rgba(242,235,217,0.4)" }}>Кампаний: {model.campaigns} • Подписчики: {model.followers}</p>
                </div>

                {/* Rating bar */}
                <div className="hidden md:block w-32">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "rgba(242,235,217,0.4)" }}>Рейтинг</span>
                    <span style={{ color: GOLD }}>{model.rating}</span>
                  </div>
                  <div className="h-1" style={{ background: "rgba(201,168,76,0.15)" }}>
                    <div className="h-full transition-all duration-1000" style={{ width: `${model.rating}%`, background: `linear-gradient(90deg, var(--gold-dim), var(--gold-light))` }} />
                  </div>
                </div>

                {/* Trend */}
                <div className="shrink-0 text-xs font-medium" style={{ color: model.trend.startsWith("+") ? "#4ade80" : model.trend === "0" ? "rgba(242,235,217,0.4)" : "#f87171" }}>
                  {model.trend !== "0" && model.trend}
                  {model.trend === "0" && "—"}
                </div>

                <Icon name={expandedModel === model.id ? "ChevronUp" : "ChevronDown"} size={14} style={{ color: "rgba(242,235,217,0.3)" }} />
              </div>

              {/* Expanded row */}
              {expandedModel === model.id && (
                <div className="px-6 pb-6 pt-2" style={{ background: "#111009", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-2">
                    {[
                      { label: "Рейтинг", value: `${model.rating}/100` },
                      { label: "Подписчики", value: model.followers },
                      { label: "Кампаний", value: model.campaigns },
                      { label: "Агентство", value: model.agency },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(242,235,217,0.4)" }}>{stat.label}</p>
                        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px", color: GOLD }}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                      style={{ border: "1px solid rgba(201,168,76,0.3)", color: GOLD, background: "transparent" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = DARK; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}>
                      Профиль модели
                    </button>
                    <button
                      onClick={() => toggleLike(model.id + 200)}
                      className="flex items-center gap-2 px-5 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                      style={{ border: "1px solid rgba(242,235,217,0.1)", color: likes[model.id + 200] ? GOLD : "rgba(242,235,217,0.4)", background: "transparent" }}>
                      <Icon name="Heart" size={12} />
                      {likes[model.id + 200] ? "Понравилось" : "Нравится"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── ИКОНЫ МОДЫ ─── */}
      <section id="section-icons" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Легенды</p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, color: CREAM }}>Иконы Моды</h2>
          <div className="gold-line mt-5 max-w-xs mx-auto mb-8" />
          {/* Tabs */}
          <div className="flex justify-center gap-4">
            {(["all", "90s", "modern"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setIconTab(tab)}
                className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  border: "1px solid",
                  borderColor: iconTab === tab ? GOLD : "rgba(201,168,76,0.2)",
                  color: iconTab === tab ? DARK : "rgba(242,235,217,0.5)",
                  background: iconTab === tab ? GOLD : "transparent",
                }}
              >
                {tab === "all" ? "Все" : tab === "90s" ? "90-е" : "Современные"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(201,168,76,0.1)" }}>
          {FASHION_ICONS.filter(icon => {
            if (iconTab === "all") return true;
            if (iconTab === "90s") return icon.era.includes("1990") || icon.era.includes("1984") || icon.era.includes("1987") || icon.era.includes("1986");
            return icon.era.includes("наши дни");
          }).map((icon) => (
            <div key={icon.id} className="group" style={{ background: DARK }}>
              <div className="gallery-card" style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
                <img src={icon.img} alt={icon.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(15%)" }} />
                <div className="gallery-overlay flex flex-col justify-end p-8">
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px", fontWeight: 300 }}>{icon.name}</h3>
                  <p className="text-xs tracking-widest uppercase mt-1" style={{ color: GOLD }}>{icon.title}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(242,235,217,0.4)" }}>{icon.era}</p>
                </div>
              </div>
              <div className="p-6" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
                <p style={{ fontSize: "24px", color: GOLD, marginBottom: "8px" }}>❝</p>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "16px", fontStyle: "italic", lineHeight: 1.7, color: "rgba(242,235,217,0.65)" }}>
                  {icon.quote}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                  <div className="text-xs" style={{ color: "rgba(242,235,217,0.4)" }}>
                    Instagram: <span style={{ color: GOLD }}>{icon.insta}</span>
                  </div>
                  <div className="text-xs" style={{ color: "rgba(242,235,217,0.4)" }}>
                    Наград: <span style={{ color: GOLD }}>{icon.awards}</span>
                  </div>
                  <button
                    onClick={() => setExpandedIcon(expandedIcon === icon.id ? null : icon.id)}
                    className="text-xs nav-link"
                  >
                    {expandedIcon === icon.id ? "Свернуть" : "Подробнее"}
                  </button>
                </div>
                {expandedIcon === icon.id && (
                  <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                    <p className="text-xs" style={{ color: "rgba(242,235,217,0.5)" }}>Эпоха: {icon.era}</p>
                    <p className="text-xs mt-2" style={{ color: "rgba(242,235,217,0.5)" }}>Титул: {icon.title}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── ЖУРНАЛ + QUIZ ─── */}
      <section id="section-magazine" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Articles */}
          <div className="flex-1">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Редакция</p>
            <h2 className="mb-10" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 300, color: CREAM }}>Журнал</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(201,168,76,0.1)" }}>
              {MAGAZINE_ARTICLES.map((article) => (
                <div key={article.id} className="group cursor-pointer" style={{ background: DARK }} onClick={() => setActiveArticle(article)}>
                  <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                    <img src={article.img} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-0.5 text-xs tracking-widest uppercase" style={{ background: "rgba(201,168,76,0.1)", color: GOLD, border: "1px solid rgba(201,168,76,0.2)" }}>{article.cat}</span>
                      <span className="text-xs" style={{ color: "rgba(242,235,217,0.3)" }}>{article.read} чтения</span>
                    </div>
                    <h4 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "18px", lineHeight: 1.4 }}>{article.title}</h4>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs" style={{ color: "rgba(242,235,217,0.4)" }}>{article.author}</span>
                      <span className="text-xs" style={{ color: "rgba(242,235,217,0.3)" }}>{article.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz */}
          <div className="lg:w-80 shrink-0">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Интерактив</p>
            <h3 className="mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "32px", fontWeight: 300, color: CREAM }}>Ваш стиль</h3>

            <div style={{ border: "1px solid rgba(201,168,76,0.2)", padding: "24px" }}>
              {!quizActive && !quizResult && (
                <div className="text-center">
                  <p className="text-sm mb-6" style={{ color: "rgba(242,235,217,0.6)", lineHeight: 1.7 }}>
                    Пройдите наш тест из 4 вопросов и узнайте, какой стиль подходит именно вам
                  </p>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "48px", color: GOLD, marginBottom: "16px" }}>✦</div>
                  <button
                    onClick={() => setQuizActive(true)}
                    className="w-full py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300"
                    style={{ border: "1px solid var(--gold)", color: GOLD, background: "transparent" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = DARK; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
                  >
                    Начать тест
                  </button>
                </div>
              )}

              {quizActive && !quizResult && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs tracking-widest uppercase" style={{ color: GOLD }}>Вопрос {quizStep + 1}/{QUIZ_QUESTIONS.length}</span>
                    <div className="flex gap-1">
                      {QUIZ_QUESTIONS.map((_, i) => (
                        <div key={i} className="w-6 h-0.5" style={{ background: i <= quizStep ? GOLD : "rgba(201,168,76,0.2)" }} />
                      ))}
                    </div>
                  </div>
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px", lineHeight: 1.5, marginBottom: "20px" }}>
                    {QUIZ_QUESTIONS[quizStep].question}
                  </p>
                  <div className="flex flex-col gap-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuizAnswer(QUIZ_QUESTIONS[quizStep].styles[i])}
                        className="text-left px-4 py-3 text-sm transition-all duration-200"
                        style={{ border: "1px solid rgba(201,168,76,0.2)", color: CREAM, background: "transparent" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = CREAM; }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizResult && STYLE_RESULTS[quizResult] && (
                <div className="text-center">
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "36px", color: GOLD, marginBottom: "12px" }}>✦</div>
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: GOLD }}>Ваш стиль</p>
                  <h4 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "24px", marginBottom: "12px" }}>{STYLE_RESULTS[quizResult].title}</h4>
                  <p className="text-sm mb-6" style={{ color: "rgba(242,235,217,0.6)", lineHeight: 1.7 }}>{STYLE_RESULTS[quizResult].desc}</p>
                  <div className="mb-6">
                    <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(242,235,217,0.4)" }}>Ваши бренды:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {STYLE_RESULTS[quizResult].brands.map(b => (
                        <span key={b} className="px-3 py-1 text-xs" style={{ border: "1px solid rgba(201,168,76,0.3)", color: GOLD }}>{b}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={resetQuiz} className="w-full py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300"
                    style={{ border: "1px solid rgba(242,235,217,0.2)", color: "rgba(242,235,217,0.6)", background: "transparent" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(242,235,217,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(242,235,217,0.6)"; }}>
                    Пройти снова
                  </button>
                </div>
              )}
            </div>

            {/* Subscribe */}
            <div className="mt-8 p-6" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: GOLD }}>Рассылка</p>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "18px", marginBottom: "16px" }}>Тренды на почту</p>
              {!subscribed ? (
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={subscribeEmail}
                    onChange={e => setSubscribeEmail(e.target.value)}
                    className="bg-transparent px-4 py-3 text-sm outline-none"
                    style={{ border: "1px solid rgba(201,168,76,0.2)", color: CREAM, caretColor: GOLD }}
                    onFocus={e => (e.target.style.borderColor = GOLD)}
                    onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
                  />
                  <button
                    onClick={() => subscribeEmail && setSubscribed(true)}
                    className="py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300"
                    style={{ background: GOLD, color: DARK }}
                  >
                    Подписаться
                  </button>
                </div>
              ) : (
                <p style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif", fontSize: "18px" }}>✓ Вы подписаны</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── ПОДИУМ ─── */}
      <section id="section-runway" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD }}>Fashion Week</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, color: CREAM }}>Показы</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Все", "Онлайн", "Скоро", "Archive"].map((f) => (
              <button
                key={f}
                onClick={() => setRunwayFilter(f)}
                className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  border: "1px solid",
                  borderColor: runwayFilter === f ? GOLD : "rgba(201,168,76,0.2)",
                  color: runwayFilter === f ? DARK : "rgba(242,235,217,0.5)",
                  background: runwayFilter === f ? GOLD : "transparent",
                }}
              >
                {f === "Archive" ? "Архив" : f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(201,168,76,0.1)" }}>
          {filteredRunway.map((show) => (
            <div key={show.id} className="group gallery-card cursor-pointer" style={{ background: DARK }} onClick={() => setActiveModal({ type: "show", data: show })}>
              <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
                <img src={show.img} alt={show.brand} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase"
                  style={{
                    background: show.status === "live" ? "#c0392b" : show.status === "soon" ? GOLD : "rgba(242,235,217,0.2)",
                    color: show.status === "live" || show.status === "soon" ? (show.status === "live" ? CREAM : DARK) : CREAM,
                  }}
                >
                  {show.status === "live" ? "● LIVE" : show.status === "soon" ? "Скоро" : "Архив"}
                </div>
                <div className="gallery-overlay flex flex-col justify-end p-5">
                  <p className="text-xs tracking-widest uppercase" style={{ color: GOLD }}>{show.city}</p>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", fontWeight: 300 }}>{show.brand}</h3>
                  <p className="text-xs mt-1" style={{ color: "rgba(242,235,217,0.5)" }}>{show.season}</p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
                <div>
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "16px" }}>{show.brand}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(242,235,217,0.4)" }}>{show.date}</p>
                </div>
                <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(242,235,217,0.4)" }}>
                  <Icon name="Eye" size={12} />
                  {show.views}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── КОНТАКТЫ ─── */}
      <section id="section-contacts" className="py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: GOLD }}>Связь с редакцией</p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, color: CREAM }}>Контакты</h2>
          <div className="gold-line mt-6 max-w-xs mx-auto mb-14" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
            {[
              { icon: "Mail", label: "Email редакции", value: "editor@maison.ru" },
              { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
              { icon: "MapPin", label: "Адрес", value: "Москва, Кузнецкий Мост, 7" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>
                  <Icon name={c.icon} fallback="Mail" size={18} />
                </div>
                <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(242,235,217,0.4)" }}>{c.label}</p>
                <p className="text-sm" style={{ color: CREAM }}>{c.value}</p>
              </div>
            ))}
          </div>

          <form className="flex flex-col gap-4 text-left" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(242,235,217,0.4)" }}>Ваше имя</label>
                <input type="text" placeholder="Имя Фамилия" className="w-full bg-transparent px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: "1px solid rgba(201,168,76,0.25)", color: CREAM, caretColor: GOLD }}
                  onFocus={e => (e.target.style.borderColor = GOLD)} onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.25)")} />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(242,235,217,0.4)" }}>Email</label>
                <input type="email" placeholder="your@email.com" className="w-full bg-transparent px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: "1px solid rgba(201,168,76,0.25)", color: CREAM, caretColor: GOLD }}
                  onFocus={e => (e.target.style.borderColor = GOLD)} onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.25)")} />
              </div>
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(242,235,217,0.4)" }}>Тема</label>
              <select className="w-full bg-transparent px-4 py-3 text-sm outline-none transition-all appearance-none"
                style={{ border: "1px solid rgba(201,168,76,0.25)", color: CREAM }}
                onFocus={e => (e.target.style.borderColor = GOLD)} onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.25)")}>
                <option value="" style={{ background: DARK }}>Выберите тему</option>
                <option value="pr" style={{ background: DARK }}>PR и сотрудничество</option>
                <option value="ads" style={{ background: DARK }}>Реклама и партнёрство</option>
                <option value="press" style={{ background: DARK }}>Пресс-аккредитация</option>
                <option value="other" style={{ background: DARK }}>Другое</option>
              </select>
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(242,235,217,0.4)" }}>Сообщение</label>
              <textarea rows={4} placeholder="Ваше сообщение..." className="w-full bg-transparent px-4 py-3 text-sm outline-none resize-none transition-all"
                style={{ border: "1px solid rgba(201,168,76,0.25)", color: CREAM, caretColor: GOLD }}
                onFocus={e => (e.target.style.borderColor = GOLD)} onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.25)")} />
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="px-12 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-300"
                style={{ border: `1px solid ${GOLD}`, color: GOLD, background: "transparent" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = DARK; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}>
                Отправить сообщение
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 px-6 md:px-12 mb-10" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px", letterSpacing: "0.3em", color: GOLD }}>MAISON</span>
              <p className="mt-4 text-sm" style={{ color: "rgba(242,235,217,0.4)", lineHeight: 1.7 }}>Премиальный журнал о высокой моде, трендах и иконах стиля.</p>
            </div>
            {[
              { title: "Разделы", links: ["Тренды", "Новинки", "Топ Моделей", "Иконы Моды"] },
              { title: "Редакция", links: ["О журнале", "Команда", "Вакансии", "Пресса"] },
              { title: "Соцсети", links: ["Instagram", "Telegram", "Pinterest", "YouTube"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs tracking-widest uppercase mb-5" style={{ color: GOLD }}>{col.title}</p>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <button key={link} onClick={() => col.title === "Разделы" ? scrollToSection(link) : undefined} className="text-left text-sm nav-link" style={{ fontSize: "13px" }}>{link}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="gold-line" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
            <p className="text-xs" style={{ color: "rgba(242,235,217,0.25)" }}>© 2025 MAISON. Все права защищены.</p>
            <p className="text-xs" style={{ color: "rgba(242,235,217,0.25)" }}>Политика конфиденциальности · Cookies</p>
          </div>
        </div>
      </footer>

      {/* ─── MODAL: NOVELTY ─── */}
      {activeModal?.type === "novelty" && (() => {
        const item = activeModal.data as typeof NOVELTIES[0];
        return (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}
            style={{ background: "rgba(12,10,9,0.92)", backdropFilter: "blur(12px)" }}>
            <div className="max-w-2xl w-full flex flex-col md:flex-row gap-0" style={{ border: "1px solid rgba(201,168,76,0.25)", background: "#0e0c0b" }} onClick={e => e.stopPropagation()}>
              <div className="md:w-64 shrink-0" style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 text-xs tracking-widest uppercase" style={{ background: GOLD, color: DARK }}>{item.tag}</span>
                    <button onClick={() => setActiveModal(null)} style={{ color: "rgba(242,235,217,0.4)" }}><Icon name="X" size={16} /></button>
                  </div>
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: GOLD }}>{item.brand}</p>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px", fontWeight: 300, lineHeight: 1.2 }}>{item.title}</h3>
                  <p className="mt-4 text-sm" style={{ color: "rgba(242,235,217,0.6)", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
                <div>
                  <div className="gold-line my-6" />
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "24px", color: GOLD }}>{item.price}</p>
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 py-3 text-xs tracking-widest uppercase transition-all duration-300"
                      style={{ border: `1px solid ${GOLD}`, color: GOLD, background: "transparent" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = DARK; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}>
                      Запросить
                    </button>
                    <button onClick={() => toggleSave(item.id + 300)} className="px-4 py-3 transition-all duration-200"
                      style={{ border: "1px solid rgba(201,168,76,0.2)", color: savedItems[item.id + 300] ? GOLD : "rgba(242,235,217,0.4)", background: "transparent" }}>
                      <Icon name="Bookmark" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── MODAL: SHOW ─── */}
      {activeModal?.type === "show" && (() => {
        const show = activeModal.data as typeof RUNWAY_SHOWS[0];
        return (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6" onClick={() => setActiveModal(null)}
            style={{ background: "rgba(12,10,9,0.92)", backdropFilter: "blur(12px)" }}>
            <div className="max-w-xl w-full" style={{ border: "1px solid rgba(201,168,76,0.25)", background: "#0e0c0b" }} onClick={e => e.stopPropagation()}>
              <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
                <img src={show.img} alt={show.brand} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase"
                  style={{ background: show.status === "live" ? "#c0392b" : show.status === "soon" ? GOLD : "rgba(0,0,0,0.5)", color: show.status === "soon" ? DARK : CREAM }}
                >
                  {show.status === "live" ? "● LIVE" : show.status === "soon" ? "Скоро" : "Архив"}
                </div>
                <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
                  style={{ background: "rgba(12,10,9,0.6)", color: CREAM }}>
                  <Icon name="X" size={14} />
                </button>
              </div>
              <div className="p-8">
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: GOLD }}>{show.city}</p>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px", fontWeight: 300 }}>{show.brand}</h3>
                <p className="text-sm mt-1" style={{ color: "rgba(242,235,217,0.5)" }}>{show.season}</p>
                <div className="flex gap-6 mt-6 pt-6" style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                  <div><p className="text-xs tracking-widest uppercase" style={{ color: "rgba(242,235,217,0.4)" }}>Дата</p><p style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif", fontSize: "18px" }}>{show.date}</p></div>
                  <div><p className="text-xs tracking-widest uppercase" style={{ color: "rgba(242,235,217,0.4)" }}>Просмотры</p><p style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif", fontSize: "18px" }}>{show.views}</p></div>
                </div>
                <button className="w-full mt-6 py-3 text-xs tracking-widest uppercase transition-all duration-300"
                  style={{ border: `1px solid ${GOLD}`, color: GOLD, background: "transparent" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = DARK; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}>
                  {show.status === "live" ? "Смотреть онлайн" : show.status === "soon" ? "Записаться" : "Смотреть запись"}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── MODAL: ARTICLE ─── */}
      {activeArticle && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6" onClick={() => setActiveArticle(null)}
          style={{ background: "rgba(12,10,9,0.92)", backdropFilter: "blur(12px)" }}>
          <div className="max-w-2xl w-full max-h-[80vh] overflow-y-auto" style={{ border: "1px solid rgba(201,168,76,0.25)", background: "#0e0c0b" }} onClick={e => e.stopPropagation()}>
            <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
              <img src={activeArticle.img} alt={activeArticle.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button onClick={() => setActiveArticle(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
                style={{ background: "rgba(12,10,9,0.7)", color: CREAM }}>
                <Icon name="X" size={14} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs tracking-widest uppercase" style={{ background: "rgba(201,168,76,0.1)", color: GOLD, border: "1px solid rgba(201,168,76,0.2)" }}>{activeArticle.cat}</span>
                <span className="text-xs" style={{ color: "rgba(242,235,217,0.4)" }}>{activeArticle.read} чтения</span>
              </div>
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(22px,3vw,32px)", lineHeight: 1.3 }}>{activeArticle.title}</h3>
              <div className="flex justify-between items-center mt-4 mb-6 pt-4" style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                <span className="text-xs" style={{ color: "rgba(242,235,217,0.5)" }}>{activeArticle.author}</span>
                <span className="text-xs" style={{ color: "rgba(242,235,217,0.3)" }}>{activeArticle.date}</span>
              </div>
              <p className="text-sm" style={{ color: "rgba(242,235,217,0.6)", lineHeight: 1.9 }}>
                Полный текст этой статьи вскоре будет доступен в нашем журнале. Мы готовим подробный материал с эксклюзивными фотографиями и интервью. Подпишитесь на рассылку, чтобы первыми получить доступ к полному тексту.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
