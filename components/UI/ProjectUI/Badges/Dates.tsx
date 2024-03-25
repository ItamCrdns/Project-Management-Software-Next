import { Date } from './Date'
import { DateDivider } from './DateDivider'

const Dates: React.FC<{
  created?: string
  expectedDelivery?: string
  finalized?: string
}> = (props) => {
  const { created, expectedDelivery, finalized } = props

  return (
    <>
      <DateDivider />
      <div className='flex items-center justify-center gap-4'>
        {created !== undefined && (
          <>
            <Date date={created} timePoint='past' text='Created' />
          </>
        )}
        {expectedDelivery !== undefined && (
          <>
            <p className='select-none'>&middot;</p>
            <Date
              date={expectedDelivery}
              timePoint='future'
              text='To be delivered'
            />
          </>
        )}
        {finalized !== null && finalized !== undefined && (
          <>
            <p className='select-none'>&middot;</p>
            <Date date={finalized} timePoint='past' text='Finished' />
          </>
        )}
      </div>
    </>
  )
}

export { Dates }
