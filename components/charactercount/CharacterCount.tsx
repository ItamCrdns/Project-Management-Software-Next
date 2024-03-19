import { useRef, useState } from 'react'
import { type CharacterCountProps } from './CharacterCountProps'
import { debounce } from '@/utility/debouce'

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
        className={`box-border resize-none text-lg overflow-hidden min-w-full p-4 flex items-center outline-none rounded-tremor-default transition duration-100 border shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis ${
          props.error === true ? 'border-red-500' : 'border-tremor-border'
        } ${
          props.error === true
            ? 'border-red-500'
            : 'dark:border-dark-tremor-border'
        }`}
        ref={textAreaRef}
        name={props.name}
        placeholder={props.placeholder}
        onChange={debounce(handleTextareaChange, 500)}
        defaultValue={props.defaultValue}
        maxLength={255}
      />
      <div className='flex justify-between'>
        <p
          className={`text-xs self-start ${
            props.error === true ? 'text-red-600' : 'text-transparent'
          }`}
        >
          {props.errorMessage}
        </p>
        <p className='text-xs self-end'>
          {characters}/{props.limit}
        </p>
      </div>
    </div>
  )
}
