import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { mockInvitations } from '../data/mockInvitations';
import { mockGuests } from '../data/mockGuests';
import { api } from '../services/api';
import { calculateCountdown, validateRSVPForm } from '../utils/logic';
import { ShareModal } from '../components/ShareModal';
import { MusicPlayer } from '../components/MusicPlayer';
import { Language, GuestRSVP, InvitationData } from '../types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
  Users,
  Utensils,
  Music,
  ExternalLink,
  MailOpen,
  Globe,
} from 'lucide-react';

export const InvitationGuestPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const { showToast } = useAuth();
  const slug = params.slug || 'nodir-malika-wedding';

  // Load invitation data from API / mock
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Independent invitation language setting
  const [invLang, setInvLang] = useState<Language>('uz');

  // Envelope cover opening state
  const [isCoverOpened, setIsCoverOpened] = useState<boolean>(false);

  // Countdown state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  // Photo gallery lightbox
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Share modal
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  // RSVP Form state
  const [rsvpFullName, setRsvpFullName] = useState<string>('');
  const [rsvpPhone, setRsvpPhone] = useState<string>('');
  const [rsvpAttending, setRsvpAttending] = useState<boolean>(true);
  const [rsvpGuestCount, setRsvpGuestCount] = useState<number>(1);
  const [rsvpMeal, setRsvpMeal] = useState<string>('Milliy taomlar / To‘y oshi');
  const [rsvpMessage, setRsvpMessage] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Guest wishes wall
  const [guestList, setGuestList] = useState<GuestRSVP[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await api.getInvitationBySlug(slug);
      if (data) {
        setInvitation(data);
        setInvLang(data.language || 'uz');
      } else {
        // Fallback to first mock invitation
        setInvitation(mockInvitations[0]);
      }
      const guests = await api.getGuests(slug);
      setGuestList(guests);
      setLoading(false);
    }
    load();
  }, [slug]);

  // Real-time Countdown timer
  useEffect(() => {
    if (!invitation?.eventDate) return;

    const timer = setInterval(() => {
      const result = calculateCountdown(invitation.eventDate, invitation.startTime);
      setCountdown(result);
    }, 1000);

    // Initial run
    setCountdown(calculateCountdown(invitation.eventDate, invitation.startTime));

    return () => clearInterval(timer);
  }, [invitation?.eventDate, invitation?.startTime]);

  // Keyboard navigation for photo lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activePhotoIndex === null || !invitation) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev + 1) % invitation.galleryImages.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev !== null
            ? (prev - 1 + invitation.galleryImages.length) %
              invitation.galleryImages.length
            : 0
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activePhotoIndex, invitation]);

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateRSVPForm({
      fullName: rsvpFullName,
      attending: rsvpAttending,
      guestCount: rsvpGuestCount,
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const newGuest = await api.submitRSVP({
        invitationId: invitation?.id || 'inv-1',
        invitationSlug: slug,
        fullName: rsvpFullName.trim(),
        phone: rsvpPhone.trim(),
        attending: rsvpAttending,
        guestCount: rsvpAttending ? rsvpGuestCount : 0,
        mealPreference: rsvpMeal,
        message: rsvpMessage.trim(),
      });

      setGuestList((prev) => [newGuest, ...prev]);
      setIsRsvpSubmitted(true);

      // Celebration effect
      try {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#F5C9D8', '#B9DFFA', '#B48B47'],
        });
      } catch {
        // ignore
      }

      showToast('Tashrifingiz muvaffaqiyatli qayd etildi! Rahmat!', 'success');
    } catch {
      showToast('Xatolik yuz berdi, iltimos qayta urinib ko‘ring', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0]">
        <div className="text-center space-y-3">
          <Sparkles className="w-8 h-8 text-[#B48B47] animate-spin mx-auto" />
          <p className="font-playfair text-sm font-semibold text-[#231E1B]">
            Taklifnoma ochilmoqda...
          </p>
        </div>
      </div>
    );
  }

  const primaryColor = invitation.customColors?.primary || '#B48B47';
  const bgColor = invitation.customColors?.background || '#FAF6F0';
  const headingFont = invitation.customFonts?.heading || 'Playfair Display';

  // 1. COVER OPENING EFFECT
  if (!isCoverOpened) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute inset-0 bg-radial from-white/60 via-transparent to-black/10 pointer-events-none" />

        <div className="relative max-w-sm w-full glass-panel-elevated rounded-3xl p-8 text-center space-y-6 shadow-2xl border border-white/95 animate-fadeIn">
          {/* Monogram Seal */}
          <div
            className="w-20 h-20 rounded-full mx-auto p-1 shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, #E6D2B5)`,
            }}
            onClick={() => setIsCoverOpened(true)}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <MailOpen className="w-8 h-8" style={{ color: primaryColor }} />
            </div>
          </div>

          <div className="space-y-2">
            <span
              className="text-[11px] uppercase tracking-widest font-bold"
              style={{ color: primaryColor }}
            >
              Maxsus Taklifnoma
            </span>
            <h1
              className="text-3xl font-bold tracking-tight text-[#231E1B]"
              style={{ fontFamily: headingFont }}
            >
              {invitation.hostNames}
            </h1>
            <p className="text-xs text-[#5C4F48]">
              {invitation.eventType}
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsCoverOpened(true)}
              className="w-full py-3.5 px-6 rounded-2xl text-xs font-bold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              style={{ backgroundColor: primaryColor }}
            >
              <span>Taklifnomani ochish</span>
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GUEST PAGE FULL VIEW
  return (
    <div
      className="min-h-screen text-[#2A2420] transition-colors pb-24"
      style={{ backgroundColor: bgColor }}
    >
      {/* Floating Invitation Header: Language switch, Music, Share */}
      <div className="fixed top-4 left-4 right-4 z-40 max-w-2xl mx-auto flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Independent invitation language switcher */}
          <div className="glass-panel rounded-2xl px-2.5 py-1.5 flex items-center gap-1.5 border border-white/80 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-[#5C4F48]" />
            <button
              onClick={() => setInvLang('uz')}
              className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                invLang === 'uz' ? 'bg-[#231E1B] text-white' : 'text-[#7A6A63]'
              }`}
            >
              UZ
            </button>
            <button
              onClick={() => setInvLang('ru')}
              className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                invLang === 'ru' ? 'bg-[#231E1B] text-white' : 'text-[#7A6A63]'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setInvLang('en')}
              className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                invLang === 'en' ? 'bg-[#231E1B] text-white' : 'text-[#7A6A63]'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="glass-panel p-2.5 rounded-2xl border border-white/80 shadow-xs text-[#231E1B] hover:bg-white transition-colors"
            title="Ulashish"
            aria-label="Ulashish"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Single Column Invitation Canvas */}
      <div className="max-w-2xl mx-auto px-4 pt-20 space-y-16">
        {/* 1. COVER / HERO */}
        <section className="text-center space-y-6 pt-4 animate-fadeIn">
          <div
            className="text-xs uppercase tracking-widest font-bold"
            style={{ color: primaryColor }}
          >
            {invitation.eventType}
          </div>

          <h1
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#231E1B]"
            style={{ fontFamily: headingFont }}
          >
            {invitation.hostNames}
          </h1>

          <div
            className="w-14 h-0.5 mx-auto opacity-60"
            style={{ backgroundColor: primaryColor }}
          />

          {/* Cover photo */}
          {invitation.coverImage && (
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 max-w-lg mx-auto border-4 border-white/80">
              <img
                src={invitation.coverImage}
                alt={invitation.hostNames}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Quote */}
          {invitation.invitationQuote && (
            <p className="font-playfair text-sm italic text-[#5C4F48] max-w-md mx-auto leading-relaxed">
              {invitation.invitationQuote}
            </p>
          )}
        </section>

        {/* 2. COUNTDOWN TIMER */}
        <section className="glass-panel-elevated rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-md border border-white/95">
          <div
            className="text-xs uppercase font-bold tracking-wider"
            style={{ color: primaryColor }}
          >
            {countdown.isPassed ? 'Tantana boshlandi' : 'Tantanagacha qolgan vaqt'}
          </div>

          {countdown.isPassed ? (
            <div className="py-2 text-sm font-bold text-emerald-700 bg-emerald-50 rounded-2xl p-3">
              🎉 Tadbir boshlandi! Quvonchimizga sherik bo‘ling!
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto">
              <div className="p-3 rounded-2xl bg-white/80 border border-black/5 shadow-xs">
                <div className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#231E1B]">
                  {countdown.days}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#8A7C74]">Kun</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 border border-black/5 shadow-xs">
                <div className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#231E1B]">
                  {countdown.hours}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#8A7C74]">Soat</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 border border-black/5 shadow-xs">
                <div className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#231E1B]">
                  {countdown.minutes}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#8A7C74]">Daqiqa</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 border border-black/5 shadow-xs">
                <div className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#231E1B]">
                  {countdown.seconds}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#8A7C74]">Soniya</div>
              </div>
            </div>
          )}
        </section>

        {/* 3. PERSONAL INVITATION MESSAGE */}
        <section className="text-center space-y-4 max-w-lg mx-auto">
          <div className="w-8 h-8 rounded-full bg-white/60 mx-auto flex items-center justify-center text-[#B48B47] shadow-xs">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <h2
            className="text-2xl font-bold text-[#231E1B]"
            style={{ fontFamily: headingFont }}
          >
            Hurmatli Mehmonimiz!
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-[#4A3E39]">
            {invitation.invitationMessage}
          </p>
        </section>

        {/* 4. DATE, TIME & VENUE INFORMATION */}
        <section className="glass-panel-elevated rounded-3xl p-6 sm:p-8 space-y-6 shadow-md border border-white/95">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#F5EBDD] flex items-center justify-center text-[#B48B47] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A7C74]">
                  Sana va Vaqt
                </span>
                <h4 className="text-sm font-bold text-[#231E1B] mt-0.5">
                  {invitation.eventDate}
                </h4>
                <p className="text-xs text-[#5C4F48]">
                  Soat {invitation.startTime}
                  {invitation.endTime ? ` dan ${invitation.endTime} gacha` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#F5EBDD] flex items-center justify-center text-[#B48B47] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A7C74]">
                  Manzil
                </span>
                <h4 className="text-sm font-bold text-[#231E1B] mt-0.5">
                  {invitation.venueName}
                </h4>
                <p className="text-xs text-[#5C4F48]">
                  {invitation.venueAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Map Direction CTA */}
          <div className="pt-2">
            <a
              href={
                invitation.mapUrl ||
                `https://yandex.uz/maps/?text=${encodeURIComponent(
                  `${invitation.venueName} ${invitation.venueAddress}`
                )}`
              }
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-xs hover:opacity-95 transition-opacity"
              style={{ backgroundColor: primaryColor }}
            >
              <MapPin className="w-4 h-4" />
              <span>Xaritada yo‘nalishni ko‘rish (Yandex Maps)</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </section>

        {/* 5. EVENT SCHEDULE / TIMELINE */}
        {invitation.schedule && invitation.schedule.length > 0 && (
          <section className="space-y-6">
            <div className="text-center">
              <span
                className="text-xs uppercase font-bold tracking-wider"
                style={{ color: primaryColor }}
              >
                Tadbir Dasturi
              </span>
              <h3
                className="text-2xl font-bold text-[#231E1B] mt-1"
                style={{ fontFamily: headingFont }}
              >
                Oqshom Jadvali
              </h3>
            </div>

            <div className="space-y-3">
              {invitation.schedule.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="glass-panel rounded-2xl p-4 border border-white/80 shadow-xs flex items-center gap-4"
                >
                  <div className="font-mono text-xs font-bold text-[#B48B47] px-2.5 py-1 rounded-xl bg-[#F5EBDD] shrink-0">
                    {item.time}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#231E1B]">
                      {typeof item.title === 'string' ? item.title : item.title.uz}
                    </h5>
                    {item.description && (
                      <p className="text-[11px] text-[#7A6A63] mt-0.5">
                        {typeof item.description === 'string'
                          ? item.description
                          : item.description.uz}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. PHOTO GALLERY & LIGHTBOX */}
        {invitation.galleryImages && invitation.galleryImages.length > 0 && (
          <section className="space-y-6">
            <div className="text-center">
              <span
                className="text-xs uppercase font-bold tracking-wider"
                style={{ color: primaryColor }}
              >
                Fotogalereya
              </span>
              <h3
                className="text-2xl font-bold text-[#231E1B] mt-1"
                style={{ fontFamily: headingFont }}
              >
                Unutilmas Lahzalar
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {invitation.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className="relative h-44 rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-white group"
                >
                  <img
                    src={img}
                    alt={`Foto ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lightbox Modal */}
        {activePhotoIndex !== null && invitation.galleryImages && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Yopish"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setActivePhotoIndex(
                  (activePhotoIndex - 1 + invitation.galleryImages.length) %
                    invitation.galleryImages.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Oldingi"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={invitation.galleryImages[activePhotoIndex]}
              alt="Katta rasm"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
            />

            <button
              onClick={() =>
                setActivePhotoIndex(
                  (activePhotoIndex + 1) % invitation.galleryImages.length
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Keyingi"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* 7. DRESS CODE */}
        {invitation.dressCodeEnabled && (
          <section className="glass-panel-elevated rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-md border border-white/95">
            <div
              className="text-xs uppercase font-bold tracking-wider"
              style={{ color: primaryColor }}
            >
              Dres-kod
            </div>
            <h3
              className="text-xl font-bold text-[#231E1B]"
              style={{ fontFamily: headingFont }}
            >
              {invitation.dressCodeTitle || 'Tavsiya etilgan ranglar'}
            </h3>
            {invitation.dressCodeDescription && (
              <p className="text-xs text-[#5C4F48] max-w-sm mx-auto">
                {invitation.dressCodeDescription}
              </p>
            )}

            {invitation.dressCodeColors && invitation.dressCodeColors.length > 0 && (
              <div className="flex items-center justify-center gap-3 pt-2">
                {invitation.dressCodeColors.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-10 h-10 rounded-full shadow-sm border-2 border-white"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[10px] text-[#7A6A63] font-medium">
                      {typeof color.name === 'string' ? color.name : color.name.uz}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 8. RSVP FORM */}
        {invitation.rsvpEnabled && (
          <section className="glass-panel-elevated rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-white/95">
            <div className="text-center space-y-2">
              <span
                className="text-xs uppercase font-bold tracking-wider"
                style={{ color: primaryColor }}
              >
                Tashrif Tasdig‘i
              </span>
              <h3
                className="text-2xl font-bold text-[#231E1B]"
                style={{ fontFamily: headingFont }}
              >
                Biz bilan bo‘lasizmi?
              </h3>
              <p className="text-xs text-[#7A6A63]">
                Iltimos, tashrifingizni{' '}
                <strong className="text-[#231E1B]">{invitation.rsvpDeadline}</strong>{' '}
                sanasigacha tasdiqlang.
              </p>
            </div>

            {isRsvpSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-playfair text-lg font-bold text-[#231E1B]">
                  Rahmat! Javobingiz qabul qilindi.
                </h4>
                <p className="text-xs text-[#5C4F48]">
                  Sizni tantanamizda ko‘rishdan behad mamnun bo‘lamiz!
                </p>
                <button
                  onClick={() => setIsRsvpSubmitted(false)}
                  className="text-xs font-semibold text-emerald-800 underline pt-1"
                >
                  Boshqa mehmon nomidan javob berish
                </button>
              </div>
            ) : (
              <form onSubmit={handleRSVPSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#3A2D28] block mb-1">
                    Ism va familiyangiz *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpFullName}
                    onChange={(e) => setRsvpFullName(e.target.value)}
                    placeholder="Masalan: Anvar Alimov"
                    className="w-full p-3 rounded-xl bg-white border border-black/10 outline-none text-[#231E1B]"
                  />
                  {formErrors.fullName && (
                    <span className="text-rose-600 text-[11px] mt-1 block">
                      {formErrors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="font-bold text-[#3A2D28] block mb-1">
                    Telefon raqamingiz
                  </label>
                  <input
                    type="tel"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full p-3 rounded-xl bg-white border border-black/10 outline-none text-[#231E1B]"
                  />
                </div>

                {/* Attendance radio choice */}
                <div className="space-y-1.5 pt-1">
                  <label className="font-bold text-[#3A2D28] block">
                    Ishtirok eta olasizmi? *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending(true)}
                      className={`p-3 rounded-xl font-bold border transition-all ${
                        rsvpAttending
                          ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 shadow-xs'
                          : 'border-black/10 bg-white text-[#7A6A63]'
                      }`}
                    >
                      ✓ Ha, albatta boraman
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending(false)}
                      className={`p-3 rounded-xl font-bold border transition-all ${
                        !rsvpAttending
                          ? 'border-rose-600 bg-rose-50/80 text-rose-900 shadow-xs'
                          : 'border-black/10 bg-white text-[#7A6A63]'
                      }`}
                    >
                      ✕ Kela olmayman
                    </button>
                  </div>
                </div>

                {/* Guest Count if attending */}
                {rsvpAttending && (
                  <div className="pt-1">
                    <label className="font-bold text-[#3A2D28] block mb-1">
                      Necha kishi tashrif buyurasiz?
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => setRsvpGuestCount(cnt)}
                          className={`w-10 h-10 rounded-xl font-bold text-xs border transition-all ${
                            rsvpGuestCount === cnt
                              ? 'bg-[#231E1B] text-white'
                              : 'bg-white border-black/10 text-[#5C4F48]'
                          }`}
                        >
                          {cnt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Meal Preference */}
                {rsvpAttending && invitation.askMealPreference && (
                  <div className="pt-1">
                    <label className="font-bold text-[#3A2D28] block mb-1">
                      Taom afzalligingiz (ixtiyoriy)
                    </label>
                    <select
                      value={rsvpMeal}
                      onChange={(e) => setRsvpMeal(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-black/10 outline-none text-[#231E1B]"
                    >
                      <option value="Milliy taomlar / To‘y oshi">Milliy taomlar / To‘y oshi</option>
                      <option value="Go‘shtli taomlar / Steak">Go‘shtli taomlar / Steak</option>
                      <option value="Baliq / Dengiz mahsulotlari">Baliq / Parhez taomlar</option>
                      <option value="Vegetarian">Vegetarian (Go‘shtsiz)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="font-bold text-[#3A2D28] block mb-1">
                    Ezgu tilaklaringiz va tabrigingiz
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder="Kelin-kuyovga eng samimiy tilaklaringiz..."
                    className="w-full p-3 rounded-xl bg-white border border-black/10 outline-none text-[#231E1B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl text-xs font-bold text-white shadow-md hover:opacity-95 transition-opacity"
                  style={{ backgroundColor: primaryColor }}
                >
                  {isSubmitting ? 'Yuborilmoqda...' : 'Javobni Yuborish (RSVP)'}
                </button>
              </form>
            )}
          </section>
        )}

        {/* 9. GUEST WISHES WALL */}
        {guestList.length > 0 && (
          <section className="space-y-4">
            <div className="text-center">
              <span
                className="text-xs uppercase font-bold tracking-wider"
                style={{ color: primaryColor }}
              >
                Ezgu Tilaklar
              </span>
              <h3
                className="text-2xl font-bold text-[#231E1B] mt-1"
                style={{ fontFamily: headingFont }}
              >
                Mehmonlar Tabriklari
              </h3>
            </div>

            <div className="space-y-3">
              {guestList.slice(0, 4).map((g) => (
                <div
                  key={g.id}
                  className="p-4 rounded-2xl bg-white/70 border border-black/5 shadow-xs text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-[#231E1B]">{g.fullName}</strong>
                    <span className="text-[10px] text-[#8A7C74]">{g.submittedAt}</span>
                  </div>
                  {g.message && (
                    <p className="text-[#5C4F48] italic leading-relaxed">
                      "{g.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 10. FINAL THANK YOU */}
        <section className="text-center pt-8 pb-12 border-t border-black/10 space-y-3">
          <p
            className="text-2xl font-bold text-[#231E1B]"
            style={{ fontFamily: headingFont }}
          >
            Sizni kutib qolamiz!
          </p>
          <p className="text-xs text-[#7A6A63] font-medium">
            Hurmat bilan, {invitation.hostNames} oilasi
          </p>
          <div className="pt-4">
            <Link
              to="/"
              className="text-[11px] font-semibold text-[#8A7C74] hover:text-[#231E1B]"
            >
              Powered by Taklifim
            </Link>
          </div>
        </section>
      </div>

      {/* Floating Music Player if enabled */}
      {invitation.musicEnabled && (
        <MusicPlayer
          url={invitation.musicUrl}
          title={invitation.musicTitle}
          autoPlay={false}
        />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          url={`/i/${slug}`}
          title={`${invitation.hostNames} — ${invitation.eventType}`}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};
