// ? Used to select the input numbeer when clicked
export const handleInputClick = (e: React.MouseEvent<HTMLInputElement>): void => {
  const target = e.target as HTMLInputElement
  target.select()
}
