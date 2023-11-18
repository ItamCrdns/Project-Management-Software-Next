// ? Defines the max allowed pagesize for the input field, only 100 entries are allowed

export const handleMaxAllowedPageSize = (
  e: React.ChangeEvent<HTMLInputElement>,
  maxPageSize: number
): void => {
  if (parseInt(e.target.value) > maxPageSize) {
    e.target.value = maxPageSize.toString()
    e.target.dispatchEvent(new Event('input', { bubbles: true }))
  }

  if (parseInt(e.target.value) === 0) {
    e.target.value = '1'
    e.target.dispatchEvent(new Event('input', { bubbles: true }))
  }
}
