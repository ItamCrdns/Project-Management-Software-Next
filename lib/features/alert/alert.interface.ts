export interface Alert {
  message: string
  type: 'success' | 'error' | 'loading' | ''
  show?: boolean
  //   setShow: (show: boolean) => void
}
