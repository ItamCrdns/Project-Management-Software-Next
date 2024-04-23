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
      className='flex justify-between items-center'
    >
      <p>{text}</p>
      <div className='flex gap-8 box-content'>
        <button
          onClick={dismissCallback}
          className='hover:rounded-md hover:bg-black hover:bg-opacity-5 px-4 py-2'
        >
          Dismiss
        </button>
        <button
          onClick={dontShowCallback}
          className='hover:bg-red-200 dark:hover:bg-red-950 rounded-md bg-black bg-opacity-5 px-4 py-2'
        >
          Don&apos;t show this again
        </button>
      </div>
    </Card>
  )
}

export default Hint
