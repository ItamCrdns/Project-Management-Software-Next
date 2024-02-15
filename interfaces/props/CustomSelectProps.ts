import { type Employee } from '../employee'

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
  optionsWidth?: string // Width of the options dropdown
  textAlignment?: string // Alignment of the text
  disabled?: boolean // ? Will use it to disable the custom select based on a condition

  // Selection properties
  onSelect: (value: Option | Option[]) => void // * Can handle multiple selections too (see multiple prop)
  defaultValue: string | string[] // * Will also hold a string of images. Please use together with showPictures
  defaultSelectedOptions?: number | number[] // ? Will be used to set the default selected options
  multiple?: boolean // ? If true, will allow multiple selections

  // Clear selection properties
  clearSelectedOption?: () => void // ? Optional callback function that will clear the selected option in the parent component
  clearSelectedOptionsFunction?: () => void // ? Same purpose as above but made to come from the parent component as a function
  clearSelectedOptionBoolean?: boolean // ? Same purpose as above but made to come from the parent component as a boolean
  clearSelectedOptions?: boolean // ? Optional callback function that will clear the selected options in the parent component

  // Pagination properties
  isPaginated?: boolean // ? Sometimes, the options might be a lot, so we need to paginate it
  pageSize?: number // ? Dependant of isPaginated
  onPageChange?: (page: number) => void // ? Dependant of isPaginated

  // Display properties
  showPictures?: boolean // ? If true, will switch to an alternate listing with pictures
  showReset?: boolean // ? Will use it to show the reset button based on a condition
  showCloseButton?: boolean // ? If true, will show a close button at the bottom of the dropdown

  // Dropdown properties
  shouldShowDropdown?: boolean // * Only one options dropdown can be expanded at a given time
  onShowDropdown?: () => void
  resetActiveDropdown: () => void

  // Entity properties
  defaultEntities?: Employee[] | undefined // ! Not generic at all. Will only work for Employee[] for now
}
