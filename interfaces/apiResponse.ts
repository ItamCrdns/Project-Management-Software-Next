// Generic interface that we will use to define the shape of our API responses
// T any other interface (Project, Task, Issue, etc...)
export interface ApiResponse<T> {
  data: T | null
  status: number
}
