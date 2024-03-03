import Pagination from '../pagination/pagination'

interface SelectPaginationUIProps {
  isPaginated?: boolean
  pageSize?: number
  onPageChange?: (page: number) => void
}

const SelectPaginationUI: React.FC<SelectPaginationUIProps> = (props) => {
  if (props.isPaginated === true) {
    return (
      <Pagination
        totalPages={props.pageSize ?? 1}
        onPageChange={props.onPageChange ?? (() => {})}
      />
    )
  }
}

export { SelectPaginationUI }
