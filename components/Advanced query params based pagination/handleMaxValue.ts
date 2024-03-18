export const handleMaxValue = (
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
