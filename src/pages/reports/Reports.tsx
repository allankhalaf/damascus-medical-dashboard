import { useTranslation } from 'react-i18next'
import { Download } from 'lucide-react'
import RevenueChart from '@/components/charts/RevenueChart'
import PatientGrowthChart from '@/components/charts/PatientGrowthChart'
import DepartmentChart from '@/components/charts/DepartmentChart'
import AppointmentStatusChart from '@/components/charts/AppointmentStatusChart'
import { Button } from '@/components/ui/button'

export default function Reports() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('reports')}</h1>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          {t('export')}
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <PatientGrowthChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentStatusChart />
        <DepartmentChart />
      </div>
    </div>
  )
}
