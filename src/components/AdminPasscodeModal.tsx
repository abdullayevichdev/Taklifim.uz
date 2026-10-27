import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { Shield, Lock, Delete, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';

export const AdminPasscodeModal: React.FC = () => {
  const { unlockAdmin, adminCodeError } = useAuth();
  const { navigate } = useRouter();
  const [pin, setPin] = useState<string>('');
  const [shake, setShake] = useState(false);
  const [unlockedAnimation, setUnlockedAnimation] = useState(false);

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 4) {
        verifyPin(nextPin);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin('');
  };

  const verifyPin = (codeToTest: string) => {
    const success = unlockAdmin(codeToTest);
    if (success) {
      setUnlockedAnimation(true);
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setPin('');
      }, 500);
    }
  };

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div
        className={`w-full max-w-sm glass-panel-elevated rounded-3xl p-7 shadow-2xl border border-white/90 relative transition-transform ${
          shake ? 'animate-bounce' : ''
        }`}
      >
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-5 left-5 p-2 rounded-xl hover:bg-black/5 text-[#5C4F48] transition-colors"
          title="Bosh sahifaga qaytish"
          aria-label="Ortga"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Shield Icon */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#B9DFFA] via-[#F5EBDD] to-[#F5C9D8] p-0.5 shadow-sm mb-4">
            <div className="w-full h-full bg-white/90 rounded-[14px] flex items-center justify-center">
              {unlockedAnimation ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-600 animate-pulse" />
              ) : (
                <Lock className="w-6 h-6 text-[#231E1B]" />
              )}
            </div>
          </div>

          <h2 className="font-playfair text-xl font-bold text-[#231E1B]">
            Admin Xavfsizlik Kodi
          </h2>
          <p className="text-xs text-[#7A6A63] mt-1 max-w-[240px]">
            Admin paneliga kirish uchun 4 xonali maxfiy kodni kiriting
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 font-semibold">
            <KeyRound className="w-3 h-3" />
            <span>Kod: 3580</span>
          </div>
        </div>

        {/* PIN Dots */}
        <div className="flex items-center justify-center gap-4 my-6">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pin.length > idx;
            return (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                  isFilled
                    ? 'bg-[#231E1B] scale-110 shadow-xs'
                    : 'bg-black/15 border border-black/10'
                }`}
              />
            );
          })}
        </div>

        {/* Error message */}
        {adminCodeError && (
          <div className="text-center text-xs font-semibold text-rose-600 mb-4 animate-pulse">
            {adminCodeError}
          </div>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              className="h-12 rounded-2xl glass-panel text-base font-bold text-[#231E1B] hover:bg-white active:scale-95 transition-all shadow-xs flex items-center justify-center"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="h-12 rounded-2xl text-xs font-semibold text-[#7A6A63] hover:bg-black/5 active:scale-95 transition-all flex items-center justify-center"
          >
            Tozalash
          </button>
          <button
            onClick={() => handleDigit('0')}
            className="h-12 rounded-2xl glass-panel text-base font-bold text-[#231E1B] hover:bg-white active:scale-95 transition-all shadow-xs flex items-center justify-center"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-12 rounded-2xl text-[#7A6A63] hover:bg-black/5 active:scale-95 transition-all flex items-center justify-center"
            aria-label="O‘chirish"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
