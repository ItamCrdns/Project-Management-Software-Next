export interface CreateNewClientProps {
  sendClientName: (clientName: string) => void
  newClientOpen: (status: boolean) => void
  companySelected: boolean
}
