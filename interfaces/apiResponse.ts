// Generic interface that we will use to define the shape of our API responses
// T any other interface (Project, Task, Issue, etc...)

interface ErrorResponse {
  type: string
  title: string
  status: number
  traceId: string
  errors: Record<string, string[]>
}
export interface ApiResponse<T> {
  data: T | null
  status: number
  error?: ErrorResponse
}
