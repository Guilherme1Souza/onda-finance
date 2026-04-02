import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { loginService } from '@/features/auth/service/auth-service'
import type { AuthResponse, LoginPayload } from '@/types'

export function useAuth() {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore()
  const navigate = useNavigate()

  const loginMutation = useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload) => loginService(payload),
    onSuccess: ({ user, token }) => {
      setAuth(user, token)
      navigate('/dashboard')
    },
  })

  function logout() {
    clearAuth()
    navigate('/login')
  }

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  }
}
