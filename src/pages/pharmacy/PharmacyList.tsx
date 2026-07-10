import { useTranslation } from 'react-i18next'
import { Pill } from 'lucide-react'
import { prescriptions } from '@/data/demoData'
import { formatDate } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PharmacyList() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('pharmacy')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prescriptions.map((rx) => (
          <Card key={rx.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">{rx.patientName}</p>
                  <p className="text-xs text-slate-500">{rx.doctorName}</p>
                </div>
              </div>
              <Badge variant={rx.status === 'active' ? 'success' : 'secondary'}>{t(rx.status)}</Badge>
            </div>
            <div className="space-y-2">
              {rx.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm font-medium">{item.medicineName}</span>
                  <span className="text-xs text-slate-500">{item.dosage} • {item.duration}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">{formatDate(rx.date)}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
