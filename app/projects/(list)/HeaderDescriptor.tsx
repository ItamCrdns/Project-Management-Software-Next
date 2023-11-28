'use client'
import styles from './projectslist.module.css'
import {
  type HeaderDescriptorProps,
  type Style
} from '@/interfaces/props/HeaderDescriptorProps'
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

const HeaderDescriptor: React.FC<HeaderDescriptorProps> = (props) => {
  const pathname = usePathname()
  const router = useRouter()

  const searchParams = setInitialSearchParams()

  const [order, setOrder] = useState<Order>(orderInitialState)

  const handleSortChange = (sortValue: string, sort: string): void => {
    // TODO: Fix dashboard state pagination
    if (props.dashboard) {
      setOrder((prevState) => ({
        ...prevState,
        orderBy: sortValue as OrderBy,
        sort:
          prevState.sort === 'ascending' && prevState.orderBy === sortValue
            ? 'descending'
            : 'ascending'
      }))
    } else {
      searchParams.set('orderby', sortValue.toLowerCase())
      searchParams.set('sort', sort.toLowerCase())

      if (searchParams !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
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

  // TODO: Fix initial render problem that will render that we are always at the "Created" column.
  // TODO: Fix slow state when clicking a different column and you can see two columns being highlighted at the same time.
  return (
    <header className={styles.descriptor}>
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        icon="signature"
        order={order}
        label="Name"
        sortValue={props.sortValues.name}
        searchParams={searchParams}
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        icon="person"
        order={order}
        label="Creator"
        sortValue={props.sortValues.creator}
        searchParams={searchParams}
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        icon="group"
        order={order}
        label="Team"
        sortValue={props.sortValues.team}
        searchParams={searchParams}
      />
      {props.entity === 'projects' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          icon="priority_high"
          order={order}
          label="Priority"
          sortValue={props.sortValues.priority}
          searchParams={searchParams}
        />
      )}
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        icon="calendar_month"
        order={order}
        label="Created"
        sortValue={props.sortValues.created}
        searchParams={searchParams}
      />
      {props.dashboard && props.entity === 'projects' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          icon="store"
          order={order}
          label="Company"
          sortValue={props.sortValues.company}
          searchParams={searchParams}
        />
      )}
      {props.dashboard && props.entity === 'tasks' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          icon="emoji_objects"
          order={order}
          label="Project"
          sortValue={props.sortValues.project}
          searchParams={searchParams}
        />
      )}
      {props.dashboard && props.entity === 'issues' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          icon="note_stack"
          order={order}
          label="Task"
          sortValue={props.sortValues.task}
          searchParams={searchParams}
        />
      )}
    </header>
  )
}

export default HeaderDescriptor
