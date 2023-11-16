import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { type Style } from '@/interfaces/props/HeaderDescriptorProps'

interface HeaderItemProps {
  style: Style
  handleSortChange: (sortValue: string) => void
  toggleSortBy: string
  ascending: string
  icon: string
  label: string
  sortValue: string | undefined
  searchParams: SearchParamsPageSize | undefined
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => {
  const isSelected =
    props.toggleSortBy === props.sortValue ||
    props.searchParams?.orderby === props.sortValue?.toLowerCase() // queryparams are always lowercase (or at least they should be)

  return (
    <span
      style={props.style}
      onClick={() => {
        props.handleSortChange(props.sortValue ?? '')
      }}
    >
      <span className="material-symbols-outlined">{props.icon}</span>
      <p style={{ fontWeight: isSelected ? 700 : 400 }}>{props.label}</p>
      {isSelected && (
        <span className="material-symbols-outlined">
          {props.ascending === 'ascending' ||
          (props.searchParams !== undefined &&
            props.searchParams.sort === 'ascending')
            ? 'expand_more'
            : 'expand_less'}
        </span>
      )}
    </span>
  )
}

export default HeaderItem
