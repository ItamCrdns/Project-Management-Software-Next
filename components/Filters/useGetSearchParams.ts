import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useGetSearchParams = (): { pathname: string, router: AppRouterInstance, searchParams: URLSearchParams } => {
  const pathname = usePathname()
  const router = useRouter()
  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

  return { pathname, router, searchParams }
}
