'use client'
import { type TimePoints, dateUtil } from '@/utility/dateUtil'
import { Badge } from '@tremor/react'

const Date: React.FC<{ date: string, timePoint: TimePoints, text: string }> = (props) => {
  const { date, timePoint, text } = props

  return (
    <Badge>
      <p className='text-xs'>
        {text + ' ' + dateUtil(date, timePoint).toLowerCase()}
      </p>
    </Badge>
  )
}

export { Date }
