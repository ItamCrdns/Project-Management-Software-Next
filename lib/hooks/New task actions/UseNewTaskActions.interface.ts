import { type Employee } from '@/interfaces/employee'

export interface useNewTaskActionsReturn {
  setName: (name: string) => void
  setDescription: (description: string) => void
  setExpectedDeliveryDate: (expectedDeliveryDate: string) => void
  setStartedWorking: (value: boolean) => void
  setFinished: (finished: string) => void
  setTaskCreatorId: (taskCreatorId: number) => void
  setProjectId: (projectId: number) => void
  setEmployee: (employee: Employee) => void
  clear: () => void
}
