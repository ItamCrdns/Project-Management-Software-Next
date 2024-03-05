import EntityDashboardOptions from '../Header title/_dashboard/EntityDashboardOptions'
import { useRef } from 'react'
import closeOnOutsideClick from '@/utility/closeOnOutsideClick'

interface FiltersProps {
  entityName?: string
  isDashboard?: boolean // ? This will use state based filtering. Good for the dashboard ("/dashboard")
  showPictures?: boolean
  close: () => void
}

// ! Might remove this component
const Filters: React.FC<FiltersProps> = (props) => {
  const { entityName, isDashboard } = props

  const ref = useRef<HTMLDivElement>(null)
  closeOnOutsideClick({ ref, closeThis: props.close })

  return (
    <div
      className='absolute z-50 top-8 right-0 flex items-center justify-center flex-col p-4 rounded-md gap-4 min-w-80 shadow-md bg-theming-white100 dark:bg-theming-dark300'
      ref={ref}
    >
      <p className='select-text'>Filters</p>
      {isDashboard === true && entityName !== undefined && (
        <EntityDashboardOptions entityName={entityName} />
      )}
    </div>
  )
}

export default Filters
