export interface OperationResult<T> {
  success: boolean
  message?: string
  data?: T
  errors?: string[]
}
