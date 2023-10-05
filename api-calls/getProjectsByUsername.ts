import { type Project } from '@/interfaces/project'
import cookieOptions from '@/utility/cookieOptions'

const getProjectsByUsername = async (username: string): Promise<{ data: Project | null, status: number }> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Employee/username/' + username + '/projects')

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

export default getProjectsByUsername
