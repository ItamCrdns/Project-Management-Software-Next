'use server'
import { type Employee } from '@/interfaces/employee'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { postPatchCookieOptions } from '@/utility/cookieOptions'

export const updateEmployee = async (
  formData: FormData
): Promise<OperationResult<Employee>> => {
  const url = new URL(
    process.env.NEXT_PUBLIC_API_URL + 'EmployeeManagement/me/update'
  )

  const res = await fetch(
    url,
    postPatchCookieOptions(formData, undefined, true)
  )

  return await res.json()
}
