import { useSubmitRef } from '@/utility/formSubmitRef'
import { useRef, useState } from 'react'

interface FormState {
  formRef: React.MutableRefObject<null>
  message: Message
  handleSetMessage: (response: Message) => void
  btnClicked: boolean
  handleSetBtnClicked: (value: boolean) => void
  handleClick: (e: React.SyntheticEvent) => void
}

export interface Message {
  type: string
  message: string
}

export const useFormState = (): FormState => {
  const formRef = useRef(null)

  const [message, setMessage] = useState<Message>({
    type: '',
    message: ''
  })

  const [btnClicked, setBtnClicked] = useState<boolean>(false)

  const handleClick = !btnClicked ? useSubmitRef(formRef) : () => {}

  const handleSetMessage = (response: Message): void => {
    setMessage(response)
  }

  const handleSetBtnClicked = (value: boolean): void => {
    setBtnClicked(value)
  }

  return {
    formRef,
    message,
    handleSetMessage,
    btnClicked,
    handleSetBtnClicked,
    handleClick
  }
}
