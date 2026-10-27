import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Eye, EyeOff, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export const AuthPages: React.FC<{ initialMode?: 'login' | 'register' | 'forgot' }> = ({
  initialMode = 'login',
}) => {
  const { path, navigate } = useRouter();
  const { login, showToast } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(() => {
    if (path.includes('/register')) return 'register';
    if (path.includes('/forgot-password')) return 'forgot';
    return initialMode;
  });

  const [emailOrPhone, setEmailOrPhone] = useState('nodir.salimov@gmail.com');
  const [name, setName] = useState('Nodirbek Salimov');
  const [password, setPassword] = useState('taklifim2026');
  const [confirmPassword, setConfirmPassword] = useState('taklifim2026');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [recoverySent, setRecoverySent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      login(emailOrPhone, name || 'Hurmatli Mijoz');
      navigate('/dashboard');
    } else if (mode === 'register') {
      if (!acceptTerms) {
        showToast('Iltimos, foydalanish shartlariga rozilik bildiring', 'error');
        return;
      }
      if (password !== confirmPassword) {
        showToast('Parollar bir-biriga mos kelmadi', 'error');
        return;
      }
      login(emailOrPhone, name);
      navigate('/dashboard');
    } else {
      setRecoverySent(true);
      showToast('Tiklash havolasi telefon yoki pochtangizga yuborildi (Demo)', 'info');
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-panel-elevated rounded-3xl p-8 border border-white/95 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F5C9D8] to-[#B9DFFA] p-0.5 shadow-sm">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#231E1B]" />
              </div>
            </div>
          </Link>
          <h1 className="font-playfair text-2xl font-bold text-[#231E1B]">
            {mode === 'login'
              ? 'Kabinetga Kirish'
              : mode === 'register'
              ? 'Ro‘yxatdan O‘tish'
              : 'Parolni Tiklash'}
          </h1>
          <p className="text-xs text-[#7A6A63]">
            {mode === 'login'
              ? 'Taklifnomalaringiz va mehmonlar ro‘yxatini boshqaring'
              : mode === 'register'
              ? 'Yangi hisob yarating va bir necha daqiqada taklifnoma hozirlang'
              : 'Telefon raqamingiz yoki elektron pochtangizni kiriting'}
          </p>
        </div>

        {/* Auth mode switcher */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-black/5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                navigate('/login');
              }}
              className={`py-2 rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-white text-[#231E1B] shadow-xs font-bold'
                  : 'text-[#7A6A63]'
              }`}
            >
              Kirish
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                navigate('/register');
              }}
              className={`py-2 rounded-xl transition-all ${
                mode === 'register'
                  ? 'bg-white text-[#231E1B] shadow-xs font-bold'
                  : 'text-[#7A6A63]'
              }`}
            >
              Ro‘yxatdan o‘tish
            </button>
          </div>
        )}

        {recoverySent && mode === 'forgot' ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-[#5C4F48]">
              {emailOrPhone} manziliga vaqtinchalik parol bilan tasdiqlash kodi jo‘natildi.
            </p>
            <button
              onClick={() => {
                setMode('login');
                setRecoverySent(false);
                navigate('/login');
              }}
              className="text-xs font-bold text-[#231E1B] underline"
            >
              Kirish oynasiga qaytish
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {mode === 'register' && (
              <div>
                <label className="font-bold text-[#3A2D28] block mb-1">Ism va familiyangiz</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nodirbek Salimov"
                  className="w-full p-3 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                />
              </div>
            )}

            <div>
              <label className="font-bold text-[#3A2D28] block mb-1">
                Telefon raqam yoki Elektron pochta
              </label>
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="+998 90 123 45 67 yoki user@gmail.com"
                className="w-full p-3 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-[#3A2D28]">Parol</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        navigate('/forgot-password');
                      }}
                      className="text-[11px] text-[#7A6A63] hover:underline"
                    >
                      Parolni unutdingizmi?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pr-10 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6A63] hover:text-[#231E1B]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="font-bold text-[#3A2D28] block mb-1">Parolni tasdiqlang</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 rounded-xl glass-panel border border-black/10 outline-none text-[#231E1B]"
                />
              </div>
            )}

            {mode === 'register' && (
              <label className="flex items-start gap-2 cursor-pointer pt-1 text-[11px] text-[#5C4F48]">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="rounded text-[#D9658B] mt-0.5"
                />
                <span>
                  Men <Link to="/terms" className="underline font-semibold">Foydalanish shartlari</Link> va <Link to="/privacy" className="underline font-semibold">Maxfiylik siyosati</Link>ga roziman.
                </span>
              </label>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl text-xs font-bold text-white bg-[#231E1B] hover:bg-black transition-colors shadow-sm"
            >
              {mode === 'login'
                ? 'Kirish'
                : mode === 'register'
                ? 'Ro‘yxatdan O‘tish'
                : 'Kodni Yuborish'}
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <div className="text-center pt-2">
            <button
              onClick={() => {
                setMode('login');
                navigate('/login');
              }}
              className="text-xs text-[#7A6A63] hover:underline"
            >
              ← Kirish sahifasiga qaytish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
