export interface CharacterCountProps {
  name: string
  placeholder: string
  limit: number
  onSubmit: (value: string) => void
  defaultValue: string
  defaultCharacterCount: number
  error?: boolean
  errorMessage?: string
}
