import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  Phone,
  MapPin,
  Droplets,
  AlertTriangle,
  FileText,
  Pill,
  Activity,
} from 'lucide-react'
import { patients, medicalRecords, appointments, prescriptions } from '@/data/demoData'
import { formatDate, getInitials } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function PatientProfile() {
  const { id } = useParams()
  const { t } = useTranslation()

  const patient = patients.find((p) => p.id === id)
  if (!patient) return <div className="text-center py-20 text-slate-500">Patient not found</div>

  const patientRecords = medicalRecords.filter((r) => r.patientId === id)
  const patientAppointments = appointments.filter((a) => a.patientId === id)
  const patientPrescriptions = prescriptions.filter((p) => p.patientId === id)

  return (
    <div className="space-y-6">
      {/* Back */}
      <Button variant="ghost" onClick={() => window.history.back()}>
        <ArrowRight className="w-4 h-4 ml-2" />
        {t('back')}
      </Button>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-medical-500 to-emerald-500" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-12 mb-4 gap-4">
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 p-1 shadow-xl shrink-0">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-medical-400 to-emerald-400 flex items-center justify-center text-white text-2xl font-bold">
                  {getInitials(patient.fullName)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {patient.fullName}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t('patient')} #{patient.id} • {t('createdAt')} {formatDate(patient.createdAt)}
                </p>
              </div>
              <Button variant="outline">{t('edit')}</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoItem icon={Calendar} label={t('age')} value={`${patient.age} ${t('years')}`} />
              <InfoItem icon={Phone} label={t('phone')} value={patient.phone} />
              <InfoItem icon={MapPin} label={t('address')} value={patient.address} />
              <InfoItem icon={Droplets} label={t('bloodType')} value={patient.bloodType} />
            </div>

            {patient.allergies.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/50">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-semibold">{t('allergies')}</span>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {patient.allergies.map((allergy) => (
                    <Badge key={allergy} variant="destructive">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Medical History & Records */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-5 h-5 text-medical-500" />
              {t('medicalHistory')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-700 dark:text-slate-300">{patient.medicalHistory}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="w-5 h-5 text-emerald-500" />
              {t('appointments')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patientAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                      {apt.doctorName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {apt.date} • {apt.time}
                    </p>
                  </div>
                  <Badge variant={apt.status === 'completed' ? 'success' : apt.status === 'cancelled' ? 'destructive' : 'warning'}>
                    {t(apt.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prescriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Pill className="w-5 h-5 text-purple-500" />
            {t('prescriptions')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patientPrescriptions.map((rx) => (
              <div
                key={rx.id}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-700/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    {rx.doctorName} • {formatDate(rx.date)}
                  </p>
                  <Badge variant={rx.status === 'active' ? 'success' : 'secondary'}>
                    {t(rx.status)}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {rx.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 flex-wrap"
                    >
                      <span className="font-medium text-slate-800 dark:text-white">
                        {item.medicineName}
                      </span>
                      <span>{item.dosage}</span>
                      <span>{item.duration}</span>
                      <span>{item.frequency}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
      <Icon className="w-4 h-4 text-medical-500 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{value}</p>
      </div>
    </div>
  )
}
