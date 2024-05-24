export interface Alert {
  message: string
  type: 'success' | 'error' | 'loading' | 'notification' | ''
  show?: boolean
}
