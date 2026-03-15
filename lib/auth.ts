// Hardcoded auth for now - will connect to backend later
export const mockAuth = {
  user: {
    id: 'user-123',
    email: 'demo@blazeshort.com',
    name: 'Demo User',
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsImVtYWlsIjoiZGVtb0BiYXphZXNob3J0LmNvbSIsIm5hbWUiOiJEZW1vIFVzZXIifQ.dummytoken',
}

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem('auth_token')
  return !!token
}

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('auth_token', token)
}

export const clearAuthToken = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('auth_token')
}
