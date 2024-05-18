import { type NewProjectData } from '@/interfaces/NewProjectData'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { createClient } from './actions/createClient'
import { createProject } from './actions/createProject'
import { type ApiResponse } from '@/interfaces/apiResponse'

export const callCreateProjectServerActions = async (
  newProject: NewProjectData
): Promise<ApiResponse<OperationResult<number>> | null> => {
  const formData = new FormData()

  const selectedDeliveryDate = new Date(
    newProject.expectedDeliveryDate
  ).toUTCString()

  formData.append('name', newProject.name)
  formData.append('description', newProject.description)
  formData.append('priority', newProject.priority?.toString() ?? '')
  formData.append('expectedDeliveryDate', selectedDeliveryDate)

  if (newProject.startedWorking) {
    formData.append('shouldStartNow', 'true')
  }

  const companyClientName = newProject.clientName
  const companyId = newProject.companyId

  // * Check if the clientName has been provided. If it is, it means that the user its creating a new client instead of selecting an existing one
  // * And we will call the create client method, get the returned value after the client is created and append it to the form data
  if (companyClientName !== undefined && companyId === 0) {
    const res = await createClient(companyClientName)

    if (res !== null) {
      formData.append('companyId', res.toString())
    }
  } else if (companyId !== null && companyId !== 0) {
    formData.append('companyId', companyId.toString())
  }

  const employees = newProject.employees

  if (employees !== null && employees.length > 0) {
    employees.forEach((employee) => {
      formData.append('employees', employee.employeeId.toString())
    })
  }

  const res = await createProject(formData)
  return res
}
