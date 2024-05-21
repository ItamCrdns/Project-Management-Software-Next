import { cookies } from 'next/headers'

/**
 * Creates the options object for making a request with cookie authentication.
 * @param nextTags - Optional array of tags for the next request.
 * @returns The options object for making a request with cookie authentication.
 */
const cookieOptions = (nextTags?: string[]): RequestInit => {
  const cookieStore = cookies()
  const jwtCookie = cookieStore.get('JwtToken')

  const headers = new Headers({
    Cookie: 'JwtToken=' + jwtCookie?.value
  })

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    cache: 'default',
    headers
  }

  if (nextTags !== undefined && nextTags.length > 0) {
    requestOptions.next = {
      tags: nextTags
    }
  }

  return requestOptions
}

export default cookieOptions

type ContentType = 'application/json' | 'multipart/form-data'

export const postPatchCookieOptions = (
  body?: BodyInit,
  contentType?: ContentType,
  patch?: boolean
): RequestInit => {
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
    method: patch === true ? 'PATCH' : 'POST', // By default, the method is POST, but can be changed to PATCH
    cache: 'no-store',
    headers: contentType !== undefined ? headersWithContentType : headers,
    body
  }

  return requestOptions
}
