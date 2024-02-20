import { useCallback } from 'react'
import logout from '@/utility/logout'
import { useRouter } from 'next/navigation'

const useLogout = (): { handleLogout: () => void } => {
  const router = useRouter()
  const handleLogout = useCallback(() => {
    logout()
      .then(() => { router.push('/login') })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return { handleLogout }
}

export default useLogout
