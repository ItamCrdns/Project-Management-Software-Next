'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './ripplebutton.module.css'
import Link from 'next/link'

/** DO NOT COMBINE ICON AND LOADING IT WILL LOOK WEIRD */

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
 * @param {boolean} [disabled] - Whether the button is disabled.
 */

interface RippleButtonProps {
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
  disabled?: boolean
}

const RippleButton: React.FunctionComponent<RippleButtonProps> = (props) => {
  const [ripples, setRipples] = useState<Array<{ x: number, y: number }>>([])
  const buttonRef = useRef<HTMLSpanElement>(null)

  const disabled = props.disabled !== null && props.disabled === true

  const {
    text,
    width,
    height,
    backgroundColor,
    textColor,
    effectColor,
    borderRadius,
    icon,
    iconSize,
    href,
    loading = null,
    func
  } = props

  useEffect(() => {
    const button = buttonRef.current
    const styleConfig = {
      '--width': width,
      '--height': height,
      '--background-color': backgroundColor,
      '--text-color': textColor,
      '--effect-color': effectColor,
      '--border-radius': borderRadius
    }
    if (button !== null) {
      Object.entries(styleConfig).forEach(([key, value]) => {
        if (value !== undefined) {
          button.style.setProperty(key, value)
        }
      })
    }
  }, [props])

  /**
   * Handles button effect and executes the provided function (if any) that you passed as props.
   */
  const handleButtonClick = (e: React.MouseEvent<HTMLSpanElement>): void => {
    handleEffect(e)

    if (func !== undefined && func !== null && !disabled) {
      func(e)
    }
  }

  /**
   * Handles the ripple effect when the button is clicked.
   * @param e - The mouse event that triggered the ripple effect.
   */
  const handleEffect = (e: React.MouseEvent<HTMLSpanElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = { x, y }
    setRipples((prevRipples) => [...prevRipples, ripple])
  }

  // When the mouse leaves the button, clear the ripples after 1s
  const handleClearRipples = (): void => {
    setTimeout(() => {
      setRipples([])
    }, 1000)
  }

  return (
    <span
      ref={buttonRef}
      className={styles.button}
      style={{
        backgroundColor: disabled ? '#8CA1A5' : '',
        cursor: disabled ? 'not-allowed' : ''
      }} // Override the background color and cursor if the button is disabled
      onClick={handleButtonClick}
      onMouseLeave={handleClearRipples}
    >
      {href !== undefined
        ? (
        <Link href={href} className={styles.loadertextwrapper}>
          {loading !== null && <span className={styles.loader} />}
          {icon !== null && (
            <span
              style={{ fontSize: iconSize }}
              className="material-symbols-outlined"
            >
              {icon}
            </span>
          )}
          {text}
        </Link>
          )
        : (
        <div className={styles.loadertextwrapper}>
          {loading !== null && <span className={styles.loader} />}
          {icon !== null && (
            <span
              style={{ fontSize: iconSize }}
              className="material-symbols-outlined"
            >
              {icon}
            </span>
          )}
          {text}
        </div>
          )}
      <div>
        {ripples.map((ripple, index) => (
          <span
            key={index}
            className={styles.bubble}
            style={{ top: ripple.y + 'px', left: ripple.x + 'px' }}
          />
        ))}
      </div>
    </span>
  )
}

export default RippleButton
