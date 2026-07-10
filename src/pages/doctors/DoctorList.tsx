import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Stethoscope,
  Mail,
  Phone,
  Clock,
  Calendar,
  Star,
  CalendarCheck,
  Eye,
  Award,
  UserCheck,
  Building2,
  MapPin,
} from 'lucide-react'
import { doctors } from '@/data/demoData'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DoctorList() {
  const { t } = useTranslation()

  const activeDoctors = doctors.filter((d) => d.status === 'active').length
  const totalExperience = doctors.reduce((sum, d) => sum + d.experienceYears, 0)
  const uniqueDepartments = [...new Set(doctors.map((d) => d.specialization))].length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('doctors')}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            فريق الأطباء المتخصصين في المركز
          </p>
        </div>
        <Button className="gap-2 h-11 rounded-xl">
          <Stethoscope className="w-4 h-4" />
          إضافة طبيب
        </Button>
      </div>

      {/* Stats Row - Glassmorphism */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Stethoscope} label={t('totalDoctors')} value={doctors.length} color="bg-gradient-to-br from-blue-500 to-blue-700" />
        <StatCard icon={UserCheck} label={t('active')} value={activeDoctors} color="bg-gradient-to-br from-emerald-500 to-emerald-700" />
        <StatCard icon={Award} label={t('experience')} value={`${totalExperience}+`} color="bg-gradient-to-br from-amber-500 to-orange-600" />
        <StatCard icon={Building2} label={t('departments')} value={uniqueDepartments} color="bg-gradient-to-br from-purple-500 to-pink-600" />
      </div>

      {/* Doctors Grid - 3D Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
          >
            <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {/* Top Banner with Pattern */}
              <div className="h-28 bg-gradient-to-br from-medical-500 via-medical-600 to-emerald-500 relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge className={
                    doctor.status === 'active'
                      ? 'bg-emerald-500/90 text-white border-0 backdrop-blur-sm'
                      : 'bg-slate-500/90 text-white border-0 backdrop-blur-sm'
                  }>
                    {t(doctor.status)}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1">
                    <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span className="text-xs font-bold text-white">4.8</span>
                  </div>
                </div>
              </div>

              {/* Avatar - Floating */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
                <motion.div 
                  className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 p-1 shadow-2xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-medical-400 via-medical-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
                    {doctor.fullName.split(' ').map((n) => n[0]).join('')}
                  </div>
                </motion.div>
              </div>

              <CardContent className="p-0 pt-16">
                {/* Name & Department */}
                <div className="text-center px-5 pb-4">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    {doctor.fullName}
                  </h3>
                  <Badge
                    variant="outline"
                    className="mt-2 bg-medical-50 dark:bg-medical-900/20 text-medical-700 dark:text-medical-300 border-medical-200 dark:border-medical-700 rounded-full px-4"
                  >
                    {doctor.specialization}
                  </Badge>
                </div>

                {/* Info Grid */}
                <div className="px-5 pb-4 space-y-2">
                  <InfoRow icon={Award} label={t('experience')} value={`${doctor.experienceYears} ${t('years')}`} highlight />
                  <InfoRow icon={Mail} label={t('email')} value={doctor.email} />
                  <InfoRow icon={Phone} label={t('phone')} value={doctor.phone} isPhone />
                  <InfoRow icon={Calendar} label={t('availableDays')} value={doctor.availableDays.join(' - ')} />
                  <InfoRow icon={Clock} label={t('availableHours')} value={doctor.availableHours} />
                </div>

                {/* Actions */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex gap-3">
                  <Button size="sm" className="flex-1 gap-2 h-10 rounded-xl bg-gradient-to-r from-medical-500 to-medical-600 hover:from-medical-600 hover:to-medical-700 shadow-lg shadow-medical-500/25">
                    <CalendarCheck className="w-4 h-4" />
                    {t('appointments')}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-2 h-10 rounded-xl border-2 hover:bg-slate-50">
                    <Eye className="w-4 h-4" />
                    {t('view')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ============ Stat Card - Glassmorphism ============ */
function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any
  label: string
  value: string | number
  color: string
}) {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      <CardContent className="p-4 relative">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shrink-0 shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-xl font-bold text-slate-800 dark:text-white">{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ============ Info Row ============ */
function InfoRow({
  icon: Icon,
  label,
  value,
  highlight = false,
  isPhone = false,
}: {
  icon: any
  label: string
  value: string
  highlight?: boolean
  isPhone?: boolean
}) {
  return (
    <div className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors hover:scale-[1.02] ${highlight ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10' : 'bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60'}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${highlight ? 'bg-amber-100 text-amber-600' : 'bg-white dark:bg-slate-700 text-slate-400'}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-slate-400 uppercase tracking-wider">{label}</p>
        <p 
          className={`text-sm font-semibold truncate ${highlight ? 'text-amber-700 dark:text-amber-300' : 'text-slate-700 dark:text-slate-300'}`}
          dir={isPhone ? "ltr" : undefined}
          style={isPhone ? { textAlign: 'right', unicodeBidi: 'embed' } : undefined}
        >
          {value}
        </p>
      </div>
    </div>
  )
}
