import { useRef, useState } from 'react'
import { type CharacterCountProps } from './CharacterCountProps'

export const InputAndCharacterCount: React.FC<CharacterCountProps> = (
  props
) => {
  const [characters, setCharacters] = useState<number>(
    props.defaultCharacterCount
  )

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCharacters(e.target.value.length)
    props.onSubmit(e.target.value)
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
        className='box-border resize-none text-lg overflow-hidden min-w-full rounded-md p-4 text-black bg-theming-white200 dark:bg-theming-dark200 dark:text-white'
        ref={textAreaRef}
        name={props.name}
        placeholder={props.placeholder}
        onChange={handleTextareaChange}
        defaultValue={props.defaultValue}
        maxLength={255}
      />
      <p className='flex justify-end text-xs'>
        {characters}/{props.limit}
      </p>
    </div>
  )
}
