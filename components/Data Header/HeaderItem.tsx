import { type Order } from '@/context/Filter/filterInitialState'
import { type Style } from '@/interfaces/props/DataHeaderProps'
import { type ComponentType } from 'react'

// TODO: See if we can optimize this component
// TODO: CHECK IF THE ARROW IS AT THE CORRECT POSITION
// TODO: HeaderDescriptor its broken everywhere except in the dashboard and in the projects/client/[...client]/page.tsx [FIX IT!!!]

export interface HeaderItemProps {
  style: Style
  handleSortChange: (orderBy: string, sort: string) => void
  icon: ComponentType
  order: Order
  label: string
  sortValue: string | undefined
  searchParams: URLSearchParams
  dashboard: boolean
  pushSearchParams: boolean
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => {
  const Icon = props.icon
  const isSelected =
    (props.dashboard &&
      !props.pushSearchParams &&
      props.order.orderBy.toLowerCase() === props.sortValue?.toLowerCase()) ||
    props.searchParams?.get('orderby')?.toString() ===
      props.sortValue?.toLowerCase()

  return (
    <span
      className='flex gap-2 items-center justify-center'
      style={props.style}
      onClick={() => {
        props.handleSortChange(
          props.sortValue as string,
          isSelected
            ? props.searchParams.get('sort')?.toString() === 'ascending'
              ? 'descending'
              : 'ascending'
            : 'ascending'
        )
      }}
    >
      <Icon />
      <p
        className={`select-none cursor-pointer ${
          isSelected ? 'font-bold' : 'font-normal'
        }`}
      >
        {props.label}
      </p>
      {isSelected &&
        (props.order.sort === 'ascending' ||
        props.searchParams.get('sort')?.toString() === 'ascending'
          ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-5 h-5'
          >
            <path
              fillRule='evenodd'
              d='M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z'
              clipRule='evenodd'
            />
          </svg>
            )
          : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-5 h-5'
          >
            <path
              fillRule='evenodd'
              d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
              clipRule='evenodd'
            />
          </svg>
            ))}
    </span>
  )
}

export default HeaderItem
