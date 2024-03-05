import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useGetSearchParams = (): { pathname: string, router: any, searchParams: any } => {
  const pathname = usePathname()
  const router = useRouter()
  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

  return { pathname, router, searchParams }
}
