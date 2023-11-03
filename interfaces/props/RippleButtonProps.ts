/**
 * Props for the RippleButton component.
 * @param {string} text - The text to display on the button.
 * @param {string} [width] - The width of the button.
 * @param {string} [height] - The height of the button.
 * @param {string} [backgroundColor] - The background color of the button.
 * @param {string} [textColor] - The text color of the button.
 * @param {string} [effectColor] - The color of the ripple effect.
 * @param {string} [borderRadius] - The border radius of the button.
 * @param {string} [icon] - The icon to display on the button.
 * @param {string} [iconSize] - The size of the icon.
 * @param {string} [href] - The URL to link to when the button is clicked.
 * @param {boolean|null} [loading] - Whether the button is in a loading state.
 * @param {(...args: any[]) => void} [func] - The function to call when the button is clicked.
 * @param {(...args: any[]) => Promise<void>} [asyncFunc] - Async function. Same as above, but made for async calls to avoid typescript no-misused-promises error.
 * @param {boolean} [disabled] - Whether the button is disabled.
 */

export interface RippleButtonProps {
  text: string
  width?: string
  height?: string
  backgroundColor?: string
  textColor?: string
  effectColor?: string
  borderRadius?: string
  icon?: string
  iconSize?: string
  href?: string
  loading?: boolean | null
  func?: (...args: any[]) => void // * Takes any arguments
  asyncFunc?: (...args: any[]) => Promise<void> // * Same as above, but made for async calls to avoid typescript no-misused-promises error
  disabled?: boolean
}
