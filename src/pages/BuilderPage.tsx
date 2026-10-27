import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useLanguage } from '../locales';
import { useAuth } from '../context/AuthContext';
import { mockTemplates } from '../data/mockTemplates';
import { mockPlans } from '../data/mockPlans';
import { InvitationData, ScheduleItem, DressCodeColor, Template } from '../types';
import { api } from '../services/api';
import { formatPriceUZS } from '../utils/logic';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  RotateCcw,
  Sparkles,
  Smartphone,
  Calendar,
  Clock,
  MapPin,
  Music,
  Image as ImageIcon,
  Plus,
  Trash2,
  Users,
  Eye,
  Sliders,
  Palette,
  Type,
  FileText,
  CreditCard,
  Share2,
  CheckCircle2,
  Play,
  Pause,
} from 'lucide-react';

export const BuilderPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const { t, language } = useLanguage();
  const { showToast } = useAuth();
  const templateSlug = params.templateSlug || 'aurelia';

  // Find template
  const initialTemplate =
    mockTemplates.find((t) => t.slug === templateSlug) || mockTemplates[0];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeTabMobile, setActiveTabMobile] = useState<'settings' | 'preview'>('settings');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-personalized');
  const [isDemoSubmitting, setIsDemoSubmitting] = useState<boolean>(false);
  const [isOrderComplete, setIsOrderComplete] = useState<boolean>(false);
  const [publishedSlug, setPublishedSlug] = useState<string>('');

  // Main Builder State (Live reactive)
  const [invitationState, setInvitationState] = useState<InvitationData>(() => {
    // Check saved draft in localStorage
    try {
      const draft = localStorage.getItem('taklifim_builder_draft');
      if (draft) {
        return JSON.parse(draft);
      }
    } catch {
      // ignore
    }

    return {
      id: `inv-${Date.now()}`,
      slug: `toylarimiz-${Math.floor(1000 + Math.random() * 9000)}`,
      templateId: initialTemplate.id,
      templateSlug: initialTemplate.slug,
      language: 'uz',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      eventType: 'To‘y va Nikoh Oqshomi',
      eventTitle: 'Nikoh To‘yi',
      hostNames: 'Nodir & Malika',
      partner1Name: 'Nodirbek',
      partner2Name: 'Malikaxon',
      eventDate: '2026-09-24',
      startTime: '18:00',
      endTime: '23:00',
      venueName: '«Versal» Tantanalar Majmuasi',
      venueAddress: 'Toshkent sh., Navoiy ko‘chasi, 42-uy',
      city: 'Toshkent',
      mapUrl: 'https://yandex.uz/maps',
      invitationMessage:
        'Sizni baxtli oqshomimiz — Nikoh to‘yimiz munosabati bilan yoziladigan dasturxonimizga lutfan taklif etamiz. Tashrifingiz bizga quvonch bag‘ishlaydi!',
      invitationQuote: '«Ikki qalbning bir butunlik sari ilk qadami muborak bo‘lsin.»',
      coverImage: initialTemplate.previewImage,
      galleryImages: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      ],
      musicEnabled: true,
      musicTitle: 'Nafis To‘y Valsi (Violin Solo)',
      musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-love-138.mp3',
      schedule: [
        { id: '1', time: '17:30', title: 'Mehmonlarni kutib olish', description: 'Jonli musiqa' },
        { id: '2', time: '18:30', title: 'Tantanali kirish', description: 'Ilk raqs' },
        { id: '3', time: '21:00', title: 'To‘y torti marosimi' },
      ],
      dressCodeEnabled: true,
      dressCodeTitle: 'Pastel & Elegant Glamour',
      dressCodeDescription: 'Och pastel va oqshom liboslari tavsiya etiladi.',
      dressCodeColors: [
        { name: 'Cream', hex: '#F5EBDD' },
        { name: 'Blush Pink', hex: '#F5C9D8' },
        { name: 'Sky Blue', hex: '#B9DFFA' },
      ],
      rsvpEnabled: true,
      rsvpDeadline: '2026-09-15',
      allowCompanion: true,
      maxCompanions: 2,
      askMealPreference: true,
      customColors: {
        primary: initialTemplate.colorStyle.primary,
        secondary: initialTemplate.colorStyle.secondary,
        accent: initialTemplate.colorStyle.accent,
        background: initialTemplate.colorStyle.background,
        text: initialTemplate.colorStyle.text,
      },
      customFonts: {
        heading: initialTemplate.typography.headingFont,
        body: initialTemplate.typography.bodyFont,
      },
    };
  });

  // Keep template sync if changed
  const handleSelectTemplate = (tpl: Template) => {
    setInvitationState((prev) => ({
      ...prev,
      templateId: tpl.id,
      templateSlug: tpl.slug,
      coverImage: tpl.previewImage,
      customColors: {
        primary: tpl.colorStyle.primary,
        secondary: tpl.colorStyle.secondary,
        accent: tpl.colorStyle.accent,
        background: tpl.colorStyle.background,
        text: tpl.colorStyle.text,
      },
      customFonts: {
        heading: tpl.typography.headingFont,
        body: tpl.typography.bodyFont,
      },
    }));
    showToast(`«${tpl.name}» shabloni tanlandi!`, 'info');
  };

  // Draft management
  const handleSaveDraft = () => {
    try {
      localStorage.setItem('taklifim_builder_draft', JSON.stringify(invitationState));
      showToast(t.builder.draftSavedMsg, 'success');
    } catch {
      showToast('Qoralamani saqlashda xatolik', 'error');
    }
  };

  const handleStartOver = () => {
    if (confirm('Barcha kiritilgan o‘zgarishlarni bekor qilib, boshidan boshlamoqchimisiz?')) {
      localStorage.removeItem('taklifim_builder_draft');
      window.location.reload();
    }
  };

  // Schedule management
  const handleAddScheduleItem = () => {
    const newItem: ScheduleItem = {
      id: `s-${Date.now()}`,
      time: '19:00',
      title: 'Tantanali qism',
      description: '',
    };
    setInvitationState((prev) => ({
      ...prev,
      schedule: [...prev.schedule, newItem],
    }));
  };

  const handleRemoveScheduleItem = (id: string) => {
    setInvitationState((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((s) => s.id !== id),
    }));
  };

  // Photo gallery mock upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const newPhotoUrl = uploadEvent.target.result as string;
          setInvitationState((prev) => ({
            ...prev,
            galleryImages: [...prev.galleryImages, newPhotoUrl],
          }));
          showToast('Fotosurat muvaffaqiyatli qo‘shildi!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setInvitationState((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  // Checkout submission
  const handleFinalCheckout = async () => {
    setIsDemoSubmitting(true);
    const plan = mockPlans.find((p) => p.id === selectedPlanId) || mockPlans[1];

    try {
      // Save invitation via API
      const saved = await api.saveInvitation({
        ...invitationState,
        status: 'published',
      });

      // Create demo order
      await api.createOrder({
        serviceType: 'website_invitation',
        serviceName: `${invitationState.eventTitle} (${invitationState.hostNames})`,
        planName: plan.name.uz,
        price: plan.price,
        customerName: invitationState.hostNames,
        invitationId: saved.id,
      });

      setPublishedSlug(saved.slug);
      setIsOrderComplete(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F5C9D8', '#B9DFFA', '#B48B47', '#231E1B'],
        });
      } catch {
        // ignore
      }

      showToast('Taklifnoma muvaffaqiyatli faollashtirildi!', 'success');
    } catch {
      showToast('Xatolik yuz berdi. Iltimos qaytadan urinib ko‘ring.', 'error');
    } finally {
      setIsDemoSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, title: 'Shablon' },
    { num: 2, title: 'Ma’lumotlar' },
    { num: 3, title: 'Taklif matni' },
    { num: 4, title: 'Dizayn' },
    { num: 5, title: 'Rasmlar' },
    { num: 6, title: 'Dastur' },
    { num: 7, title: 'Manzil' },
    { num: 8, title: 'Musiqa' },
    { num: 9, title: 'RSVP' },
    { num: 10, title: 'Tekshirish' },
    { num: 11, title: 'Faollashtirish' },
  ];

  if (isOrderComplete) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-lg glass-panel-elevated rounded-3xl p-8 sm:p-10 border border-white/95 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-600 shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Demo Buyurtma Tasdiqlandi
            </span>
            <h1 className="font-playfair text-3xl font-bold text-[#231E1B]">
              Tabriklaymiz!
            </h1>
            <p className="text-xs sm:text-sm text-[#5C4F48] leading-relaxed">
              Sizning raqamli taklifnomangiz muvaffaqiyatli tayyorlandi va mehmonlarga ulashish uchun faol holatga keltirildi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-black/5 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-[#8A7C74]">Tadbir:</span>
              <strong className="text-[#231E1B]">{invitationState.eventTitle}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8A7C74]">Ismlar:</span>
              <strong className="text-[#231E1B]">{invitationState.hostNames}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8A7C74]">Sana:</span>
              <strong className="text-[#231E1B]">{invitationState.eventDate} ({invitationState.startTime})</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8A7C74]">Shaxsiy havola:</span>
              <span className="font-mono text-[#D9658B] font-bold">
                /i/{publishedSlug || invitationState.slug}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              to={`/i/${publishedSlug || invitationState.slug}`}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-[#231E1B] hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Taklifnomani ochish</span>
            </Link>

            <Link
              to="/dashboard"
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-[#231E1B] glass-panel hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Mijoz kabineti</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Builder Bar */}
        <div className="glass-panel-elevated rounded-3xl p-4 sm:p-5 border border-white/95 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/templates"
              className="p-2 rounded-xl hover:bg-black/5 text-[#5C4F48] transition-colors"
              title="Ortga"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-playfair text-xl font-bold text-[#231E1B]">
                Taklifnoma Konstruktori
              </h1>
              <p className="text-[11px] text-[#7A6A63]">
                {stepsList[currentStep - 1]?.title} bosqichi ({currentStep}/11)
              </p>
            </div>
          </div>

          {/* Quick Draft Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#4A3E39] glass-panel hover:bg-white border border-black/5"
              title="Qoralamani saqlash"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Qoralamani saqlash</span>
            </button>
            <button
              onClick={handleStartOver}
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
              title="Boshidan boshlash"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Mobile View Toggle */}
            <div className="flex lg:hidden items-center p-1 rounded-xl bg-black/5">
              <button
                onClick={() => setActiveTabMobile('settings')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  activeTabMobile === 'settings' ? 'bg-white shadow-xs text-[#231E1B]' : 'text-[#7A6A63]'
                }`}
              >
                Sozlamalar
              </button>
              <button
                onClick={() => setActiveTabMobile('preview')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  activeTabMobile === 'preview' ? 'bg-white shadow-xs text-[#231E1B]' : 'text-[#7A6A63]'
                }`}
              >
                Ko‘rinish
              </button>
            </div>
          </div>
        </div>

        {/* Steps Progress Pills (Horizontal Scrollable) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {stepsList.map((st) => (
            <button
              key={st.num}
              onClick={() => setCurrentStep(st.num)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                currentStep === st.num
                  ? 'bg-[#231E1B] text-white shadow-xs'
                  : currentStep > st.num
                  ? 'bg-[#E8F3FA] text-[#1E3A5F]'
                  : 'glass-panel text-[#8A7C74] hover:bg-white'
              }`}
            >
              <span>{st.num}. {st.title}</span>
            </button>
          ))}
        </div>

        {/* SPLIT LAYOUT: Settings Panel on Left, Reactive Live Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: STEP SETTINGS PANEL */}
          <div
            className={`lg:col-span-6 glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/95 shadow-lg space-y-6 ${
              activeTabMobile === 'preview' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* STEP 1: Select Template */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                  1. Shablonni tanlang
                </h3>
                <p className="text-xs text-[#7A6A63]">
                  Taklifnomangiz qiyofasini belgilovchi dizaynni tanlang:
                </p>
                <div className="grid grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                  {mockTemplates.map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => handleSelectTemplate(tpl)}
                      className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all p-2 ${
                        invitationState.templateSlug === tpl.slug
                          ? 'border-[#D9658B] bg-white shadow-md'
                          : 'border-transparent hover:border-black/10 glass-panel'
                      }`}
                    >
                      <img
                        src={tpl.previewImage}
                        alt={tpl.name}
                        className="w-full h-24 object-cover rounded-xl mb-2"
                      />
                      <div className="text-xs font-bold text-[#231E1B] truncate">{tpl.name}</div>
                      <div className="text-[10px] text-[#7A6A63]">{tpl.category}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Event Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                  2. Tadbir ma’lumotlari
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">Tadbir turi</label>
                    <input
                      type="text"
                      value={invitationState.eventType}
                      onChange={(e) =>
                        setInvitationState((p) => ({ ...p, eventType: e.target.value }))
                      }
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">
                      Asosiy sarlavha (Kelin va kuyov yoki Mezbon)
                    </label>
                    <input
                      type="text"
                      value={invitationState.hostNames}
                      onChange={(e) =>
                        setInvitationState((p) => ({ ...p, hostNames: e.target.value }))
                      }
                      placeholder="Masalan: Nodir & Malika"
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#3A2D28] block mb-1">To‘y sanasi</label>
                      <input
                        type="date"
                        value={invitationState.eventDate}
                        onChange={(e) =>
                          setInvitationState((p) => ({ ...p, eventDate: e.target.value }))
                        }
                        className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#3A2D28] block mb-1">Boshlanish vaqti</label>
                      <input
                        type="time"
                        value={invitationState.startTime}
                        onChange={(e) =>
                          setInvitationState((p) => ({ ...p, startTime: e.target.value }))
                        }
                        className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">To‘yxona / Joy nomi</label>
                    <input
                      type="text"
                      value={invitationState.venueName}
                      onChange={(e) =>
                        setInvitationState((p) => ({ ...p, venueName: e.target.value }))
                      }
                      placeholder="«Versal» Majmuasi"
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">Aniq manzil</label>
                    <input
                      type="text"
                      value={invitationState.venueAddress}
                      onChange={(e) =>
                        setInvitationState((p) => ({ ...p, venueAddress: e.target.value }))
                      }
                      placeholder="Toshkent sh., Shayxontohur tumani..."
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Invitation Text */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                  3. Taklif matni va hikmat
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">
                      Samimiy taklif matni
                    </label>
                    <textarea
                      rows={5}
                      value={invitationState.invitationMessage}
                      onChange={(e) =>
                        setInvitationState((p) => ({ ...p, invitationMessage: e.target.value }))
                      }
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">
                      Hikmatli so‘z yoki shior (Iqtibos)
                    </label>
                    <input
                      type="text"
                      value={invitationState.invitationQuote || ''}
                      onChange={(e) =>
                        setInvitationState((p) => ({ ...p, invitationQuote: e.target.value }))
                      }
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Design & Colors */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                  4. Ranglar va Shriftlar
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-2">Asosiy rang (Primary)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={invitationState.customColors?.primary || '#B48B47'}
                        onChange={(e) =>
                          setInvitationState((p) => ({
                            ...p,
                            customColors: { ...p.customColors, primary: e.target.value },
                          }))
                        }
                        className="w-10 h-10 rounded-xl cursor-pointer border border-black/10"
                      />
                      <span className="font-mono">{invitationState.customColors?.primary}</span>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-2">Fon rangi (Background)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={invitationState.customColors?.background || '#FAF6F0'}
                        onChange={(e) =>
                          setInvitationState((p) => ({
                            ...p,
                            customColors: { ...p.customColors, background: e.target.value },
                          }))
                        }
                        className="w-10 h-10 rounded-xl cursor-pointer border border-black/10"
                      />
                      <span className="font-mono">{invitationState.customColors?.background}</span>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">Sarlavha shrifti</label>
                    <select
                      value={invitationState.customFonts?.heading || 'Playfair Display'}
                      onChange={(e) =>
                        setInvitationState((p) => ({
                          ...p,
                          customFonts: { ...p.customFonts, heading: e.target.value },
                        }))
                      }
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10 text-xs font-semibold"
                    >
                      <option value="Playfair Display">Playfair Display (Klassik serif)</option>
                      <option value="Cinzel">Cinzel (Qirollik monoxrom)</option>
                      <option value="Great Vibes">Great Vibes (Qo‘lyozma nafis)</option>
                      <option value="Plus Jakarta Sans">Plus Jakarta Sans (Zamonaviy modern)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Photos */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                  5. Fotosuratlar galereyasi
                </h3>
                <p className="text-xs text-[#7A6A63]">
                  Mehmonlar tomosha qilishi uchun romantik fotosuratlarni joylang:
                </p>

                <div className="border-2 border-dashed border-[#B48B47]/40 rounded-2xl p-6 text-center hover:bg-white/40 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload-input"
                  />
                  <label htmlFor="photo-upload-input" className="cursor-pointer space-y-2 block">
                    <ImageIcon className="w-8 h-8 text-[#B48B47] mx-auto" />
                    <div className="text-xs font-bold text-[#231E1B]">
                      Yangi fotosurat tanlash
                    </div>
                    <div className="text-[11px] text-[#7A6A63]">PNG, JPG (Browser demo)</div>
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {invitationState.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden h-20 shadow-xs border">
                      <img src={img} alt="Foto" className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1 right-1 p-1 rounded-md bg-black/60 text-white hover:bg-rose-600 transition-colors"
                        title="O‘chirish"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Schedule */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                    6. Tadbir dasturi (Jadval)
                  </h3>
                  <button
                    onClick={handleAddScheduleItem}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#231E1B] text-white text-xs font-semibold hover:bg-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Qo‘shish</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {invitationState.schedule.map((item, idx) => (
                    <div key={item.id} className="p-3 rounded-2xl glass-panel border border-black/10 flex items-center gap-2">
                      <input
                        type="time"
                        value={item.time}
                        onChange={(e) => {
                          const val = e.target.value;
                          setInvitationState((p) => ({
                            ...p,
                            schedule: p.schedule.map((s) => (s.id === item.id ? { ...s, time: val } : s)),
                          }));
                        }}
                        className="w-24 p-1.5 rounded-lg text-xs font-bold border border-black/10 bg-white"
                      />
                      <input
                        type="text"
                        value={typeof item.title === 'string' ? item.title : item.title.uz}
                        onChange={(e) => {
                          const val = e.target.value;
                          setInvitationState((p) => ({
                            ...p,
                            schedule: p.schedule.map((s) => (s.id === item.id ? { ...s, title: val } : s)),
                          }));
                        }}
                        placeholder="Bosqich nomi"
                        className="flex-1 p-1.5 rounded-lg text-xs border border-black/10 bg-white"
                      />
                      <button
                        onClick={() => handleRemoveScheduleItem(item.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 7: Venue & Map */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                  7. Manzil va Xarita
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">To‘yxona / Bino</label>
                    <input
                      type="text"
                      value={invitationState.venueName}
                      onChange={(e) => setInvitationState((p) => ({ ...p, venueName: e.target.value }))}
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">Aniq yo‘nalish manzili</label>
                    <input
                      type="text"
                      value={invitationState.venueAddress}
                      onChange={(e) => setInvitationState((p) => ({ ...p, venueAddress: e.target.value }))}
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">Xarita havolasi (Yandex / Google)</label>
                    <input
                      type="text"
                      value={invitationState.mapUrl || ''}
                      onChange={(e) => setInvitationState((p) => ({ ...p, mapUrl: e.target.value }))}
                      placeholder="https://yandex.uz/maps/..."
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: Music */}
            {currentStep === 8 && (
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                  8. Fon Musiqasi
                </h3>
                <div className="space-y-4 text-xs">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={invitationState.musicEnabled}
                      onChange={(e) => setInvitationState((p) => ({ ...p, musicEnabled: e.target.checked }))}
                      className="w-4 h-4 rounded text-[#D9658B]"
                    />
                    <span className="font-bold text-sm text-[#231E1B]">Musiqiy jo‘rlikni yoqish</span>
                  </label>

                  {invitationState.musicEnabled && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="font-bold text-[#3A2D28] block mb-1">Kuy nomi</label>
                        <input
                          type="text"
                          value={invitationState.musicTitle || ''}
                          onChange={(e) => setInvitationState((p) => ({ ...p, musicTitle: e.target.value }))}
                          className="w-full p-2.5 rounded-xl glass-panel border border-black/10"
                        />
                      </div>
                      <div className="p-3 rounded-2xl bg-white/70 border border-black/5 flex items-center justify-between">
                        <span className="text-[11px] text-[#7A6A63]">Namunaviy audio trek faol</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Tayyor
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 9: RSVP Settings */}
            {currentStep === 9 && (
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                  9. RSVP va Mehmonlar sozlamalari
                </h3>
                <div className="space-y-3 text-xs">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={invitationState.rsvpEnabled}
                      onChange={(e) => setInvitationState((p) => ({ ...p, rsvpEnabled: e.target.checked }))}
                      className="w-4 h-4 rounded text-[#D9658B]"
                    />
                    <span className="font-bold text-sm text-[#231E1B]">Mehmonlar RSVP tizimini yoqish</span>
                  </label>

                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">
                      Tasdiqlashning so‘nggi muddati (Deadline)
                    </label>
                    <input
                      type="date"
                      value={invitationState.rsvpDeadline}
                      onChange={(e) => setInvitationState((p) => ({ ...p, rsvpDeadline: e.target.value }))}
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={invitationState.allowCompanion}
                      onChange={(e) => setInvitationState((p) => ({ ...p, allowCompanion: e.target.checked }))}
                      className="rounded text-[#D9658B]"
                    />
                    <span>Hamroh (oila a’zolari) bilan kelishga ruxsat berish</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={invitationState.askMealPreference}
                      onChange={(e) => setInvitationState((p) => ({ ...p, askMealPreference: e.target.checked }))}
                      className="rounded text-[#D9658B]"
                    />
                    <span>Taom afzalligini so‘rash (Milliy osh / Go‘sht / Baliq / Vegetarian)</span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 10: Review */}
            {currentStep === 10 && (
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                  10. Taklifnomani yakuniy ko‘rib chiqish
                </h3>
                <div className="p-4 rounded-2xl bg-white/70 border border-black/5 text-xs space-y-2.5">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#8A7C74]">Tadbir:</span>
                    <strong className="text-[#231E1B]">{invitationState.eventTitle}</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#8A7C74]">Ismlar:</span>
                    <strong className="text-[#231E1B]">{invitationState.hostNames}</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#8A7C74]">Sana va vaqt:</span>
                    <strong className="text-[#231E1B]">
                      {invitationState.eventDate} ({invitationState.startTime})
                    </strong>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#8A7C74]">To‘yxona:</span>
                    <strong className="text-[#231E1B]">{invitationState.venueName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A7C74]">Fotosuratlar:</span>
                    <strong className="text-[#231E1B]">{invitationState.galleryImages.length} ta rasm</strong>
                  </div>
                </div>
                <p className="text-xs text-emerald-700 font-medium">
                  ✓ Barcha asosiy maydonlar to‘ldirildi. Keyingi bosqichda tarifni tanlab, taklifnomani jonli rejimga chiqaring!
                </p>
              </div>
            )}

            {/* STEP 11: Plan & Checkout */}
            {currentStep === 11 && (
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                  11. Tarifni tanlang va faollashtiring
                </h3>
                <div className="space-y-3">
                  {mockPlans.map((pl) => (
                    <div
                      key={pl.id}
                      onClick={() => setSelectedPlanId(pl.id)}
                      className={`p-4 rounded-2xl cursor-pointer border-2 transition-all flex items-center justify-between ${
                        selectedPlanId === pl.id
                          ? 'border-[#D9658B] bg-white shadow-sm'
                          : 'border-transparent glass-panel'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-playfair font-bold text-sm text-[#231E1B]">
                            {pl.name.uz}
                          </span>
                          {pl.isPopular && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5C9D8] text-[#3A2D28]">
                              Tavsiya etiladi
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#7A6A63] mt-0.5">
                          {pl.description.uz}
                        </div>
                      </div>
                      <div className="text-sm font-extrabold text-[#231E1B] text-right">
                        {formatPriceUZS(pl.price)}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={isDemoSubmitting}
                  onClick={handleFinalCheckout}
                  className="w-full mt-4 py-4 rounded-2xl text-sm font-bold text-[#231E1B] bg-gradient-to-r from-[#F5C9D8] via-[#F5EBDD] to-[#B9DFFA] hover:shadow-lg transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {isDemoSubmitting ? (
                    <span>Faollashtirilmoqda...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Demo Buyurtmani Rasmiylashtirish</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Navigation buttons: Prev / Next */}
            <div className="pt-6 border-t border-black/5 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep((p) => p - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5C4F48] glass-panel hover:bg-white"
                >
                  {t.builder.prevStep}
                </button>
              ) : (
                <div />
              )}

              {currentStep < 11 && (
                <button
                  onClick={() => setCurrentStep((p) => p + 1)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#231E1B] hover:bg-black transition-colors"
                >
                  <span>{t.builder.nextStep}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: LIVE REACTIVE PREVIEW ON DESKTOP */}
          <div
            className={`lg:col-span-6 flex justify-center sticky top-28 ${
              activeTabMobile === 'settings' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Phone Frame Mockup for Real-Time Preview */}
            <div className="w-[320px] sm:w-[350px] rounded-[44px] p-4 bg-[#231E1B] shadow-2xl ring-1 ring-white/20 relative">
              {/* Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#151210] rounded-full z-30" />

              <div
                className="w-full h-[620px] rounded-[36px] overflow-y-auto overflow-x-hidden p-6 pt-9 text-center flex flex-col justify-between border border-black/10 select-none shadow-inner"
                style={{
                  backgroundColor:
                    invitationState.customColors?.background || '#FAF6F0',
                  color: invitationState.customColors?.text || '#2A2420',
                }}
              >
                <div className="space-y-4">
                  <div
                    className="text-[10px] tracking-widest uppercase font-bold"
                    style={{
                      color: invitationState.customColors?.primary || '#B48B47',
                    }}
                  >
                    {invitationState.eventType.toUpperCase()}
                  </div>

                  <h2
                    className="text-2xl font-bold tracking-tight"
                    style={{
                      fontFamily:
                        invitationState.customFonts?.heading || 'Playfair Display',
                    }}
                  >
                    {invitationState.hostNames || 'Kelin & Kuyov'}
                  </h2>

                  <div
                    className="w-10 h-0.5 mx-auto opacity-50"
                    style={{
                      backgroundColor:
                        invitationState.customColors?.primary || '#B48B47',
                    }}
                  />

                  {/* Reactive Photo Gallery Preview */}
                  {invitationState.galleryImages.length > 0 && (
                    <div className="w-full h-44 rounded-2xl overflow-hidden shadow-xs border border-white my-2">
                      <img
                        src={invitationState.galleryImages[0]}
                        alt="Kelin-kuyov"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Message */}
                  <p className="text-xs leading-relaxed italic px-2 opacity-85">
                    "{invitationState.invitationMessage}"
                  </p>

                  {/* Date & Location */}
                  <div className="py-2 space-y-1 text-xs">
                    <div
                      className="font-bold flex items-center justify-center gap-1.5"
                      style={{
                        color:
                          invitationState.customColors?.primary || '#B48B47',
                      }}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {invitationState.eventDate} • {invitationState.startTime}
                      </span>
                    </div>
                    <div className="text-[11px] flex items-center justify-center gap-1 opacity-75">
                      <MapPin className="w-3 h-3" />
                      <span>{invitationState.venueName}</span>
                    </div>
                  </div>

                  {/* Schedule items preview */}
                  {invitationState.schedule.length > 0 && (
                    <div className="text-left p-3 rounded-xl bg-white/40 border border-black/5 text-[11px] space-y-1.5">
                      <div className="font-bold text-[10px] uppercase text-[#7A6A63]">
                        Dastur
                      </div>
                      {invitationState.schedule.map((s) => (
                        <div key={s.id} className="flex gap-2">
                          <span className="font-bold font-mono opacity-80">{s.time}</span>
                          <span className="truncate">
                            {typeof s.title === 'string' ? s.title : s.title.uz}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* RSVP simulation button */}
                <div className="pt-4 border-t border-black/10">
                  <div
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white shadow-xs"
                    style={{
                      backgroundColor:
                        invitationState.customColors?.primary || '#B48B47',
                    }}
                  >
                    Tashrifingizni tasdiqlang
                  </div>
                  <div className="text-[10px] text-[#7A6A63] mt-1.5">
                    Muddati: {invitationState.rsvpDeadline}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
