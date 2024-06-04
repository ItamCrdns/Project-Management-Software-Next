import { type Employee } from '@/interfaces/employee'
import { type Option } from '@/interfaces/props/CustomSelectProps'

export interface UseNewProjectActionsReturn {
  setCompany: (companyId: number, companyName: string) => void
  clearCompanyValues: () => void
  setName: (projectName: string) => void
  setClientName: (clientName: string) => void
  setExpectedDeliveryDate: (expectedDeliveryDate: string) => void
  setStartedWorking: (value: boolean) => void
  setPriority: (priority: Option) => void
  setDescription: (description: string) => void
  setEmployee: (employee: Employee) => void
  setPictures: (images: { file: File; id: string }[]) => void
  removePicture: (id: string) => void
  clear: () => void
}
