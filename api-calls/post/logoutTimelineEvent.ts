import { postPatchCookieOptions } from '@/utility/cookieOptions'

export const logoutTimelineEvent = async (): Promise<void> => {
  const url = new URL(
    process.env.NEXT_PUBLIC_API_URL + 'TimelineManagement/on-logout'
  )

  await fetch(url, postPatchCookieOptions())
}
