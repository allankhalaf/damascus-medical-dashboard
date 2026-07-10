import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CalendarDays, Search, Plus, Clock } from 'lucide-react'
import { appointments } from '@/data/demoData'
import { formatDate, getStatusColor } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export default function AppointmentList() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.includes(searchTerm) || apt.doctorName.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const today = new Date().toISOString().split('T')[0]
  const todayAppointments = appointments.filter((a) => a.date === today)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('appointments')}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('today')}: {todayAppointments.length} {t('appointments')}
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          {t('addNew')}
        </Button>
      </div>

      {/* Today's Appointments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {todayAppointments.map((apt, index) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4 border-l-4 border-l-medical-500">
              <div className="flex items-center justify-between mb-3">
                <Badge className={getStatusColor(apt.status)}>{t(apt.status)}</Badge>
                <span className="text-xs text-slate-500 flex items-center gap-1" dir="ltr">
                  <Clock className="w-3 h-3" />
                  {apt.time}
                </span>
              </div>
              <p className="font-medium text-slate-800 dark:text-white">{apt.patientName}</p>
              <p className="text-sm text-slate-500">{apt.doctorName}</p>
              <p className="text-xs text-slate-400 mt-1">{apt.department}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder={t('searchAppointments')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900/50"
          >
            <option value="all">{t('all')}</option>
            <option value="scheduled">{t('scheduled')}</option>
            <option value="completed">{t('completed')}</option>
            <option value="cancelled">{t('cancelled')}</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">{t('patient')}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">{t('doctor')}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">{t('date')}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">{t('time')}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">{t('type')}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {filtered.map((apt, index) => (
                <motion.tr
                  key={apt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-white">
                    {apt.patientName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {apt.doctorName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {apt.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300" dir="ltr" style={{ textAlign: 'right' }}>
                    {apt.time}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-xs">
                      {t(apt.type)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(apt.status)}>{t(apt.status)}</Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
