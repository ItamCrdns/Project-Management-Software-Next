import { type Option } from '@/interfaces/props/CustomSelectProps'
import { useState } from 'react'

interface Filters {
  activeDropdown: string
  selectedPriority: Option | null
  handleSetActiveDropdown: (dropdown: string) => void
  handleSetSelectedPriority: (priority: Option | Option[] | null) => void
  handleClearSelectedPriority: () => void
  handleClearActiveDropdown: () => void
}

export const useFilters = (): Filters => {
  const [activeDropdown, setActiveDropdown] = useState<string>('')

  const [selectedPriority, setSelectedPriority] = useState<Option | null>(null)

  const handleSetActiveDropdown = (dropdown: string): void => {
    if (dropdown === activeDropdown) {
      setActiveDropdown('')
      return
    }

    setActiveDropdown(dropdown)
  }

  const handleSetSelectedPriority = (priority: Option | Option[] | null): void => {
    if (!Array.isArray(priority) && priority !== null) {
      setSelectedPriority(priority)
    }
  }

  const handleClearSelectedPriority = (): void => {
    setSelectedPriority(null)
  }

  const handleClearActiveDropdown = (): void => {
    setActiveDropdown('')
  }

  return {
    activeDropdown,
    selectedPriority,
    handleSetActiveDropdown,
    handleSetSelectedPriority,
    handleClearSelectedPriority,
    handleClearActiveDropdown
  }
}
