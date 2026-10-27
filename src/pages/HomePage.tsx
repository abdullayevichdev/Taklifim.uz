import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useLanguage } from '../locales';
import { mockTemplates } from '../data/mockTemplates';
import { mockFaq, mockTestimonials, mockStats } from '../data/mockFaq';
import { formatPriceUZS } from '../utils/logic';
import {
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2,
  Calendar,
  MapPin,
  Music,
  Share2,
  Smartphone,
  QrCode,
  Users,
  Video,
  Play,
  Pause,
  ChevronDown,
  Star,
  Layers,
  Heart,
  Clock,
  ShieldCheck,
  Send,
  HeartHandshake,
  Crown,
  Flame,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { t, language } = useLanguage();

  // Video demo state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  // FAQ accordion state
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  // Featured templates: all 8 templates from mockTemplates
  const featuredTemplates = mockTemplates.slice(0, 8);

  return (
    <div className="pt-24 pb-20 space-y-28 overflow-hidden relative">
      {/* 6.1 HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-14">
        {/* Soft Pink and Sky Blue floating ambient orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-[#F5C9D8]/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse duration-5000" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-bl from-[#B9DFFA]/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse duration-7000" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Wedding Badge with Pink & Sky Blue Glass */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-liquid-pink border border-white/90 shadow-[0_4px_20px_rgba(245,201,216,0.35)]">
              <span className="w-2 h-2 rounded-full bg-[#E27B9B] animate-ping" />
              <span className="text-xs font-extrabold tracking-wide uppercase text-[#3A1C25] flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[#E27B9B]" />
                <span>To‘y va tantanalar uchun nafis raqamli taklifnomalar</span>
              </span>
            </div>

            {/* Calligraphic Sub-title in cursive */}
            <div className="font-script text-3xl sm:text-4xl text-[#E27B9B] tracking-wide -mb-2">
              Baxtli lahzalar, muqaddas rishta...
            </div>

            {/* Main Headline */}
            <h1 className="font-playfair text-4xl sm:text-6xl lg:text-6xl font-extrabold text-[#1E1418] tracking-tight leading-[1.12]">
              Har bir lahzaga <br className="hidden sm:inline" />
              <span className="text-gradient-rose">o‘zgacha taklif.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#4A383F] max-w-xl leading-relaxed">
              Nikoh oqshomi, fotixa to‘yi, yubiley va eng aziz marosimlaringiz uchun fotosuratlar, kuy-qo‘shiqlar, interaktiv xarita va RSVP bilan bezatilgan shohona taklifnoma yarating.
            </p>

            {/* CTA Buttons in Liquid Glass Pink & Sky */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/templates"
                className="flex items-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-extrabold text-[#1E1418] bg-gradient-to-r from-[#F5C9D8] via-white to-[#B9DFFA] hover:shadow-[0_10px_30px_rgba(226,123,155,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md border border-white/90"
              >
                <Sparkles className="w-4 h-4 text-[#E27B9B]" />
                <span>Taklifnoma Yaratish</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                to="/templates"
                className="flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold text-[#3A242B] glass-panel-elevated hover:bg-white transition-all duration-200 border border-white/90 shadow-sm"
              >
                <Eye className="w-4 h-4 text-[#4A9BD4]" />
                <span>Shablonlarni Ko‘rish</span>
              </Link>
            </div>

            {/* Social Proof with Pink Stars */}
            <div className="pt-4 flex items-center gap-6 border-t border-white/60">
              <div className="flex -space-x-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Mijoz"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Mijoz"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Mijoz"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs"
                />
              </div>
              <div className="text-xs text-[#4A383F]">
                <div className="flex items-center gap-1.5 text-rose-500 font-bold">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[#1E1418] font-extrabold">5.0</span>
                  <span className="text-[#7A6A63] font-normal ml-1">
                    (3 400+ to‘y va nikoh marosimlari)
                  </span>
                </div>
                <span className="text-[11px] text-[#6B5A62]">
                  Mehmonlaringizning qalbiga yetib boruvchi go‘zal taklif
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Mockup: Smartphone Frame with Live Wedding Invitation */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Floating glass badge 1 (Pink RSVP) */}
            <div className="absolute -top-4 -left-4 sm:-left-8 z-20 glass-liquid-pink rounded-3xl p-3.5 shadow-xl border border-white/95 animate-bounce duration-1000 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/90 flex items-center justify-center text-[#E27B9B] shadow-xs">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#8A7C74]">RSVP Tasdiq</div>
                <div className="text-xs font-extrabold text-[#1E1418]">148 kishi qatnashadi</div>
              </div>
            </div>

            {/* Floating glass badge 2 (Sky Blue Music) */}
            <div className="absolute -bottom-4 -right-4 sm:-right-6 z-20 glass-liquid-sky rounded-3xl p-3.5 shadow-xl border border-white/95 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/90 flex items-center justify-center text-[#4A9BD4] shadow-xs">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#8A7C74]">Fon Kuyi</div>
                <div className="text-xs font-extrabold text-[#1E1418]">Nafis to‘y valsi</div>
              </div>
            </div>

            {/* Phone Frame with Rose & Sky highlights */}
            <div className="w-[305px] sm:w-[325px] rounded-[44px] p-3.5 bg-gradient-to-b from-[#2E2026] via-[#1E1418] to-[#16202A] shadow-[0_25px_60px_-15px_rgba(226,123,155,0.35)] ring-2 ring-white/30 relative">
              {/* Phone Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#100B0E] rounded-full z-30 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E1418] mr-2" />
                <span className="w-2.5 h-1 rounded-full bg-[#1E1418]" />
              </div>

              {/* Screen Content: Romantic Wedding Canvas */}
              <div className="w-full h-[590px] rounded-[36px] bg-gradient-to-b from-white/95 via-[#FFF5F8]/95 to-[#F0F8FF]/95 overflow-y-auto overflow-x-hidden relative border border-white select-none text-center p-5 pt-8 flex flex-col justify-between shadow-inner">
                <div>
                  <div className="font-script text-xl text-[#E27B9B] mb-0.5">
                    Nikoh Oqshomi
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-[#1E1418] tracking-tight">
                    Nodir & Malika
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#F5C9D8] via-[#B48B47] to-[#B9DFFA] mx-auto my-2.5" />

                  {/* Couple photo preview */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden shadow-sm border-2 border-white my-3 relative">
                    <img
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                      alt="Nodir va Malika"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-xl bg-white/75 backdrop-blur-md text-[10px] font-bold text-[#1E1418]">
                      24-Avgust, 2026 • Soat 18:00
                    </div>
                  </div>

                  <p className="text-[11px] leading-relaxed italic text-[#4A383F] px-1">
                    «Ikki qalbning bir butunlik sari qo‘yilgan ilk qadami muborak bo‘lsin!»
                  </p>

                  <div className="space-y-1 text-xs text-[#5C4F48] mt-3">
                    <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#1E1418]">
                      <MapPin className="w-3.5 h-3.5 text-[#E27B9B]" />
                      <span>«Versal» majmuasi, Toshkent</span>
                    </div>
                  </div>
                </div>

                {/* RSVP and Action inside mobile mock */}
                <div className="pt-3 border-t border-rose-100 space-y-2">
                  <Link
                    to="/i/nodir-malika-wedding"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#E27B9B] to-[#4A9BD4] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Tashrifingizni tasdiqlang</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    to="/i/nodir-malika-wedding"
                    className="block text-[11px] font-semibold text-[#E27B9B] hover:underline"
                  >
                    Jonli to‘y taklifnomasini ochish →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.2 SERVICE CATEGORIES: Liquid Glass Pink vs Sky Blue */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-script text-2xl text-[#E27B9B] block">
            Eng zamonaviy imkoniyatlar
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#1E1418] mt-1">
            Bizning Xizmat Turlarimiz
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Interactive Website Invitations in Soft Pink Liquid Glass */}
          <div className="glass-liquid-pink rounded-3xl p-8 sm:p-10 border border-white/95 shadow-xl flex flex-col justify-between group hover:shadow-[0_20px_50px_rgba(245,201,216,0.4)] transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center mb-6 text-[#E27B9B] shadow-sm">
                <Smartphone className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E27B9B]">
                Veb Sahifa Taklifnomasi
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1E1418] mb-3 mt-1">
                Interaktiv Veb Taklifnomalar
              </h3>
              <p className="text-sm text-[#4A383F] leading-relaxed mb-6">
                Har bir mehmoningiz smartfonida shaxsiy havola bilan ochiladigan, fotoalbom, musiqa, xarita va RSVP tashrif tasdig‘iga ega chiroyli sahifa.
              </p>

              <div className="space-y-2.5 mb-8">
                {[
                  'Shaxsiy havola va individual QR-kod',
                  'To‘y musiqasi va yuqori sifatli fotogalereya',
                  'Yandex & Google Maps xarita navigatsiyasi',
                  'Mehmonlar RSVP tashrif tasdig‘i (Mijoz kabineti)',
                  'Haqiqiy vaqt taymeri va dres-kod tavsiyasi',
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#2A1C22] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/templates"
              className="w-full py-4 rounded-2xl text-xs font-extrabold text-[#1E1418] bg-white hover:bg-white/90 shadow-md transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Shablon Tanlash</span>
              <ArrowRight className="w-4 h-4 text-[#E27B9B]" />
            </Link>
          </div>

          {/* Card 2: Exclusive Video Invitations in Sky Blue Liquid Glass */}
          <div className="glass-liquid-sky rounded-3xl p-8 sm:p-10 border border-white/95 shadow-xl flex flex-col justify-between group hover:shadow-[0_20px_50px_rgba(185,223,250,0.4)] transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center mb-6 text-[#4A9BD4] shadow-sm">
                <Video className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#4A9BD4]">
                Eksklyuziv Montaj
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1E1418] mb-3 mt-1">
                Eksklyuziv Video Taklifnomalar
              </h3>
              <p className="text-sm text-[#4A383F] leading-relaxed mb-6">
                Sizning fotosuratlaringiz, sevimli musiqangiz, animatsiyalar va tantanali matnlaringiz bilan 4K formatda tayyorlangan video taklifnoma.
              </p>

              <div className="space-y-2.5 mb-8">
                {[
                  'Full HD va 4K yuqori sifatli video format',
                  'Professional kinematografik animatsiyalar',
                  'Siz tanlagan fon kuyi va sevgi tarixi yozuvlari',
                  'Telegram va Instagram uchun 100% mos o‘lcham',
                  '24-48 soat ichida to‘liq tayyor holatda topshirish',
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#1E2D38] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/premium"
              className="w-full py-4 rounded-2xl text-xs font-extrabold text-[#1E3A5F] bg-white hover:bg-white/90 shadow-md transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Video Buyurtma Berish</span>
              <ArrowRight className="w-4 h-4 text-[#4A9BD4]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6.3 HOW IT WORKS (4-STEP WEDDING FLOW) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-script text-2xl text-[#E27B9B] block">
            Qulay va oson
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#1E1418] mt-1">
            Qanday Ishlaydi?
          </h2>
          <p className="text-xs sm:text-sm text-[#4A383F] mt-2">
            Atigi 4 ta oddiy qadamda orzungizdagi to‘y taklifnomasini yarating
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Shablonni tanlang',
              desc: 'Katalogimizdagi to‘y va marosimlarga mos 8 xil mualliflik dizaynlaridan birini tanlang.',
              color: 'from-[#F5C9D8] to-white',
              textColor: 'text-[#E27B9B]',
            },
            {
              num: '02',
              title: 'Ma’lumotlarni kiriting',
              desc: 'To‘y sanasi, to‘yxona manzili, kelin-kuyov ismlari, dres-kod va fotosuratlarni joylang.',
              color: 'from-[#B9DFFA] to-white',
              textColor: 'text-[#4A9BD4]',
            },
            {
              num: '03',
              title: 'Oldindan ko‘ring',
              desc: 'Smartfon va kompyuter ekranida taklifnomangiz qanday ko‘rinishini jonli kuzating.',
              color: 'from-[#F5C9D8] via-white to-[#B9DFFA]',
              textColor: 'text-[#B48B47]',
            },
            {
              num: '04',
              title: 'Mehmonlarga ulashing',
              desc: 'Shaxsiy havola yoki QR-kod orqali Telegram, WhatsApp yoki Instagram orqali yuboring.',
              color: 'from-[#B9DFFA] to-[#F5C9D8]',
              textColor: 'text-emerald-700',
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="glass-liquid-wedding rounded-3xl p-6 border border-white/95 shadow-md relative flex flex-col justify-between hover:-translate-y-2 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} flex items-center justify-center shadow-xs text-base font-extrabold ${step.textColor}`}>
                    {step.num}
                  </div>
                  <Sparkles className="w-4 h-4 text-[#E27B9B] opacity-60" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-[#1E1418] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#5C4F48] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6.4 FEATURED TEMPLATES (8 ORIGINAL DESIGNS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div>
            <span className="font-script text-2xl text-[#E27B9B] block">
              Har bir did uchun
            </span>
            <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#1E1418] mt-1">
              Ommabop Shablonlar
            </h2>
          </div>
          <Link
            to="/templates"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass-liquid-pink text-xs font-extrabold text-[#1E1418] hover:bg-white transition-all shadow-xs"
          >
            <span>Barcha shablonlarni ko‘rish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTemplates.map((template) => (
            <div
              key={template.id}
              className="glass-panel-elevated rounded-3xl overflow-hidden border border-white/95 shadow-lg glass-card-hover flex flex-col justify-between group"
            >
              <div>
                {/* Image preview container with pink/sky badges */}
                <div className="relative h-64 overflow-hidden bg-[#ECE4D8]">
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle glass overlay tag */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {template.isPopular && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#F5C9D8]/95 text-[#2E141E] backdrop-blur-md shadow-xs border border-white/60">
                        Ommabop
                      </span>
                    )}
                    {template.isNew && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#B9DFFA]/95 text-[#142636] backdrop-blur-md shadow-xs border border-white/60">
                        Yangi
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#1E1418]/75 text-white backdrop-blur-md border border-white/30">
                    {formatPriceUZS(template.price)}
                  </div>
                </div>

                {/* Template Meta */}
                <div className="p-5">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#E27B9B] mb-1">
                    {template.category}
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-[#1E1418] mb-1.5">
                    {template.name}
                  </h3>
                  <p className="text-xs text-[#5C4F48] line-clamp-2 leading-relaxed">
                    {template.description[language] || template.description.uz}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-black/5 mt-2">
                <Link
                  to={`/templates/${template.slug}`}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-[#4A383F] glass-panel hover:bg-white text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#4A9BD4]" />
                  <span>Ko‘rish</span>
                </Link>

                <Link
                  to={`/create/${template.slug}`}
                  className="py-2.5 px-3 rounded-xl text-xs font-extrabold text-[#1E1418] bg-gradient-to-r from-[#F5C9D8] to-[#B9DFFA] hover:shadow-md text-center transition-all flex items-center justify-center gap-1"
                >
                  <span>Tanlash</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6.5 VIDEO INVITATIONS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-liquid-wedding rounded-3xl p-8 sm:p-12 border-2 border-white/95 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B9DFFA]/60 text-[#1E3A5F] text-xs font-bold border border-white">
                <Video className="w-3.5 h-3.5" />
                <span>Kinolardek Taassurot</span>
              </div>
              <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#1E1418] leading-tight">
                Shaxsiy 4K Video Taklifnoma
              </h2>
              <p className="text-sm text-[#4A383F] leading-relaxed">
                Fotosuratlaringiz, musiqiy jo‘rlik, tantanali sanalar va nafis harakatlar uyg‘unligida professional video montaj. Telegram va Instagram hikoyalari uchun eng mos format.
              </p>
              <ul className="space-y-2 text-xs font-bold text-[#2A1C22]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Full HD yoki 4K formatda tayyorlash (9:16 yoki 16:9)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Siz tanlagan to‘y taronasi va samimiy sevgi tarixi yozuvlari</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>24-48 soat ichida to‘liq tayyor holatda topshirish</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/premium"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-xs font-extrabold text-white bg-[#1E1418] hover:bg-black transition-all shadow-xl"
                >
                  <Video className="w-4 h-4 text-[#F5C9D8]" />
                  <span>Video Taklifnoma Buyurtma Berish</span>
                </Link>
              </div>
            </div>

            {/* Right Video Simulation Window */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video border-2 border-white/40 group">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                  alt="Video poster"
                  className={`w-full h-full object-cover transition-opacity duration-700 ${
                    isVideoPlaying ? 'opacity-85 scale-105' : 'opacity-70'
                  }`}
                />
                {/* Center Play Button */}
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full glass-panel-elevated flex items-center justify-center text-[#1E1418] hover:scale-110 active:scale-95 transition-all shadow-2xl border border-white"
                  aria-label={isVideoPlaying ? 'To‘xtatish' : 'Videoni ko‘rish'}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-6 h-6 text-[#1E1418]" />
                  ) : (
                    <Play className="w-6 h-6 text-[#E27B9B] ml-1" />
                  )}
                </button>

                {/* Video controls demo bar */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl px-4 py-2 flex items-center justify-between text-xs text-white">
                  <span className="font-bold text-[11px] text-[#1E1418]">
                    {isVideoPlaying ? 'Video namoyish etilmoqda (Demo 4K)' : 'Namuna rolikni tomosha qiling'}
                  </span>
                  <span className="text-[10px] text-[#7A6A63]">0:45 / 1:20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.6 PLATFORM BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-script text-2xl text-[#E27B9B] block">
            Qulaylik va Tejamkorlik
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#1E1418] mt-1">
            Nega Aynan Taklifim?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Smartphone,
              title: 'Har qanday smartfonga mos',
              desc: 'iOS va Android qurilmalarida ilovadek mayin va bir zumda ochiladi.',
              gradient: 'from-[#F5C9D8] to-white',
            },
            {
              icon: Share2,
              title: 'Bir bosishda ulashish',
              desc: 'Telegram, WhatsApp va ijtimoiy tarmoqlar orqali chiroyli havola jo‘nating.',
              gradient: 'from-[#B9DFFA] to-white',
            },
            {
              icon: QrCode,
              title: 'Individual QR-kod',
              desc: 'Bosma otkritka yoki sovg‘alarga tushirish uchun maxsus QR-kod generatsiyasi.',
              gradient: 'from-[#F5C9D8] via-white to-[#B9DFFA]',
            },
            {
              icon: Users,
              title: 'Mehmonlar RSVP tizimi',
              desc: 'Mehmonlarning qatnashish tasdig‘i va taom tanlovini onlayn kuzatib boring.',
              gradient: 'from-[#B9DFFA] to-white',
            },
            {
              icon: MapPin,
              title: 'Xarita va navigatsiya',
              desc: 'Yandex Maps va Google Maps orqali to‘yxonagacha bo‘lgan aniq yo‘nalish.',
              gradient: 'from-[#F5C9D8] to-white',
            },
            {
              icon: Music,
              title: 'Nafis musiqiy jo‘rlik',
              desc: 'Taklifnomani ochganda yangraydigan yoqimli to‘y valsi yoki milliy kuylar.',
              gradient: 'from-[#F5C9D8] to-[#B9DFFA]',
            },
          ].map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="glass-liquid-wedding rounded-3xl p-6 border border-white/90 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${benefit.gradient} flex items-center justify-center text-[#1E1418] mb-4 shadow-xs border border-white/80`}>
                  <Icon className="w-5 h-5 text-[#E27B9B]" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-[#1E1418] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs text-[#5C4F48] leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6.7 STATISTICS (DEMONSTRATION) IN LIQUID GLASS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-liquid-wedding rounded-3xl p-8 sm:p-12 border-2 border-white/95 shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#1E1418]">
                {mockStats.totalInvitations.toLocaleString()}+
              </div>
              <div className="text-xs font-bold text-[#E27B9B] mt-1 uppercase tracking-wider">
                Yaratilgan Taklifnomalar
              </div>
            </div>
            <div>
              <div className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#E27B9B]">
                {mockStats.totalTemplates}+
              </div>
              <div className="text-xs font-bold text-[#3A1C25] mt-1 uppercase tracking-wider">
                Mualliflik Shablonlari
              </div>
            </div>
            <div>
              <div className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#4A9BD4]">
                {mockStats.totalGuests.toLocaleString()}+
              </div>
              <div className="text-xs font-bold text-[#1E3A5F] mt-1 uppercase tracking-wider">
                Taklif Qilingan Mehmonlar
              </div>
            </div>
            <div>
              <div className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#B48B47]">
                {mockStats.totalViews.toLocaleString()}+
              </div>
              <div className="text-xs font-bold text-[#6B5A62] mt-1 uppercase tracking-wider">
                Ko‘rishlar Soni
              </div>
            </div>
          </div>
          <p className="text-[11px] text-center text-[#7A6A63] mt-6 italic">
            * {mockStats.isDemoNotice}
          </p>
        </div>
      </section>

      {/* 6.8 PRICING PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-script text-2xl text-[#E27B9B] block">
            Shaffof va Qulay
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#1E1418] mt-1">
            Tariflarimiz
          </h2>
          <p className="text-xs text-[#5C4F48] mt-2">
            Hech qanday yashirin to‘lovlarsiz, to‘liq imkoniyatlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Standard */}
          <div className="glass-panel-elevated rounded-3xl p-7 border border-white/90 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-playfair text-xl font-bold text-[#1E1418]">Standard</h3>
              <p className="text-xs text-[#7A6A63] mt-1">Tezkor va qulay taklifnoma</p>
              <div className="my-5">
                <span className="font-playfair text-3xl font-extrabold text-[#1E1418]">
                  150 000
                </span>
                <span className="text-xs text-[#7A6A63] ml-1">so‘m</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#3A242B] font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Katalogdagi 1 ta shablon</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Xarita va manzil navigatsiyasi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Musiqa va shaxsiy havola</span>
                </li>
              </ul>
            </div>
            <Link
              to="/templates"
              className="mt-6 w-full py-3.5 rounded-xl text-xs font-bold text-[#1E1418] bg-white hover:bg-black/5 border border-white shadow-xs text-center block transition-colors"
            >
              Tanlash
            </Link>
          </div>

          {/* Personalized (Recommended) in Soft Pink & Sky Blue Glass */}
          <div className="glass-liquid-pink rounded-3xl p-8 border-2 border-white shadow-2xl relative flex flex-col justify-between -translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#E27B9B] to-[#4A9BD4] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
              Eng Ommabop
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-bold text-[#1E1418]">Personalized</h3>
              <p className="text-xs text-[#6B5A62] mt-1">Fotoalbom va RSVP boshqaruvi</p>
              <div className="my-5">
                <span className="font-playfair text-4xl font-extrabold text-[#1E1418]">
                  240 000
                </span>
                <span className="text-xs text-[#6B5A62] ml-1">so‘m</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#2E141E] font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Standard rejadagi barcha imkoniyatlar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>10 tagacha fotosuratlar galereyasi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dastur (Schedule) va Dres-kod tavsiyasi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Mehmonlar RSVP ro‘yxati (Kabinet)</span>
                </li>
              </ul>
            </div>
            <Link
              to="/pricing"
              className="mt-6 w-full py-4 rounded-xl text-xs font-extrabold text-[#1E1418] bg-white hover:bg-white/90 shadow-md text-center block transition-all"
            >
              Ushbu Tarifni Tanlash
            </Link>
          </div>

          {/* Individual Premium in Sky Blue Liquid Glass */}
          <div className="glass-liquid-sky rounded-3xl p-7 border border-white/90 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-playfair text-xl font-bold text-[#1E1418]">
                Individual Premium
              </h3>
              <p className="text-xs text-[#7A6A63] mt-1">Dizayner + Video taklifnoma</p>
              <div className="my-5">
                <span className="font-playfair text-3xl font-extrabold text-[#1E1418]">
                  450 000
                </span>
                <span className="text-xs text-[#7A6A63] ml-1">so‘m</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#1E2D38] font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Personalized dagi barcha funksiyalar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Full HD / 4K Video Taklifnoma sovg‘a</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Individual monogramma dizayni</span>
                </li>
              </ul>
            </div>
            <Link
              to="/pricing"
              className="mt-6 w-full py-3.5 rounded-xl text-xs font-bold text-[#1E1418] bg-white hover:bg-black/5 border border-white shadow-xs text-center block transition-colors"
            >
              Batafsil Ko‘rish
            </Link>
          </div>
        </div>
      </section>

      {/* 6.9 TESTIMONIALS & FAQ ACCORDION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-script text-2xl text-[#E27B9B] block">
              Samimiy Fikrlar
            </span>
            <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#1E1418] mt-1">
              Mijozlarimiz Nima Deydi?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTestimonials.map((tItem) => (
              <div
                key={tItem.id}
                className="glass-liquid-wedding rounded-3xl p-6 border border-white/90 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(tItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-[#3A242B] leading-relaxed italic mb-6">
                    "{tItem.text[language] || tItem.text.uz}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-black/5">
                  <img
                    src={tItem.avatar}
                    alt={tItem.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1E1418]">{tItem.name}</h4>
                    <span className="text-[10px] text-[#E27B9B] font-semibold">
                      {tItem.event[language] || tItem.event.uz}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="font-script text-2xl text-[#E27B9B] block">
              Yordam va Javoblar
            </span>
            <h2 className="font-playfair text-3xl font-extrabold text-[#1E1418] mt-1">
              Ko‘p Beriladigan Savollar
            </h2>
          </div>

          <div className="space-y-3">
            {mockFaq.slice(0, 5).map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="glass-panel-elevated rounded-2xl border border-white/90 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#1E1418] hover:bg-white/40 transition-colors"
                  >
                    <span>{faq.question[language] || faq.question.uz}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#E27B9B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-[#5C4F48] leading-relaxed border-t border-black/5 animate-fadeIn">
                      {faq.answer[language] || faq.answer.uz}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION: Liquid Glass Wedding Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#24151C] via-[#351D29] to-[#172533] text-white shadow-2xl overflow-hidden text-center border-2 border-white/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E27B9B]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4A9BD4]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-xs text-[#F5C9D8] font-extrabold tracking-wider uppercase border border-white/20">
              Birgalikda quvonch ulashamiz
            </span>
            <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              To‘yingiz uchun mukammal taklifnomani hoziroq yarating
            </h2>
            <p className="text-xs sm:text-sm text-[#E8DCE2] leading-relaxed">
              Atigi bir necha daqiqada tayyorlanadigan va mehmonlaringizning qalbini zabt etadigan nafis interaktiv taklifnoma.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <Link
                to="/templates"
                className="px-8 py-4 rounded-2xl text-xs font-extrabold text-[#1E1418] bg-gradient-to-r from-[#F5C9D8] via-white to-[#B9DFFA] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Shablonni Tanlash
              </Link>
              <Link
                to="/premium"
                className="px-7 py-4 rounded-2xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all border border-white/20"
              >
                Video Taklifnoma
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
