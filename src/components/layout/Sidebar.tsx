import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HeartPulse,
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  FileText,
  CreditCard,
  Pill,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react'
import { useStore } from '@/stores/useStore'
import { cn } from '@/lib/utils'

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'dashboard' },
  { path: '/patients', icon: Users, label: 'patients' },
  { path: '/appointments', icon: CalendarDays, label: 'appointments' },
  { path: '/doctors', icon: Stethoscope, label: 'doctors' },
  { path: '/medical-records', icon: FileText, label: 'medicalRecords' },
  { path: '/billing', icon: CreditCard, label: 'billing' },
  { path: '/pharmacy', icon: Pill, label: 'pharmacy' },
  { path: '/reports', icon: BarChart3, label: 'reports' },
  { path: '/settings', icon: Settings, label: 'settings' },
]

export default function Sidebar() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { sidebarOpen, toggleSidebar, language } = useStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isRTL = language === 'ar'

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 z-50 w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700"
        style={{ [isRTL ? 'right' : 'left']: '1rem' }}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed top-0 bottom-0 z-40 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 flex flex-col shadow-xl',
          'lg:translate-x-0 transition-all duration-300',
          isRTL ? 'right-0 border-l' : 'left-0 border-r'
        )}
        style={{
          width: sidebarOpen ? '16rem' : '5rem',
          [isRTL ? 'right' : 'left']: 0,
        }}
        initial={false}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-700">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-500 to-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-medical-500/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <HeartPulse className="w-5 h-5 text-white" />
          </motion.div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="mr-3 overflow-hidden whitespace-nowrap"
              >
                <h1 className="text-sm font-bold text-slate-800 dark:text-white">{t('appName')}</h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -left-3 top-20 w-6 h-6 rounded-full bg-gradient-to-r from-medical-500 to-emerald-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-50"
        >
          {sidebarOpen ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <motion.button
                key={item.path}
                onClick={() => {
                  navigate(item.path)
                  setMobileOpen(false)
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative',
                  isActive
                    ? 'bg-gradient-to-r from-medical-50 to-medical-100/50 text-medical-700 dark:from-medical-900/20 dark:to-medical-900/10 dark:text-medical-400 font-bold shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                )}
                whileHover={{ x: isRTL ? -2 : 2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className={cn(
                      'absolute top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-gradient-to-b from-medical-400 to-emerald-400',
                      isRTL ? 'right-0' : 'left-0'
                    )}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300',
                  isActive 
                    ? 'bg-gradient-to-br from-medical-400 to-emerald-500 text-white shadow-md shadow-medical-500/30' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-medical-500 group-hover:shadow-md'
                )}>
                  <Icon className="w-4.5 h-4.5" />
                </div>

                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm whitespace-nowrap overflow-hidden"
                    >
                      {t(item.label)}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && sidebarOpen && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mr-auto w-2 h-2 rounded-full bg-medical-500"
                  />
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="text-xs text-slate-400">Damascus Medical Center</p>
                <p className="text-[10px] text-slate-300 mt-1">v1.0.0</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  )
}
