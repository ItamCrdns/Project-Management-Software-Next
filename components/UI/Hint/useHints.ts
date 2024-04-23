'use client'
import { useState } from 'react'

interface Hints {
  showHint: boolean
  closeHint: () => void
}

// pass a different boolean wheter instance you are at. example, if you are at tasks, pass hideTasksHint from localstorage config

export const useHints = (shouldWeShowHint: boolean): Hints => {
  // Hints are shown once and dead after they're closed. If dismissed, they wont show again for that session
  // But if user clicks "Don't show this again", it wont show again unless we delete config cookie

  const [showHint, setShowHint] = useState<boolean>(shouldWeShowHint)

  const closeHint = (): void => {
    setShowHint(false)
  }

  return {
    showHint,
    closeHint
  }
}
