import { type Style } from '@/interfaces/props/HeaderDescriptorProps'
import React from 'react'

interface HeaderItemProps {
  style: Style
  handleSortChange: (orderBy: string, sort: string) => void
  icon: string
  label: string
  sortValue: string | undefined
  searchParams: URLSearchParams
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => {
  const isSelected =
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
      <span className="material-symbols-outlined">{props.icon}</span>
      <p style={{ fontWeight: isSelected ? 700 : 400 }}>{props.label}</p>
      {isSelected && (
        <span className="material-symbols-outlined">
          {props.searchParams.get('sort')?.toString() === 'ascending'
            ? 'expand_more'
            : 'expand_less'}
        </span>
      )}
    </span>
  )
}

export default React.memo(HeaderItem)
