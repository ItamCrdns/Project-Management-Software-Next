export interface useNewTaskActionsReturn {
  setName: (name: string) => void
  setDescription: (description: string) => void
  setCreated: (created: string) => void
  setExpectedDeliveryDate: (startedWorking: string) => void
  setFinished: (finished: string) => void
  setTaskCreatorId: (taskCreatorId: number) => void
  setProjectId: (projectId: number) => void
  clear: () => void
}
