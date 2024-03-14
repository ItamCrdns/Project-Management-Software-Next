import { Calendar } from '@/components/Data Header/svg/Calendar'
import { getRelativeTimeString } from '@/utility/relativeTime'
import ExpectedDeliveryDate from './ExpectedDeliveryDate'

const DatesBanner: React.FC<{
  created?: string
  expectedDelivery?: string
  finalized?: string
}> = (props) => {
  const { created, expectedDelivery, finalized } = props

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-center gap-2'>
        <p className='font-semibold'>Important dates</p>
        <Calendar />
      </div>
      <div className='p-8 space-y-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        {created !== undefined && (
          <p className='text-xs'>
            This project was created {getRelativeTimeString(created)}
          </p>
        )}
        {expectedDelivery !== undefined && (
          <div>
            <ExpectedDeliveryDate date={expectedDelivery} />
          </div>
        )}
        <div>
          {finalized !== null && finalized !== undefined && (
            <p className='text-xs'>
              This project was finalized {getRelativeTimeString(finalized)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export { DatesBanner }
