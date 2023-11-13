'use client'
import { type IFilter } from '@/interfaces/props/context props/IFilter'
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

const HeaderDescriptor: React.FC<HeaderDescriptorProps> = (props) => {
  // ? activeSort and ascending are to visually represent how we are currently sorting the entities
  const [activeSort, setActiveSort] = useState<string>('')
  const [order, setOrder] = useState<Order>(orderInitialState)

  const handleSortChange = (e: React.MouseEvent<HTMLSpanElement>): void => {
    if (e.target instanceof HTMLParagraphElement) {
      const value = e.target.innerText
      const newFilter = { sortBy: value, order }
      props.updateFilter !== undefined &&
        props.updateFilter(props.entity as keyof IFilter, newFilter)

      setActiveSort(value)
      setOrder({
        column: value,
        order:
          order.order === 'ascending' && order.column === value
            ? 'descending'
            : 'ascending'
      })
    }
  }

  const style: Style = {
    width: props.width
  }

  return (
    <header className={styles.descriptor}>
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={activeSort}
        icon="signature"
        label="Name"
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={activeSort}
        icon="person"
        label="Creators"
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={activeSort}
        icon="group"
        label="Team"
      />
      {props.entity === 'projects' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={activeSort}
          icon="priority_high"
          label="Priority"
        />
      )}
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={activeSort}
        icon="calendar_month"
        label="Created"
      />
      {props.dashboard && props.entity === 'projects' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={activeSort}
          icon="store"
          label="Company"
        />
      )}
      {props.dashboard && props.entity === 'tasks' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={activeSort}
          icon="emoji_objects"
          label="Project"
        />
      )}
      {props.dashboard && props.entity === 'issues' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={activeSort}
          icon="note_stack"
          label="Task"
        />
      )}
    </header>
  )
}

export default HeaderDescriptor
