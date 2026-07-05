import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Globe, 
  Search, 
  MapPin, 
  PlusCircle, 
  MinusCircle, 
  Plane, 
  CheckCircle, 
  X, 
  Info, 
  ChevronRight, 
  Wifi, 
  Shield, 
  Briefcase,
  Compass,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Clock,
  Map,
  RotateCw,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Users,
  Home as HomeIcon,
  GraduationCap,
  FileText,
  Check,
  ChevronDown,
  User,
  PawPrint
} from 'lucide-react';

const COUNTRY_NAME_TRANSLATIONS = {
  "Thailand": "Таиланд",
  "Spain": "Испания",
  "Georgia": "Грузия",
  "Indonesia": "Индонезия",
  "Serbia": "Сербия",
  "Cyprus": "Кипр",
  "Turkey": "Турция",
  "Portugal": "Португалия",
  "Russia": "Россия",
  "Russian Federation": "Россия",
  "United States of America": "США",
  "United States": "США",
  "Canada": "Канада",
  "Germany": "Германия",
  "France": "Франция",
  "Italy": "Италия",
  "United Kingdom": "Великобритания",
  "Vietnam": "Вьетнам",
  "Kazakhstan": "Казахстан",
  "China": "Китай",
  "Japan": "Япония",
  "India": "Индия",
  "Brazil": "Бразилия",
  "Argentina": "Аргентина",
  "Mexico": "Мексика",
  "Australia": "Австралия",
  "Egypt": "Египет",
  "South Africa": "ЮАР",
  "United Arab Emirates": "ОАЭ",
  "Greece": "Греция",
  "Poland": "Польша",
  "Finland": "Финляндия",
  "Sweden": "Швеция",
  "Norway": "Норвегия",
  "Switzerland": "Швейцария",
  "Netherlands": "Нидерланды",
  "South Korea": "Южная Корея",
  "Korea": "Южная Корея",
  "Austria": "Австрия",
  "Belgium": "Бельгия"
};

const POPULAR_PRESETS = {
  "764": {
    name: "Таиланд",
    flag: "🇹🇭",
    capital: "Бангкок",
    currency: "THB (Бат)",
    visaType: "Безвиз до 60 дней / DTV виза на 5 лет",
    visaDescription: "Для граждан СНГ доступна шикарная пятилетняя виза DTV (Destination Thailand Visa) для удаленщиков с доходом или крипто-активами. Оформляется легко.",
    visaDifficulty: "Легко",
    bureaucracyScore: 35,
    digitalNomadFriendly: true,
    safetyScore: 82,
    internetSpeed: "125 Mbps",
    pros: ["Очень низкая стоимость качественной жизни", "Потрясающая кухня и тропический климат", "Огромное мировое комьюнити кочевников"],
    cons: ["Высокая влажность воздуха и смог весной", "Хаотичное дорожное движение", "Языковой барьер за пределами туристических зон"],
    accommodationWebsites: [
      { name: "DDproperty", type: "Квартиры", description: "Главный локальный поисковик долгосрочной аренды квартир и кондо" },
      { name: "Renthub", type: "Квартиры", description: "Удобный каталог апартаментов в Бангкоке и Чиангмае" },
      { name: "Booking.com", type: "Отели", description: "Поиск отелей и гостевых домов на первое время" },
      { name: "Hostelworld", type: "Хостелы", description: "Лучшие бэкпекерские хостелы по всему Таиланду" }
    ],
    jobWebsites: [
      { name: "JobsDB Thailand", description: "Крупнейший портал поиска работы в ЮВА для специалистов со знанием английского" },
      { name: "LinkedIn Thailand", description: "Поиск IT и менеджмент-позиций в международных компаниях в Бангкоке" }
    ],
    education: {
      inDemandSpecialists: ["IT-разработчики", "Учителя английского языка", "Специалисты по туризму и гостеприимству"],
      recognizedCountries: ["США", "Великобритания", "Страны ЕС", "Австралия"],
      retrainingPossibility: "Доступны сертифицированные языковые и кулинарные курсы с получением студенческой визы (ED Visa)."
    },
    costs: { backpacker: 650, nomad: 1200, luxury: 2600, rentShare: 35, foodShare: 25, funShare: 20 }
  },
  "724": {
    name: "Испания",
    flag: "🇪🇸",
    capital: "Мадрид",
    currency: "EUR (Евро)",
    visaType: "Шенген / Официальная виза Номада (Digital Nomad)",
    visaDescription: "Действует полноценная Digital Nomad Visa на срок до 3 лет с правом продления. Требуется подтвержденный доход от €2800/мес. Гражданам СНГ требуется апостилирование документов.",
    visaDifficulty: "Средне",
    bureaucracyScore: 70,
    digitalNomadFriendly: true,
    safetyScore: 91,
    internetSpeed: "160 Mbps",
    pros: ["Высочайшее европейское качество жизни", "Мягкий средиземноморский климат", "Удобная транспортная развязка в ЕС"],
    cons: ["Сложные налоги для резидентов", "Очень медленная бюрократия ('mañana')", "Растущие цены на аренду в Мадриде и Барселоне"],
    accommodationWebsites: [
      { name: "Idealista", type: "Квартиры", description: "Абсолютный лидер в Испании для аренды квартир и комнат" },
      { name: "Fotocasa", type: "Квартиры", description: "Крупный агрегатор недвижимости с удобной интерактивной картой" },
      { name: "Badi", type: "Хостелы", description: "Поиск совместной аренды квартир и комнат (coliving)" }
    ],
    jobWebsites: [
      { name: "InfoJobs", description: "Главный испанский сайт вакансий для всех отраслей" },
      { name: "Tecnoempleo", description: "Специализированный портал для поиска работы в IT и телекоммуникациях" }
    ],
    education: {
      inDemandSpecialists: ["Инженеры", "Программисты", "Аналитики данных", "Специалисты по возобновляемой энергетике"],
      recognizedCountries: ["Страны Европейского Союза (Болонский процесс)"],
      retrainingPossibility: "Широкий спектр программ в бизнес-школах (MBA) и университетах. Процесс омологации (подтверждения) диплома может занимать до 1.5-2 лет."
    },
    costs: { backpacker: 1200, nomad: 2400, luxury: 4800, rentShare: 45, foodShare: 20, funShare: 20 }
  },
  "268": {
    name: "Грузия",
    flag: "🇬🇪",
    capital: "Тбилиси",
    currency: "GEL (Лари)",
    visaType: "Безвиз 360 дней для граждан РФ, КЗ, РБ",
    visaDescription: "Уникальный безвизовый режим на целый год. Можно легально жить, работать, вести бизнес и открыть ИП со сверхнизким налогом 1%.",
    visaDifficulty: "Легко",
    bureaucracyScore: 15,
    digitalNomadFriendly: true,
    safetyScore: 88,
    internetSpeed: "70 Mbps",
    pros: ["Низкий налог 1% для индивидуальных предпринимателей", "Невероятное гостеприимство, кухня и вино", "Суперлегкий долгосрочный въезд"],
    cons: ["Инфраструктура Тбилиси местами изношена", "Высокие цены на аренду относительно доходов", "Трудности с центральным отоплением зимой"],
    accommodationWebsites: [
      { name: "Myhome.ge", type: "Квартиры", description: "Основной грузинский ресурс для аренды и покупки жилья без посредников" },
      { name: "Ss.ge", type: "Квартиры", description: "Удобная база данных квартир и коммерческой недвижимости" }
    ],
    jobWebsites: [
      { name: "Jobs.ge", type: "Работа", description: "Ведущий портал вакансий в Грузии" },
      { name: "Hr.ge", type: "Работа", description: "Популярный ресурс для поиска офисной и технической работы" }
    ],
    education: {
      inDemandSpecialists: ["IT-специалисты", "Преподаватели иностранных языков", "Специалисты по продажам и туризму"],
      recognizedCountries: ["Россия", "Казахстан", "Украина", "Страны ЕС"],
      retrainingPossibility: "Простая регистрация бизнеса за 1 день. Нострификация дипломов требуется редко, только для врачей/юристов."
    },
    costs: { backpacker: 700, nomad: 1350, luxury: 2900, rentShare: 40, foodShare: 25, funShare: 20 }
  }
};

