/**
 * A customizable button component with ripple effect and loading state.
 * @param text - The text to display on the button.
 * @param duration - The duration of the ripple effect in seconds.
 * @param width - The width of the button.
 * @param height - The height of the button.
 * @param backgroundColor - The background color of the button.
 * @param textColor - The text color of the button.
 * @param effectColor - The color of the ripple effect.
 * @param effectWidth - The width of the ripple effect.
 * @param effectHeight - The height of the ripple effect.
 * @param href - The URL to link to when the button is clicked.
 * @param loading - Whether the button is in a loading state.
 */

'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './button.module.css'

interface ButtonProps {
  text?: string | JSX.Element
  duration?: string
  width?: string
  height?: string
  backgroundColor?: string
  textColor?: string
  effectColor?: string
  effectWidth?: string
  effectHeight?: string
  href?: string
  loading?: boolean | null
}

const Button = ({
  text,
  duration,
  width,
  height,
  backgroundColor,
  textColor,
  effectColor,
  effectWidth, // * If button size is changed, effect size should also be changed
  effectHeight,
  href,
  loading
}: ButtonProps): JSX.Element => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [ripple, setRipple] = useState(false)
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  // * If props
  useEffect(() => {
    const button = buttonRef.current
    const styleConfig = {
      '--button-width': width,
      '--button-height': height,
      '--button-background-color': backgroundColor,
      '--button-text-color': textColor,
      '--effect-color': effectColor,
      '--effect-width': effectWidth,
      '--effect-height': effectHeight,
      '--effect-duration': duration
    }

    if (button !== null) {
      for (const [prop, value] of Object.entries(styleConfig)) {
        if (value !== undefined) {
          button.style.setProperty(prop, value)
        }
      }
    }
  }, [
    duration,
    width,
    height,
    backgroundColor,
    textColor,
    effectColor,
    effectWidth,
    effectHeight
  ])

  useEffect(() => {
    if (coordinates.x !== 0 && coordinates.y !== 0) {
      setRipple(true)
      setTimeout(() => {
        setRipple(false)
      }, 1000)
    } else {
      setRipple(false)
    }
  }, [coordinates])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const button = buttonRef.current

    if (button !== null) {
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)

      setCoordinates({ x: e.clientX - rect.left, y: e.clientY - rect.top })

      button.style.setProperty(
        '--effect-top',
        `${e.clientY - rect.top - size / 2}px`
      )
      button.style.setProperty(
        '--effect-left',
        `${e.clientX - rect.left - size / 2}px`
      )
    }
  }

  return (
    <div
      onClick={handleClick}
      ref={buttonRef}
      className={`${styles.effect} ${ripple ? styles.active : ''}`}
    >
      <span>
        {loading !== null && loading !== undefined && loading
          ? (
          <div className={styles.ldsring}>
            <div />
            <div />
            <div />
            <div />
          </div>
            )
          : href !== null && href !== undefined
            ? (
          <Link href={href}>{text}</Link>
              )
            : (
                text
              )}
      </span>
    </div>
  )
}

export default Button
