import { Template } from '../types';

export const mockTemplates: Template[] = [
  {
    id: 'tpl-aurelia',
    slug: 'aurelia',
    name: 'Aurelia Royal',
    category: 'weddings',
    price: 180000,
    isPopular: true,
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: {
      uz: 'Klassik to‘ylar va dabdabali nikoh oqshomlari uchun zarhallangan nafis qirollik uslubi.',
      ru: 'Изысканный королевский стиль с золотым тиснением для классических свадебных торжеств.',
      en: 'A regal, timeless design with warm gold accents crafted for classic grand weddings.',
    },
    features: {
      uz: ['Zarhal monogramma va muqova', 'Interaktiv xarita va dres-kod', 'Fotoalbom karusel', 'Mehmonlar RSVP tizimi'],
      ru: ['Золотая монограмма и обложка', 'Интерактивная карта и дресс-код', 'Фотокарусель высокого качества', 'RSVP подтверждения'],
      en: ['Golden foil monogram cover', 'Interactive maps & dress code', 'High-res photo gallery', 'Instant RSVP guest list'],
    },
    colorStyle: {
      primary: '#B48B47', // Warm gold
      secondary: '#FBF8F3', // Cream
      accent: '#E6D2B5',
      background: '#FAF6F0',
      text: '#2A2420',
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Plus Jakarta Sans',
    },
    suitableFor: {
      uz: ['To‘y', 'Nikoh oqshomi', 'Fotixa to‘yi'],
      ru: ['Свадьба', 'Помолвка', 'Венчание'],
      en: ['Weddings', 'Engagements', 'Formal Receptions'],
    },
  },
  {
    id: 'tpl-swan',
    slug: 'swan',
    name: 'Swan Minimalist',
    category: 'weddings',
    price: 150000,
    isPopular: false,
    previewImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    description: {
      uz: 'Zamonaviy minimalizm, nafis oqqush mayinligi va yengil moviy osmon aks-sadosi.',
      ru: 'Современный минимализм, лёгкость лебединого пуха и воздушные небесно-голубые акценты.',
      en: 'Modern minimalism inspired by swan grace, crisp typography, and serene sky tones.',
    },
    colorStyle: {
      primary: '#3B6B88', // Serene blue
      secondary: '#E8F3FA',
      accent: '#B9DFFA',
      background: '#F6F9FC',
      text: '#1E293B',
    },
    typography: {
      headingFont: 'Cinzel',
      bodyFont: 'Plus Jakarta Sans',
    },
    features: {
      uz: ['Nafis sans-serif tipografiya', 'Yengil Liquid Glass effektlari', 'Musiqa va yo‘l xaritasi', 'Tezkor yuklanish'],
      ru: ['Изящная типографика', 'Стеклянные панели Liquid Glass', 'Музыкальный плеер и карта', 'Быстрая загрузка'],
      en: ['Sleek editorial typography', 'Liquid Glass translucent panels', 'Music player and maps', 'Ultra-fast loading'],
    },
    suitableFor: {
      uz: ['Zamonaviy to‘y', 'Nikoh', 'Yubiley'],
      ru: ['Современная свадьба', 'Молодежный юбилей'],
      en: ['Modern Weddings', 'Intimate Celebrations'],
    },
  },
  {
    id: 'tpl-velvet',
    slug: 'velvet',
    name: 'Velvet Sharqona',
    category: 'traditional',
    price: 200000,
    isPopular: true,
    isNew: true,
    previewImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
    description: {
      uz: 'O‘zbek an’analariga xos boy milliy naqshlar, zumrad va baxmal jilosi bilan uyg‘unlashgan dizayn.',
      ru: 'Глубокие изумрудные и бордовые бархатные тона с утончённым восточным орнаментом.',
      en: 'Rich oriental motifs and velvet emerald accents celebrating authentic Uzbek traditions.',
    },
    colorStyle: {
      primary: '#184738', // Emerald
      secondary: '#F2E8DC',
      accent: '#C59A4E',
      background: '#F9F6F0',
      text: '#1C2E25',
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Plus Jakarta Sans',
    },
    features: {
      uz: ['Sharqona islimiy naqshlar', 'Beshik to‘y va Fotixa moslashuvi', 'Kelin salom va Nikoh bo‘limlari', 'Maxsus tabriklar devori'],
      ru: ['Восточные узоры и каллиграфия', 'Для Фатихи и традиционной свадьбы', 'Стена пожеланий гостей'],
      en: ['Eastern arabesque patterns', 'Tailored for traditional celebrations', 'Interactive guest wishes wall'],
    },
    suitableFor: {
      uz: ['Fotixa to‘yi', 'Sunnat to‘y', 'Milliy nikoh'],
      ru: ['Фатиха туй', 'Традиционная свадьба'],
      en: ['Traditional Weddings', 'Family Feasts'],
    },
  },
  {
    id: 'tpl-estelle',
    slug: 'estelle',
    name: 'Estelle Botanical',
    category: 'weddings',
    price: 160000,
    previewImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    description: {
      uz: 'Bahoriy yashillik, zaytun barglari va tabiat uyg‘unligidagi romantik ochiq osmon ostidagi to‘ylar uchun.',
      ru: 'Весенняя свежесть, оливковые ветви и нежные пастельные оттенки для романтичной свадьбы на природе.',
      en: 'Romantic botanical greenery and soft watercolor leaves ideal for garden weddings.',
    },
    colorStyle: {
      primary: '#4D6B53', // Sage green
      secondary: '#F2F6F3',
      accent: '#D4E2D7',
      background: '#FBFDFB',
      text: '#263329',
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Plus Jakarta Sans',
    },
    features: {
      uz: ['Akvarel barglar animatsiyasi', 'Ochiq osmon tadbirlari uchun xarita', 'Kengaytirilgan foto galereya'],
      ru: ['Анимация акварельных листьев', 'Карта для загородных локаций', 'Фотогалерея высокого разрешения'],
      en: ['Botanical animation accents', 'Outdoor venue directions', 'Expanded photo showcase'],
    },
    suitableFor: {
      uz: ['Ochiq havodagi to‘y', 'Unashtiruv marosimi', 'Nikoh'],
      ru: ['Свадьба на открытом воздухе', 'Помолвка'],
      en: ['Outdoor Receptions', 'Garden Parties'],
    },
  },
  {
    id: 'tpl-bloom',
    slug: 'bloom',
    name: 'Bloom Pastel',
    category: 'birthdays',
    price: 130000,
    isPopular: true,
    previewImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    description: {
      uz: 'Tug‘ilgan kun, yubiley va qizlar bayrami uchun quvnoq pushti va shaftolirang mayinlik.',
      ru: 'Нежно-розовые и персиковые тона, праздничная атмосфера для дней рождения и юбилеев.',
      en: 'Vibrant pastel pink and peach tones with celebratory touches for birthdays and jubilees.',
    },
    colorStyle: {
      primary: '#D9658B', // Soft Rose
      secondary: '#FDF2F4',
      accent: '#F5C9D8',
      background: '#FFF9FA',
      text: '#3A1C25',
    },
    typography: {
      headingFont: 'Great Vibes',
      bodyFont: 'Plus Jakarta Sans',
    },
    features: {
      uz: ['Konfetti animatsiyalari', 'Sovg‘a va tabriklar ro‘yxati', 'Yubiley taymeri', 'Mehmonlar dres-kodi'],
      ru: ['Эффект конфетти', 'Пожелания и поздравления', 'Таймер до торжества', 'Дресс-код'],
      en: ['Confetti animation celebration', 'Gift wish-list details', 'Event countdown', 'Dress code swatches'],
    },
    suitableFor: {
      uz: ['Tug‘ilgan kun', 'Yubiley', 'Qizlar bazmi'],
      ru: ['День рождения', 'Юбилей', 'Девичник'],
      en: ['Birthdays', 'Jubilees', 'Bridal Showers'],
    },
  },
  {
    id: 'tpl-golden-hour',
    slug: 'golden-hour',
    name: 'Golden Hour',
    category: 'engagements',
    price: 170000,
    previewImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    description: {
      uz: 'Quyosh botishining iliq nurlari, terrakota va iliq shom jozibadorligi.',
      ru: 'Теплые закатные лучи, терракота и золотистый уют для помолвки и романтических вечеров.',
      en: 'Sun-drenched terracotta and amber tones evoking the golden hour romance.',
    },
    colorStyle: {
      primary: '#BF663E', // Terracotta
      secondary: '#FCF5EF',
      accent: '#EAB092',
      background: '#FFFBF7',
      text: '#331B10',
    },
    typography: {
      headingFont: 'Cinzel',
      bodyFont: 'Plus Jakarta Sans',
    },
    features: {
      uz: ['Iliq yorug‘lik animatsiyalari', 'Hikoya fotosuratlari', 'Kechki oqshom dres-kodi'],
      ru: ['Мягкое освещение', 'История любви в фотографиях', 'Вечерний дресс-код'],
      en: ['Warm twilight gradients', 'Love story photo timeline', 'Evening dress code'],
    },
    suitableFor: {
      uz: ['Fotixa', 'Unashtiruv', 'Nikoh yilligi'],
      ru: ['Помолвка', 'Годовщина свадьбы'],
      en: ['Engagements', 'Anniversary Dinners'],
    },
  },
  {
    id: 'tpl-safir',
    slug: 'safir',
    name: 'Safir Midnight',
    category: 'anniversaries',
    price: 190000,
    previewImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    description: {
      uz: 'Tungi moviy osmon, kumush yulduzlar va hashamatli yubiley oqshomlari uchun maxsus.',
      ru: 'Глубокий сапфировый синий с серебряным сиянием для солидных юбилеев и корпоративных приемов.',
      en: 'Deep sapphire navy with celestial silver sparkles crafted for gala evenings.',
    },
    colorStyle: {
      primary: '#1E3A5F', // Deep Sapphire
      secondary: '#EBF2FA',
      accent: '#8EB4DE',
      background: '#F5F8FC',
      text: '#0E1D31',
    },
    typography: {
      headingFont: 'Cinzel',
      bodyFont: 'Plus Jakarta Sans',
    },
    features: {
      uz: ['Yulduzli fon animatsiyasi', 'VIP stol va mehmonlar yo‘riqnomasi', 'Rasmiy RSVP formasi'],
      ru: ['Звёздный фон', 'VIP рассадка гостей', 'Строгая форма подтверждения'],
      en: ['Starry night backdrop', 'VIP guest table hints', 'Structured RSVP confirmation'],
    },
    suitableFor: {
      uz: ['50 yillik yubiley', 'Hashamatli bayram', 'Tantanali oqshom'],
      ru: ['Солидный юбилей', 'Торжественный вечер'],
      en: ['Milestone Anniversaries', 'Gala Evenings'],
    },
  },
  {
    id: 'tpl-butterfly',
    slug: 'butterfly',
    name: 'Butterfly Pastel',
    category: 'baby_showers',
    price: 120000,
    isNew: true,
    previewImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    description: {
      uz: 'Beshik to‘y, chaqaloq bayramlari va oilaviy quvonchli lahzalar uchun nozik kapalaklar nafasi.',
      ru: 'Нежные пастельные оттенки и порхающие бабочки для бешик туй и детских праздников.',
      en: 'Whimsical butterfly flutter and soft pastels made for baby showers and family joy.',
    },
    colorStyle: {
      primary: '#6B8FC9', // Soft Cornflower
      secondary: '#F4F7FD',
      accent: '#B9DFFA',
      background: '#FAFBFD',
      text: '#1C2E4A',
    },
    typography: {
      headingFont: 'Great Vibes',
      bodyFont: 'Plus Jakarta Sans',
    },
    features: {
      uz: ['Kapalaklar interaktiv harakati', 'Bolalar uchun maxsus bo‘lim', 'Quvonchli fotoalbom'],
      ru: ['Интерактивные бабочки', 'Специальный блок для поздравлений малыша', 'Альбом первых фото'],
      en: ['Playful butterfly drift', 'Baby celebration blessings', 'Sweet first photos album'],
    },
    suitableFor: {
      uz: ['Beshik to‘y', 'Chaqaloq tug‘ilishi', '1 yosh to‘y'],
      ru: ['Бешик туй', 'Baby shower', 'Первый день рождения'],
      en: ['Baby Showers', 'First Birthdays', 'Beshik Toy'],
    },
  },
];
