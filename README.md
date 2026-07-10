
---

## 🛠️ الأدوات والتقنيات المستخدمة | Tools & Technologies Used

### ⚛️ إطار العمل والمكتبات الأساسية | Core Framework & Libraries

| الأداة | الاستخدام | النسخة |
|--------|----------|--------|
| **React** | مكتبة UI الأساسية | ^18.3.1 |
| **React DOM** | DOM Renderer | ^18.3.1 |
| **Vite** | أداة البناء والتطوير | ^5.3.4 |
| **TypeScript** | لغة البرمجة مع الأنواع | ^5.5.3 |

### 🎨 التصميم والستايل | Styling

| الأداة | الاستخدام | النسخة |
|--------|----------|--------|
| **Tailwind CSS** | إطار عمل CSS | ^3.4.6 |
| **PostCSS** | معالجة CSS | ^8.4.39 |
| **Autoprefixer** | إضافة البادئات التلقائية | ^10.4.19 |
| **class-variance-authority** | إدارة متغيرات الـ Classes | ^0.7.0 |
| **clsx** | دمج Classes | ^2.1.1 |
| **tailwind-merge** | دمج Tailwind Classes | ^2.4.0 |

### 🧭 التوجيه والتنقل | Routing

| الأداة | الاستخدام | النسخة |
|--------|----------|--------|
| **React Router DOM** | إدارة التوجيه والتنقل | ^6.26.0 |

### 📊 إدارة البيانات والحالة | Data & State Management

| الأداة | الاستخدام | النسخة |
|--------|----------|--------|
| **Zustand** | إدارة الحالة العالمية | ^4.5.4 |
| **TanStack Query** | إدارة البيانات والـ Caching | ^5.51.0 |
| **React Hook Form** | إدارة النماذج | ^7.52.0 |
| **Zod** | التحقق من صحة البيانات | ^3.23.8 |
| **@hookform/resolvers** | ربط Zod مع React Hook Form | ^3.9.0 |

### 📈 الرسوم البيانية | Charts

| الأداة | الاستخدام | النسخة |
|--------|----------|--------|
| **Recharts** | رسوم بيانية تفاعلية | ^2.12.7 |

### 🎬 التأثيرات الحركية | Animations

| الأداة | الاستخدام | النسخة |
|--------|----------|--------|
| **Framer Motion** | تأثيرات حركية متقدمة | ^11.3.0 |

### 🌐 الترجمة والتعريب | Internationalization

| الأداة | الاستخدام | النسخة |
|--------|----------|--------|
| **i18next** | إدارة الترجمة | ^23.12.0 |
| **react-i18next** | ربط i18next مع React | ^15.0.0 |
| **i18next-browser-languagedetector** | كشف لغة المتصفح | ^8.0.0 |

### 🎯 الأيقونات | Icons

| الأداة | الاستخدام | النسخة |
|--------|----------|--------|
| **Lucide React** | أيقونات SVG | ^0.414.0 |

### ⚙️ أدوات التطوير | Dev Tools

| الأداة | الاستخدام | النسخة |
|--------|----------|--------|
| **@vitejs/plugin-react** | Plugin React لـ Vite | ^4.3.1 |
| **@types/react** | أنواع TypeScript لـ React | ^18.3.3 |
| **@types/react-dom** | أنواع TypeScript لـ React DOM | ^18.3.0 |

---

## 🏗️ هيكلية المشروع | Project Structure

```
damascus-medical-dashboard/
├── 📄 index.html                    ← نقطة الدخول (RTL + Cairo Font)
├── 📄 package.json                  ← التبعيات والسكربتات
├── 📄 tsconfig.json                 ← إعدادات TypeScript
├── 📄 tsconfig.node.json            ← إعدادات Vite TS
├── 📄 vite.config.ts                ← إعدادات Vite + Path Aliases
├── 📄 tailwind.config.js            ← إعدادات Tailwind (DarkMode + Colors)
├── 📄 postcss.config.js             ← إعدادات PostCSS
├── 📄 README.md                     ← وصف المشروع
│
└── 📁 src/
    ├── 📄 main.tsx                  ← نقطة دخول React (QueryClient + Router + i18n)
    ├── 📄 App.tsx                   ← التوجيه الرئيسي + حماية المصادقة
    ├── 📄 index.css                 ← Tailwind + Custom Styles + Animations
    │
    ├── 📁 types/
    │   └── 📄 index.ts              ← كل أنواع TypeScript (User, Patient, Doctor...)
    │
    ├── 📁 lib/
    │   └── 📄 utils.ts              ← دوال مساعدة (cn, formatCurrency, formatDate...)
    │
    ├── 📁 stores/
    │   └── 📄 useStore.ts           ← Zustand Store (Auth, DarkMode, Language, Sidebar)
    │
    ├── 📁 hooks/
    │   └── 📄 useAuth.ts            ← Hook المصادقة مع Demo Login
    │
    ├── 📁 i18n/
    │   └── 📄 index.ts              ← i18next Config + Translations (AR + EN)
    │
    ├── 📁 data/
    │   └── 📄 demoData.ts           ← كل البيانات التجريبية (Patients, Doctors, Appointments...)
    │
    ├── 📁 components/
    │   ├── 📁 layout/
    │   │   ├── 📄 Sidebar.tsx       ← الشريط الجانبي (Collapsible + Mobile + RTL)
    │   │   ├── 📄 Navbar.tsx        ← شريط العنوان (Search + Notifications + User)
    │   │   └── 📄 Layout.tsx        ← التخطيط الرئيسي (Sidebar + Navbar + Outlet)
    │   │
    │   ├── 📁 ui/                   ← مكونات UI Reusable (shadcn-like)
    │   │   ├── 📄 button.tsx
    │   │   ├── 📄 card.tsx
    │   │   ├── 📄 input.tsx
    │   │   ├── 📄 label.tsx
    │   │   └── 📄 badge.tsx
    │   │
    │   └── 📁 charts/               ← مكونات الرسوم البيانية (Recharts)
    │       ├── 📄 RevenueChart.tsx
    │       ├── 📄 PatientGrowthChart.tsx
    │       ├── 📄 AppointmentStatusChart.tsx
    │       └── 📄 DepartmentChart.tsx
    │
    └── 📁 pages/                    ← صفحات التطبيق (Routes)
        ├── 📁 auth/
        │   └── 📄 Login.tsx         ← صفحة تسجيل الدخول (Glassmorphism + Animation)
        ├── 📁 dashboard/
        │   └── 📄 Dashboard.tsx     ← لوحة التحكم الرئيسية (Stats + Charts + Activity)
        ├── 📁 patients/
        │   ├── 📄 PatientList.tsx   ← قائمة المرضى (Search + Filter + Table)
        │   └── 📄 PatientProfile.tsx ← ملف المريض (Info + History + Appointments)
        ├── 📁 appointments/
        │   └── 📄 AppointmentList.tsx ← إدارة المواعيد (Calendar + Status)
        ├── 📁 doctors/
        │   └── 📄 DoctorList.tsx    ← قائمة الأطباء (Profile Cards + 3D Hover)
        ├── 📁 medical-records/
        │   └── 📄 MedicalRecordsList.tsx ← السجلات الطبية
        ├── 📁 billing/
        │   └── 📄 BillingList.tsx   ← الفواتير (Summary + Invoices Table)
        ├── 📁 pharmacy/
        │   └── 📄 PharmacyList.tsx  ← إدارة الوصفات الدوائية
        ├── 📁 reports/
        │   └── 📄 Reports.tsx       ← التقارير والتحليلات (All Charts + Export)
        └── 📁 settings/
            └── 📄 Settings.tsx      ← الإعدادات (Clinic Info + Dark Mode + Language)
```

