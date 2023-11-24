import Pagination from '../pagination/pagination'
import { type SelectUIProps } from './SelectUI'

const SelectPaginationUI: React.FC<Partial<SelectUIProps>> = (props) => {
  if (props.isPaginated !== null && props.isPaginated === true) {
    return (
      <Pagination
        totalPages={props.pageSize ?? 1}
        onPageChange={
          props.onPageChange ??
          (() => {}) /* ? Empty function to avoid TS error */
        }
        borderRadiusValue='15px'
      />
    )
  }
}

export default SelectPaginationUI
