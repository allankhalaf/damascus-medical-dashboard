import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Users,
  CalendarDays,
  DollarSign,
  Stethoscope,
  TrendingUp,
  Activity,
  ArrowUpRight,
  HeartPulse,
} from 'lucide-react'
import { dashboardStats, recentActivities } from '@/data/demoData'
import { formatCurrency } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import RevenueChart from '@/components/charts/RevenueChart'
import PatientGrowthChart from '@/components/charts/PatientGrowthChart'
import AppointmentStatusChart from '@/components/charts/AppointmentStatusChart'

const statCards = [
  {
    title: 'totalPatients',
    value: dashboardStats.totalPatients,
    icon: Users,
    gradient: 'from-blue-500 via-blue-600 to-indigo-600',
    lightGradient: 'from-blue-50 to-blue-100',
    iconBg: 'bg-blue-500',
    growth: dashboardStats.patientGrowth,
    label: 'مرضى جدد هذا الشهر',
  },
  {
    title: 'todayAppointments',
    value: dashboardStats.todayAppointments,
    icon: CalendarDays,
    gradient: 'from-emerald-500 via-emerald-600 to-teal-600',
    lightGradient: 'from-emerald-50 to-emerald-100',
    iconBg: 'bg-emerald-500',
    growth: dashboardStats.appointmentGrowth,
    label: 'مواعيد اليوم',
  },
  {
    title: 'monthlyRevenue',
    value: formatCurrency(dashboardStats.monthlyRevenue),
    icon: DollarSign,
    gradient: 'from-amber-500 via-amber-600 to-orange-600',
    lightGradient: 'from-amber-50 to-amber-100',
    iconBg: 'bg-amber-500',
    growth: dashboardStats.revenueGrowth,
    label: 'إيرادات يوليو',
  },
  {
    title: 'totalDoctors',
    value: dashboardStats.totalDoctors,
    icon: Stethoscope,
    gradient: 'from-purple-500 via-purple-600 to-pink-600',
    lightGradient: 'from-purple-50 to-purple-100',
    iconBg: 'bg-purple-500',
    growth: 0,
    label: 'طبيب نشط',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-medical-500 via-medical-600 to-emerald-500 p-8 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="relative flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <HeartPulse className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">مرحباً بك في مركز دمشق الطبي</h2>
            <p className="text-white/80 mt-1">نظرة عامة على أداء العيادة اليوم</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid - Floating Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={index} variants={item}>
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <CardContent className="relative p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {t(stat.title)}
                      </p>
                      <h3 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
                        {stat.value}
                      </h3>
                      {stat.growth > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                            <TrendingUp className="w-3 h-3" />
                            +{stat.growth}%
                          </span>
                          <span className="text-xs text-slate-400">{t('thisMonth')}</span>
                        </div>
                      )}
                    </div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg shadow-${stat.iconBg}/30 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Bottom Label */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <PatientGrowthChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AppointmentStatusChart />

        {/* Recent Activity - Enhanced */}
        <Card className="col-span-2 border-0 shadow-lg">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {t('recentActivity')}
              </h3>
              <p className="text-xs text-slate-500 mt-1">آخر النشاطات في النظام</p>
            </div>
            <Badge variant="outline" className="rounded-full px-4">اليوم</Badge>
          </div>
          <div className="p-4 space-y-2">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                    activity.type === 'patient'
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
                      : activity.type === 'appointment'
                      ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white'
                      : activity.type === 'billing'
                      ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white'
                      : 'bg-gradient-to-br from-purple-400 to-purple-600 text-white'
                  }`}
                >
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {activity.user} • {activity.time}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
