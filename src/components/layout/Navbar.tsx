import { useTranslation } from 'react-i18next'
import { useStore } from '@/stores/useStore'
import { cn } from '@/lib/utils'
import {
  Search,
  Bell,
  Moon,
  Sun,
  Globe,
  LogOut,
  Menu,
  MessageSquare,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { isDarkMode, toggleDarkMode, language, setLanguage, sidebarOpen, user, logout } = useStore()
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar'
    setLanguage(newLang)
    i18n.changeLanguage(newLang)
    document.documentElement.lang = newLang
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  }

  const isRTL = language === 'ar'

  const notifications = [
    { id: 1, title: 'موعد جديد', desc: 'محمد أحمد - 10:00 ص', time: 'منذ 5 دقائق', icon: Calendar, color: 'bg-blue-500' },
    { id: 2, title: 'رسالة جديدة', desc: 'د. خالد عمر الدين', time: 'منذ 15 دقيقة', icon: MessageSquare, color: 'bg-emerald-500' },
    { id: 3, title: 'فاتورة مستحقة', desc: 'INV-005 - $275', time: 'منذ ساعة', icon: Bell, color: 'bg-amber-500' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 z-30 flex items-center justify-between px-6 transition-all duration-300',
        isRTL
          ? sidebarOpen
            ? 'right-64 left-0'
            : 'right-20 left-0'
          : sidebarOpen
          ? 'left-64 right-0'
          : 'left-20 right-0'
      )}
    >
      {/* Search */}
      <div className="flex items-center gap-4 flex-1">
        <motion.div 
          className={cn(
            "relative w-full max-w-md transition-all duration-300",
            searchFocused && "max-w-lg"
          )}
        >
          <Search className={cn(
            "absolute top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
            isRTL ? "right-3" : "left-3",
            searchFocused ? "text-medical-500" : "text-slate-400"
          )} />
          <input
            type="text"
            placeholder={t('search') + '...'}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={cn(
              "w-full h-10 rounded-xl border bg-slate-50 dark:bg-slate-800 text-sm transition-all duration-300 outline-none",
              isRTL ? "pr-10 pl-4" : "pl-10 pr-4",
              searchFocused 
                ? "border-medical-400 ring-2 ring-medical-500/20 shadow-lg shadow-medical-500/10" 
                : "border-slate-200 dark:border-slate-700"
            )}
          />
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Language */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={language === 'ar' ? 'English' : 'العربية'}
        >
          <Globe className="w-4 h-4 text-slate-500" />
        </Button>

        {/* Dark Mode */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDarkMode ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-500" />}
          </motion.div>
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-4 h-4 text-slate-500" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white dark:border-slate-900" />
          </Button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                style={{ [isRTL ? 'left' : 'right']: 0 }}
              >
                <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <h3 className="font-bold text-sm">الإشعارات</h3>
                  <Badge variant="secondary" className="text-xs">{notifications.length} جديد</Badge>
                </div>
                <div className="p-2 space-y-1">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <div className={`w-9 h-9 rounded-lg ${notif.color} flex items-center justify-center shrink-0`}>
                        <notif.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{notif.title}</p>
                        <p className="text-xs text-slate-500">{notif.desc}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 mr-2 pl-2 border-l border-slate-200 dark:border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 dark:text-white">{user?.name}</p>
            <p className="text-xs text-slate-500">{t(user?.role || 'admin')}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-medical-400 to-emerald-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-medical-500/30">
            {user?.name?.charAt(0)}
          </div>
          <Button variant="ghost" size="icon" onClick={logout} className="w-8 h-8 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
