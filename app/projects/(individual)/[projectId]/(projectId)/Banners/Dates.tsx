import { Calendar } from '@/svg/Calendar'
import { Date } from './Badges/Date'

const Dates: React.FC<{
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
      <div className='p-8 space-y-4 flex flex-col items-center rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        {created !== undefined && (
          <Date date={created} timePoint='past' text='Created' />
        )}
        {expectedDelivery !== undefined && (
          <Date
            date={expectedDelivery}
            timePoint='future'
            text='To be delivered'
          />
        )}
        {finalized !== null && finalized !== undefined && (
          <Date date={finalized} timePoint='past' text='Finished' />
        )}
      </div>
    </div>
  )
}

export { Dates }