---

## 🗺️ خريطة التوجيه | Routes Map

| المسار | الصفحة | الوصف |
|--------|--------|-------|
| `/` | Dashboard | لوحة التحكم الرئيسية |
| `/patients` | PatientList | قائمة المرضى |
| `/patients/:id` | PatientProfile | ملف مريض محدد |
| `/appointments` | AppointmentList | إدارة المواعيد |
| `/doctors` | DoctorList | قائمة الأطباء |
| `/medical-records` | MedicalRecordsList | السجلات الطبية |
| `/billing` | BillingList | الفواتير والمحاسبة |
| `/pharmacy` | PharmacyList | الصيدلية والوصفات |
| `/reports` | Reports | التقارير والتحليلات |
| `/settings` | Settings | إعدادات النظام |

---

## 🎨 نظام الألوان | Color Palette

| اللون | الكود | الاستخدام |
|-------|-------|----------|
| Medical Blue | `#0ea5e9` | Primary - Buttons, Links, Charts |
| Emerald Green | `#10b981` | Success - Completed, Paid, Active |
| Amber | `#f59e0b` | Warning - Scheduled, Pending |
| Red | `#ef4444` | Danger - Cancelled, Overdue, Allergies |
| Purple | `#a855f7` | Accent - Prescriptions, Special |
| Slate | `#64748b` | Neutral - Text, Borders |

---

## 🔐 بيانات الدخول التجريبية | Demo Credentials

```
Email:    admin@damascusmedical.com
Password: password
Name:     أحمد الخالدي
Role:     Administrator (مدير)
```

**ملاحظة:** أي بريد إلكتروني وكلمة مرور تعمل (Demo Login)

---

## 🚀 الأوامر المتاحة | Available Commands

```bash
# تثبيت التبعيات
npm install

# تشغيل وضع التطوير
npm run dev

# بناء للإنتاج
npm run build

# معاينة البناء
npm run preview
```

---

## 📦 التبعيات الكاملة | Full Dependencies

### Dependencies (Production)
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.0",
  "@tanstack/react-query": "^5.51.0",
  "zustand": "^4.5.4",
  "react-hook-form": "^7.52.0",
  "zod": "^3.23.8",
  "@hookform/resolvers": "^3.9.0",
  "recharts": "^2.12.7",
  "framer-motion": "^11.3.0",
  "lucide-react": "^0.414.0",
  "react-i18next": "^15.0.0",
  "i18next": "^23.12.0",
  "i18next-browser-languagedetector": "^8.0.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.4.0",
  "class-variance-authority": "^0.7.0"
}
```

### DevDependencies (Development)
```json
{
  "@types/react": "^18.3.3",
  "@types/react-dom": "^18.3.0",
  "@vitejs/plugin-react": "^4.3.1",
  "typescript": "^5.5.3",
  "vite": "^5.3.4",
  "tailwindcss": "^3.4.6",
  "postcss": "^8.4.39",
  "autoprefixer": "^10.4.19"
}
```

---

## 📊 إحصائيات المشروع | Project Stats

| البند | العدد |
|-------|-------|
| إجمالي الملفات | 40+ ملف |
| صفحات التطبيق | 10 صفحات |
| مكونات UI | 5 مكونات |
| رسوم بيانية | 4 رسوم |
| الترجمات | 2 لغات (AR/EN) |
| مكتبات خارجية | 17 مكتبة |

---

## 📄 الترخيص | License

MIT License - مشروع مفتوح المصدر للاستخدام الشخصي والتجاري.

---

**تم التطوير بواسطة:** Front-End Developer Portfolio  
**الموقع:** Damascus, Syria 🇸🇾  
**السنة:** 2026
