import Icon from "@/components/ui/icon";
import { NOVELTIES, RUNWAY_SHOWS, MAGAZINE_ARTICLES, GOLD, CREAM, DARK } from "./data";

interface ModalsProps {
  activeModal: { type: string; data: unknown } | null;
  setActiveModal: (v: { type: string; data: unknown } | null) => void;
  activeArticle: typeof MAGAZINE_ARTICLES[0] | null;
  setActiveArticle: (v: typeof MAGAZINE_ARTICLES[0] | null) => void;
  savedItems: Record<number, boolean>;
  toggleSave: (id: number) => void;
}

export default function Modals({
  activeModal,
  setActiveModal,
  activeArticle,
  setActiveArticle,
  savedItems,
  toggleSave,
}: ModalsProps) {
  return (
    <>
      {/* ─── MODAL: NOVELTY ─── */}
      {activeModal?.type === "novelty" &&
        (() => {
          const item = activeModal.data as typeof NOVELTIES[0];
          return (
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center p-6"
              onClick={() => setActiveModal(null)}
              style={{
                background: "rgba(12,10,9,0.92)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="max-w-2xl w-full flex flex-col md:flex-row gap-0"
                style={{
                  border: "1px solid rgba(201,168,76,0.25)",
                  background: "#0e0c0b",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="md:w-64 shrink-0"
                  style={{ aspectRatio: "3/4", overflow: "hidden" }}
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
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className="px-3 py-1 text-xs tracking-widest uppercase"
                        style={{ background: GOLD, color: DARK }}
                      >
                        {item.tag}
                      </span>
                      <button
                        onClick={() => setActiveModal(null)}
                        style={{ color: "rgba(242,235,217,0.4)" }}
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                    <p
                      className="text-xs tracking-widest uppercase mb-2"
                      style={{ color: GOLD }}
                    >
                      {item.brand}
                    </p>
                    <h3
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "28px",
                        fontWeight: 300,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-4 text-sm"
                      style={{
                        color: "rgba(242,235,217,0.6)",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <div>
                    <div className="gold-line my-6" />
                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "24px",
                        color: GOLD,
                      }}
                    >
                      {item.price}
                    </p>
                    <div className="flex gap-3 mt-4">
                      <button
                        className="flex-1 py-3 text-xs tracking-widest uppercase transition-all duration-300"
                        style={{
                          border: `1px solid ${GOLD}`,
                          color: GOLD,
                          background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = GOLD;
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.color = DARK;
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "transparent";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.color = GOLD;
                        }}
                      >
                        Запросить
                      </button>
                      <button
                        onClick={() => toggleSave(item.id + 300)}
                        className="px-4 py-3 transition-all duration-200"
                        style={{
                          border: "1px solid rgba(201,168,76,0.2)",
                          color: savedItems[item.id + 300]
                            ? GOLD
                            : "rgba(242,235,217,0.4)",
                          background: "transparent",
                        }}
                      >
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
      {activeModal?.type === "show" &&
        (() => {
          const show = activeModal.data as typeof RUNWAY_SHOWS[0];
          return (
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center p-6"
              onClick={() => setActiveModal(null)}
              style={{
                background: "rgba(12,10,9,0.92)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="max-w-xl w-full"
                style={{
                  border: "1px solid rgba(201,168,76,0.25)",
                  background: "#0e0c0b",
                }}
                onClick={(e) => e.stopPropagation()}
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
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase"
                    style={{
                      background:
                        show.status === "live"
                          ? "#c0392b"
                          : show.status === "soon"
                          ? GOLD
                          : "rgba(0,0,0,0.5)",
                      color: show.status === "soon" ? DARK : CREAM,
                    }}
                  >
                    {show.status === "live"
                      ? "● LIVE"
                      : show.status === "soon"
                      ? "Скоро"
                      : "Архив"}
                  </div>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
                    style={{
                      background: "rgba(12,10,9,0.6)",
                      color: CREAM,
                    }}
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
                <div className="p-8">
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: GOLD }}
                  >
                    {show.city}
                  </p>
                  <h3
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "28px",
                      fontWeight: 300,
                    }}
                  >
                    {show.brand}
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "rgba(242,235,217,0.5)" }}
                  >
                    {show.season}
                  </p>
                  <div
                    className="flex gap-6 mt-6 pt-6"
                    style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
                  >
                    <div>
                      <p
                        className="text-xs tracking-widest uppercase"
                        style={{ color: "rgba(242,235,217,0.4)" }}
                      >
                        Дата
                      </p>
                      <p
                        style={{
                          color: GOLD,
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "18px",
                        }}
                      >
                        {show.date}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs tracking-widest uppercase"
                        style={{ color: "rgba(242,235,217,0.4)" }}
                      >
                        Просмотры
                      </p>
                      <p
                        style={{
                          color: GOLD,
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "18px",
                        }}
                      >
                        {show.views}
                      </p>
                    </div>
                  </div>
                  <button
                    className="w-full mt-6 py-3 text-xs tracking-widest uppercase transition-all duration-300"
                    style={{
                      border: `1px solid ${GOLD}`,
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
                    {show.status === "live"
                      ? "Смотреть онлайн"
                      : show.status === "soon"
                      ? "Записаться"
                      : "Смотреть запись"}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* ─── MODAL: ARTICLE ─── */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          onClick={() => setActiveArticle(null)}
          style={{
            background: "rgba(12,10,9,0.92)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{
              border: "1px solid rgba(201,168,76,0.25)",
              background: "#0e0c0b",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                aspectRatio: "16/9",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={activeArticle.img}
                alt={activeArticle.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
                style={{ background: "rgba(12,10,9,0.7)", color: CREAM }}
              >
                <Icon name="X" size={14} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 text-xs tracking-widest uppercase"
                  style={{
                    background: "rgba(201,168,76,0.1)",
                    color: GOLD,
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  {activeArticle.cat}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(242,235,217,0.4)" }}
                >
                  {activeArticle.read} чтения
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(22px,3vw,32px)",
                  lineHeight: 1.3,
                }}
              >
                {activeArticle.title}
              </h3>
              <div
                className="flex justify-between items-center mt-4 mb-6 pt-4"
                style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
              >
                <span
                  className="text-xs"
                  style={{ color: "rgba(242,235,217,0.5)" }}
                >
                  {activeArticle.author}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(242,235,217,0.3)" }}
                >
                  {activeArticle.date}
                </span>
              </div>
              <p
                className="text-sm"
                style={{ color: "rgba(242,235,217,0.6)", lineHeight: 1.9 }}
              >
                Полный текст этой статьи вскоре будет доступен в нашем журнале.
                Мы готовим подробный материал с эксклюзивными фотографиями и
                интервью. Подпишитесь на рассылку, чтобы первыми получить доступ
                к полному тексту.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
