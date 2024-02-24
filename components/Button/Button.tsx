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
    asyncFunc
  } = props

  const handleButtonClick = (e: React.MouseEvent<HTMLSpanElement>): void => {
    handleEffect(e)

    if (func !== undefined && func !== null && !disabled) {
      func(e)
    }
  }

  const handleButtonClickAsync = async (
    e: React.MouseEvent<HTMLSpanElement>
  ): Promise<void> => {
    if (asyncFunc !== undefined && asyncFunc !== null && !disabled) {
      await asyncFunc(e)
    }
  }

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

  return (
    <span
      ref={buttonRef}
      className={`relative cursor-pointer select-none overflow-hidden border-none outline-none flex items-center mx-auto justify-center py-2 px-4 text-xs rounded-md w-auto font-semibold ${bgColor} ${txtColor}`}
      onClick={
        asyncFunc !== undefined && !disabled
          ? handleButtonClickAsync
          : handleButtonClick
      }
    >
      {href !== undefined
        ? (
        <Link href={href} className='flex items-center gap-2'>
          {loading === true && (
            <div className='border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 w-4 h-4'></div>
          )}
          {text}
        </Link>
          )
        : (
        <div className='flex items-center gap-2'>
          {loading === true && (
            <div className='border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 w-4 h-4'></div>
          )}
          {text}
        </div>
          )}
      <div>
        {ripples.map((ripple, index) => (
          <span
            key={index}
            className='w-10 h-10 absolute rounded-full pointer-events-none bg-white bg-opacity-75 animate-ripple'
            style={{ top: ripple.y + 'px', left: ripple.x + 'px' }}
          />
        ))}
      </div>
    </span>
  )
}

export { Button }
