'use client'
import { Badge } from '@tremor/react'

const BadgeComponent: React.FC<{
  content: string
  tooltip?: string
  color?: string
}> = (props) => {
  const { content, tooltip, color } = props

  return <Badge tooltip={tooltip} color={color}>{content}</Badge>
}

export { BadgeComponent }
