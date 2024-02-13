import { type Order } from '@/context/Filter/filterInitialState'
import { type Style } from '@/interfaces/props/DataHeaderProps'

// TODO: See if we can optimize this component
// TODO: CHECK IF THE ARROW IS AT THE CORRECT POSITION
// TODO: HeaderDescriptor its broken everywhere except in the dashboard and in the projects/client/[...client]/page.tsx [FIX IT!!!]

interface HeaderItemProps {
  style: Style
  handleSortChange: (orderBy: string, sort: string) => void
  icon: string
  order: Order
  label: string
  sortValue: string | undefined
  searchParams: URLSearchParams
  dashboard: boolean
  pushSearchParams: boolean
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => {
  const isSelected =
    (props.dashboard &&
      !props.pushSearchParams &&
      props.order.orderBy.toLowerCase() === props.sortValue?.toLowerCase()) ||
    props.searchParams?.get('orderby')?.toString() ===
      props.sortValue?.toLowerCase()

  return (
    <span
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
      <span className='material-symbols-outlined'>{props.icon}</span>
      <p style={{ fontWeight: isSelected ? 700 : 400 }}>{props.label}</p>
      {isSelected && (
        <span className='material-symbols-outlined'>
          {props.order.sort === 'ascending' ||
          props.searchParams.get('sort')?.toString() === 'ascending'
            ? 'expand_more'
            : 'expand_less'}
        </span>
      )}
    </span>
  )
}

export default HeaderItem
