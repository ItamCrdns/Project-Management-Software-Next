import type React from 'react'

export const useSubmitRef = (formRef: React.RefObject<HTMLFormElement>) => (e: React.SyntheticEvent) => {
  e.preventDefault()
  if (formRef.current !== null && formRef.current !== undefined) {
    formRef.current.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    )
  }
}
