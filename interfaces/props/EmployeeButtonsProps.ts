import { type Employee } from '../employee'

// * Props for the buttons in the employee list in the new project creation

export interface ButtonsProps {
  selectedEmployees: Employee[] | null
  handleSubmit: () => void
  handleGoBack: () => void
}
