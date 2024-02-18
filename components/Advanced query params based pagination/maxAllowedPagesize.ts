// ? Defines the max allowed pagesize for the input field, only 100 entries are allowed

export const handleMaxAllowedPageSize = (
  e: React.ChangeEvent<HTMLInputElement>,
  maxPageSize: number
): number => {
  const valueFromInput = Number(e.target.value)
  if (valueFromInput > maxPageSize) {
    return maxPageSize
  }

  if (Number(e.target.value) === 0) {
    return 1
  }

  return valueFromInput
}
