export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'doctor' | 'receptionist'
  avatar?: string
}

export interface Patient {
  id: string
  fullName: string
  age: number
  gender: 'male' | 'female'
  phone: string
  address: string
  medicalHistory: string
  bloodType: string
  allergies: string[]
  lastVisit?: string
  createdAt: string
}

export interface Doctor {
  id: string
  fullName: string
  specialization: string
  experienceYears: number
  email: string
  phone: string
  availableDays: string[]
  availableHours: string
  status: 'active' | 'inactive'
  avatar?: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  department: string
  type: 'consultation' | 'follow-up' | 'emergency' | 'surgery'
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  diagnosis: string
  symptoms: string
  prescriptions: string[]
  labResults: LabResult[]
  notes: string
}

export interface LabResult {
  id: string
  testName: string
  result: string
  status: 'normal' | 'abnormal' | 'pending'
  date: string
}

export interface Prescription {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  status: 'active' | 'completed'
  items: PrescriptionItem[]
}

export interface PrescriptionItem {
  id: string
  medicineName: string
  dosage: string
  duration: string
  frequency: string
  notes?: string
}

export interface Invoice {
  id: string
  patientId: string
  patientName: string
  date: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  status: 'paid' | 'pending' | 'overdue'
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Activity {
  id: string
  type: 'patient' | 'appointment' | 'billing' | 'record'
  description: string
  user: string
  time: string
}

export interface DashboardStats {
  totalPatients: number
  todayAppointments: number
  monthlyRevenue: number
  totalDoctors: number
  patientGrowth: number
  appointmentGrowth: number
  revenueGrowth: number
}

export interface ClinicSettings {
  name: string
  address: string
  phone: string
  email: string
}
