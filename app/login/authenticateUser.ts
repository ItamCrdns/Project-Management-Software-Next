import { type LoginData } from './LoginData.interface'

export const authenticateUser = async (username: string, password: string): Promise<LoginData> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Employee/login')

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    }),
    credentials: 'include' // Cookies
  }

  const res = await fetch(url, requestOptions)

  return await res.json()
}
