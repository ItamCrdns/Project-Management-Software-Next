async function logout (): Promise<number> {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Employee/logout')

  const requestOptions: RequestInit = {
    method: 'POST',
    credentials: 'include'
  }

  const res = await fetch(url, requestOptions)

  if (res.status === 204) {
    return 204
  } else {
    throw new Error('Logout failed.')
  }
}

export default logout
