import { useState, useEffect } from 'react'
import getClients from '@/api-calls/getClients'
import {
  type CompanyDropDownResult,
  type CompanyDropdownProps
} from '@/interfaces/props/CompanyDropdownProps'
import { type ClientDataAndPageSize } from '@/interfaces/return/ClientDataAndPageSizeReturn'

const useCompanyDropdown = (
  props: CompanyDropdownProps
): CompanyDropDownResult => {
  const [companies, setCompanies] = useState<ClientDataAndPageSize | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getCompanies = async (): Promise<ClientDataAndPageSize> => {
    const data = await getClients(props.page ?? '1', '5')

    return {
      data: data?.data?.data ?? [],
      status: data.status,
      pageSize: data.data?.pages ?? 0
    }
  }

  useEffect(() => {
    // * Fetch the companies only if the user opens the toggle menu
    if (props.dependency) {
      getCompanies()
        .then((res) => {
          setCompanies(res)
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [props.dependency, props.page])

  return { companies, error }
}

export default useCompanyDropdown
