export interface ClientSelectionProps {
  clientName: string
  disabled: boolean
  searchParams: { clientId: string }
  error?: boolean
  errorMessage?: string
}
