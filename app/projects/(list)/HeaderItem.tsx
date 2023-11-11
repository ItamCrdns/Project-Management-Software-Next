import { type Style } from '@/interfaces/props/HeaderDescriptorProps'

interface HeaderItemProps {
  style: Style
  handleSortChange: (e: React.MouseEvent<HTMLSpanElement>) => void
  toggleSortBy: string
  ascending: string
  icon: string
  label: string
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => {
  const { style, handleSortChange, icon, label, toggleSortBy, ascending } = props

  const isSelected = toggleSortBy === label
  return (
    <span style={style} onClick={handleSortChange}>
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
