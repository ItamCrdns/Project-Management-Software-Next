'use client'
import {
  type DataHeaderProps,
  type Style
} from '@/interfaces/props/DataHeaderProps'
import HeaderItem from './HeaderItem'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  type OrderBy,
  type IFilterProperties,
  type IFilter
} from '@/interfaces/props/context props/IFilter'
import { useEffect, useState } from 'react'
import {
  orderInitialState,
  type Order
} from '@/context/Filter/filterInitialState'
import { getHeaderItems } from './headerItems'

const DataHeader: React.FC<DataHeaderProps> = (props) => {
  const pathname = usePathname()
  const router = useRouter()

  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

  const [order, setOrder] = useState<Order>(orderInitialState)

  const handleSortChange = (sortValue: string, sort: string): void => {
    // TODO: Fix dashboard state pagination
    if (props.pushSearchParams) {
      searchParams.set('orderby', sortValue.toLowerCase())
      searchParams.set('sort', sort.toLowerCase())

      if (searchParams !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    } else {
      setOrder((prevState) => ({
        ...prevState,
        orderBy: sortValue as OrderBy,
        sort:
          prevState.sort === 'ascending' && prevState.orderBy === sortValue
            ? 'descending'
            : 'ascending'
      }))
    }
  }

  useEffect(() => {
    // * Its hard to see, but if dont use useEffect hook and call this updateFilter right after setOrder in handleSortChange, the state will be one step behind.
    if (props.dashboard) {
      const newFilter: IFilterProperties = {
        orderBy: order.orderBy,
        sort: order.sort
      }

      props.updateFilter?.(props.entity as keyof IFilter, newFilter)
    }
  }, [order])

  const style: Style = {
    width: props.width
  }

  const headerItems = getHeaderItems(props)

  const { dashboard, pushSearchParams } = props

  const headerItemsProps = {
    style,
    handleSortChange,
    order,
    searchParams,
    dashboard,
    pushSearchParams
  }

  // TODO: Fix initial render problem that will render that we are always at the "Created" column.
  // TODO: Fix slow state when clicking a different column and you can see two columns being highlighted at the same time.
  return (
    <header className='flex items-center justify-center py-0 my-8'>
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
