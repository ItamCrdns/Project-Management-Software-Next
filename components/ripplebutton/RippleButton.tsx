'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './ripplebutton.module.css'
import Link from 'next/link'

/**
 * Props for the RippleButton component
 * @param {string} text - The text to display on the button. Ex: "Continue"
 * @param {string} [width] - The width of the button. Default: 100px
 * @param {string} [height] - The height of the button. Default: 35px
 * @param {string} [backgroundColor] - The background color of the button. Default: depends on theme
 * @param {string} [textColor] - The text color of the button Default: depends on theme
 * @param {string} [effectColor] - The color of the ripple effect. Default: white
 * @param {string} [borderRadius] - The border radius of the button Default: 10px
 * @param {string} [icon] - The icon to display on the button. Default: none
 * @param {string} [iconSize] - The size of the icon. Default: none
 * @param {string} [href] - The URL to link to when the button is clicked. Default: none
 * @param {boolean | null} [loading] - PROMISE. Will return a loading spinner left to the text if true, nothing if null, and the button if false. Default: null
 */

/** DO NOT COMBINE ICON AND LOADING IT WILL LOOK WEIRD */

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
}

const RippleButton: React.FunctionComponent<RippleButtonProps> = (props) => {
  const [ripples, setRipples] = useState<Array<{ x: number, y: number }>>([])
  const buttonRef = useRef<HTMLSpanElement>(null)

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
    loading = null
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
    <span ref={buttonRef} className={styles.button} onClick={handleEffect} onMouseLeave={handleClearRipples}>
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
