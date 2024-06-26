export interface Option {
  value: number // ? Pretty much the key but too late to change it
  label: string
  info?: string
  picture?: string // * Optional: display pictures in the CustomSelect component
}

export const optionInitialState: Option = {
  value: 0,
  label: ''
}

export interface CustomSelectProps {
  // Basic properties
  options: Option[] // Options for the select
  disabled?: boolean // ? Will use it to disable the custom select based on a condition

  // Send the data to the parent state
  sendStateToParent: (value: Option) => void

  defaultValue?: string
  multiple?: boolean // ? If true, will allow multiple selections

  // Pagination properties
  isPaginated?: boolean // ? Sometimes, the options might be a lot, so we need to paginate it
  pageSize?: number // ? Dependant of isPaginated
  onPageChange?: (page: number) => void // ? Dependant of isPaginated

  // Display properties
  showPictures?: boolean // ? If true, will show pictures of the options
  showCloseButton?: boolean // ? If true, will show a close button at the bottom of the dropdown
  scrollable?: boolean // ? If true, will make the dropdown scrollable
  icon?: React.JSX.Element // ? Icon to display on the left of the select

  // Dropdown properties
  shouldShowDropdown?: boolean // * Only one options dropdown can be expanded at a given time
  onShowDropdown?: () => void
  closeDropdown: () => void

  // Entity properties
  defaultEntities?: Option[]

  // Options
  selectedOption?: Option | null
  selectedOptionsList?: Option[] | null

  // Warnings
  error?: boolean
  errorMessage?: string
}
