import { Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from '@/stores/useStore'
import Layout from '@/components/layout/Layout'
import Login from '@/pages/auth/Login'
import Dashboard from '@/pages/dashboard/Dashboard'
import PatientList from '@/pages/patients/PatientList'
import PatientProfile from '@/pages/patients/PatientProfile'
import AppointmentList from '@/pages/appointments/AppointmentList'
import DoctorList from '@/pages/doctors/DoctorList'
import MedicalRecordsList from '@/pages/medical-records/MedicalRecordsList'
import BillingList from '@/pages/billing/BillingList'
import PharmacyList from '@/pages/pharmacy/PharmacyList'
import Reports from '@/pages/reports/Reports'
import Settings from '@/pages/settings/Settings'

function App() {
  const { isAuthenticated } = useStore()

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/:id" element={<PatientProfile />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/medical-records" element={<MedicalRecordsList />} />
        <Route path="/billing" element={<BillingList />} />
        <Route path="/pharmacy" element={<PharmacyList />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
