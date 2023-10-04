import { cookies } from 'next/headers'

/**
 * Returns the options for a GET request that requires authorization.
 * @returns {RequestInit} The options for a HTTP Request (GET).
 */
const cookieOptions = (): RequestInit => {
  const cookieStore = cookies()
  const jwtCookie = cookieStore.get('JwtToken')

  const headers = new Headers({
    Cookie: 'JwtToken=' + jwtCookie?.value
  })

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers // Send cookies as headers otherwise error because of SSR?
  }

  return requestOptions
}

export default cookieOptions
