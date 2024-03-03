// * Props shared by both SelectPriority and SelectAuthor components

export interface ISharedProps {
  // * Can we both. To handle selected authors (array of numbers) and selected priority (number)
  // * Use type assertion when passing them as props
  defaultValue?: string
  shouldShowDropdown: boolean
  onShowDropdown: () => void
  closeDropdown: () => void
  clearFilters: () => void
}

export interface IParams {
  client?: [string, string]
}
