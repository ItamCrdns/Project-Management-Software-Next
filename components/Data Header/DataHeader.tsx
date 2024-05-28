'use client'
import { type DataHeaderProps } from '@/interfaces/props/DataHeaderProps'
import HeaderItem from './HeaderItem'
import { getHeaderItems } from './headerItems'
import { useGetSearchParams } from '../Filters/useGetSearchParams'

const DataHeader: React.FC<DataHeaderProps> = (props) => {
  const { pathname, searchParams } = useGetSearchParams()

  const style = {
    width: props.width
  }

  const headerItems = getHeaderItems(props)

  const { pushSearchParams } = props

  const headerItemsProps = {
    style,
    searchParams,
    pushSearchParams,
    currentPath: pathname
  }

  return (
    <header className='flex items-center justify-center h-[72px] rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      {headerItems.map((item, index) => (
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

export default DataHeader
