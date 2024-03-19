export interface ErrorMessages {
  name?: string
  parentName?: string
  expectedDeliveryDate?: string
  description?: string
  priority?: string
}

export const errorMessageInitialState = {
  name: '',
  parentName: '',
  expectedDeliveryDate: '',
  description: '',
  priority: ''
}
