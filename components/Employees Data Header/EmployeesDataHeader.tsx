'use client'
import HeaderItem from '../Data Header/HeaderItem'
import { employeeHeaderItems } from './employeeHeaderItems'
import { useGetSearchParams } from '../Filters/useGetSearchParams'

const EmployeesDataHeader: React.FC = () => {
  const { pathname, searchParams } = useGetSearchParams()

  const headerItemsProps = {
    style: { width: '300px' },
    handleSortChange: () => {
      /* Placeholder function for handling sort change */
    },
    order: {
      orderBy: 'Created',
      sort: 'descending'
    }, // placeholders
    searchParams,
    dashboard: false,
    pushSearchParams: true,
    currentPath: pathname
  }
  return (
    <header className='flex items-center justify-center py-0 mb-8'>
      {employeeHeaderItems.map((item, index) => (
        <HeaderItem
          key={index}
          icon={item.icon}
          label={item.label}
          sortValue={item.sortValue}
          {...headerItemsProps}
        />
      ))}
    </header>
  )
}

export { EmployeesDataHeader }
