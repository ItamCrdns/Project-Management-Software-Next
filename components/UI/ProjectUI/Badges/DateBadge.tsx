'use client'
import { dateUtil } from '@/utility/dateUtil'
import { Badge } from '@tremor/react'

const DateBadge: React.FC<{
  date: string
  text: string
  textSize?: string
  showCustomColor: boolean
}> = (props) => {
  const { date, text, textSize, showCustomColor } = props

  const timeAgo = dateUtil(date)

  let customColor: string

  if (timeAgo.days === 0 && timeAgo.timePoint === 'future') {
    customColor = 'red'
  } else if (
    timeAgo.days <= 3 &&
    timeAgo.days > 0 &&
    timeAgo.timePoint === 'future'
  ) {
    customColor = 'orange'
  } else if (
    timeAgo.days <= 7 &&
    timeAgo.days > 3 &&
    timeAgo.timePoint === 'future'
  ) {
    customColor = 'yellow'
  } else if (
    timeAgo.days <= 14 &&
    timeAgo.days > 7 &&
    timeAgo.timePoint === 'future'
  ) {
    customColor = 'green'
  } else if (timeAgo.timePoint === 'past') {
    customColor = 'gray'
  } else {
    customColor = 'blue'
  }

  return (
    <Badge
      color={showCustomColor && customColor}
      tooltip={new Date(date).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
      })}
    >
      <p className={textSize ?? 'text-xs'}>
        {text + ' ' + timeAgo.text}
      </p>
    </Badge>
  )
}

export { DateBadge }
