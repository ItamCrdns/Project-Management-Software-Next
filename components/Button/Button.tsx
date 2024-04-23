'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { type ButtonProps } from './Button.interface'

const MAX_RIPPLES = 100

const Button: React.FC<ButtonProps> = (props) => {
  const [ripples, setRipples] = useState<Array<{ x: number, y: number }>>([])
  const buttonRef = useRef<HTMLSpanElement>(null)

  const disabled = props.disabled === true

  const {
    text,
    bgColor = 'bg-azure-radiance-500',
    txtColor = 'text-white',
    href,
    loading = null,
    func,
    asyncFunc,
    disabledFunc,
    icon,
    borderOnly = false
  } = props

  const handleEffect = (e: React.MouseEvent<HTMLSpanElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = { x, y }

    setRipples((prevRipples) => {
      if (prevRipples.length >= MAX_RIPPLES) {
        return []
      }
      return [...prevRipples, ripple]
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>): void => {
    handleEffect(e)

    if (func !== undefined && func !== null && !disabled) {
      func(e)
    }

    if (asyncFunc !== undefined && asyncFunc !== null && !disabled) {
      void (async () => {
        // * Havent tested this yet
        await asyncFunc(e)
      })
    }

    if (disabledFunc !== undefined && disabledFunc !== null && disabled) {
      disabledFunc(e)
    }
  }

  return (
    <span
      ref={buttonRef}
      className={`relative select-none overflow-hidden ${borderOnly ? 'ring-1 ring-gray-500' : 'border-none outline-none'} flex items-center mx-auto justify-center py-2 px-4 text-xs rounded-md w-auto font-semibold ${
        !disabled && !borderOnly ? bgColor : ''
      } ${txtColor} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={handleClick}
    >
      {href !== undefined
        ? (
        <Link href={href} className='flex items-center gap-2'>
          {loading === true && (
            <div className='border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 w-4 h-4'></div>
          )}
          {icon !== undefined && icon !== null && icon}
          {text}
        </Link>
          )
        : (
        <div className='flex items-center gap-2'>
          {loading === true && (
            <div className='border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 w-4 h-4'></div>
          )}
          {icon !== undefined && icon !== null && icon}
          {(loading === null || !loading) && text}
        </div>
          )}
      <div>
        {ripples.map((ripple, index) => (
          <span
            key={index}
            className={`w-10 h-10 absolute rounded-full pointer-events-none ${borderOnly ? 'bg-theming-dark400' : 'bg-white'} bg-opacity-75 animate-ripple`}
            style={{ top: ripple.y + 'px', left: ripple.x + 'px' }}
          />
        ))}
      </div>
    </span>
  )
}

export { Button }
