export const IMG = {
  hero: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/977f4c3c-6efd-48df-aa8b-7158d1d942e8.jpg",
  trend1: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/8bc30cb0-59c0-439e-b435-e42582407453.jpg",
  trend2: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/7dffcc1e-6383-4605-b386-f6ac38531933.jpg",
  person: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/2f14c353-4443-43d8-9be9-a6e7cc3cc4d2.jpg",
  model: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/15c0b78a-68ea-44d3-8185-ceb8c1796d29.jpg",
  boutique: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/ce906048-6ae1-41bf-b6d2-4b1c4b82d03d.jpg",
  street: "https://cdn.poehali.dev/projects/a519ab8f-d0e0-4324-a46a-e1a15a0b55a4/files/69bbfe0a-c624-4ac4-a99b-63cedb0d2ce8.jpg",
};

export const NAV_ITEMS = ["Главная", "Тренды", "Новинки", "Топ Моделей", "Иконы Моды", "Журнал", "Подиум", "Контакты"];

export const TRENDS = [
  { id: 1, img: IMG.trend1, category: "Силуэт", title: "Структурированный минимализм", season: "Весна 2025", hot: true },
  { id: 2, img: IMG.trend2, category: "Аксессуары", title: "Золото и жемчуг", season: "Весна 2025", hot: true },
  { id: 3, img: IMG.hero, category: "Вечерняя мода", title: "Драматический шёлк", season: "Лето 2025", hot: false },
  { id: 4, img: IMG.street, category: "Стрит-стайл", title: "Парижский шик", season: "Весна 2025", hot: true },
  { id: 5, img: IMG.trend2, category: "Материалы", title: "Бархат и атлас", season: "Лето 2025", hot: false },
  { id: 6, img: IMG.model, category: "Подиум", title: "Авангард сезона", season: "Лето 2025", hot: false },
];

export const NOVELTIES = [
  { id: 1, img: IMG.trend1, brand: "Maison Margiela", title: "Artisanal SS25", price: "от 280 000 ₽", tag: "Новинка", desc: "Деконструированный пиджак из переработанного кашемира, ручная работа, Париж" },
  { id: 2, img: IMG.trend2, brand: "Valentino", title: "Couture Gold Edition", price: "от 450 000 ₽", tag: "Эксклюзив", desc: "Вечернее платье с золотой вышивкой, лимитированная коллекция 12 штук" },
  { id: 3, img: IMG.hero, brand: "Dior", title: "La Nuit Éternelle", price: "от 380 000 ₽", tag: "Лимитед", desc: "Шёлковое платье с ручной вышивкой французских мастеров, тираж 30 экз." },
  { id: 4, img: IMG.boutique, brand: "Chanel", title: "Le Noir Absolu", price: "от 520 000 ₽", tag: "Новинка", desc: "Маленькое чёрное платье переосмыслено Вирджини Виар для нового века" },
  { id: 5, img: IMG.street, brand: "Bottega Veneta", title: "Intreccio Oro", price: "от 190 000 ₽", tag: "Новинка", desc: "Культовое плетение интречато в золотом исполнении, телячья кожа" },
  { id: 6, img: IMG.model, brand: "Balenciaga", title: "Void Collection", price: "от 95 000 ₽", tag: "Эксклюзив", desc: "Деструктивный авангард — новый сезон от Демны" },
];

export const TOP_MODELS = [
  { id: 1, img: IMG.model, name: "Белла Хадид", country: "🇺🇸 США", rating: 98, followers: "52.1M", campaigns: 47, agency: "IMG Models", trend: "+2" },
  { id: 2, img: IMG.person, name: "Кендалл Дженнер", country: "🇺🇸 США", rating: 96, followers: "291M", campaigns: 38, agency: "Society Management", trend: "0" },
  { id: 3, img: IMG.street, name: "Адут Акеч", country: "🇦🇺 Австралия", rating: 95, followers: "2.1M", campaigns: 29, agency: "DNA Models", trend: "+5" },
  { id: 4, img: IMG.hero, name: "Палома Эльсессер", country: "🇺🇸 США", rating: 93, followers: "1.8M", campaigns: 24, agency: "Ford Models", trend: "+8" },
  { id: 5, img: IMG.trend1, name: "Ся Суй", country: "🇨🇳 Китай", rating: 91, followers: "3.2M", campaigns: 31, agency: "Elite Model", trend: "+3" },
  { id: 6, img: IMG.boutique, name: "Валентина Сампайо", country: "🇧🇷 Бразилия", rating: 90, followers: "4.5M", campaigns: 22, agency: "Storm Models", trend: "+1" },
  { id: 7, img: IMG.trend2, name: "Хайтон Дикон", country: "🇬🇧 Великобритания", rating: 88, followers: "890K", campaigns: 19, agency: "Next Models", trend: "+12" },
  { id: 8, img: IMG.model, name: "Иман Хаммам", country: "🇳🇱 Нидерланды", rating: 87, followers: "1.1M", campaigns: 17, agency: "Women Management", trend: "+4" },
];

