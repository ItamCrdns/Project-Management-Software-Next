'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './ripplebutton.module.css'
import Link from 'next/link'

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

  const handleEffect = (e: React.MouseEvent<HTMLSpanElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = { x, y }
    setRipples((prevRipples) => [...prevRipples, ripple])
  }

  return (
    <span ref={buttonRef} className={styles.button} onClick={handleEffect}>
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
