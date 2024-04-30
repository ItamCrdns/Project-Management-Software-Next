'use client'
import { Card } from '@tremor/react'

interface HintProps {
  text: string
  showHint: boolean
  dismissCallback: () => void
  dontShowCallback: () => void
}

const Hint: React.FC<HintProps> = (props) => {
  const { text, showHint, dismissCallback, dontShowCallback } = props

  if (!showHint) return null

  return (
    <Card
      decoration='top'
      decorationColor='indigo'
      className='flex justify-between items-center h-2'
    >
      <p>{text}</p>
      <div className='flex gap-8 box-content'>
        <button
          onClick={dismissCallback}
          className='opacity-50 hover:opacity-100 hover:rounded-md hover:bg-black hover:bg-opacity-25 px-4 py-1'
        >
          Dismiss
        </button>
        <button
          onClick={dontShowCallback}
          className='opacity-50 hover:opacity-100 hover:rounded-md hover:bg-black hover:bg-opacity-25 px-4 py-1'
        >
          Don&apos;t show this again
        </button>
      </div>
    </Card>
  )
}

export default Hint
