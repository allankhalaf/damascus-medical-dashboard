import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Eye, Edit, Trash2, UserPlus, Filter } from 'lucide-react'
import { patients } from '@/data/demoData'
import { formatDate, getInitials } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export default function PatientList() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGender, setFilterGender] = useState<string>('all')
  const [loading] = useState(false)

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
    const matchesGender = filterGender === 'all' || patient.gender === filterGender
    return matchesSearch && matchesGender
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('patients')}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            إدارة سجلات المرضى والمتابعة
          </p>
        </div>
        <Button className="gap-2 h-11 rounded-xl bg-gradient-to-r from-medical-500 to-medical-600 shadow-lg shadow-medical-500/25 hover:shadow-xl hover:shadow-medical-500/30 transition-all">
          <UserPlus className="w-4 h-4" />
          {t('addPatient')}
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 border-0 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder={t('searchPatients')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 h-11 rounded-xl"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900/50 outline-none focus:ring-2 focus:ring-medical-500/20"
            >
              <option value="all">{t('all')}</option>
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
            </select>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-2">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-800/50">
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t('name')}
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t('age')} / {t('gender')}
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t('phone')}
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t('bloodType')}
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t('lastVisit')}
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {loading ? (
                // Skeleton Loading
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="h-16">
                    <td colSpan={6} className="px-6">
                      <div className="skeleton h-10 rounded-xl w-full" />
                    </td>
                  </tr>
                ))
              ) : (
                filteredPatients.map((patient, index) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group cursor-pointer"
                    onClick={() => navigate(`/patients/${patient.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-400 to-emerald-400 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md group-hover:scale-110 transition-transform">
                          {getInitials(patient.fullName)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                            {patient.fullName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {patient.address}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {patient.age} {t('years')}
                      </div>
                      <Badge 
                        variant={patient.gender === 'male' ? 'default' : 'secondary'} 
                        className="mt-1 rounded-full text-[10px]"
                      >
                        {t(patient.gender)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-slate-700 dark:text-slate-300" dir="ltr" style={{ textAlign: 'right' }}>
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="rounded-full px-3 font-bold">
                        {patient.bloodType}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {patient.lastVisit ? formatDate(patient.lastVisit) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 rounded-lg hover:bg-medical-50 hover:text-medical-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/patients/${patient.id}`)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-amber-50 hover:text-amber-600">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
