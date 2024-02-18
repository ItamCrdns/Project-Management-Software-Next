export interface LoggedInCardProps {
  optionsText: string
  entityName?: string // ? Only used by dashboard
  isDashboard?: boolean
  isPage?: boolean
  showPictures?: boolean
  showButton?: boolean // * If you dont want to show the button, just dont pass this prop
  // * Dont pass any of the button props below if you dont want to show the button
  buttonText?: string
  buttonHref?: string
}
