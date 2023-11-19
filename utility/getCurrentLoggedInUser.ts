import { type Employee } from '@/interfaces/employee'
import fetcher from './fetcher'

// ! Currently not in use because i thought its just a better idea to return directly in the project
// ! Whather the user making the request its a participant or a owner (creator) of the project
// ? Return the user id extracted from the cookies. Will be used for high level authorization
export const getCurrentLoggedInUser = async (): Promise<number> => {
  const { data } = await fetcher<Employee>(
    `${process.env.NEXT_PUBLIC_API_URL}Employee/me`
  )

  return data?.employeeId ?? 0
}
