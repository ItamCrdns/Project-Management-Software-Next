import React, { useRef, useState } from 'react'

import styles from './charactercount.module.css'

interface CharacterCountProps {
  name: string
  placeholder: string
  limit: number
  onSubmit: (value: string) => void
}

/**
 * Props for the InputAndCharacterCount component
 */
interface CharacterCountProps {
  name: string
  placeholder: string
  limit: number
  onSubmit: (value: string) => void
}

/**
 * A component that renders an input field with a character count
 * @param name - The name of the input field
 * @param placeholder - The placeholder text for the input field
 * @param limit - The maximum number of characters allowed in the input field
 * @param onSubmit - A callback function that is called when the input field loses focus
 */
export const InputAndCharacterCount: React.FunctionComponent<
CharacterCountProps
> = ({ name, placeholder, limit, onSubmit }) => {
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
    <div className={styles.inputwrapper}>
      <textarea
        ref={textAreaRef}
        name={name}
        placeholder={placeholder}
        onChange={handleTextareaChange}
        onBlur={handleTextareaBlur}
        maxLength={255}
      />
      <p>
        {characters}/{limit}
      </p>
    </div>
  )
}
