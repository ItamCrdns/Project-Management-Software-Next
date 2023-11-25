export interface Option {
  value: number // ? Pretty much the key but too late to change it
  label: string
  info?: string
  picture?: string // * Optional: display pictures in the CustomSelect component
}

export interface CustomSelectProps {
  options: Option[]
  text: string
  onSelect: (value: Option | Option[]) => void // * Can handle multiple selections too (see multiple prop)
  defaultValue: string | string[] // * Will also hold a string of images. Please use together with showPictures
  optionsWidth?: string
  disabled?: boolean // ? Will use it to disable the custom select based on a condition
  clearSelectedOption?: () => void // ? Optional callback function that will clear the selected option in the parent component
  showReset?: boolean // ? Will use it to show the reset button based on a condition
  isPaginated?: boolean // ? Sometimes, the options might be a lot, so we need to paginate it
  pageSize?: number // ? Dependant of isPaginated
  onPageChange?: (page: number) => void // ? Dependant of isPaginated
  // * If using showPictures, make sure to set a picture for each option
  showPictures?: boolean // ? If true, will switch to an alternate listing with pictures
  multiple?: boolean // ? If true, will allow multiple selections
}
