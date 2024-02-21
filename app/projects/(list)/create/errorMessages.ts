export interface ErrorMessages {
  projectName?: string
  clientName?: string
  expectedDeliveryDate?: string
  description?: string
  priority?: string
}

export const errorMessageInitialState = {
  projectName: '',
  clientName: '',
  expectedDeliveryDate: '',
  description: '',
  priority: ''
}
