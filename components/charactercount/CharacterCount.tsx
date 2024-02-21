import { useRef, useState } from 'react'

// import styles from './charactercount.module.css'

/**
 * Props for the InputAndCharacterCount component
 */
interface CharacterCountProps {
  name: string
  placeholder: string
  limit: number
  onSubmit: (value: string) => void
  defaultValue: string
}

/**
 * A component that renders an input field with a character count
 * @param name - The name of the input field
 * @param placeholder - The placeholder text for the input field
 * @param limit - The maximum number of characters allowed in the input field
 * @param onSubmit - A callback function that is called when the input field loses focus
 * @param defaultValue - default value that will be useful when clicking the "go back " btn
 */
export const InputAndCharacterCount: React.FunctionComponent<
CharacterCountProps
> = ({ name, placeholder, limit, onSubmit, defaultValue }) => {
  const [characters, setCharacters] = useState<string>('0')

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  /**
   * Event handler for input blur events, onSubmit its a callback function used to send the value of the input or textarea to where we need it
   * @param e - The blur event
   */
  const handleTextareaBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    onSubmit(e.target.value)
  }

  /**
   * Event handler for textarea change events, this is different for textareas since it needs to handle resize too.
   * @param e - The change event
   */
  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCharacters(e.target.value.length.toString())
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
