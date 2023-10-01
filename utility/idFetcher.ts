import { type Project } from '@/interfaces/project'

async function idFetcher (endpoint: string, id: string): Promise<{ data: Project | null, status: number }> {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint + '/' + id)

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store'
  }

  const res = await fetch(url, requestOptions)

  if (!res.ok) {
    return {
      data: null, status: res.status
    }
  }

  if (res.ok) {
    return {
      data: await res.json(),
      status: res.status
    }
  }

  return {
    data: null, status: res.status
  }
}

export default idFetcher
