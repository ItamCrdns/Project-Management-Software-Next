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
    headers
  }

  return requestOptions
}

export default cookieOptions

type ContentType = 'application/json' | 'multipart/form-data'

export const postCookieOptions = (body: BodyInit, contentType?: ContentType): RequestInit => {
  const cookieStore = cookies()
  const jwtCookie = cookieStore.get('JwtToken')

  const headers = new Headers({
    Cookie: 'JwtToken=' + jwtCookie?.value
  })

  const headersWithContentType = new Headers({
    'Content-Type': contentType ?? 'application/json',
    Cookie: 'JwtToken=' + jwtCookie?.value
  })

  const requestOptions: RequestInit = {
    method: 'POST',
    cache: 'no-store',
    headers: contentType !== undefined ? headersWithContentType : headers,
    body
  }

  return requestOptions
}