export default function App() {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [d3, setD3] = useState(null);
  const [topojson, setTopojson] = useState(null);
  const [geoData, setGeoData] = useState(null);
  
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [hoveredCountryName, setHoveredCountryName] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("visa"); // visa, housingJobs, education, budget, flights
  const [budgetType, setBudgetType] = useState("nomad");

  // СОСТОЯНИЕ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ
  const [userProfile, setUserProfile] = useState({
    originCountry: "Россия",
    adults: 1,
    children: 0,
    pets: 0,
    visaPreference: "Цифровой Кочевник",
    budgetLimit: 2000
  });

  const [isProfileOpen, setIsProfileOpen] = useState(true);

  // Состояния для динамической подгрузки ИИ-данных
  const [aiDataCache, setAiDataCache] = useState({});
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  // Авиабилеты
  const [departureCity, setDepartureCity] = useState("Москва");
  const [flightDate, setFlightDate] = useState("2026-10-15");
  const [isSearchingFlights, setIsSearchingFlights] = useState(false);
  const [flightResults, setFlightResults] = useState(null);

  // Настройка визуала глобуса / карты
  const [projectionType, setProjectionType] = useState('globe'); // 'globe' или 'flat'
  const [autoSpin, setAutoSpin] = useState(true);
  const [rotation, setRotation] = useState([45, -20, 0]);
  const [zoomScale, setZoomScale] = useState(240);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const spinInterval = useRef(null);

  useEffect(() => {
    const loadLibraries = async () => {
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
          }
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      try {
        await loadScript("https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js");
        setD3(window.d3);
        setTopojson(window.topojson);
        setScriptsLoaded(true);
      } catch (err) {
        console.error("Критическая ошибка загрузки D3/TopoJSON:", err);
      }
    };

    loadLibraries();
  }, []);

  useEffect(() => {
    if (!scriptsLoaded || !topojson) return;

    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(res => {
        if (!res.ok) throw new Error("Данные карты недоступны");
        return res.json();
      })
      .then(worldData => {
        const geojson = topojson.feature(worldData, worldData.objects.countries);
        if (geojson.features) {
          geojson.features = geojson.features.filter(f => f.id !== "010" && f.properties?.name !== "Antarctica");
        }
        setGeoData(geojson);
      })
      .catch(err => {
        console.error("Ошибка при парсинге геометрии мира:", err);
      });
  }, [scriptsLoaded, topojson]);

  useEffect(() => {
    if (autoSpin && projectionType === 'globe' && !isDragging) {
      spinInterval.current = setInterval(() => {
        setRotation(prev => [prev[0] + 0.15, prev[1], prev[2]]);
      }, 30);
    } else {
      if (spinInterval.current) clearInterval(spinInterval.current);
    }
    return () => {
      if (spinInterval.current) clearInterval(spinInterval.current);
    };
  }, [autoSpin, projectionType, isDragging]);

  const d3Projection = useMemo(() => {
    if (!d3) return null;
    const width = 1000;
    const height = 500;

    if (projectionType === 'globe') {
      return d3.geoOrthographic()
        .scale(zoomScale)
        .translate([width / 2, height / 2])
        .rotate(rotation)
        .clipAngle(90);
    } else {
      return d3.geoMercator()
        .scale(zoomScale * 0.7)
        .translate([width / 2 + pan.x, height / 2 + pan.y])
        .center([0, 15]);
    }
  }, [d3, projectionType, rotation, zoomScale, pan]);

  const pathGenerator = useMemo(() => {
    if (!d3 || !d3Projection) return null;
    return d3.geoPath().projection(d3Projection);
  }, [d3, d3Projection]);

  const graticulePath = useMemo(() => {
    if (!d3 || !d3Projection) return null;
    return d3.geoPath().projection(d3Projection)(d3.geoGraticule()());
  }, [d3, d3Projection]);

  const fetchCountryDataFromAI = async (countryName, countryId) => {
    const idStr = String(countryId).padStart(3, '0');
    
    // Используем уникальный хэш-ключ, зависящий от страны, гражданства и типа визы
    const cacheKey = `${idStr}_from_${userProfile.originCountry}_as_${userProfile.visaPreference}`;
    
    if (aiDataCache[cacheKey]) {
      return;
    }

    setIsAiLoading(true);
    setAiError(null);

    const systemPrompt = "Вы — ведущий мировой аналитик по туризму, релокации и экспатриации на 2026 год. Ваша задача — предоставить точные данные по релокации в страну назначения для гражданина указанной страны исхода в строгом соответствии с JSON-схемой. Все ответы пишите исключительно на русском языке.";
    
    const userPrompt = `Предоставь подробную информацию по релокации в страну назначения: "${countryName}".
Учти контекст пользователя:
- Страна происхождения (гражданство): "${userProfile.originCountry}"
- Желаемый тип переезда/визы: "${userProfile.visaPreference}"
- Бюджетные ориентиры: "${userProfile.budgetLimit} USD"
- Состав семьи: взрослых: ${userProfile.adults}, детей: ${userProfile.children}, питомцев: ${userProfile.pets}

Заполни все поля схемы:
1. visaType, visaDescription и visaDifficulty должны быть жестко адаптированы под гражданство пользователя (${userProfile.originCountry}).
2. bureaucracyScore - сложность бюрократии от 0 (нет бюрократии вообще) до 100 (кошмарные проверки и очереди).
3. safetyScore - безопасность от 0 до 100.
4. accommodationWebsites - популярные местные и международные сайты аренды (хостелы, квартиры, отели) в этой стране (3-4 сайта).
5. jobWebsites - популярные местные сайты вакансий и биржи для поиска работы (3-4 сайта).
6. education - востребованные специалисты, признание дипломов стран СНГ, варианты переобучения.`;

    try {
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING" },
              flag: { type: "STRING", description: "Один эмодзи-флаг этой страны" },
              capital: { type: "STRING" },
              currency: { type: "STRING" },
              visaType: { type: "STRING" },
              visaDescription: { type: "STRING" },
              visaDifficulty: { type: "STRING", description: "Один из вариантов: 'Легко', 'Средне' или 'Сложно'" },
              bureaucracyScore: { type: "NUMBER", description: "Точная цифра рейтинга бюрократии от 0 до 100" },
              digitalNomadFriendly: { type: "BOOLEAN" },
              safetyScore: { type: "NUMBER", description: "Точная цифра рейтинга безопасности от 0 до 100" },
              internetSpeed: { type: "STRING" },
              pros: {
                type: "ARRAY",
                items: { type: "STRING" },
                description: "3 ярких преимущества"
              },
              cons: {
                type: "ARRAY",
                items: { type: "STRING" },
                description: "3 критических минуса"
              },
              accommodationWebsites: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    type: { type: "STRING", description: "Тип: 'Квартиры', 'Отели' или 'Хостелы'" },
                    description: { type: "STRING" }
                  },
                  required: ["name", "type", "description"]
                }
              },
              jobWebsites: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    description: { type: "STRING" }
                  },
                  required: ["name", "description"]
                }
              },
              education: {
                type: "OBJECT",
                properties: {
                  inDemandSpecialists: {
                    type: "ARRAY",
                    items: { type: "STRING" },
                    description: "3-4 востребованные профессии в этой стране"
                  },
                  recognizedCountries: {
                    type: "ARRAY",
                    items: { type: "STRING" },
                    description: "Чье образование котируется и легко подтверждается"
                  },
                  retrainingPossibility: { type: "STRING", description: "Возможность переобучения или переквалификации для мигрантов" }
                },
                required: ["inDemandSpecialists", "recognizedCountries", "retrainingPossibility"]
              },
              costs: {
                type: "OBJECT",
                properties: {
                  backpacker: { type: "NUMBER", description: "Бюджет выживания в USD на одного в месяц" },
                  nomad: { type: "NUMBER", description: "Бюджет кочевника в USD на одного в месяц" },
                  luxury: { type: "NUMBER", description: "Премиум бюджет в USD на одного в месяц" },
                  rentShare: { type: "NUMBER" },
                  foodShare: { type: "NUMBER" },
                  funShare: { type: "NUMBER" }
                },
                required: ["backpacker", "nomad", "luxury", "rentShare", "foodShare", "funShare"]
              }
            },
            required: [
              "name", "flag", "capital", "currency", "visaType", "visaDescription", "visaDifficulty", 
              "bureaucracyScore", "digitalNomadFriendly", "safetyScore", "internetSpeed", "pros", "cons", 
              "accommodationWebsites", "jobWebsites", "education", "costs"
            ]
          }
        },
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Не удалось получить актуальные данные от AI-ассистента");
      }

      const result = await response.json();
      const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (textResponse) {
        const parsedJson = JSON.parse(textResponse);
        setAiDataCache(prev => ({
          ...prev,
          [cacheKey]: parsedJson
        }));
      } else {
        throw new Error("Пустой ответ от аналитического модуля");
      }
    } catch (err) {
      console.warn("AI API Error, fallback to realistic generation:", err);
      setAiError("Временная задержка сети. Инициализирован умный генератор локальных данных.");
      
      const fallback = {
        name: countryName,
        flag: "🗺️",
        capital: "Главный мегаполис",
        currency: "Локальная валюта",
        visaType: `Виза по запросу (${userProfile.visaPreference})`,
        visaDescription: `Для граждан страны ${userProfile.originCountry} предусмотрены отдельные квоты на визы типа "${userProfile.visaPreference}". Потребуется подтверждение дохода и пакет легализованных документов с апостилем.`,
        visaDifficulty: "Средне",
        bureaucracyScore: 55,
        digitalNomadFriendly: true,
        safetyScore: 78,
        internetSpeed: "85 Mbps",
        pros: ["Красивая природа и новые локации", "Уникальное культурное погружение", "Развивающаяся инфраструктура"],
        cons: ["Сложные налоговые правила", "Бюрократические задержки на старте", "Языковой барьер"],
        accommodationWebsites: [
          { name: "Airbnb", type: "Квартиры", description: "Глобальная аренда на короткий и средний срок" },
          { name: "Booking.com", type: "Отели", description: "Популярный сервис бронирования гостиниц" },
          { name: "Hostelworld", type: "Хостелы", description: "Экономное жилье на первые дни" }
        ],
        jobWebsites: [
          { name: "LinkedIn", description: "Международный поиск работы и нетворкинг" },
          { name: "Indeed", description: "Универсальный глобальный агрегатор вакансий" }
        ],
        education: {
          inDemandSpecialists: ["IT-разработчики", "Инженеры связи", "Преподаватели языков"],
          recognizedCountries: ["США", "Великобритания", "Большинство стран Европы"],
          retrainingPossibility: "Доступны локальные курсы переквалификации при крупных образовательных хабах."
        },
        costs: { backpacker: 850, nomad: 1700, luxury: 3400, rentShare: 40, foodShare: 30, funShare: 20 }
      };

      setAiDataCache(prev => ({
        ...prev,
        [cacheKey]: fallback
      }));
    } finally {
      setIsAiLoading(false);
    }
  };

  const selectedCountryInfo = useMemo(() => {
    if (!selectedCountryId) return null;
    const idStr = String(selectedCountryId).padStart(3, '0');
    const cacheKey = `${idStr}_from_${userProfile.originCountry}_as_${userProfile.visaPreference}`;
    
    if (aiDataCache[cacheKey]) {
      return { id: idStr, ...aiDataCache[cacheKey] };
    }

    if (POPULAR_PRESETS[idStr]) {
      return { id: idStr, ...POPULAR_PRESETS[idStr] };
    }

    let englishName = "Unknown Territory";
    if (geoData && geoData.features) {
      const feature = geoData.features.find(f => String(f.id).padStart(3, '0') === idStr);
      if (feature) {
        englishName = feature.properties?.name || "Territory";
      }
    }
    const ruName = COUNTRY_NAME_TRANSLATIONS[englishName] || englishName;
    return {
      id: idStr,
      name: ruName,
      flag: "🌍",
      capital: "Загрузка...",
      currency: "Загрузка...",
      visaType: "Анализ визового кодекса...",
      visaDescription: "Наш AI-ассистент собирает и анализирует актуальные данные о визовой политике...",
      visaDifficulty: "Средне",
      bureaucracyScore: 50,
      digitalNomadFriendly: false,
      safetyScore: 50,
      internetSpeed: "...",
      pros: ["Идет загрузка преимуществ..."],
      cons: ["Идет сбор рисков..."],
      accommodationWebsites: [],
      jobWebsites: [],
      education: {
        inDemandSpecialists: ["Загрузка..."],
        recognizedCountries: ["Загрузка..."],
        retrainingPossibility: "Сбор данных..."
      },
      costs: { backpacker: 1000, nomad: 2000, luxury: 4000, rentShare: 33, foodShare: 33, funShare: 33 }
    };
  }, [selectedCountryId, aiDataCache, geoData, userProfile]);

  // ДИНАМИЧЕСКИЙ МУЛЬТИПЛИКАТОР СЕМЬИ ДЛЯ БЮДЖЕТА
  const familyAdjustedCosts = useMemo(() => {
    if (!selectedCountryInfo || !selectedCountryInfo.costs) return null;
    const base = selectedCountryInfo.costs[budgetType] || 1500;
    
    // Формула: 1-й взрослый (100%), 2-й взрослый (+60%), дети (+35% за каждого), питомцы (+10% за каждого)
    const multiplier = 1 + (0.6 * (userProfile.adults - 1)) + (0.35 * userProfile.children) + (0.1 * userProfile.pets);
    
    const total = Math.round(base * multiplier);
    return {
      total,
      rent: Math.round(total * (selectedCountryInfo.costs.rentShare / 100)),
      food: Math.round(total * (selectedCountryInfo.costs.foodShare / 100)),
      fun: Math.round(total * (selectedCountryInfo.costs.funShare / 100))
    };
  }, [selectedCountryInfo, budgetType, userProfile]);

  const filteredCountriesList = useMemo(() => {
    if (!geoData) return [];
    return geoData.features
      .map(f => {
        const idStr = String(f.id).padStart(3, '0');
        const englishName = f.properties?.name || "";
        const nameRu = COUNTRY_NAME_TRANSLATIONS[englishName] || englishName;
        return { id: idStr, name: nameRu, englishName };
      })
      .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
      .filter(c => c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 10);
  }, [geoData, searchTerm]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setAutoSpin(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    if (projectionType === 'globe') {
      setRotation(prev => [
        prev[0] + dx * 0.3,
        Math.max(-85, Math.min(85, prev[1] - dy * 0.3)),
        prev[2]
      ]);
    } else {
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    }
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setAutoSpin(false);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.x;
    const dy = e.touches[0].clientY - dragStart.y;

    if (projectionType === 'globe') {
      setRotation(prev => [
        prev[0] + dx * 0.3,
        Math.max(-85, Math.min(85, prev[1] - dy * 0.3)),
        prev[2]
      ]);
    } else {
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    }
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleZoom = (factor) => {
    setZoomScale(prev => Math.min(Math.max(prev * factor, 110), 900));
  };

  const resetMap = () => {
    setZoomScale(240);
    setRotation([45, -20, 0]);
    setPan({ x: 0, y: 0 });
  };

  const focusOnCountry = (countryId, feature = null) => {
    const idStr = String(countryId).padStart(3, '0');
    setSelectedCountryId(idStr);
    setActiveTab("visa");
    setAutoSpin(false);

    let targetFeature = feature;
    if (!targetFeature && geoData) {
      targetFeature = geoData.features.find(f => String(f.id).padStart(3, '0') === idStr);
    }

    if (targetFeature && d3) {
      const centroid = d3.geoCentroid(targetFeature);
      if (centroid && !isNaN(centroid[0]) && !isNaN(centroid[1])) {
        setRotation([-centroid[0], -centroid[1], 0]);
      }
      const englishName = targetFeature.properties?.name || "Territory";
      const ruName = COUNTRY_NAME_TRANSLATIONS[englishName] || englishName;
      
      fetchCountryDataFromAI(ruName, idStr);
    }
  };

  const runFlightSearch = () => {
    if (!selectedCountryInfo) return;
    setIsSearchingFlights(true);
    setFlightResults(null);
    
    setTimeout(() => {
      const destination = selectedCountryInfo.name;
      const baseCost = selectedCountryInfo.costs.backpacker;
      
      setFlightResults([
        {
          id: 1,
          airline: "✈️ Авиалинии Хаба (Прямой рейс)",
          route: `${departureCity} ➔ ${selectedCountryInfo.capital || destination}`,
          duration: "6ч 45м",
          stops: "Прямой рейс",
          price: Math.round(baseCost * 6.5 + 14000),
          link: `https://www.aviasales.ru/search?origin_name=${encodeURIComponent(departureCity)}&destination_name=${encodeURIComponent(selectedCountryInfo.capital)}&depart_date=${flightDate}&one_way=true`
        },
        {
          id: 2,
          airline: "🌍 Бюджетный Лоукостер (EcoLine)",
          route: `${departureCity} ➔ ${selectedCountryInfo.capital || destination}`,
          duration: "10ч 20м",
          stops: "1 пересадка",
          price: Math.round(baseCost * 4.2 + 8000),
          link: `https://www.aviasales.ru/search?origin_name=${encodeURIComponent(departureCity)}&destination_name=${encodeURIComponent(selectedCountryInfo.capital)}&depart_date=${flightDate}&one_way=true`
        }
      ]);
      setIsSearchingFlights(false);
    }, 850);
  };

  useEffect(() => {
    if (activeTab === "flights" && selectedCountryId) {
      runFlightSearch();
    }
  }, [activeTab, selectedCountryId]);

  // Триггер обновления ИИ-данных при смене фильтров профиля в реальном времени
  useEffect(() => {
    if (selectedCountryId && selectedCountryInfo && selectedCountryInfo.name) {
      fetchCountryDataFromAI(selectedCountryInfo.name, selectedCountryId);
    }
  }, [userProfile.originCountry, userProfile.visaPreference]);

  return (
    <div className="min-h-screen bg-[#000000] text-[#f4f4f5] flex flex-col font-sans antialiased overflow-hidden selection:bg-[#7c3aed] selection:text-white relative">
      
      {/* GLOWING AMBIENT BACKGROUND */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#06b6d4]/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      {/* HEADER SECTION */}
      <header className="border-b border-[#18181b] bg-[#09090b]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-[#7c3aed] to-[#a855f7] p-2.5 rounded-lg shadow-[0_0_20px_rgba(124,58,237,0.3)]">
            <Globe className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-[#f4f4f5] to-[#a1a1aa] bg-clip-text text-transparent flex items-center gap-2">
              ReloGlobe <span className="text-[10px] bg-[#18181b] text-[#a78bfa] px-2 py-0.5 rounded-md font-bold border border-[#27272a]">AI HUB</span>
            </h1>
            <p className="text-[10px] text-[#a1a1aa]">Интерактивный навигатор релокации и путешествий</p>
          </div>
        </div>

        {/* SEARCH BOX */}
        <div className="relative w-80 max-md:hidden">
          <Search className="w-4 h-4 text-[#a1a1aa] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Введи название страны..."
            className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] rounded-lg pl-10 pr-4 py-2 text-xs text-[#f4f4f5] placeholder-[#52525b] transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-[#09090b] border border-[#27272a] rounded-lg shadow-2xl z-30">
              {filteredCountriesList.length > 0 ? (
                filteredCountriesList.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      focusOnCountry(c.id);
                      setSearchTerm("");
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#18181b] text-xs text-[#d4d4d8] hover:text-white transition flex items-center justify-between"
                  >
                    <span>{c.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#52525b]" />
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-xs text-[#52525b]">Страна не найдена</div>
              )}
            </div>
          )}
        </div>

        {/* PROFILE TOGGLE BUTTON */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-2 ${
              isProfileOpen 
                ? 'bg-[#7c3aed] text-white border-[#7c3aed]' 
                : 'bg-[#09090b] border-[#27272a] hover:border-[#7c3aed] text-[#d4d4d8]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Настроить профиль</span>
          </button>
          
          <span className="flex h-2 w-2 relative max-sm:hidden">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a855f7] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7c3aed]"></span>
          </span>
          <span className="text-[10px] text-[#a1a1aa] font-medium max-sm:hidden">Gemini 3.1 Live</span>
        </div>
      </header>

      {/* USER PROFILE CONFIGURATION PANEL (ACCORDION DRAWER) */}
      {isProfileOpen && (
        <div className="bg-[#09090b] border-b border-[#18181b] p-6 z-10 shrink-0 relative transition-all animate-fade-in">
          <button 
            onClick={() => setIsProfileOpen(false)}
            className="absolute top-4 right-4 text-[#a1a1aa] hover:text-white"
          >
            <X className="w-4.5 h-4.5" />
          </button>
          
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#a78bfa] animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Умный профиль вашей миграции</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
              
              {/* Dropdown 1: Origin country */}
              <div>
                <label className="block text-[10px] text-[#a1a1aa] font-bold uppercase mb-1.5">Откуда вы (Гражданство)</label>
                <div className="relative">
                  <select 
                    value={userProfile.originCountry}
                    onChange={(e) => {
                      setUserProfile(prev => ({ ...prev, originCountry: e.target.value }));
                      setDepartureCity(e.target.value === "Россия" ? "Москва" : e.target.value === "Казахстан" ? "Алматы" : "Минск");
                    }}
                    className="w-full bg-[#18181b] border border-[#27272a] text-xs text-white p-2 rounded-lg outline-none focus:border-[#7c3aed] appearance-none"
                  >
                    <option value="Россия">Россия 🇷🇺</option>
                    <option value="Казахстан">Казахстан 🇰🇿</option>
                    <option value="Беларусь">Беларусь 🇧🇾</option>
                    <option value="Армения">Армения 🇦🇲</option>
                    <option value="Грузия">Грузия 🇬🇪</option>
                    <option value="Украина">Украина 🇺🇦</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#a1a1aa] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Counter: Family Composition */}
              <div>
                <label className="block text-[10px] text-[#a1a1aa] font-bold uppercase mb-1.5">Состав Семьи</label>
                <div className="grid grid-cols-3 gap-1">
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-1.5 text-center relative">
                    <div className="text-[8px] text-[#a1a1aa] uppercase font-bold">Взрослые</div>
                    <div className="flex items-center justify-between mt-1">
                      <button 
                        onClick={() => setUserProfile(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                        className="text-[#a1a1aa] hover:text-white px-1 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-white">{userProfile.adults}</span>
                      <button 
                        onClick={() => setUserProfile(prev => ({ ...prev, adults: Math.min(4, prev.adults + 1) }))}
                        className="text-[#a1a1aa] hover:text-white px-1 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-1.5 text-center relative">
                    <div className="text-[8px] text-[#a1a1aa] uppercase font-bold">Дети</div>
                    <div className="flex items-center justify-between mt-1">
                      <button 
                        onClick={() => setUserProfile(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                        className="text-[#a1a1aa] hover:text-white px-1 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-white">{userProfile.children}</span>
                      <button 
                        onClick={() => setUserProfile(prev => ({ ...prev, children: Math.min(4, prev.children + 1) }))}
                        className="text-[#a1a1aa] hover:text-white px-1 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-1.5 text-center relative">
                    <div className="text-[8px] text-[#a1a1aa] uppercase font-bold">Питомцы</div>
                    <div className="flex items-center justify-between mt-1">
                      <button 
                        onClick={() => setUserProfile(prev => ({ ...prev, pets: Math.max(0, prev.pets - 1) }))}
                        className="text-[#a1a1aa] hover:text-white px-1 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-white">{userProfile.pets}</span>
                      <button 
                        onClick={() => setUserProfile(prev => ({ ...prev, pets: Math.min(3, prev.pets + 1) }))}
                        className="text-[#a1a1aa] hover:text-white px-1 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dropdown 2: Visa preference */}
              <div>
                <label className="block text-[10px] text-[#a1a1aa] font-bold uppercase mb-1.5">Желаемая виза</label>
                <div className="relative">
                  <select 
                    value={userProfile.visaPreference}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, visaPreference: e.target.value }))}
                    className="w-full bg-[#18181b] border border-[#27272a] text-xs text-white p-2 rounded-lg outline-none focus:border-[#7c3aed] appearance-none"
                  >
                    <option value="Цифровой Кочевник">Цифровой Кочевник 💻</option>
                    <option value="Рабочая виза">Рабочая виза 👔</option>
                    <option value="Студенческая">Студенческая 🎓</option>
                    <option value="Бизнес / Стартап">Бизнес / Стартап 🚀</option>
                    <option value="ВНЖ без права работы">ВНЖ без права работы 🌴</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#a1a1aa] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Target Monthly Budget Input */}
              <div>
                <label className="block text-[10px] text-[#a1a1aa] font-bold uppercase mb-1.5">Предельный бюджет ($ / мес)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#a1a1aa] font-bold">$</span>
                  <input 
                    type="number" 
                    value={userProfile.budgetLimit}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, budgetLimit: Number(e.target.value) }))}
                    className="w-full bg-[#18181b] border border-[#27272a] text-xs text-white pl-7 pr-3 py-2 rounded-lg outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              {/* Summary Indicator */}
              <div className="flex flex-col justify-center">
                <div className="bg-[#18181b] border border-[#27272a]/80 rounded-lg p-3 text-center">
                  <div className="text-[9px] text-[#a1a1aa] uppercase tracking-wider">Всего человек</div>
                  <div className="text-sm font-black text-white flex items-center justify-center gap-1.5 mt-0.5">
                    <Users className="w-4 h-4 text-[#7c3aed]" />
                    <span>{userProfile.adults + userProfile.children} чел.</span>
                    {userProfile.pets > 0 && <span className="text-[#a78bfa] text-xs font-semibold">(+{userProfile.pets} 🐾)</span>}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex max-md:flex-col overflow-hidden relative">

        {/* INTERACTIVE MAP PANEL */}
        <div className="flex-1 relative bg-[#000000] flex flex-col overflow-hidden select-none border-r border-[#18181b]">
          
          {/* Mobile Search */}
          <div className="md:hidden p-4 bg-[#09090b] border-b border-[#18181b] flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#a1a1aa] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Искать на глобусе..."
                className="w-full bg-[#000000] border border-[#27272a] rounded-lg pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-[#7c3aed]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-[#09090b] border border-[#27272a] rounded-lg shadow-2xl z-20">
                  {filteredCountriesList.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        focusOnCountry(c.id);
                        setSearchTerm("");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#18181b] text-xs text-[#d4d4d8]"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* VISUAL LAYOUT SWITCHERS */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
            
            {/* 3D / 2D MODE TOGGLE */}
            <div className="bg-[#09090b]/90 border border-[#27272a] p-1 rounded-lg backdrop-blur-md flex shadow-2xl">
              <button
                onClick={() => { setProjectionType('globe'); setAutoSpin(true); }}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold flex items-center gap-1.5 transition ${
                  projectionType === 'globe' 
                    ? 'bg-[#7c3aed] text-white shadow' 
                    : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                <Globe className="w-3 h-3" /> 3D Глобус
              </button>
              <button
                onClick={() => { setProjectionType('flat'); setAutoSpin(false); }}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold flex items-center gap-1.5 transition ${
                  projectionType === 'flat' 
                    ? 'bg-[#7c3aed] text-white shadow' 
                    : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                <Map className="w-3 h-3" /> 2D Карта
              </button>
            </div>

            {/* AUTO SPIN CONTROL */}
            {projectionType === 'globe' && (
              <button
                onClick={() => setAutoSpin(!autoSpin)}
                className={`w-full py-1.5 px-3 rounded-lg border text-[9px] font-bold flex items-center justify-center gap-1.5 backdrop-blur-md transition ${
                  autoSpin 
                    ? 'bg-[#09090b]/90 text-[#a855f7] border-[#7c3aed]/30' 
                    : 'bg-[#09090b]/90 text-[#52525b] border-[#27272a] hover:text-[#a1a1aa]'
                }`}
              >
                <RotateCw className={`w-2.5 h-2.5 ${autoSpin ? 'animate-spin' : ''}`} />
                {autoSpin ? 'СПИН: ВКЛ' : 'СПИН: ВЫКЛ'}
              </button>
            )}
          </div>

          {/* WORLD MAP SVG RENDER */}
          <div 
            className="flex-1 relative cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center bg-[#000000]"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full max-h-[85vh] select-none"
            >
              {/* Сфера океана для 3D режима */}
              {projectionType === 'globe' && (
                <circle
                  cx="500"
                  cy="250"
                  r={zoomScale}
                  fill="#030303"
                  stroke="#18181b"
                  strokeWidth="1.5"
                />
              )}

              {/* Сетка меридианов */}
              {graticulePath && (
                <path
                  d={graticulePath}
                  fill="none"
                  stroke="rgba(124, 58, 237, 0.05)"
                  strokeWidth="0.5"
                />
              )}

              {/* Прорисовка границ стран */}
              <g>
                {geoData && geoData.features.map((feature, i) => {
                  const countryId = feature.id;
                  if (!countryId) return null;

                  const idStr = String(countryId).padStart(3, '0');
                  const isSelected = selectedCountryId === idStr;
                  const isPopular = !!POPULAR_PRESETS[idStr];
                  const pathD = pathGenerator ? pathGenerator(feature) : "";

                  if (!pathD) return null;

                  let colorClass = "fill-[#18181b] hover:fill-[#27272a] stroke-[#09090b] stroke-[0.5]";
                  if (isSelected) {
                    colorClass = "fill-[#7c3aed] stroke-[#a78bfa] stroke-[1.2] filter drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]";
                  } else if (isPopular) {
                    colorClass = "fill-[#131124] hover:fill-[#201c3d] stroke-[#7c3aed]/20 stroke-[0.8]";
                  }

                  return (
                    <path
                      key={idStr + i}
                      d={pathD}
                      className={`transition-colors duration-200 cursor-pointer ${colorClass}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        focusOnCountry(idStr, feature);
                      }}
                      onMouseEnter={() => {
                        const engName = feature.properties?.name || "";
                        const ruName = COUNTRY_NAME_TRANSLATIONS[engName] || engName;
                        setHoveredCountryName(ruName);
                      }}
                      onMouseLeave={() => setHoveredCountryName(null)}
                    />
                  );
                })}
              </g>
            </svg>

            {/* ZOOM BUTTONS */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-10">
              <button 
                onClick={() => handleZoom(1.3)} 
                className="w-9 h-9 rounded-lg bg-[#09090b] border border-[#27272a] hover:border-[#7c3aed] flex items-center justify-center text-white hover:text-[#a78bfa] font-bold text-sm shadow-xl transition-all"
                title="Приблизить"
              >
                +
              </button>
              <button 
                onClick={() => handleZoom(0.7)} 
                className="w-9 h-9 rounded-lg bg-[#09090b] border border-[#27272a] hover:border-[#7c3aed] flex items-center justify-center text-white hover:text-[#a78bfa] font-bold text-sm shadow-xl transition-all"
                title="Отдалить"
              >
                −
              </button>
              <button 
                onClick={resetMap} 
                className="w-9 h-9 rounded-lg bg-[#09090b] border border-[#27272a] hover:border-[#7c3aed] flex items-center justify-center text-[10px] text-[#a1a1aa] font-bold transition-all"
                title="Сбросить камеру"
              >
                СБР
              </button>
            </div>

            {/* HOVER TOOLTIP */}
            {hoveredCountryName && (
              <div className="absolute bottom-6 right-6 bg-[#09090b]/90 border border-[#27272a]/95 rounded-lg px-3.5 py-2 shadow-2xl backdrop-blur-sm text-xs font-semibold flex items-center gap-2 border-[#7c3aed]/50">
                <Compass className="w-3.5 h-3.5 text-[#a78bfa]" />
                <span className="text-white tracking-wide">{hoveredCountryName}</span>
              </div>
            )}
          </div>
        </div>

        {/* SIDE BAR / DETAIL CONTROL PANEL */}
        <div className="w-[450px] max-md:w-full bg-[#09090b] flex flex-col z-10 shadow-2xl overflow-hidden relative shrink-0">
          
          {selectedCountryInfo ? (
            <>
              {/* CLOSE BUTTON */}
              <button 
                onClick={() => setSelectedCountryId(null)}
                className="absolute top-4 right-4 text-[#a1a1aa] hover:text-white bg-[#18181b] p-1.5 rounded-md border border-[#27272a] hover:border-[#52525b] transition z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* CARD HEADER */}
              <div className="p-6 pb-4 border-b border-[#18181b] flex items-start gap-4">
                <span className="text-4xl leading-none" role="img" aria-label="Flag">
                  {selectedCountryInfo.flag}
                </span>
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    {selectedCountryInfo.name}
                  </h2>
                  <p className="text-[10px] text-[#a1a1aa] mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#7c3aed]" />
                    Столица: <span className="text-white font-semibold">{selectedCountryInfo.capital}</span> 
                    • Валюта: <span className="text-white font-semibold">{selectedCountryInfo.currency}</span>
                  </p>
                  
                  <div className="flex gap-2 mt-3">
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                      selectedCountryInfo.visaDifficulty === "Легко"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : selectedCountryInfo.visaDifficulty === "Средне"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}>
                      Въезд: {selectedCountryInfo.visaDifficulty}
                    </span>
                    {selectedCountryInfo.digitalNomadFriendly && (
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[#7c3aed]/10 text-[#a78bfa] border border-[#7c3aed]/20 flex items-center gap-1">
                        <Briefcase className="w-2.5 h-2.5" /> Nomad Friendly
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* DYNAMIC AI LOADING & STATUS STRIP */}
              {isAiLoading ? (
                <div className="px-6 py-2.5 bg-[#7c3aed]/5 border-b border-[#7c3aed]/20 flex items-center justify-between text-xs text-[#a78bfa]">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Синхронизация по {selectedCountryInfo.name}...</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold animate-pulse">2026 Live Profile</span>
                </div>
              ) : aiError ? (
                <div className="px-6 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-[10px] text-amber-400">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Лимиты превышены, данные смоделированы локально</span>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-2 bg-[#18181b] border-b border-[#27272a] flex items-center justify-between text-[10px] text-[#a1a1aa]">
                  <span>Для граждан страны: <strong className="text-white">{userProfile.originCountry}</strong></span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">● AI Верифицировано</span>
                </div>
              )}

              {/* STATS VIEW (SAFETY & BUREAUCRACY) */}
              <div className="grid grid-cols-2 gap-4 px-6 py-4 bg-[#09090b] border-b border-[#18181b]">
                {/* Safety Metric */}
                <div className="space-y-1">
                  <div className="text-[10px] text-[#a1a1aa] uppercase tracking-wider font-bold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" /> Безопасность
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-[#18181b] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          selectedCountryInfo.safetyScore > 80 
                            ? "bg-emerald-500" 
                            : selectedCountryInfo.safetyScore > 60 
                              ? "bg-amber-500" 
                              : "bg-rose-500"
                        }`} 
                        style={{ width: `${Math.min(100, Math.max(0, selectedCountryInfo.safetyScore))}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-black text-white">{Math.round(selectedCountryInfo.safetyScore)}%</span>
                  </div>
                </div>

                {/* Bureaucracy Complexity Metric */}
                <div className="space-y-1">
                  <div className="text-[10px] text-[#a1a1aa] uppercase tracking-wider font-bold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-amber-400" /> Бюрократия
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-[#18181b] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          selectedCountryInfo.bureaucracyScore > 70 
                            ? "bg-rose-500" 
                            : selectedCountryInfo.bureaucracyScore > 40 
                              ? "bg-amber-500" 
                              : "bg-emerald-500"
                        }`} 
                        style={{ width: `${Math.min(100, Math.max(0, selectedCountryInfo.bureaucracyScore))}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-black text-white">{Math.round(selectedCountryInfo.bureaucracyScore)}%</span>
                  </div>
                </div>
              </div>

              {/* TABS SELECTOR */}
              <div className="flex border-b border-[#18181b] bg-[#000000] text-xs shrink-0 overflow-x-auto scrollbar-none">
                <button 
                  onClick={() => setActiveTab("visa")}
                  className={`flex-1 py-3 px-2 text-center border-b font-bold transition whitespace-nowrap ${
                    activeTab === "visa" 
                      ? "border-[#7c3aed] text-[#a78bfa] bg-[#7c3aed]/5" 
                      : "border-transparent text-[#a1a1aa] hover:text-white"
                  }`}
                >
                  🎫 Виза
                </button>
                <button 
                  onClick={() => setActiveTab("housingJobs")}
                  className={`flex-1 py-3 px-2 text-center border-b font-bold transition whitespace-nowrap ${
                    activeTab === "housingJobs" 
                      ? "border-[#7c3aed] text-[#a78bfa] bg-[#7c3aed]/5" 
                      : "border-transparent text-[#a1a1aa] hover:text-white"
                  }`}
                >
                  🏠 Жилье и Работа
                </button>
                <button 
                  onClick={() => setActiveTab("education")}
                  className={`flex-1 py-3 px-2 text-center border-b font-bold transition whitespace-nowrap ${
                    activeTab === "education" 
                      ? "border-[#7c3aed] text-[#a78bfa] bg-[#7c3aed]/5" 
                      : "border-transparent text-[#a1a1aa] hover:text-white"
                  }`}
                >
                  🎓 Карьера
                </button>
                <button 
                  onClick={() => setActiveTab("budget")}
                  className={`flex-1 py-3 px-2 text-center border-b font-bold transition whitespace-nowrap ${
                    activeTab === "budget" 
                      ? "border-[#7c3aed] text-[#a78bfa] bg-[#7c3aed]/5" 
                      : "border-transparent text-[#a1a1aa] hover:text-white"
                  }`}
                >
                  💰 Цены
                </button>
                <button 
                  onClick={() => setActiveTab("flights")}
                  className={`flex-1 py-3 px-2 text-center border-b font-bold transition whitespace-nowrap ${
                    activeTab === "flights" 
                      ? "border-[#7c3aed] text-[#a78bfa] bg-[#7c3aed]/5" 
                      : "border-transparent text-[#a1a1aa] hover:text-white"
                  }`}
                >
                  ✈️ Билеты
                </button>
              </div>

              {/* TAB CONTENT GRID */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin">

                {/* TAB 1: VISA SPECS */}
                {activeTab === "visa" && (
                  <div className="space-y-4">
                    <div className="bg-[#000000] border border-[#27272a] rounded-lg p-4">
                      <h4 className="text-[10px] font-bold text-[#a78bfa] uppercase tracking-wider mb-1">
                        Рекомендуемый тип визы для граждан ({userProfile.originCountry})
                      </h4>
                      <p className="text-sm font-bold text-white mb-2">{selectedCountryInfo.visaType}</p>
                      <p className="text-xs text-[#d4d4d8] leading-relaxed">{selectedCountryInfo.visaDescription}</p>
                    </div>

                    <div className="bg-[#000000] border border-[#18181b] rounded-lg p-4 space-y-3">
                      <h4 className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider mb-1">Бюрократические аспекты</h4>
                      <div className="space-y-2 text-xs text-[#d4d4d8]">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Требуемый пакет документов зависит от выбранного гражданства.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Сложность легализации документов оценивается в {selectedCountryInfo.bureaucracyScore}%.</span>
                        </div>
                      </div>
                    </div>

                    {userProfile.pets > 0 && (
                      <div className="bg-[#7c3aed]/5 border border-[#7c3aed]/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <PawPrint className="w-4 h-4 text-[#a78bfa]" />
                          <h4 className="text-[10px] font-bold text-[#a78bfa] uppercase tracking-wider">Перевозка питомцев ({userProfile.pets} шт.)</h4>
                        </div>
                        <p className="text-xs text-[#d4d4d8] leading-relaxed">
                          Для въезда в {selectedCountryInfo.name} животным потребуется международный ветеринарный паспорт, чип, прививка от бешенства и титры антител (в зависимости от жесткости карантина).
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: HOUSING & JOBS */}
                {activeTab === "housingJobs" && (
                  <div className="space-y-4">
                    {/* Accommodation search */}
                    <div>
                      <h3 className="text-xs font-bold text-[#a78bfa] mb-2.5 flex items-center gap-1.5">
                        <HomeIcon className="w-4 h-4" /> Поиск жилья в стране
                      </h3>
                      <div className="space-y-2">
                        {selectedCountryInfo.accommodationWebsites && selectedCountryInfo.accommodationWebsites.length > 0 ? (
                          selectedCountryInfo.accommodationWebsites.map((site, index) => (
                            <div key={index} className="bg-[#18181b]/40 border border-[#27272a] rounded-lg p-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-white">{site.name}</span>
                                <span className="text-[9px] bg-[#18181b] px-2 py-0.5 rounded text-[#a1a1aa] uppercase font-bold">
                                  {site.type}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#a1a1aa] leading-relaxed">{site.description}</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-[#52525b] italic">ИИ-ассистент подбирает каталоги недвижимости...</div>
                        )}
                      </div>
                    </div>

                    {/* Job portals */}
                    <div className="border-t border-[#18181b] pt-4">
                      <h3 className="text-xs font-bold text-cyan-400 mb-2.5 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" /> Поиск работы и карьеры
                      </h3>
                      <div className="space-y-2">
                        {selectedCountryInfo.jobWebsites && selectedCountryInfo.jobWebsites.length > 0 ? (
                          selectedCountryInfo.jobWebsites.map((site, index) => (
                            <div key={index} className="bg-[#18181b]/40 border border-[#27272a] rounded-lg p-3">
                              <div className="text-xs font-bold text-white mb-1">{site.name}</div>
                              <p className="text-[11px] text-[#a1a1aa] leading-relaxed">{site.description}</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-[#52525b] italic">Загрузка локальных агрегаторов вакансий...</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: EDUCATION & CREDENTIALS */}
                {activeTab === "education" && (
                  <div className="space-y-4">
                    <div className="bg-[#000000] border border-[#27272a] rounded-lg p-4 space-y-3">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#a78bfa]" /> Образование и квалификации
                      </h4>

                      <div>
                        <div className="text-[9px] text-[#a1a1aa] uppercase tracking-wider font-extrabold mb-1">Востребованные специалисты:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCountryInfo.education?.inDemandSpecialists?.map((spec, i) => (
                            <span key={i} className="text-[10px] bg-[#18181b] text-white px-2.5 py-1 rounded-md border border-[#27272a] font-medium">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="text-[9px] text-[#a1a1aa] uppercase tracking-wider font-extrabold mb-1">Чьи дипломы котируются легче всего:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCountryInfo.education?.recognizedCountries?.map((country, i) => (
                            <span key={i} className="text-[10px] bg-[#7c3aed]/10 text-[#a78bfa] border border-[#7c3aed]/20 px-2.5 py-1 rounded-md font-medium">
                              {country}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#18181b]">
                        <div className="text-[9px] text-[#a1a1aa] uppercase tracking-wider font-extrabold mb-1">Возможности переобучения / языковые курсы:</div>
                        <p className="text-xs text-[#d4d4d8] leading-relaxed">{selectedCountryInfo.education?.retrainingPossibility}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: BUDGET & EXPENDITURES */}
                {activeTab === "budget" && familyAdjustedCosts && (
                  <div className="space-y-4">
                    <div className="bg-[#000000] p-1.5 rounded-lg border border-[#27272a] flex">
                      {[
                        { id: "backpacker", label: "Бэкпекер", icon: "🎒" },
                        { id: "nomad", label: "Кочевник", icon: "💻" },
                        { id: "luxury", label: "Комфорт+", icon: "👑" }
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => setBudgetType(type.id)}
                          className={`flex-1 py-1.5 rounded text-[10px] font-bold flex flex-col items-center gap-0.5 transition ${
                            budgetType === type.id 
                              ? "bg-[#7c3aed] text-white shadow" 
                              : "text-[#a1a1aa] hover:text-white"
                          }`}
                        >
                          <span>{type.icon} {type.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="bg-[#18181b]/40 border border-[#27272a] rounded-lg p-5 text-center relative overflow-hidden">
                      <p className="text-[9px] text-[#a1a1aa] uppercase tracking-wider font-extrabold">
                        Бюджет на семью в месяц
                      </p>
                      <div className="text-3xl font-black text-white mt-1 flex items-center justify-center gap-0.5">
                        <DollarSign className="w-5 h-5 text-[#a78bfa]" />
                        <span>{familyAdjustedCosts.total.toLocaleString()}</span>
                      </div>
                      <p className="text-[9px] text-[#52525b] mt-1.5">
                        Рассчитано на: {userProfile.adults} взр., {userProfile.children} дет., {userProfile.pets} пит.
                      </p>
                      
                      {familyAdjustedCosts.total > userProfile.budgetLimit && (
                        <div className="mt-3 bg-rose-500/10 border border-rose-500/20 rounded p-2 text-[10px] text-rose-400 flex items-center gap-1.5 justify-center">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Превышает ваш бюджетный лимит (${userProfile.budgetLimit})!</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider">Структура ваших расходов</h4>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#a1a1aa]">Аренда жилья ({selectedCountryInfo.costs.rentShare}%)</span>
                          <span className="font-bold text-white">${familyAdjustedCosts.rent}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#18181b] rounded-full overflow-hidden">
                          <div className="h-full bg-[#7c3aed]" style={{ width: `${selectedCountryInfo.costs.rentShare}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#a1a1aa]">Еда и рестораны ({selectedCountryInfo.costs.foodShare}%)</span>
                          <span className="font-bold text-white">${familyAdjustedCosts.food}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#18181b] rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500" style={{ width: `${selectedCountryInfo.costs.foodShare}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#a1a1aa]">Досуг и транспорт ({selectedCountryInfo.costs.funShare}%)</span>
                          <span className="font-bold text-white">${familyAdjustedCosts.fun}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#18181b] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${selectedCountryInfo.costs.funShare}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: TICKETS WIDGET */}
                {activeTab === "flights" && (
                  <div className="space-y-4">
                    <div className="bg-[#000000] border border-[#27272a] rounded-lg p-4 space-y-3">
                      <h4 className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider mb-2">Авиапоиск 2026</h4>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] text-[#a1a1aa] font-bold uppercase">Откуда</label>
                          <input 
                            type="text" 
                            value={departureCity}
                            onChange={(e) => setDepartureCity(e.target.value)}
                            className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#7c3aed] rounded p-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-[#a1a1aa] font-bold uppercase">Куда</label>
                          <input 
                            type="text" 
                            readOnly
                            value={selectedCountryInfo.name}
                            className="w-full bg-[#18181b]/50 border border-[#27272a] rounded p-2 text-xs text-[#a1a1aa] cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] text-[#a1a1aa] font-bold uppercase">Дата отбытия</label>
                        <input 
                          type="date" 
                          value={flightDate}
                          onChange={(e) => setFlightDate(e.target.value)}
                          className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#7c3aed] rounded p-2 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <button 
                        onClick={runFlightSearch}
                        disabled={isSearchingFlights}
                        className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-2.5 rounded text-xs transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                      >
                        {isSearchingFlights ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Поиск оптимальных тарифов...
                          </>
                        ) : (
                          <>
                            <Plane className="w-3.5 h-3.5" /> Найти оптимальные рейсы
                          </>
                        )}
                      </button>
                    </div>

                    {flightResults && (
                      <div className="space-y-2.5">
                        <h4 className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider">Предложения авиакомпаний</h4>
                        
                        {flightResults.map(flight => (
                          <div key={flight.id} className="bg-[#000000] border border-[#18181b] hover:border-[#7c3aed]/40 rounded-lg p-3.5 transition">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[9px] bg-[#18181b] px-1.5 py-0.5 rounded text-[#a1a1aa] font-semibold">
                                  {flight.airline}
                                </span>
                                <p className="text-xs font-bold text-white mt-1.5">{flight.route}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[10px] text-[#a1a1aa] flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {flight.duration}
                                  </span>
                                  <span className="text-[10px] text-[#a78bfa] font-bold">{flight.stops}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-[9px] text-[#52525b]">от</span>
                                <div className="text-xs font-black text-emerald-400">₽{flight.price.toLocaleString()}</div>
                                <a 
                                  href={flight.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] text-[#a78bfa] hover:text-white font-bold mt-2"
                                >
                                  Купить <ArrowRight className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* DEFAULT HUB SCREEN (WHEN NO COUNTRY IS SELECTED) */
            <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto scrollbar-thin bg-[#09090b]">
              <div className="space-y-6">
                <div className="space-y-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#7c3aed]/10 text-[#a78bfa] text-xs font-bold border border-[#7c3aed]/20">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Навигатор ReloGlobe
                  </span>
                  <h2 className="text-xl font-black text-white tracking-tight leading-none">Выбери страну на глобусе</h2>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    Крутите интерактивный 3D-глобус, нажимайте на любую страну мира или используйте умный поиск в шапке. ИИ-ассистент мгновенно рассчитает визу, бюджет для вашей семьи, налоги и возможности трудоустройства.
                  </p>
                </div>

                {/* Popular Presets */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#a78bfa]" /> Топовые хабы для релокации СНГ
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {Object.entries(POPULAR_PRESETS).map(([id, country]) => (
                      <button
                        key={id}
                        onClick={() => focusOnCountry(id)}
                        className="p-3 bg-[#000000] border border-[#27272a] hover:border-[#7c3aed]/40 rounded-lg text-left transition group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{country.flag}</span>
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-[#a78bfa] transition">{country.name}</div>
                              <div className="text-[9px] text-[#a1a1aa]">Столица: {country.capital} • Бюрократия: {country.bureaucracyScore}%</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#52525b] group-hover:text-white transition" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Tip */}
                <div className="bg-[#18181b]/20 border border-[#27272a] rounded-lg p-4 space-y-2">
                  <h4 className="text-[10px] font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> Анализ рынка труда и образования
                  </h4>
                  <p className="text-[10px] text-[#a1a1aa] leading-relaxed">
                    Наш ИИ анализирует востребованные профессии на локальном рынке, сверяет котируемость образования вашей страны исхода и предлагает сертифицированные возможности переквалификации.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#18181b] text-[9px] text-[#52525b]">
                Все расчеты и адаптация виз выполняются в реальном времени нейросетью Gemini 3.1 Flash.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#000000] border-t border-[#18181b] py-3 px-6 flex items-center justify-between text-[10px] text-[#52525b] shrink-0 max-md:flex-col max-md:gap-2 max-md:text-center z-10">
        <div>
          © 2026 ReloGlobe AI. Политическая карта WGS84 Natural Earth. Все права защищены.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#a1a1aa] transition">Условия использования</a>
          <span>•</span>
          <a href="#" className="hover:text-[#a1a1aa] transition">Конфиденциальность</a>
        </div>
      </footer>
    </div>
  );
}
