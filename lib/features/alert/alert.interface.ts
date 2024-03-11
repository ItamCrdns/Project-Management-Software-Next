export interface Alert {
  message: string
  type: 'success' | 'error' | ''
  show?: boolean
//   setShow: (show: boolean) => void
}