export const FASHION_ICONS = [
  { id: 1, img: IMG.person, name: "Кейт Мосс", title: "Легенда британского стиля", era: "1990 — наши дни", quote: "«Мода — это не о платьях. Это о жизни.»", insta: "61.4M", awards: 28 },
  { id: 2, img: IMG.hero, name: "Наоми Кэмпбелл", title: "Богиня подиума", era: "1986 — наши дни", quote: "«Красота — это уверенность, которую ты несёшь.»", insta: "12.2M", awards: 45 },
  { id: 3, img: IMG.street, name: "Карла Бруни", title: "Муза Valentino и Givenchy", era: "1987 — 2000", quote: "«Элегантность — это отказ.»", insta: "2.3M", awards: 19 },
  { id: 4, img: IMG.boutique, name: "Карин Ройтфельд", title: "Редактор-легенда Vogue Paris", era: "1978 — наши дни", quote: "«Стиль — это то, что нельзя купить.»", insta: "1.8M", awards: 34 },
  { id: 5, img: IMG.model, name: "Надя Ауэрманн", title: "Суперандрогин 90-х", era: "1990 — 2000", quote: "«Подиум — это моя сцена, моё всё.»", insta: "340K", awards: 16 },
  { id: 6, img: IMG.trend1, name: "Линда Евангелиста", title: "Икона трансформаций", era: "1984 — 2002", quote: "«Я не встаю с постели меньше чем за 10 000$.»", insta: "2.1M", awards: 52 },
];

export const NEWS_FEED = [
  { id: 1, time: "2 мин назад", text: "Chanel анонсировала коллаборацию с Фаррелом Уильямсом", hot: true },
  { id: 2, time: "15 мин назад", text: "Белла Хадид возвращается на подиум после паузы", hot: true },
  { id: 3, time: "1 час назад", text: "Valentino представил новый аромат La Nuit Rose Couture", hot: false },
  { id: 4, time: "2 часа назад", text: "Paris Fashion Week 2025 — расписание показов опубликовано", hot: false },
  { id: 5, time: "3 часа назад", text: "LVMH зафиксировала рекордную выручку в I квартале 2025", hot: false },
  { id: 6, time: "5 часов назад", text: "Новый креативный директор Gucci представлен официально", hot: true },
  { id: 7, time: "6 часов назад", text: "Dior открывает флагман в Дубае на 3 этажа", hot: false },
  { id: 8, time: "8 часов назад", text: "Sustainable Fashion Week прошла в Стокгольме", hot: false },
];

export const QUIZ_QUESTIONS = [
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

export const STYLE_RESULTS: Record<string, { title: string; desc: string; brands: string[] }> = {
  classic: { title: "Классический Шик", desc: "Вы — воплощение вечной элегантности. Ваш стиль вне времени и трендов.", brands: ["Chanel", "Saint Laurent", "Max Mara"] },
  romantic: { title: "Романтичная Муза", desc: "Вы верите в красоту деталей — кружева, цветы и нежные оттенки.", brands: ["Valentino", "Dior", "Zimmermann"] },
  minimal: { title: "Современный Минимализм", desc: "Вы цените качество и простоту. Меньше — значит больше.", brands: ["The Row", "Bottega Veneta", "Jil Sander"] },
  avantgarde: { title: "Авангардный Визионер", desc: "Вы нарушаете правила и создаёте новые. Мода — ваш язык.", brands: ["Comme des Garçons", "Balenciaga", "Maison Margiela"] },
};

export const RUNWAY_SHOWS = [
  { id: 1, brand: "Chanel", season: "Haute Couture AW25", date: "22 янв 2025", city: "Париж", img: IMG.boutique, views: "4.2M", status: "live" },
  { id: 2, brand: "Dior", season: "Prêt-à-Porter SS25", date: "28 фев 2025", city: "Париж", img: IMG.hero, views: "3.8M", status: "soon" },
  { id: 3, brand: "Valentino", season: "Couture SS25", date: "5 мар 2025", city: "Рим", img: IMG.trend2, views: "2.1M", status: "archive" },
  { id: 4, brand: "Balenciaga", season: "SS25 Show", date: "12 мар 2025", city: "Париж", img: IMG.model, views: "5.6M", status: "archive" },
  { id: 5, brand: "Gucci", season: "Cruise 2025", date: "20 апр 2025", city: "Рим", img: IMG.street, views: "1.9M", status: "soon" },
  { id: 6, brand: "Hermès", season: "SS25", date: "30 апр 2025", city: "Париж", img: IMG.trend1, views: "890K", status: "soon" },
];

export const MAGAZINE_ARTICLES = [
  { id: 1, img: IMG.street, cat: "Стрит-стайл", title: "Парижская неделя моды: лучшие образы с улиц", author: "Мария Дюваль", date: "10 апр 2025", read: "6 мин" },
  { id: 2, img: IMG.boutique, cat: "Интервью", title: "Вирджини Виар: «Я создаю для женщин, а не для прессы»", author: "Анна Лебо", date: "8 апр 2025", read: "12 мин" },
  { id: 3, img: IMG.model, cat: "Тренды", title: "10 цветов, которые определят лето 2025", author: "Клод Мартен", date: "5 апр 2025", read: "4 мин" },
  { id: 4, img: IMG.hero, cat: "История моды", title: "Как Cristóbal Balenciaga изменил силуэт навсегда", author: "Пьер Фабре", date: "2 апр 2025", read: "15 мин" },
  { id: 5, img: IMG.trend1, cat: "Sustainability", title: "Зелёная мода: бренды, которые меняют индустрию", author: "Эмма Уотс", date: "30 мар 2025", read: "8 мин" },
  { id: 6, img: IMG.trend2, cat: "Красота", title: "Макияж с подиума: как повторить образы сезона дома", author: "Ноэми Дюбуа", date: "28 мар 2025", read: "5 мин" },
];

export const GOLD = "var(--gold)";
export const CREAM = "#F2EBD9";
export const DARK = "#0C0A09";
