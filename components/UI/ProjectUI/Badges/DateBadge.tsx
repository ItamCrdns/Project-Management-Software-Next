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

  const newDate = new Date(date)
  const time = newDate.toUTCString()

  return (
    <Badge color={showCustomColor && customColor} tooltip={time}>
      <p className={textSize ?? 'text-xs'}>
        {text + ' ' + timeAgo.text.toLowerCase()}
      </p>
    </Badge>
  )
}

export { DateBadge }
