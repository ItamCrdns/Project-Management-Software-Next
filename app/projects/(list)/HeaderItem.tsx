import { type Style } from '@/interfaces/props/HeaderDescriptorProps'

interface HeaderItemProps {
  style: Style
  handleSortChange: (sortValue: string) => void
  toggleSortBy: string
  ascending: string
  icon: string
  label: string
  sortValue: string | undefined
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => {
  const {
    style,
    handleSortChange,
    icon,
    label,
    sortValue,
    toggleSortBy,
    ascending
  } = props

  const isSelected = toggleSortBy === label || toggleSortBy === sortValue

  return (
    <span
      style={style}
      onClick={() => {
        handleSortChange(sortValue ?? '')
      }}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <p style={{ fontWeight: isSelected ? 700 : 400 }}>{label}</p>
      {isSelected && (
        <span className="material-symbols-outlined">
          {ascending === 'ascending' ? 'expand_more' : 'expand_less'}
        </span>
      )}
    </span>
  )
}

export default HeaderItem
