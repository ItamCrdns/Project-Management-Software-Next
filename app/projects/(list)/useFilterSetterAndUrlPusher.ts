import { type Order } from '@/context/Filter/filterInitialState'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import {
  type IFilter,
  type IFilterProperties
} from '@/interfaces/props/context props/IFilter'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export interface OrderSetterProps {
  order: Order
  searchParams?: SearchParamsPageSize
  clientId?: string
  clientName?: string
  updateFilter?: (key: keyof IFilter, props: IFilterProperties) => void
  entity: string
}

const useFilterSetterAndUrlPusher = (props: OrderSetterProps): void => {
  const router = useRouter()

  useEffect(() => {
    console.log('url pusher triggered')
    const newFilter: IFilterProperties = {
      orderBy: props.order.column,
      sort: props.order.order
    }

    if (props.searchParams !== undefined) {
      const newFilterSearchParams: IFilterProperties = {
        ...newFilter,
        page: props.searchParams?.page ?? '1' // ? Always get it from the searchParams. This component does not change the page.
      }

      const queryParams = new URLSearchParams(newFilterSearchParams as string)
        .toString()
        .toLowerCase()

      const url = `/projects/client/${props.clientId}/${props.clientName}/?${queryParams}`
      router.push(url)
    }

    props.updateFilter !== undefined &&
      props.updateFilter(props.entity as keyof IFilter, newFilter)
  }, [props.order])
}

export default useFilterSetterAndUrlPusher
