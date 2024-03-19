import { useState } from 'react'

interface Warnings {
  warnings: Array<{ message: string, field: string }>
  handleSetWarning: (message: string, field: string) => void
  handleFilterWarning: (field: string) => void
}

export const useWarnings = (): Warnings => {
  const [warnings, setWarnings] = useState<
  Array<{ message: string, field: string }>
  >([])

  const handleSetWarning = (message: string, field: string): void => {
    setWarnings((prevWarnings) => {
      if (prevWarnings.some((w) => w.field === field)) {
        return prevWarnings
      }
      return [
        ...prevWarnings,
        {
          message,
          field
        }
      ]
    })
  }

  const handleFilterWarning = (field: string): void => {
    setWarnings((prevWarnings) => {
      return prevWarnings.filter((w) => w.field !== field)
    })
  }

  return {
    warnings,
    handleSetWarning,
    handleFilterWarning
  }
}
