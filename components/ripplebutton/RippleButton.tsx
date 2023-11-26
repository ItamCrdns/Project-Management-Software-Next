'use client'
import { useEffect, useRef, useState } from 'react'
import { type RippleButtonProps } from '@/interfaces/props/RippleButtonProps'
import styles from './ripplebutton.module.css'
import Link from 'next/link'

/** DO NOT COMBINE ICON AND LOADING IT WILL LOOK WEIRD */
/** DO NOT PASS func and asyncFunc at the same time since the code its made to only run one */

const RippleButton: React.FunctionComponent<RippleButtonProps> = (props) => {
  const [ripples, setRipples] = useState<Array<{ x: number, y: number }>>([])
  const buttonRef = useRef<HTMLSpanElement>(null)

  const disabled = props.disabled !== null && props.disabled === true

  const {
    text,
    // width,
    // height,
    backgroundColor,
    textColor,
    effectColor,
    borderRadius,
    icon,
    iconSize,
    href,
    loading = null,
    func,
    asyncFunc
  } = props

  useEffect(() => {
    const button = buttonRef.current
    const styleConfig = {
      // '--width': width,
      // '--height': height,
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

  // Remove the unused handleButtonClickAsync function
  const handleButtonClickAsync = async (
    e: React.MouseEvent<HTMLSpanElement>
  ): Promise<void> => {
    if (asyncFunc !== undefined && asyncFunc !== null && !disabled) {
      try {
        await asyncFunc(e)
      } catch (error) {
        console.error(error)
      }
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
        cursor: disabled ? 'not-allowed' : ''
      }} // Override the background color and cursor if the button is disabled
      onClick={
        // ! Determine if the function being passed its the async one or the default one
        // ? Only run if the button its not disabled
        asyncFunc !== undefined && !disabled ? handleButtonClickAsync : handleButtonClick
      }
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
