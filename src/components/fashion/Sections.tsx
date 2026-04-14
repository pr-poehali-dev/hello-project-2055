import { useCallback } from "react";
import Icon from "@/components/ui/icon";
import {
  IMG,
  TRENDS,
  NOVELTIES,
  TOP_MODELS,
  FASHION_ICONS,
  MAGAZINE_ARTICLES,
  RUNWAY_SHOWS,
  QUIZ_QUESTIONS,
  STYLE_RESULTS,
  GOLD,
  CREAM,
  DARK,
} from "./data";

/* ─── shared types ─── */
type ArticleType = typeof MAGAZINE_ARTICLES[0];
type NoveltyType = typeof NOVELTIES[0];
type ShowType = typeof RUNWAY_SHOWS[0];

interface SectionsProps {
  parallaxY: number;
  counter: { models: number; brands: number; shows: number };
  scrollToSection: (s: string) => void;
  setQuizActive: (v: boolean) => void;

  trendFilter: string;
  setTrendFilter: (v: string) => void;
  likes: Record<number, boolean>;
  toggleLike: (id: number) => void;
  savedItems: Record<number, boolean>;
  toggleSave: (id: number) => void;

  noveltyView: "grid" | "list";
  setNoveltyView: (v: "grid" | "list") => void;
  setActiveModal: (v: { type: string; data: unknown } | null) => void;

  modelFilter: string;
  setModelFilter: (v: string) => void;
  expandedModel: number | null;
  setExpandedModel: (v: number | null) => void;

  iconTab: "all" | "90s" | "modern";
  setIconTab: (v: "all" | "90s" | "modern") => void;
  expandedIcon: number | null;
  setExpandedIcon: (v: number | null) => void;

  quizActive: boolean;
  quizStep: number;
  quizAnswers: string[];
  setQuizAnswers: (v: string[]) => void;
  setQuizStep: (v: number) => void;
  quizResult: string | null;
  setQuizResult: (v: string | null) => void;
  resetQuiz: () => void;
  setActiveArticle: (v: ArticleType | null) => void;

  subscribeEmail: string;
  setSubscribeEmail: (v: string) => void;
  subscribed: boolean;
  setSubscribed: (v: boolean) => void;

  runwayFilter: string;
  setRunwayFilter: (v: string) => void;
}

