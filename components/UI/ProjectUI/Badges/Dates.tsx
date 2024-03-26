import { DateBadge } from './DateBadge'
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
        {created !== undefined && created !== null && (
          <>
            <DateBadge
              date={created}
              text='Created'
              showCustomColor={false}
            />
          </>
        )}
        {expectedDelivery !== undefined && expectedDelivery !== null && (
          <>
            <p className='select-none'>&middot;</p>
            <DateBadge
              date={expectedDelivery}
              text='To be delivered'
              showCustomColor={true}
            />
          </>
        )}
        {finalized !== undefined && finalized !== null && (
          <>
            <p className='select-none'>&middot;</p>
            <DateBadge
              date={finalized}
              text='Finished'
              showCustomColor={true}
            />
          </>
        )}
      </div>
    </>
  )
}

export { Dates }
