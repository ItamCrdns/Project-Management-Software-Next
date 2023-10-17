export const useSubmitRef = (formRef: React.RefObject<HTMLFormElement>) => (e: React.SyntheticEvent) => {
  if (e !== null && e !== undefined) {
    e.preventDefault()
  }

  if (formRef.current !== null && formRef.current !== undefined) {
    formRef.current.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    )
  }
}
