import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { DollarSign } from 'lucide-react'
import { invoices } from '@/data/demoData'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function BillingList() {
  const { t } = useTranslation()

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0)
  const totalPaid = invoices.filter((i) => i.status === 'paid').reduce((sum, inv) => sum + inv.total, 0)
  const totalPending = invoices.filter((i) => i.status === 'pending').reduce((sum, inv) => sum + inv.total, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('billing')}</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard title={t('total')} value={formatCurrency(totalRevenue)} color="from-medical-500 to-medical-600" />
        <SummaryCard title={t('paid')} value={formatCurrency(totalPaid)} color="from-emerald-500 to-emerald-600" />
        <SummaryCard title={t('pending')} value={formatCurrency(totalPending)} color="from-amber-500 to-amber-600" />
      </div>

      {/* Invoices */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">{t('invoice')}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">{t('patient')}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">{t('date')}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">{t('total')}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {invoices.map((inv, index) => (
                <motion.tr
                  key={inv.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-white">
                    #{inv.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {inv.patientName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {formatDate(inv.date)}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-white" dir="ltr" style={{ textAlign: 'right' }}>
                    {formatCurrency(inv.total)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(inv.status)}>{t(inv.status)}</Badge>
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

function SummaryCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
            <DollarSign className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
