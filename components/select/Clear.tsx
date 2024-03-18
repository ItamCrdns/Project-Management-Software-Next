import { Badge } from '@tremor/react'

const ClearSelect: React.FC<{ callback: () => void }> = (props) => {
  const { callback } = props

  return (
    <Badge color='orange' className='cursor-pointer' onClick={callback}>
      Clear
    </Badge>
  )
}

export { ClearSelect }
