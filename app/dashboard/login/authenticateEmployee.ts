export interface CredentialsType {
  creds: FormData
}

async function authenticateEmployee ({ creds }: CredentialsType): Promise<{ data: any, status: number }> {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Employee/login')

  const requestOptions: RequestInit = {
    method: 'POST',
    body: creds,
    credentials: 'include' // Cookies
  }

  const res = await fetch(url, requestOptions)

  if (!res.ok) {
    return { data: await res.json(), status: res.status }
  }

  return { data: await res.json(), status: res.status }
}

export default authenticateEmployee
