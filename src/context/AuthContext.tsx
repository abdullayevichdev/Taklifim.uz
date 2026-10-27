import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AuthContextType {
  // Customer demo auth
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
    phone: string;
  } | null;
  login: (emailOrPhone: string, name?: string) => void;
  logout: () => void;

  // Admin lock (Passcode requirement: 3580)
  isAdminUnlocked: boolean;
  adminCodeError: string | null;
  unlockAdmin: (code: string) => boolean;
  lockAdmin: () => void;

  // Toast notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: true,
  user: {
    name: 'Nodirbek Salimov',
    email: 'nodir.salimov@gmail.com',
    phone: '+998 90 987 65 43',
  },
  login: () => {},
  logout: () => {},
  isAdminUnlocked: false,
  adminCodeError: null,
  unlockAdmin: () => false,
  lockAdmin: () => {},
  toasts: [],
  showToast: () => {},
  removeToast: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Customer user
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(() => {
    try {
      const saved = localStorage.getItem('taklifim_demo_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      name: 'Nodirbek Salimov',
      email: 'nodir.salimov@gmail.com',
      phone: '+998 90 987 65 43',
    };
  });

  const isLoggedIn = !!user;

  const login = (emailOrPhone: string, name: string = 'Foydalanuvchi') => {
    const newUser = {
      name,
      email: emailOrPhone.includes('@') ? emailOrPhone : 'user@taklifim.uz',
      phone: emailOrPhone.includes('@') ? '+998 90 123 45 67' : emailOrPhone,
    };
    setUser(newUser);
    try {
      localStorage.setItem('taklifim_demo_user', JSON.stringify(newUser));
    } catch {
      // ignore
    }
    showToast(`Xush kelibsiz, ${newUser.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('taklifim_demo_user');
    } catch {
      // ignore
    }
    showToast('Tizimdan muvaffaqiyatli chiqildi', 'info');
  };

  // Admin Code: STRICTLY 3580 as requested by the user
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('taklifim_admin_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [adminCodeError, setAdminCodeError] = useState<string | null>(null);

  const unlockAdmin = (code: string): boolean => {
    if (code.trim() === '3580') {
      setIsAdminUnlocked(true);
      setAdminCodeError(null);
      try {
        sessionStorage.setItem('taklifim_admin_unlocked', 'true');
      } catch {
        // ignore
      }
      showToast('Admin paneliga muvaffaqiyatli kirildi!', 'success');
      return true;
    } else {
      setAdminCodeError('Noto‘g‘ri kod! Iltimos, 3580 kodini kiriting.');
      return false;
    }
  };

  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    try {
      sessionStorage.removeItem('taklifim_admin_unlocked');
    } catch {
      // ignore
    }
    showToast('Admin paneli qulflangan holatga o‘tkazildi', 'info');
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        isAdminUnlocked,
        adminCodeError,
        unlockAdmin,
        lockAdmin,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
