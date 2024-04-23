import { type Employee } from '@/interfaces/employee'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { postPatchCookieOptions } from '@/utility/cookieOptions'

export const updateEmployee = async (formData: FormData): Promise<OperationResult<Employee>> => {
  // FormData should have the currentPassword (necessary) and profilePicture (optional)
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Employee/me/update')

  const res = await fetch(url, postPatchCookieOptions(formData, undefined, true))

  return await res.json()
}
