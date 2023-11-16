import { type Order } from '@/context/Filter/filterInitialState'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import checkAndSetOrderBy from '@/utility/checkAndSetOrderBy'
import checkAndSetSort from '@/utility/checkAndSetSort'
import { useEffect } from 'react'

export interface OrderUpdaterProps {
  searchParams: SearchParamsPageSize | undefined
  updateOrder: (order: Order) => void
}

// ? This function helps so if we change the orderBy or sort and we refresh the page it doesnt go to its default values again

const useOrderUpdater = (props: OrderUpdaterProps): void => {
  useEffect(() => {
    if (props.searchParams !== undefined) {
      if (
        props.searchParams.orderby !== undefined ||
        props.searchParams.sort !== undefined
      ) {
        const paramsOrderBy = props.searchParams.orderby.toLowerCase()
        const verifiedOrderBy = checkAndSetOrderBy(paramsOrderBy)
        const paramsSort = props.searchParams.sort.toLowerCase()
        const verifiedSort = checkAndSetSort(paramsSort)

        const newOrder: Order = {
          column: verifiedOrderBy ?? 'created',
          order: verifiedSort ?? 'descending'
        }

        props.updateOrder(newOrder)
      }
    }
  }, [])
}
export default useOrderUpdater
