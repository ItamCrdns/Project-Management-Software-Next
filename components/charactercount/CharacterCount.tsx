import { useRef, useState } from 'react'
import { type CharacterCountProps } from './CharacterCountProps'

export const InputAndCharacterCount: React.FC<CharacterCountProps> = (
  props
) => {
  const {
    name,
    placeholder,
    limit,
    onSubmit,
    defaultValue,
    defaultCharacterCount
  } = props

  const [characters, setCharacters] = useState<number>(defaultCharacterCount)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextareaBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    onSubmit(e.target.value)
  }

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCharacters(e.target.value.length)
    const textarea = textAreaRef.current
    if (textarea !== null) {
      textarea.style.height = 'auto'

      const newHeight = Math.max(textarea.scrollHeight, 20)
      textarea.style.height = `${newHeight}px`
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <textarea
        className='box-border resize-none text-lg overflow-hidden min-w-full'
        ref={textAreaRef}
        name={name}
        placeholder={placeholder}
        onChange={handleTextareaChange}
        onBlur={handleTextareaBlur}
        defaultValue={defaultValue}
        maxLength={255}
      />
      <p className='flex justify-end text-xs'>
        {characters}/{limit}
      </p>
    </div>
  )
}
