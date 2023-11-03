import { type PostReturn } from '@/interfaces/return/PosterReturn'

const handlePost = async <T>(
  endpoint: string,
  formData: FormData
): Promise<PostReturn<T>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint)

  const requestOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    body: formData
  }

  const res = await fetch(url, requestOptions)

  if (!res.ok) {
    throw new Error(`An error has occured: ${res.status}`)
  }

  if (res.ok) {
    return {
      data: await res.json(),
      status: res.status
    }
  }

  return {
    data: null,
    status: res.status
  }
}

export default handlePost
