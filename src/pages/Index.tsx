import { useState, useEffect, useCallback } from "react";
import SiteNav from "@/components/fashion/SiteNav";
import Sections from "@/components/fashion/Sections";
import Modals from "@/components/fashion/Modals";
import { NEWS_FEED, QUIZ_QUESTIONS, MAGAZINE_ARTICLES, DARK, CREAM } from "@/components/fashion/data";

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
  const [iconTab, setIconTab] = useState<"all" | "90s" | "modern">("all");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [activeArticle, setActiveArticle] = useState<typeof MAGAZINE_ARTICLES[0] | null>(null);

  /* scroll & parallax */
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

  const toggleLike = (id: number) =>
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSave = (id: number) =>
    setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const resetQuiz = useCallback(() => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
    setQuizActive(false);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: DARK, color: CREAM }}>
      <SiteNav
        scrolled={scrolled}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollProgress={scrollProgress}
        currentNewsIndex={currentNewsIndex}
        newsExpanded={newsExpanded}
        setNewsExpanded={setNewsExpanded}
      />

      <Sections
        parallaxY={parallaxY}
        counter={counter}
        scrollToSection={scrollToSection}
        setQuizActive={setQuizActive}
        trendFilter={trendFilter}
        setTrendFilter={setTrendFilter}
        likes={likes}
        toggleLike={toggleLike}
        savedItems={savedItems}
        toggleSave={toggleSave}
        noveltyView={noveltyView}
        setNoveltyView={setNoveltyView}
        setActiveModal={setActiveModal}
        modelFilter={modelFilter}
        setModelFilter={setModelFilter}
        expandedModel={expandedModel}
        setExpandedModel={setExpandedModel}
        iconTab={iconTab}
        setIconTab={setIconTab}
        expandedIcon={expandedIcon}
        setExpandedIcon={setExpandedIcon}
        quizActive={quizActive}
        quizStep={quizStep}
        quizAnswers={quizAnswers}
        setQuizAnswers={setQuizAnswers}
        setQuizStep={setQuizStep}
        quizResult={quizResult}
        setQuizResult={setQuizResult}
        resetQuiz={resetQuiz}
        setActiveArticle={setActiveArticle}
        subscribeEmail={subscribeEmail}
        setSubscribeEmail={setSubscribeEmail}
        subscribed={subscribed}
        setSubscribed={setSubscribed}
        runwayFilter={runwayFilter}
        setRunwayFilter={setRunwayFilter}
      />

      <Modals
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        activeArticle={activeArticle}
        setActiveArticle={setActiveArticle}
        savedItems={savedItems}
        toggleSave={toggleSave}
      />
    </div>
  );
};

export default Index;
