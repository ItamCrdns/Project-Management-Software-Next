export interface NewClientFormProps {
  closeForm: () => void
  sendClientName: (clientName: string) => void
  defaultInputValue: string
  buttonText: string
}
