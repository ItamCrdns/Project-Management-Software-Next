import { useState } from 'react'

interface CardVosibility {
  showCard: boolean
  handleShowCard: () => void
  handleHideCard: () => void
}

const useCardVisibility = (): CardVosibility => {
  const [showCard, setShowCard] = useState<boolean>(false)

  const handleShowCard = (): void => {
    setShowCard(true)
  }

  const handleHideCard = (): void => {
    setShowCard(false)
  }
  return { showCard, handleShowCard, handleHideCard }
}

export default useCardVisibility
