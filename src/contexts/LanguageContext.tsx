import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "uz" | "ru";

const translations = {
  uz: {
    // Nav
    about: "Men haqimda",
    certificates: "Sertifikatlar",
    skills: "Ko'nikmalar",
    projects: "Loyihalar",
    experience: "Tajriba",
    contact: "Aloqa",

    // Hero
    heroTag: "Kreativ Dasturchi",
    heroName: "Gulira'no",
    heroFullName: "Jumanazarova Gulira'no",
    heroTagline: "Zamonaviy va qulay veb-tajribalar yaratuvchi kreativ dasturchi",
    heroIntro: "Men chiroyli, funksional veb-saytlarni loyihalayman va yarataman.",
    heroBtn1: "Loyihalarimni ko'rish",
    heroBtn2: "Bog'lanish",

    // About
    aboutLabel: "Men haqimda",
    aboutTitle: "Dizayn va texnologiyaga\nishtiyoqmand.",
    aboutIntro: `Salom. Men Jumanazarova Gulira'no — IT va Kiberxavfsizlik yo'nalishida o'qiyotgan yosh mutaxassisman. IT sohasida o'zimni muntazam rivojlantirib boraman va bir nechta sertifikatlarga egaman.`,
    aboutEduTitle: "Ta'lim va bilim",
    aboutEduDesc: "Men hozirda Yangiariq tumanidagi 3-son maktabda o'qib kelmoqdaman. Shuningdek, 2 yildan beri Al-Xorazmiy vorislari loyihasida IT sohasida bilim olib bormoqdaman.",
    aboutSkillsTitle: "Ko'nikmalar va texnologiyalar",
    aboutDesc: `Salom! Men Gulira'no Jumanazarova — zamonaviy, foydalanuvchilarga qulay va vizual jihatdan chiroyli raqamli mahsulotlar yaratishni yaxshi ko'radigan ishtiyoqli va ambitsiyali dasturchiman. Men doimiy o'rganishga bag'ishlanganman va foydalanuvchilarga haqiqiy ta'sir qiladigan tajribalar yaratish uchun texnologiya va dizayn kesishmasini o'rganishni yaxshi ko'raman.`,
    strengthCreativity: "Ijodkorlik",
    strengthCreativityDesc: "Har bir loyihaga yangi g'oyalar va noyob vizual yechimlar olib kelaman.",
    strengthFastLearner: "Tez o'rganuvchi",
    strengthFastLearnerDesc: "Yangi texnologiya va frameworklarga ishtiyoq va qiziqish bilan tez moslashaman.",
    strengthDetail: "Diqqatlilik",
    strengthDetailDesc: "Sifat, izchillik va foydalanuvchi tajribasiga e'tibor qaratgan piksel-mukammal dizaynlar.",
    strengthPassion: "Ishtiyoqli va Mas'uliyatli",
    strengthPassionDesc: "Natijalarni ehtiyotkorlik bilan yetkazishga, muddatlarga rioya qilishga va kutilganlardan oshishga bag'ishlanaman.",

    // Skills
    skillsLabel: "Ko'nikmalar",
    skillsTitle: "Mening ko'nikmalarim.",

    // Certificates
    certTitle: "Sertifikatlarim va yutuqlarim",
    certIntro: "IT sohasida bir nechta sertifikatlarga egaman. Quyida asosiy sertifikatlarimdan biri keltirilgan.",
    certVerified: "Tasdiqlangan sertifikat",
    certDate: "Sana",
    certView: "Sertifikatni ko'rish",

    // Projects
    projectsLabel: "Loyihalar",
    projectsTitle: "Tanlangan ishlar.",
    featured: "Asosiy loyiha",
    liveDemo: "Jonli demo",
    code: "Kod",
    proj1Title: "Portfolio veb-sayti",
    proj1Desc: "Mening ishlarim, ko'nikmalarim va dasturchi sifatidagi yo'limni namoyish etadigan zamonaviy shaxsiy portfolio.",
    proj2Title: "Ob-havo ilovasi",
    proj2Desc: "Shahar qidiruvi, 5 kunlik prognoz va sharoitlarga asoslangan dinamik fonlar bilan real vaqtdagi ob-havo ilovasi.",
    proj3Title: "Vazifalar kuzatuvchisi",
    proj3Desc: "Vazifa toifalari, bajarilishni kuzatish va mahalliy xotira bilan toza va intuitiv vazifalar ro'yxati ilovasi.",
    proj4Title: "Landing sahifalar",
    proj4Desc: "Xayoliy brendlar uchun zamonaviy, sezgir landing sahifalar seriyasi — maket, tipografiya va vizual ierarxiyaga e'tibor.",
    proj5Title: "Viktorina ilovasi",
    proj5Desc: "Ko'p toifali, ball kuzatuvi va vaqt belgilangan savollar bilan interaktiv viktorina o'yini.",
    projDehqonDesc: "Sun'iy intellekt texnologiyalariga asoslangan zamonaviy qishloq xo'jaligi platformasi.",

    // Experience
    expLabel: "Tajriba",
    expTitle: "Mening yo'lim.",
    exp1Role: "Mustaqil o'rganish va o'sish",
    exp1Company: "Shaxsiy rivojlanish",
    exp1Period: "2023 – Hozir",
    exp1Desc: "Onlayn kurslar, qo'llanmalar va amaliy loyihalar orqali frontend dasturlashni faol o'rganmoqdaman.",
    exp2Role: "Frilanser veb-dasturchi",
    exp2Company: "Mustaqil loyihalar",
    exp2Period: "2024 – Hozir",
    exp2Desc: "Mahalliy mijozlar uchun sezgir landing sahifalar va kichik veb-ilovalar yaratmoqdaman.",
    exp3Role: "Ochiq kodga hissa qo'shuvchi",
    exp3Company: "GitHub hamjamiyati",
    exp3Period: "2024 – Hozir",
    exp3Desc: "Ochiq kodli loyihalarga hissa qo'shmoqdaman va butun dunyo bo'ylab dasturchilar bilan hamkorlik qilmoqdaman.",

    // Contact
    contactLabel: "Aloqa",
    contactTitle: "Bog'lanamiz.",
    contactMeTitle: "Men bilan bog'lanish",
    yourName: "Ismingiz",
    yourEmail: "Emailingiz",
    yourMessage: "Xabaringiz",
    sendMessage: "Xabar yuborish",
    sending: "Yuborilmoqda...",
    fillAll: "Iltimos, barcha maydonlarni to'ldiring",
    messageSent: "Xabar yuborildi! ✨",
    messageSentDesc: "Murojaat uchun rahmat. Tez orada javob beraman.",
    messageFailed: "Xabar yuborilmadi",
    messageFailedDesc: "Serverga ulanishda muammo. Iltimos, to'g'ridan-to'g'ri email orqali yozing.",
    findMe: "Meni ijtimoiy tarmoqlarda toping",
    email: "Email",

    // Footer
    allRights: "Barcha huquqlar himoyalangan.",
    builtWith: "Sevgi bilan yaratilgan 💜",
  },
  ru: {
    // Nav
    about: "Обо мне",
    certificates: "Сертификаты",
    skills: "Навыки",
    projects: "Проекты",
    experience: "Опыт",
    contact: "Контакт",

    // Hero
    heroTag: "Креативный разработчик",
    heroName: "Gulira'no",
    heroFullName: "Jumanazarova Gulira'no",
    heroTagline: "Креативный разработчик, создающий современные и удобные веб-приложения",
    heroIntro: "Я проектирую и создаю красивые, функциональные сайты.",
    heroBtn1: "Мои проекты",
    heroBtn2: "Связаться",

    // About
    aboutLabel: "Обо мне",
    aboutTitle: "Увлечена дизайном\nи технологиями.",
    aboutIntro: `Привет. Я Гулирано Джуманазарова — молодой специалист, обучающийся по направлению IT и кибербезопасности. Постоянно развиваюсь в IT-сфере и имею несколько сертификатов.`,
    aboutEduTitle: "Образование и знания",
    aboutEduDesc: "Сейчас я учусь в школе №3 Янгиарыкского района. Уже 2 года получаю знания в сфере IT в рамках проекта «Наследники Аль-Хорезми».",
    aboutSkillsTitle: "Навыки и технологии",
    aboutDesc: `Привет! Я Gulira'no Jumanazarova — увлечённый и амбициозный разработчик, который любит создавать современные, удобные и визуально привлекательные цифровые продукты. Я стремлюсь к постоянному обучению и люблю исследовать пересечение технологий и дизайна.`,
    strengthCreativity: "Креативность",
    strengthCreativityDesc: "Привношу свежие идеи и уникальные визуальные решения в каждый проект.",
    strengthFastLearner: "Быстрое обучение",
    strengthFastLearnerDesc: "Быстро осваиваю новые технологии и фреймворки с энтузиазмом.",
    strengthDetail: "Внимание к деталям",
    strengthDetailDesc: "Пиксель-перфектный дизайн с фокусом на качество и пользовательский опыт.",
    strengthPassion: "Увлечённая и ответственная",
    strengthPassionDesc: "Стремлюсь к качественным результатам, соблюдению сроков и превышению ожиданий.",

    // Skills
    skillsLabel: "Навыки",
    skillsTitle: "Мой инструментарий.",

    // Certificates
    certTitle: "Мои сертификаты и достижения",
    certIntro: "У меня есть несколько сертификатов в сфере IT. Ниже представлен один из основных сертификатов.",
    certVerified: "Подтверждённый сертификат",
    certDate: "Дата",
    certView: "Посмотреть сертификат",

    // Projects
    projectsLabel: "Проекты",
    projectsTitle: "Избранные работы.",
    featured: "Главный проект",
    liveDemo: "Демо",
    code: "Код",
    proj1Title: "Сайт-портфолио",
    proj1Desc: "Современное личное портфолио, демонстрирующее мои работы, навыки и путь разработчика.",
    proj2Title: "Погодное приложение",
    proj2Desc: "Приложение погоды в реальном времени с поиском городов, 5-дневным прогнозом и динамическими фонами.",
    proj3Title: "Трекер задач",
    proj3Desc: "Чистое и интуитивное приложение списка задач с категориями и локальным хранилищем.",
    proj4Title: "Коллекция лендингов",
    proj4Desc: "Серия современных, адаптивных лендингов для вымышленных брендов с фокусом на типографику.",
    proj5Title: "Приложение-викторина",
    proj5Desc: "Интерактивная викторина с несколькими категориями, подсчётом баллов и ограничением по времени.",
    projDehqonDesc: "Современная агроплатформа на основе технологий искусственного интеллекта.",

    // Experience
    expLabel: "Опыт",
    expTitle: "Мой путь.",
    exp1Role: "Самообучение и рост",
    exp1Company: "Личное развитие",
    exp1Period: "2023 – настоящее время",
    exp1Desc: "Активно изучаю фронтенд-разработку через онлайн-курсы, уроки и практические проекты.",
    exp2Role: "Фриланс веб-разработчик",
    exp2Company: "Независимые проекты",
    exp2Period: "2024 – настоящее время",
    exp2Desc: "Создаю адаптивные лендинги и небольшие веб-приложения для местных клиентов.",
    exp3Role: "Контрибьютор open source",
    exp3Company: "Сообщество GitHub",
    exp3Period: "2024 – настоящее время",
    exp3Desc: "Вношу вклад в проекты с открытым кодом и сотрудничаю с разработчиками со всего мира.",

    // Contact
    contactLabel: "Контакт",
    contactTitle: "Свяжемся.",
    contactMeTitle: "Связаться со мной",
    yourName: "Ваше имя",
    yourEmail: "Ваш email",
    yourMessage: "Ваше сообщение",
    sendMessage: "Отправить",
    sending: "Отправляется...",
    fillAll: "Пожалуйста, заполните все поля",
    messageSent: "Сообщение отправлено! ✨",
    messageSentDesc: "Спасибо за обращение. Я свяжусь с вами в ближайшее время.",
    messageFailed: "Сообщение не отправлено",
    messageFailedDesc: "Проблема с подключением к серверу. Пожалуйста, напишите напрямую на email.",
    findMe: "Найдите меня в соцсетях",
    email: "Почта",

    // Footer
    allRights: "Все права защищены.",
    builtWith: "Создано с любовью 💜",
  },
} as const;

type Translations = Record<keyof typeof translations.uz, string>;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "uz",
  setLang: () => {},
  t: translations.uz,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "ru" ? "ru" : "uz") as Lang;
  });

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
