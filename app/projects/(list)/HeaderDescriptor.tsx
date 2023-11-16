'use client'
import {
  type IFilterProperties,
  type IFilter,
  type OrderBy
} from '@/interfaces/props/context props/IFilter'
import styles from './projectslist.module.css'
import {
  type HeaderDescriptorProps,
  type Style
} from '@/interfaces/props/HeaderDescriptorProps'
import HeaderItem from './HeaderItem'
import { useEffect, useState } from 'react'
import {
  orderInitialState,
  type Order
} from '@/context/Filter/filterInitialState'
import { useRouter } from 'next/navigation'
import checkAndSetOrderBy from '@/utility/checkAndSetOrderBy'
import checkAndSetSort from '@/utility/checkAndSetSort'

const HeaderDescriptor: React.FC<HeaderDescriptorProps> = (props) => {
  const [order, setOrder] = useState<Order>(orderInitialState)

  const router = useRouter()

  const handleSortChange = (sortValue: string): void => {
    setOrder((prevOrder) => ({
      column: sortValue as OrderBy,
      order:
        prevOrder.order === 'ascending' && prevOrder.column === sortValue
          ? 'descending'
          : 'ascending'
    }))
  }

  useEffect(() => {
    if (props.searchParams !== undefined) {
      if (
        props.searchParams.orderby !== undefined ||
        props.searchParams.sort !== undefined
      ) {
        const paramsOrderBy = props.searchParams.orderby.toLowerCase()
        const verifiedOrderBy = checkAndSetOrderBy(paramsOrderBy)
        const paramsSort = props.searchParams.sort.toLowerCase()
        const verifiedSort = checkAndSetSort(paramsSort)

        const newOrder: Order = {
          column: verifiedOrderBy ?? 'created',
          order: verifiedSort ?? 'descending'
        }

        setOrder(newOrder)
      }
    }
  }, [])

  useEffect(() => {
    const newFilter: IFilterProperties = {
      orderBy: order.column,
      sort: order.order
    }

    if (props.searchParams !== undefined) {
      const newFilterSearchParams: IFilterProperties = {
        ...newFilter,
        page: props.searchParams?.page ?? '1' // ? Always get it from the searchParams. This component does not change the page.
      }

      const queryParams = new URLSearchParams(newFilterSearchParams as string)
        .toString()
        .toLowerCase()

      const url = `/projects/client/${props.clientId}/${props.clientName}/?${queryParams}`
      router.push(url)
    }

    props.updateFilter !== undefined &&
      props.updateFilter(props.entity as keyof IFilter, newFilter)
  }, [order, props.searchParams])

  const style: Style = {
    width: props.width
  }

  return (
    <header className={styles.descriptor}>
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={order.column}
        icon="signature"
        label="Name"
        sortValue={props.sortValues.name}
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={order.column}
        icon="person"
        label="Creator"
        sortValue={props.sortValues.creator}
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={order.column}
        icon="group"
        label="Team"
        sortValue={props.sortValues.team}
      />
      {props.entity === 'projects' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={order.column}
          icon="priority_high"
          label="Priority"
          sortValue={props.sortValues.priority}
        />
      )}
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={order.column}
        icon="calendar_month"
        label="Created"
        sortValue={props.sortValues.created}
      />
      {props.dashboard && props.entity === 'projects' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={order.column}
          icon="store"
          label="Company"
          sortValue={props.sortValues.company}
        />
      )}
      {props.dashboard && props.entity === 'tasks' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={order.column}
          icon="emoji_objects"
          label="Project"
          sortValue={props.sortValues.project}
        />
      )}
      {props.dashboard && props.entity === 'issues' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={order.column}
          icon="note_stack"
          label="Task"
          sortValue="Task"
        />
      )}
    </header>
  )
}

export default HeaderDescriptor
