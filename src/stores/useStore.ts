import { create } from 'zustand'
import type { User, ClinicSettings } from '@/types'

interface StoreState {
  isAuthenticated: boolean
  user: User | null
  isDarkMode: boolean
  language: string
  sidebarOpen: boolean
  clinicSettings: ClinicSettings

  login: (user: User) => void
  logout: () => void
  toggleDarkMode: () => void
  setLanguage: (lang: string) => void
  toggleSidebar: () => void
  setClinicSettings: (settings: ClinicSettings) => void
}

export const useStore = create<StoreState>((set) => ({
  isAuthenticated: true,
  user: {
    id: '1',
    email: 'admin@damascusmedical.com',
    name: 'أحمد الخالدي',
    role: 'admin',
  },
  isDarkMode: false,
  language: 'ar',
  sidebarOpen: true,
  clinicSettings: {
    name: 'Damascus Medical Center',
    address: 'دمشق، سوريا - شارع الثورة',
    phone: '+963 11 123 4567',
    email: 'info@damascusmedical.com',
  },

  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setLanguage: (lang) => set({ language: lang }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setClinicSettings: (settings) => set({ clinicSettings: settings }),
}))
