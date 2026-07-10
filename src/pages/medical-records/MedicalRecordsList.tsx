import { useTranslation } from 'react-i18next'
import { FileText } from 'lucide-react'
import { medicalRecords } from '@/data/demoData'
import { formatDate } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function MedicalRecordsList() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('medicalRecords')}</h1>
      <div className="space-y-4">
        {medicalRecords.map((record) => (
          <Card key={record.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-medical-100 dark:bg-medical-900/30 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-medical-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">{record.patientName}</h3>
                  <p className="text-sm text-slate-500">{record.doctorName} • {formatDate(record.date)}</p>
                </div>
              </div>
              <Badge>{t(record.labResults[0]?.status || 'normal')}</Badge>
            </div>
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('diagnosis')}:</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{record.diagnosis}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
