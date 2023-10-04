import { type Employee } from '@/interfaces/employee'
import cookieOptions from '@/utility/cookieOptions'

const fetchColleagues = async (username: string): Promise<{ data: Employee | null, status: number }> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Employee/username/' + username + '/colleagues')

  const requestOptions = cookieOptions()

  const res = await fetch(url, requestOptions)

  if (!res.ok) {
    return {
      data: null,
      status: res.status
    }
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

export default fetchColleagues
