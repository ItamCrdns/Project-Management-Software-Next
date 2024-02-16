export interface Option {
  value: number // ? Pretty much the key but too late to change it
  label: string
  info?: string
  picture?: string // * Optional: display pictures in the CustomSelect component
}

export interface CustomSelectProps {
  // Basic properties
  options: Option[] // Options for the select
  text: string // Text to display
  disabled?: boolean // ? Will use it to disable the custom select based on a condition

  // Selection properties
  onSelect: (value: Option | Option[]) => void // * Can handle multiple selections too (see multiple prop)
  defaultValue: string | string[] // * Will also hold a string of images. Please use together with showPictures
  multiple?: boolean // ? If true, will allow multiple selections

  // Clear selection properties
  clearOptions?: () => void

  // Pagination properties
  isPaginated?: boolean // ? Sometimes, the options might be a lot, so we need to paginate it
  pageSize?: number // ? Dependant of isPaginated
  onPageChange?: (page: number) => void // ? Dependant of isPaginated

  // Display properties
  showPictures?: boolean // ? If true, will show pictures of the options
  showReset?: boolean // ? Will use it to show the reset button based on a condition
  showCloseButton?: boolean // ? If true, will show a close button at the bottom of the dropdown

  // Dropdown properties
  shouldShowDropdown?: boolean // * Only one options dropdown can be expanded at a given time
  onShowDropdown?: () => void
  closeDropdown: () => void

  // Entity properties
  defaultEntities?: Option[] | Option
}
