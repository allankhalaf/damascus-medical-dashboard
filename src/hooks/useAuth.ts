import { useStore } from '@/stores/useStore'
import type { User } from '@/types'

export function useAuth() {
  const { login, logout } = useStore()

  const handleLogin = (email: string, password: string): boolean => {
    const user: User = {
      id: '1',
      email,
      name: 'أحمد الخالدي',
      role: 'admin',
    }
    login(user)
    return true
  }

  return {
    login: handleLogin,
    logout,
  }
}
