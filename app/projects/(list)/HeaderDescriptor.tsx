'use client'
import { type OrderBy } from '@/interfaces/props/context props/IFilter'
import styles from './projectslist.module.css'
import {
  type HeaderDescriptorProps,
  type Style
} from '@/interfaces/props/HeaderDescriptorProps'
import HeaderItem from './HeaderItem'
import { useState } from 'react'
import {
  orderInitialState,
  type Order
} from '@/context/Filter/filterInitialState'
import useOrderUpdater, { type OrderUpdaterProps } from './useOrderUpdater'
import useFilterSetterAndUrlPusher, {
  type OrderSetterProps
} from './useFilterSetterAndUrlPusher'

const HeaderDescriptor: React.FC<HeaderDescriptorProps> = (props) => {
  const [order, setOrder] = useState<Order>(orderInitialState)

  const handleSortChange = (sortValue: string): void => {
    setOrder((prevOrder) => ({
      column: sortValue as OrderBy,
      order:
        prevOrder.order === 'ascending' && prevOrder.column === sortValue
          ? 'descending'
          : 'ascending'
    }))
  }

  const updateOrder = (newOrder: Order): void => {
    setOrder(newOrder)
  }

  const orderUpdater: OrderUpdaterProps = {
    searchParams: props.searchParams,
    updateOrder
  }

  useOrderUpdater(orderUpdater)

  const orderSetter: OrderSetterProps = {
    order,
    searchParams: props.searchParams,
    url: props.url,
    updateFilter: props.updateFilter,
    entity: props.entity
  }

  useFilterSetterAndUrlPusher(orderSetter)

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
        searchParams={props.searchParams}
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={order.column}
        icon="person"
        label="Creator"
        sortValue={props.sortValues.creator}
        searchParams={props.searchParams}
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={order.column}
        icon="group"
        label="Team"
        sortValue={props.sortValues.team}
        searchParams={props.searchParams}
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
          searchParams={props.searchParams}
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
        searchParams={props.searchParams}
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
          searchParams={props.searchParams}
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
          searchParams={props.searchParams}
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
          sortValue={props.sortValues.task}
          searchParams={props.searchParams}
        />
      )}
    </header>
  )
}

export default HeaderDescriptor
