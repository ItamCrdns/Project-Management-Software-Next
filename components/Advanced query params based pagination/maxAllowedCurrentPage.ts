// ? Defines the max allowed current page for the second input field in the pagination component. The max allowed current page its always equal to the amount of total pages

export const handleMaxAllowedCurrentPage = (
  e: React.ChangeEvent<HTMLInputElement>,
  totalPages: number
): void => {
  if (parseInt(e.target.value) > totalPages) {
    e.target.value = totalPages.toString()
    e.target.dispatchEvent(new Event('input', { bubbles: true }))
  }

  if (parseInt(e.target.value) === 0) {
    e.target.value = '1'
    e.target.dispatchEvent(new Event('input', { bubbles: true }))
  }
}
