export interface ButtonProps {
  text: string
  bgColor?: string // ? Pass a tailwindcss color class. ex: 'bg-red-500'
  txtColor?: string // ? Pass a tailwindcss color class. ex: 'text-red-500'
  href?: string
  loading?: boolean | null
  func?: (...args: any[]) => void // * Takes any arguments
  asyncFunc?: (...args: any[]) => Promise<void> // * Same as above, but made for async calls to avoid typescript no-misused-promises error
  disabledFunc?: (...args: any[]) => void // * The function that will be executed if button clicked while disabled
  disabled?: boolean
}
