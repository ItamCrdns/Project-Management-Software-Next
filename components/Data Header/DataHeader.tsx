'use client'
import styles from './data-header.module.css'
import {
  type DataHeaderProps,
  type Style
} from '@/interfaces/props/DataHeaderProps'
import HeaderItem from './HeaderItem'
import { setInitialSearchParams } from '@/components/Filters/setInitialSearchParams'
import { usePathname, useRouter } from 'next/navigation'
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

  const searchParams = setInitialSearchParams()

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

  // TODO: Fix initial render problem that will render that we are always at the "Created" column.
  // TODO: Fix slow state when clicking a different column and you can see two columns being highlighted at the same time.
  return (
    <header className={styles.descriptor}>
      {headerItems.map((item, index) => (
        <HeaderItem
          key={index}
          style={style}
          handleSortChange={handleSortChange}
          icon={item.icon}
          order={order}
          label={item.label}
          sortValue={item.sortValue}
          searchParams={searchParams}
          dashboard={props.dashboard}
          pushSearchParams={props.pushSearchParams}
        />
      ))}
    </header>
  )
}

export default DataHeader