export default function Sections({
  parallaxY,
  counter,
  scrollToSection,
  setQuizActive,
  trendFilter,
  setTrendFilter,
  likes,
  toggleLike,
  savedItems,
  toggleSave,
  noveltyView,
  setNoveltyView,
  setActiveModal,
  modelFilter,
  setModelFilter,
  expandedModel,
  setExpandedModel,
  iconTab,
  setIconTab,
  expandedIcon,
  setExpandedIcon,
  quizActive,
  quizStep,
  quizAnswers,
  setQuizAnswers,
  setQuizStep,
  quizResult,
  setQuizResult,
  resetQuiz,
  setActiveArticle,
  subscribeEmail,
  setSubscribeEmail,
  subscribed,
  setSubscribed,
  runwayFilter,
  setRunwayFilter,
}: SectionsProps) {
  const filteredTrends =
    trendFilter === "Все"
      ? TRENDS
      : trendFilter === "Горячие"
      ? TRENDS.filter((t) => t.hot)
      : TRENDS.filter((t) => t.season.includes(trendFilter));

  const filteredRunway =
    runwayFilter === "Все"
      ? RUNWAY_SHOWS
      : RUNWAY_SHOWS.filter(
          (s) =>
            s.status === runwayFilter.toLowerCase() ||
            (runwayFilter === "Онлайн" && s.status === "live") ||
            (runwayFilter === "Скоро" && s.status === "soon")
        );

  const handleQuizAnswer = useCallback(
    (style: string) => {
      const newAnswers = [...quizAnswers, style];
      setQuizAnswers(newAnswers);
      if (quizStep < QUIZ_QUESTIONS.length - 1) {
        setQuizStep(quizStep + 1);
      } else {
        const freq: Record<string, number> = {};
        newAnswers.forEach((a) => {
          freq[a] = (freq[a] || 0) + 1;
        });
        const result = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
        setQuizResult(result);
      }
    },
    [quizAnswers, quizStep, setQuizAnswers, setQuizStep, setQuizResult]
  );

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        id="section-hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,10,9,0.1) 0%, rgba(12,10,9,0.8) 100%)",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <p
            className="animate-fade-up delay-100 text-xs tracking-[0.5em] uppercase mb-6"
            style={{ color: GOLD }}
          >
            Премиальный журнал о моде — Весна-Лето 2025
          </p>
          <h1
            className="animate-fade-up delay-200"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(60px, 12vw, 160px)",
              fontWeight: 300,
              lineHeight: 0.88,
              color: CREAM,
            }}
          >
            L'Art
            <br />
            <em style={{ color: GOLD }}>de Vivre</em>
          </h1>

          <div className="animate-fade-up delay-300 flex justify-center gap-16 mt-14">
            {[
              { label: "Моделей", value: counter.models.toLocaleString() },
              { label: "Брендов", value: counter.brands.toLocaleString() },
              { label: "Показов", value: counter.shows.toLocaleString() },
            ].map((c) => (
              <div key={c.label} className="text-center">
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(28px, 4vw, 48px)",
                    color: GOLD,
                    fontWeight: 300,
                  }}
                >
                  {c.value}
                </div>
                <div
                  className="text-xs tracking-widest uppercase mt-1"
                  style={{ color: "rgba(242,235,217,0.4)" }}
                >
                  {c.label}
                </div>
              </div>
            ))}
          </div>

          <div className="animate-fade-up delay-500 flex flex-wrap justify-center gap-4 mt-12">
            <button
              onClick={() => scrollToSection("Тренды")}
              className="px-8 py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300"
              style={{
                border: "1px solid var(--gold)",
                color: GOLD,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = GOLD;
                (e.currentTarget as HTMLButtonElement).style.color = DARK;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = GOLD;
              }}
            >
              Открыть журнал
            </button>
            <button
              onClick={() => {
                setQuizActive(true);
                scrollToSection("Журнал");
              }}
              className="px-8 py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300"
              style={{
                border: "1px solid rgba(242,235,217,0.3)",
                color: "rgba(242,235,217,0.7)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(242,235,217,0.6)";
                (e.currentTarget as HTMLButtonElement).style.color = CREAM;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(242,235,217,0.3)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(242,235,217,0.7)";
              }}
            >
              Узнать свой стиль
            </button>
          </div>
        </div>

        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "rgba(242,235,217,0.3)" }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── ТРЕНДЫ ─── */}
      <section
        id="section-trends"
        className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: GOLD }}
            >
              Сезон 2025
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 300,
                color: CREAM,
              }}
            >
              Тренды Сезона
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Все", "Горячие", "Весна", "Лето"].map((f) => (
              <button
                key={f}
                onClick={() => setTrendFilter(f)}
                className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  border: "1px solid",
                  borderColor: trendFilter === f ? GOLD : "rgba(201,168,76,0.2)",
                  color:
                    trendFilter === f ? DARK : "rgba(242,235,217,0.5)",
                  background: trendFilter === f ? GOLD : "transparent",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(201,168,76,0.1)" }}
        >
          {filteredTrends.map((trend) => (
            <div
              key={trend.id}
              className="gallery-card group relative"
              style={{ background: DARK }}
            >
              {trend.hot && (
                <div
                  className="absolute top-4 right-4 z-10 px-2 py-1 text-xs tracking-widest uppercase"
                  style={{ background: GOLD, color: DARK }}
                >
                  🔥 Горячее
                </div>
              )}
              <div
                style={{
                  aspectRatio: "4/5",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={trend.img}
                  alt={trend.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="gallery-overlay flex flex-col justify-end p-6">
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: GOLD }}
                  >
                    {trend.category}
                  </p>
                  <h3
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "22px",
                      fontWeight: 300,
                    }}
                  >
                    {trend.title}
                  </h3>
                  <p
                    className="text-xs tracking-widest mt-1"
                    style={{ color: "rgba(242,235,217,0.5)" }}
                  >
                    {trend.season}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => toggleLike(trend.id)}
                      className="flex items-center gap-1 text-xs transition-all duration-200"
                      style={{
                        color: likes[trend.id]
                          ? GOLD
                          : "rgba(242,235,217,0.6)",
                      }}
                    >
                      <Icon name="Heart" size={14} />
                      {likes[trend.id] ? "Нравится" : "Лайк"}
                    </button>
                    <button
                      onClick={() => toggleSave(trend.id)}
                      className="flex items-center gap-1 text-xs transition-all duration-200"
                      style={{
                        color: savedItems[trend.id]
                          ? GOLD
                          : "rgba(242,235,217,0.6)",
                      }}
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
      <section
        id="section-novelties"
        className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: GOLD }}
            >
              Коллекции
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 300,
                color: CREAM,
              }}
            >
              Новинки
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(242,235,217,0.4)" }}
            >
              Вид:
            </span>
            <button
              onClick={() => setNoveltyView("grid")}
              style={{
                color:
                  noveltyView === "grid" ? GOLD : "rgba(242,235,217,0.4)",
              }}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => setNoveltyView("list")}
              style={{
                color:
                  noveltyView === "list" ? GOLD : "rgba(242,235,217,0.4)",
              }}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>

        {noveltyView === "grid" ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: "rgba(201,168,76,0.1)" }}
          >
            {NOVELTIES.map((item) => (
              <div
                key={item.id}
                className="gallery-card group cursor-pointer"
                style={{ background: DARK }}
                onClick={() =>
                  setActiveModal({ type: "novelty", data: item as NoveltyType })
                }
              >
                <div
                  style={{
                    aspectRatio: "3/4",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase"
                    style={{ background: GOLD, color: DARK }}
                  >
                    {item.tag}
                  </div>
                  <div className="gallery-overlay flex flex-col justify-end p-5">
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{ color: GOLD }}
                    >
                      {item.brand}
                    </p>
                    <h3
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "20px",
                        fontWeight: 300,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-xs mt-2"
                      style={{ color: "rgba(242,235,217,0.6)" }}
                    >
                      {item.price}
                    </p>
                    <div className="flex gap-3 mt-3">
                      <button
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "rgba(242,235,217,0.7)" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(item.id + 100);
                        }}
                      >
                        <Icon
                          name="Heart"
                          size={12}
                          style={{
                            color: likes[item.id + 100] ? GOLD : undefined,
                          }}
                        />
                        {likes[item.id + 100] ? "❤" : "Лайк"}
                      </button>
                      <button
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "rgba(242,235,217,0.7)" }}
                      >
                        <Icon name="Share2" size={12} />
                        Поделиться
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="p-4"
                  style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}
                >
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: "rgba(201,168,76,0.5)" }}
                  >
                    {item.brand}
                  </p>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "16px",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-xs mt-1 line-clamp-2"
                    style={{ color: "rgba(242,235,217,0.4)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col gap-px"
            style={{ background: "rgba(201,168,76,0.1)" }}
          >
            {NOVELTIES.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 p-6 group cursor-pointer transition-all duration-200"
                style={{ background: DARK }}
                onClick={() =>
                  setActiveModal({ type: "novelty", data: item as NoveltyType })
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#141210")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = DARK)
                }
              >
                <div className="shrink-0 w-20 h-20 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="px-2 py-0.5 text-xs tracking-widest uppercase"
                      style={{ background: GOLD, color: DARK }}
                    >
                      {item.tag}
                    </span>
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ color: GOLD }}
                    >
                      {item.brand}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "20px",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(242,235,217,0.4)" }}
                  >
                    {item.desc}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p
                    style={{
                      color: GOLD,
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "16px",
                    }}
                  >
                    {item.price}
                  </p>
                  <button className="mt-2 text-xs nav-link">
                    Подробнее →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="gold-line" />

      {/* ─── ТОП МОДЕЛЕЙ ─── */}
      <section
        id="section-models"
        className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto"
      >
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Рейтинг в реальном времени
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 300,
              color: CREAM,
            }}
          >
            Топ Моделей
          </h2>
          <div className="gold-line mt-5 max-w-xs mx-auto" />
        </div>

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

        <div
          className="flex flex-col gap-px"
          style={{ background: "rgba(201,168,76,0.1)" }}
        >
          {TOP_MODELS.map((model, idx) => (
            <div key={model.id}>
              <div
                className="flex items-center gap-4 md:gap-6 p-5 cursor-pointer transition-all duration-300 group"
                style={{
                  background:
                    expandedModel === model.id ? "#111009" : DARK,
                }}
                onClick={() =>
                  setExpandedModel(
                    expandedModel === model.id ? null : model.id
                  )
                }
                onMouseEnter={(e) => {
                  if (expandedModel !== model.id)
                    (e.currentTarget as HTMLDivElement).style.background =
                      "#0e0c0b";
                }}
                onMouseLeave={(e) => {
                  if (expandedModel !== model.id)
                    (e.currentTarget as HTMLDivElement).style.background = DARK;
                }}
              >
                <div
                  className="w-8 text-center shrink-0"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "24px",
                    color: idx < 3 ? GOLD : "rgba(242,235,217,0.3)",
                  }}
                >
                  {idx + 1}
                </div>

                <div
                  className="w-12 h-12 md:w-16 md:h-16 shrink-0 overflow-hidden"
                  style={{
                    border: `1px solid ${
                      idx < 3 ? GOLD : "rgba(201,168,76,0.2)"
                    }`,
                  }}
                >
                  <img
                    src={model.img}
                    alt={model.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "18px",
                      }}
                    >
                      {model.name}
                    </p>
                    <span className="text-sm">{model.country}</span>
                    <span
                      className="text-xs px-2 py-0.5"
                      style={{
                        background: "rgba(201,168,76,0.1)",
                        color: GOLD,
                        border: "1px solid rgba(201,168,76,0.2)",
                      }}
                    >
                      {model.agency}
                    </span>
                  </div>
                  <p
                    className="text-xs mt-1 hidden md:block"
                    style={{ color: "rgba(242,235,217,0.4)" }}
                  >
                    Кампаний: {model.campaigns} • Подписчики: {model.followers}
                  </p>
                </div>

                <div className="hidden md:block w-32">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "rgba(242,235,217,0.4)" }}>
                      Рейтинг
                    </span>
                    <span style={{ color: GOLD }}>{model.rating}</span>
                  </div>
                  <div
                    className="h-1"
                    style={{ background: "rgba(201,168,76,0.15)" }}
                  >
                    <div
                      className="h-full transition-all duration-1000"
                      style={{
                        width: `${model.rating}%`,
                        background: `linear-gradient(90deg, var(--gold-dim), var(--gold-light))`,
                      }}
                    />
                  </div>
                </div>

                <div
                  className="shrink-0 text-xs font-medium"
                  style={{
                    color: model.trend.startsWith("+")
                      ? "#4ade80"
                      : model.trend === "0"
                      ? "rgba(242,235,217,0.4)"
                      : "#f87171",
                  }}
                >
                  {model.trend !== "0" && model.trend}
                  {model.trend === "0" && "—"}
                </div>

                <Icon
                  name={
                    expandedModel === model.id ? "ChevronUp" : "ChevronDown"
                  }
                  size={14}
                  style={{ color: "rgba(242,235,217,0.3)" }}
                />
              </div>

              {expandedModel === model.id && (
                <div
                  className="px-6 pb-6 pt-2"
                  style={{
                    background: "#111009",
                    borderTop: "1px solid rgba(201,168,76,0.1)",
                  }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-2">
                    {[
                      { label: "Рейтинг", value: `${model.rating}/100` },
                      { label: "Подписчики", value: model.followers },
                      { label: "Кампаний", value: model.campaigns },
                      { label: "Агентство", value: model.agency },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p
                          className="text-xs tracking-widest uppercase"
                          style={{ color: "rgba(242,235,217,0.4)" }}
                        >
                          {stat.label}
                        </p>
                        <p
                          style={{
                            fontFamily: "Cormorant Garamond, serif",
                            fontSize: "20px",
                            color: GOLD,
                          }}
                        >
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button
                      className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                      style={{
                        border: "1px solid rgba(201,168,76,0.3)",
                        color: GOLD,
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = GOLD;
                        (e.currentTarget as HTMLButtonElement).style.color =
                          DARK;
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          GOLD;
                      }}
                    >
                      Профиль модели
                    </button>
                    <button
                      onClick={() => toggleLike(model.id + 200)}
                      className="flex items-center gap-2 px-5 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                      style={{
                        border: "1px solid rgba(242,235,217,0.1)",
                        color: likes[model.id + 200]
                          ? GOLD
                          : "rgba(242,235,217,0.4)",
                        background: "transparent",
                      }}
                    >
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
      <section
        id="section-icons"
        className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto"
      >
        <div className="text-center mb-10">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            Легенды
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 300,
              color: CREAM,
            }}
          >
            Иконы Моды
          </h2>
          <div className="gold-line mt-5 max-w-xs mx-auto mb-8" />
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

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(201,168,76,0.1)" }}
        >
          {FASHION_ICONS.filter((icon) => {
            if (iconTab === "all") return true;
            if (iconTab === "90s")
              return (
                icon.era.includes("1990") ||
                icon.era.includes("1984") ||
                icon.era.includes("1987") ||
                icon.era.includes("1986")
              );
            return icon.era.includes("наши дни");
          }).map((icon) => (
            <div key={icon.id} className="group" style={{ background: DARK }}>
              <div
                className="gallery-card"
                style={{
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={icon.img}
                  alt={icon.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(15%)",
                  }}
                />
                <div className="gallery-overlay flex flex-col justify-end p-8">
                  <h3
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "28px",
                      fontWeight: 300,
                    }}
                  >
                    {icon.name}
                  </h3>
                  <p
                    className="text-xs tracking-widest uppercase mt-1"
                    style={{ color: GOLD }}
                  >
                    {icon.title}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(242,235,217,0.4)" }}
                  >
                    {icon.era}
                  </p>
                </div>
              </div>
              <div
                className="p-6"
                style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}
              >
                <p
                  style={{ fontSize: "24px", color: GOLD, marginBottom: "8px" }}
                >
                  ❝
                </p>
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
                <div
                  className="flex justify-between items-center mt-4 pt-4"
                  style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
                >
                  <div
                    className="text-xs"
                    style={{ color: "rgba(242,235,217,0.4)" }}
                  >
                    Instagram:{" "}
                    <span style={{ color: GOLD }}>{icon.insta}</span>
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(242,235,217,0.4)" }}
                  >
                    Наград: <span style={{ color: GOLD }}>{icon.awards}</span>
                  </div>
                  <button
                    onClick={() =>
                      setExpandedIcon(
                        expandedIcon === icon.id ? null : icon.id
                      )
                    }
                    className="text-xs nav-link"
                  >
                    {expandedIcon === icon.id ? "Свернуть" : "Подробнее"}
                  </button>
                </div>
                {expandedIcon === icon.id && (
                  <div
                    className="mt-4 pt-4"
                    style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
                  >
                    <p
                      className="text-xs"
                      style={{ color: "rgba(242,235,217,0.5)" }}
                    >
                      Эпоха: {icon.era}
                    </p>
                    <p
                      className="text-xs mt-2"
                      style={{ color: "rgba(242,235,217,0.5)" }}
                    >
                      Титул: {icon.title}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── ЖУРНАЛ + QUIZ ─── */}
      <section
        id="section-magazine"
        className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Articles */}
          <div className="flex-1">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: GOLD }}
            >
              Редакция
            </p>
            <h2
              className="mb-10"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 4vw, 60px)",
                fontWeight: 300,
                color: CREAM,
              }}
            >
              Журнал
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-px"
              style={{ background: "rgba(201,168,76,0.1)" }}
            >
              {MAGAZINE_ARTICLES.map((article) => (
                <div
                  key={article.id}
                  className="group cursor-pointer"
                  style={{ background: DARK }}
                  onClick={() => setActiveArticle(article)}
                >
                  <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                    <img
                      src={article.img}
                      alt={article.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="px-2 py-0.5 text-xs tracking-widest uppercase"
                        style={{
                          background: "rgba(201,168,76,0.1)",
                          color: GOLD,
                          border: "1px solid rgba(201,168,76,0.2)",
                        }}
                      >
                        {article.cat}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(242,235,217,0.3)" }}
                      >
                        {article.read} чтения
                      </span>
                    </div>
                    <h4
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "18px",
                        lineHeight: 1.4,
                      }}
                    >
                      {article.title}
                    </h4>
                    <div className="flex justify-between items-center mt-3">
                      <span
                        className="text-xs"
                        style={{ color: "rgba(242,235,217,0.4)" }}
                      >
                        {article.author}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(242,235,217,0.3)" }}
                      >
                        {article.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz + Subscribe */}
          <div className="lg:w-80 shrink-0">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: GOLD }}
            >
              Интерактив
            </p>
            <h3
              className="mb-6"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "32px",
                fontWeight: 300,
                color: CREAM,
              }}
            >
              Ваш стиль
            </h3>

            <div style={{ border: "1px solid rgba(201,168,76,0.2)", padding: "24px" }}>
              {!quizActive && !quizResult && (
                <div className="text-center">
                  <p
                    className="text-sm mb-6"
                    style={{ color: "rgba(242,235,217,0.6)", lineHeight: 1.7 }}
                  >
                    Пройдите наш тест из 4 вопросов и узнайте, какой стиль
                    подходит именно вам
                  </p>
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "48px",
                      color: GOLD,
                      marginBottom: "16px",
                    }}
                  >
                    ✦
                  </div>
                  <button
                    onClick={() => setQuizActive(true)}
                    className="w-full py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300"
                    style={{
                      border: "1px solid var(--gold)",
                      color: GOLD,
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.background = GOLD;
                      (e.currentTarget as HTMLButtonElement).style.color = DARK;
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = GOLD;
                    }}
                  >
                    Начать тест
                  </button>
                </div>
              )}

              {quizActive && !quizResult && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ color: GOLD }}
                    >
                      Вопрос {quizStep + 1}/{QUIZ_QUESTIONS.length}
                    </span>
                    <div className="flex gap-1">
                      {QUIZ_QUESTIONS.map((_, i) => (
                        <div
                          key={i}
                          className="w-6 h-0.5"
                          style={{
                            background:
                              i <= quizStep ? GOLD : "rgba(201,168,76,0.2)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "20px",
                      lineHeight: 1.5,
                      marginBottom: "20px",
                    }}
                  >
                    {QUIZ_QUESTIONS[quizStep].question}
                  </p>
                  <div className="flex flex-col gap-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          handleQuizAnswer(QUIZ_QUESTIONS[quizStep].styles[i])
                        }
                        className="text-left px-4 py-3 text-sm transition-all duration-200"
                        style={{
                          border: "1px solid rgba(201,168,76,0.2)",
                          color: CREAM,
                          background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = GOLD;
                          (e.currentTarget as HTMLButtonElement).style.color =
                            GOLD;
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = "rgba(201,168,76,0.2)";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            CREAM;
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizResult && STYLE_RESULTS[quizResult] && (
                <div className="text-center">
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "36px",
                      color: GOLD,
                      marginBottom: "12px",
                    }}
                  >
                    ✦
                  </div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: GOLD }}
                  >
                    Ваш стиль
                  </p>
                  <h4
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "24px",
                      marginBottom: "12px",
                    }}
                  >
                    {STYLE_RESULTS[quizResult].title}
                  </h4>
                  <p
                    className="text-sm mb-6"
                    style={{ color: "rgba(242,235,217,0.6)", lineHeight: 1.7 }}
                  >
                    {STYLE_RESULTS[quizResult].desc}
                  </p>
                  <div className="mb-6">
                    <p
                      className="text-xs tracking-widest uppercase mb-3"
                      style={{ color: "rgba(242,235,217,0.4)" }}
                    >
                      Ваши бренды:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {STYLE_RESULTS[quizResult].brands.map((b) => (
                        <span
                          key={b}
                          className="px-3 py-1 text-xs"
                          style={{
                            border: "1px solid rgba(201,168,76,0.3)",
                            color: GOLD,
                          }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="w-full py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300"
                    style={{
                      border: "1px solid rgba(242,235,217,0.2)",
                      color: "rgba(242,235,217,0.6)",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.borderColor = GOLD;
                      (e.currentTarget as HTMLButtonElement).style.color = GOLD;
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.borderColor = "rgba(242,235,217,0.2)";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(242,235,217,0.6)";
                    }}
                  >
                    Пройти снова
                  </button>
                </div>
              )}
            </div>

            {/* Subscribe */}
            <div
              className="mt-8 p-6"
              style={{ border: "1px solid rgba(201,168,76,0.2)" }}
            >
              <p
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: GOLD }}
              >
                Рассылка
              </p>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "18px",
                  marginBottom: "16px",
                }}
              >
                Тренды на почту
              </p>
              {!subscribed ? (
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    className="bg-transparent px-4 py-3 text-sm outline-none"
                    style={{
                      border: "1px solid rgba(201,168,76,0.2)",
                      color: CREAM,
                      caretColor: GOLD,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = GOLD)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(201,168,76,0.2)")
                    }
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
                <p
                  style={{
                    color: GOLD,
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "18px",
                  }}
                >
                  ✓ Вы подписаны
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="gold-line" />

      {/* ─── ПОДИУМ ─── */}
      <section
        id="section-runway"
        className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: GOLD }}
            >
              Fashion Week
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 300,
                color: CREAM,
              }}
            >
              Показы
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Все", "Онлайн", "Скоро", "Archive"].map((f) => (
              <button
                key={f}
                onClick={() => setRunwayFilter(f)}
                className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  border: "1px solid",
                  borderColor:
                    runwayFilter === f ? GOLD : "rgba(201,168,76,0.2)",
                  color: runwayFilter === f ? DARK : "rgba(242,235,217,0.5)",
                  background: runwayFilter === f ? GOLD : "transparent",
                }}
              >
                {f === "Archive" ? "Архив" : f}
              </button>
            ))}
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(201,168,76,0.1)" }}
        >
          {filteredRunway.map((show) => (
            <div
              key={show.id}
              className="group gallery-card cursor-pointer"
              style={{ background: DARK }}
              onClick={() =>
                setActiveModal({ type: "show", data: show as ShowType })
              }
            >
              <div
                style={{
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={show.img}
                  alt={show.brand}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase"
                  style={{
                    background:
                      show.status === "live"
                        ? "#c0392b"
                        : show.status === "soon"
                        ? GOLD
                        : "rgba(242,235,217,0.2)",
                    color:
                      show.status === "live" || show.status === "soon"
                        ? show.status === "live"
                          ? CREAM
                          : DARK
                        : CREAM,
                  }}
                >
                  {show.status === "live"
                    ? "● LIVE"
                    : show.status === "soon"
                    ? "Скоро"
                    : "Архив"}
                </div>
                <div className="gallery-overlay flex flex-col justify-end p-5">
                  <p
                    className="text-xs tracking-widest uppercase"
                    style={{ color: GOLD }}
                  >
                    {show.city}
                  </p>
                  <h3
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "22px",
                      fontWeight: 300,
                    }}
                  >
                    {show.brand}
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(242,235,217,0.5)" }}
                  >
                    {show.season}
                  </p>
                </div>
              </div>
              <div
                className="p-4 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "16px",
                    }}
                  >
                    {show.brand}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(242,235,217,0.4)" }}
                  >
                    {show.date}
                  </p>
                </div>
                <div
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "rgba(242,235,217,0.4)" }}
                >
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
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: GOLD }}
          >
            Связь с редакцией
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 300,
              color: CREAM,
            }}
          >
            Контакты
          </h2>
          <div className="gold-line mt-6 max-w-xs mx-auto mb-14" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
            {[
              { icon: "Mail", label: "Email редакции", value: "editor@maison.ru" },
              { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
              { icon: "MapPin", label: "Адрес", value: "Москва, Кузнецкий Мост, 7" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ border: `1px solid ${GOLD}`, color: GOLD }}
                >
                  <Icon name={c.icon} fallback="Mail" size={18} />
                </div>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "rgba(242,235,217,0.4)" }}
                >
                  {c.label}
                </p>
                <p className="text-sm" style={{ color: CREAM }}>
                  {c.value}
                </p>
              </div>
            ))}
          </div>

          <form
            className="flex flex-col gap-4 text-left"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="text-xs tracking-widest uppercase block mb-2"
                  style={{ color: "rgba(242,235,217,0.4)" }}
                >
                  Ваше имя
                </label>
                <input
                  type="text"
                  placeholder="Имя Фамилия"
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    border: "1px solid rgba(201,168,76,0.25)",
                    color: CREAM,
                    caretColor: GOLD,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = GOLD)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(201,168,76,0.25)")
                  }
                />
              </div>
              <div>
                <label
                  className="text-xs tracking-widest uppercase block mb-2"
                  style={{ color: "rgba(242,235,217,0.4)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    border: "1px solid rgba(201,168,76,0.25)",
                    color: CREAM,
                    caretColor: GOLD,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = GOLD)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(201,168,76,0.25)")
                  }
                />
              </div>
            </div>
            <div>
              <label
                className="text-xs tracking-widest uppercase block mb-2"
                style={{ color: "rgba(242,235,217,0.4)" }}
              >
                Тема
              </label>
              <select
                className="w-full bg-transparent px-4 py-3 text-sm outline-none transition-all appearance-none"
                style={{
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: CREAM,
                }}
                onFocus={(e) => (e.target.style.borderColor = GOLD)}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(201,168,76,0.25)")
                }
              >
                <option value="" style={{ background: DARK }}>
                  Выберите тему
                </option>
                <option value="pr" style={{ background: DARK }}>
                  PR и сотрудничество
                </option>
                <option value="ads" style={{ background: DARK }}>
                  Реклама и партнёрство
                </option>
                <option value="press" style={{ background: DARK }}>
                  Пресс-аккредитация
                </option>
                <option value="other" style={{ background: DARK }}>
                  Другое
                </option>
              </select>
            </div>
            <div>
              <label
                className="text-xs tracking-widest uppercase block mb-2"
                style={{ color: "rgba(242,235,217,0.4)" }}
              >
                Сообщение
              </label>
              <textarea
                rows={4}
                placeholder="Ваше сообщение..."
                className="w-full bg-transparent px-4 py-3 text-sm outline-none resize-none transition-all"
                style={{
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: CREAM,
                  caretColor: GOLD,
                }}
                onFocus={(e) => (e.target.style.borderColor = GOLD)}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(201,168,76,0.25)")
                }
              />
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="px-12 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-300"
                style={{
                  border: `1px solid ${GOLD}`,
                  color: GOLD,
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    GOLD;
                  (e.currentTarget as HTMLButtonElement).style.color = DARK;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = GOLD;
                }}
              >
                Отправить сообщение
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="py-12 px-6 md:px-12 mb-10"
        style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "28px",
                  letterSpacing: "0.3em",
                  color: GOLD,
                }}
              >
                MAISON
              </span>
              <p
                className="mt-4 text-sm"
                style={{ color: "rgba(242,235,217,0.4)", lineHeight: 1.7 }}
              >
                Премиальный журнал о высокой моде, трендах и иконах стиля.
              </p>
            </div>
            {[
              {
                title: "Разделы",
                links: ["Тренды", "Новинки", "Топ Моделей", "Иконы Моды"],
              },
              {
                title: "Редакция",
                links: ["О журнале", "Команда", "Вакансии", "Пресса"],
              },
              {
                title: "Соцсети",
                links: ["Instagram", "Telegram", "Pinterest", "YouTube"],
              },
            ].map((col) => (
              <div key={col.title}>
                <p
                  className="text-xs tracking-widest uppercase mb-5"
                  style={{ color: GOLD }}
                >
                  {col.title}
                </p>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <button
                      key={link}
                      onClick={() =>
                        col.title === "Разделы"
                          ? scrollToSection(link)
                          : undefined
                      }
                      className="text-left text-sm nav-link"
                      style={{ fontSize: "13px" }}
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="gold-line" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
            <p className="text-xs" style={{ color: "rgba(242,235,217,0.25)" }}>
              © 2025 MAISON. Все права защищены.
            </p>
            <p className="text-xs" style={{ color: "rgba(242,235,217,0.25)" }}>
              Политика конфиденциальности · Cookies
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
