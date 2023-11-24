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
  url?: string // ? Base url. We are going to append the query params to this url. This url should include the trailing slash "/"
  updateFilter?: (key: keyof IFilter, props: IFilterProperties) => void
  entity: string
}

const useFilterSetterAndUrlPusher = (props: OrderSetterProps): void => {
  const router = useRouter()

  useEffect(() => {
    const newFilter: IFilterProperties = {
      orderBy: props.order.column,
      sort: props.order.order
    }

    if (props.searchParams !== undefined) {
      const newFilterSearchParams: IFilterProperties = {
        ...newFilter,
        page: props.searchParams?.page ?? '1', // ? Always get it from the searchParams. This component does not change the page.
        pageSize: props.searchParams?.pagesize ?? '10' // ? Same as above
      }

      const queryParams = new URLSearchParams(newFilterSearchParams as string)
        .toString()
        .toLowerCase()

      // * Append the query params to the base url and then push to the new URL.
      const newUrl = `${props.url}?${queryParams}`
      router.replace(newUrl)
    }

    props.updateFilter !== undefined &&
      props.updateFilter(props.entity as keyof IFilter, newFilter)
  }, [props.order])
}

export default useFilterSetterAndUrlPusher
