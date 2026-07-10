import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useStore } from '@/stores/useStore'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { cn } from '@/lib/utils'

export default function Layout() {
  const { isDarkMode, language, sidebarOpen } = useStore()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const isRTL = language === 'ar'

  return (
    <div className={cn('min-h-screen bg-slate-50 dark:bg-slate-950', isRTL ? 'font-cairo' : 'font-inter')}>
      <Sidebar />
      <Navbar />
      <main
        className={cn(
          'transition-all duration-300 pt-16 min-h-screen',
          isRTL
            ? sidebarOpen
              ? 'pr-64'
              : 'pr-20'
            : sidebarOpen
            ? 'pl-64'
            : 'pl-20'
        )}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
