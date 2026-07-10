import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Building2, Moon, Sun, Globe, Bell, Shield, Palette, Save, Check } from 'lucide-react'
import { useStore } from '@/stores/useStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

export default function Settings() {
  const { t, i18n } = useTranslation()
  const { isDarkMode, toggleDarkMode, language, setLanguage, clinicSettings } = useStore()
  const [saved, setSaved] = useState(false)

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar'
    setLanguage(newLang)
    i18n.changeLanguage(newLang)
    document.documentElement.lang = newLang
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('settings')}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">إدارة إعدادات النظام والمظهر</p>
        </div>
        {saved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-xl"
          >
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">تم الحفظ بنجاح</span>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clinic Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="border-b border-slate-100 dark:border-slate-700/50 pb-4">
              <CardTitle className="flex items-center gap-3 text-base">
                <div className="w-10 h-10 rounded-xl bg-medical-100 dark:bg-medical-900/30 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-medical-600" />
                </div>
                {t('clinicInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div>
                <Label className="text-slate-700 dark:text-slate-300 font-medium">{t('clinicName')}</Label>
                <Input defaultValue={clinicSettings.name} className="mt-2 h-11 rounded-xl" />
              </div>
              <div>
                <Label className="text-slate-700 dark:text-slate-300 font-medium">{t('address')}</Label>
                <Input defaultValue={clinicSettings.address} className="mt-2 h-11 rounded-xl" />
              </div>
              <div>
                <Label className="text-slate-700 dark:text-slate-300 font-medium">{t('phone')}</Label>
                <Input 
                  defaultValue={clinicSettings.phone} 
                  className="mt-2 h-11 rounded-xl font-mono text-base tracking-wide" 
                  dir="ltr" 
                  style={{ textAlign: 'right' }} 
                />
              </div>
              <div>
                <Label className="text-slate-700 dark:text-slate-300 font-medium">{t('email')}</Label>
                <Input defaultValue={clinicSettings.email} className="mt-2 h-11 rounded-xl" dir="ltr" />
              </div>
              <Button onClick={handleSave} className="w-full h-11 gap-2 rounded-xl mt-2">
                <Save className="w-4 h-4" />
                {t('save')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="border-b border-slate-100 dark:border-slate-700/50 pb-4">
              <CardTitle className="flex items-center gap-3 text-base">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-purple-600" />
                </div>
                {t('appearance')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {/* Dark Mode Toggle - محسّن */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800 transition-all hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isDarkMode ? 'bg-slate-700' : 'bg-amber-100'}`}>
                    {isDarkMode ? <Moon className="w-6 h-6 text-purple-400" /> : <Sun className="w-6 h-6 text-amber-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      {isDarkMode ? t('darkMode') : t('lightMode')}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isDarkMode ? 'الوضع الليلي مفعل' : 'الوضع النهاري مفعل'}
                    </p>
                  </div>
                </div>
                {/* Toggle Switch احترافي */}
                <button
                  onClick={toggleDarkMode}
                  className="relative w-14 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:ring-offset-2"
                  style={{
                    background: isDarkMode 
                      ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' 
                      : 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
                  }}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
                    initial={false}
                    animate={{
                      right: isDarkMode ? '4px' : 'auto',
                      left: isDarkMode ? 'auto' : '4px',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    {isDarkMode ? (
                      <Moon className="w-3.5 h-3.5 text-purple-600" />
                    ) : (
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                    )}
                  </motion.div>
                </button>
              </div>

              {/* Language Toggle - محسّن */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800 transition-all hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      {t('language')}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {language === 'ar' ? 'اللغة الحالية: العربية' : 'Current: English'}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={toggleLanguage}
                  className="h-10 px-6 rounded-xl border-2 hover:bg-medical-50 hover:border-medical-300 transition-all gap-2"
                >
                  <Globe className="w-4 h-4" />
                  {language === 'ar' ? 'English' : 'العربية'}
                </Button>
              </div>

              {/* Notifications Toggle */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800 transition-all hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      {t('notifications')}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      إشعارات البريد والمواعيد
                    </p>
                  </div>
                </div>
                <Badge variant="success" className="h-6 px-3">مفعل</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
