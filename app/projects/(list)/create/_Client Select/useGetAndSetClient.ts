// * Get a client from the URL query param and set it in the store, after checking if it exists.
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { getClientById } from './getClientById'
import { useEffect } from 'react'
import { useGetSearchParams } from '@/components/Filters/useGetSearchParams'

export const useGetAndSetClient = (clientId: string): void => {
  const { pathname, router, searchParams } = useGetSearchParams()

  const { setCompany } = useNewProjectActions()

  const clientIdAsNumber = Number(clientId)

  const { client, isError: clientIsError } = getClientById(
    clientIdAsNumber,
    !isNaN(clientIdAsNumber) && clientIdAsNumber !== 0 // * Will never be called if no query param is present.
  )

  useEffect(() => {
    if (clientIsError?.message === '404') {
      searchParams.delete('clientId')

      router.replace(`${pathname}?${searchParams.toString()}`)

      return
    }

    if (client !== undefined) {
      setCompany(client.companyId, client.name)
    }
  }, [client, clientIsError, clientId])
}
