import { useState, useEffect } from 'react'
import { type Company } from '@/interfaces/company'
import { type ApiResponse } from '@/interfaces/apiResponse'
import getCompaniesThatHaveProjects from '@/api-calls/getCompaniesThatHaveProjects'

interface CompanyDropdownProps {
  dependency: boolean
}

interface CompanyDropDownResult {
  companies: Company[] | null
  error: string | null
}

const useCompanyDropdown = ({ dependency }: CompanyDropdownProps): CompanyDropDownResult => {
  const [companies, setCompanies] = useState<Company[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getCompanies = async (): Promise<{
    data: Company[] | null
    status: number
  }> => {
    const data = await getCompaniesThatHaveProjects()

    return { data: data.data, status: data.status }
  }

  useEffect(() => {
    // * Fetch the companies only if the user opens the toggle menu
    if (dependency) {
      getCompanies()
        .then((response: ApiResponse<Company[]>) => {
          setCompanies(response.data)
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [dependency])

  return { companies, error }
}

export default useCompanyDropdown
