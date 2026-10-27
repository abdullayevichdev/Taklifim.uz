import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, Instagram } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useAuth();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact || !message) {
      showToast('Iltimos, barcha majburiy maydonlarni to‘ldiring', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Xabaringiz muvaffaqiyatli jo‘natildi!', 'success');
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D9658B]">
            Aloqa
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-extrabold text-[#231E1B]">
            Biz bilan bog‘laning
          </h1>
          <p className="text-sm text-[#5C4F48]">
            Savollaringiz, takliflaringiz yoki maxsus dizayn buyurtmalaringiz bo‘yicha istalgan vaqtda yordam berishga tayyormiz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel-elevated rounded-3xl p-6 border border-white/95 space-y-5">
              <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                Murojaat ma’lumotlari
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#F5EBDD] flex items-center justify-center text-[#B48B47] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8A7C74]">Telefon</span>
                    <a
                      href="tel:+998933223580"
                      className="font-bold text-[#231E1B] hover:text-[#D9658B] transition-colors mt-0.5 block"
                    >
                      +998 93 322 35 80
                    </a>
                    <p className="text-[#7A6A63]">Har kuni: 09:00 - 21:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#B9DFFA]/40 flex items-center justify-center text-[#1E3A5F] shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8A7C74]">Telegram</span>
                    <a
                      href="https://t.me/avazxanovvv_700"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-[#1E3A5F] hover:underline mt-0.5 block"
                    >
                      @avazxanovvv_700
                    </a>
                    <p className="text-[#7A6A63]">24/7 tezkor qo‘llab-quvvatlash</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#F5C9D8]/40 flex items-center justify-center text-[#D9658B] shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8A7C74]">Instagram</span>
                    <a
                      href="https://www.instagram.com/avazxanovvv_700/"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-[#D9658B] hover:underline mt-0.5 block"
                    >
                      @avazxanovvv_700
                    </a>
                    <p className="text-[#7A6A63]">Rasmiy sahifa va namunalar</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#F5C9D8]/50 flex items-center justify-center text-[#D9658B] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8A7C74]">Elektron pochta</span>
                    <p className="font-bold text-[#231E1B] mt-0.5">info@taklifim.uz</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E6D2B5]/50 flex items-center justify-center text-[#B48B47] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8A7C74]">Ofisimiz</span>
                    <p className="font-bold text-[#231E1B] mt-0.5">
                      Toshkent shahri, Shayxontohur tumani, Navoiy shoh ko‘chasi, 24
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/95 shadow-md">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-[#231E1B]">
                  Xabaringiz qabul qilindi!
                </h3>
                <p className="text-xs text-[#5C4F48] max-w-sm mx-auto">
                  Menejerimiz siz bilan ko‘rsatilgan aloqa vositasi orqali imkon qadar tez fursatda bog‘lanadi.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#231E1B] text-white text-xs font-semibold"
                >
                  Yana xabar yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-playfair text-xl font-bold text-[#231E1B]">
                  Onlayn Murojaat
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">Ismingiz *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jasur To‘xtayev"
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#3A2D28] block mb-1">
                      Telefon yoki Telegram *
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+998 90 123 45 67 yoki @username"
                      className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#3A2D28] block mb-1">Mavzu</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Masalan: Maxsus dizayn bo‘yicha savol"
                    className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#3A2D28] block mb-1">Xabar matni *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Savolingiz yoki istagingizni batafsil yozing..."
                    className="w-full p-2.5 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#231E1B] text-white text-xs font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Xabarni yuborish</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
