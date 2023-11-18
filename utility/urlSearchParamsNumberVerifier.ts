/**
 * Verifies and sanitizes a number for URL search parameters.
 * @param number - The number to be verified.
 * @returns The sanitized number as a string.
 */
const urlSearchParamsNumberVerifier = (number: string): string => {
  const regex = number.replace(/\D/g, '')
  console.log(regex)
  if (regex === '') return '1'
  return parseInt(regex) > 2147483647 ? '2147483647' : regex
}

export default urlSearchParamsNumberVerifier
