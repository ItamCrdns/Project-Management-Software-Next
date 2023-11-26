import { setInitialSearchParams } from '@/components/Filters/setInitialSearchParams'
import { type Order } from '@/context/Filter/filterInitialState'
import {
  type IFilter,
  type IFilterProperties
} from '@/interfaces/props/context props/IFilter'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export interface OrderSetterProps {
  order: Order
  updateFilter?: (key: keyof IFilter, props: IFilterProperties) => void
  entity: string
}

const useFilterSetterAndUrlPusher = (props: OrderSetterProps): void => {
  const pathname = usePathname()
  const router = useRouter()

  const searchParams = setInitialSearchParams()

  useEffect(() => {
    const newFilter: IFilterProperties = {
      orderBy: props.order.column,
      sort: props.order.order
    }

    const orderBy = props.order.column.toLowerCase()
    const sort = props.order.order.toLowerCase()

    searchParams.set('orderby', orderBy)
    searchParams.set('sort', sort)

    const newUrl = `${pathname}?${searchParams.toString()}`

    router.replace(newUrl)

    props.updateFilter !== undefined &&
      props.updateFilter(props.entity as keyof IFilter, newFilter)
  }, [props.order])
}

export default useFilterSetterAndUrlPusher
