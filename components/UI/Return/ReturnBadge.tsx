import { Return } from '@/svg/Return'
import { Badge } from '@tremor/react'

const ReturnBadge: React.FC<{ callback: (...args: any[]) => void }> = (
  props
) => {
  const { callback } = props

  return (
    <Badge
      icon={Return}
      className='flex self-end gap-2 items-cente -m-2 mb-4 cursor-pointer'
      onClick={callback}
    >
      <p>Return</p>
    </Badge>
  )
}

export { ReturnBadge }
