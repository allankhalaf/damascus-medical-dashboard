import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HeartPulse, Eye, EyeOff, Shield, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const [email, setEmail] = useState('admin@damascusmedical.com')
  const [password, setPassword] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const success = login(email, password)
    if (!success) {
      setError(t('invalidCredentials'))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-medical-900 to-emerald-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-medical-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBWMGg0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="w-full max-w-md relative z-10 px-4"
      >
        <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-medical-400 via-medical-500 to-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-medical-500/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <HeartPulse className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white">{t('appName')}</h1>
            <p className="text-sm text-slate-300 mt-2">{t('appSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 text-sm">{t('email')}</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pr-10 bg-white/10 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:ring-medical-400 focus:border-medical-400"
                  placeholder="admin@damascusmedical.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 text-sm">{t('password')}</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-20 bg-white/10 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:ring-medical-400 focus:border-medical-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm text-red-400 text-center bg-red-500/10 rounded-lg py-2"
              >
                {error}
              </motion.p>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-base rounded-xl bg-gradient-to-r from-medical-500 to-emerald-500 hover:from-medical-600 hover:to-emerald-600 shadow-lg shadow-medical-500/25 transition-all hover:shadow-xl hover:shadow-medical-500/30" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('loading')}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {t('login')}
                </span>
              )}
            </Button>

            <div className="flex justify-between text-sm">
              <button type="button" className="text-medical-300 hover:text-medical-200 transition-colors hover:underline">
                {t('forgotPassword')}
              </button>
              <button type="button" className="text-medical-300 hover:text-medical-200 transition-colors hover:underline">
                {t('register')}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-500">
              Damascus Medical Center • Damascus, Syria
            </p>
            <p className="text-xs text-slate-600 mt-1">
              نظام إدارة العيادات الطبية v1.0
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
