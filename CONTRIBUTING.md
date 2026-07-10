# دليل المساهمة | Contributing Guide

## 🙏 شكراً لاهتمامك بالمساهمة!

## كيفية المساهمة

### 1. الإبلاغ عن مشاكل (Issues)
- استخدم قالب الـ Issue
- اصف المشكلة بوضوح مع خطوات إعادة الإنتاج
- أرفق صور الشاشة إن أمكن

### 2. طلبات السحب (Pull Requests)
1. انسخ المستودع (Fork)
2. أنشئ فرعاً جديداً: `git checkout -b feature/الاسم`
3. اجعل تغييراتك
4. اختبر التغييرات: `npm run dev`
5. ادفع الفرع: `git push origin feature/الاسم`
6. افتح Pull Request

### 3. معايير الكود
- استخدم **TypeScript** بشكل صحيح
- اتبع **ESLint** و **Prettier**
- اكتب كوداً نظيفاً وقابلاً للقراءة
- أضف تعليقات بالعربي أو الإنجليزي

### 4. هيكلية الملفات
```
src/
  components/   ← مكونات reusable
  pages/          ← صفحات التطبيق
  hooks/          ← hooks مخصصة
  stores/         ← zustand stores
  lib/            ← utilities
  types/          ← أنواع TypeScript
  data/           ← demo data
  i18n/           ← translations
```

## 📞 التواصل
- GitHub Issues
- Email: info@damascusmedical.com

---

## 🙏 Thank you for your interest in contributing!

## How to Contribute

### 1. Reporting Issues
- Use the Issue template
- Describe the problem clearly with reproduction steps
- Attach screenshots if possible

### 2. Pull Requests
1. Fork the repository
2. Create a new branch: `git checkout -b feature/name`
3. Make your changes
4. Test your changes: `npm run dev`
5. Push the branch: `git push origin feature/name`
6. Open a Pull Request

### 3. Code Standards
- Use **TypeScript** properly
- Follow **ESLint** and **Prettier**
- Write clean, readable code
- Add comments in Arabic or English

### 4. File Structure
```
src/
  components/   ← reusable components
  pages/          ← application pages
  hooks/          ← custom hooks
  stores/         ← zustand stores
  lib/            ← utilities
  types/          ← TypeScript types
  data/           ← demo data
  i18n/           ← translations
```

## 📞 Contact
- GitHub Issues
- Email: info@damascusmedical.com
