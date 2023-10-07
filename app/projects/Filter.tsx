import styles from './userbanner.module.css'
import { useEffect, useState } from 'react'
import getCompaniesThatHaveProjects from '@/api-calls/getCompaniesThatHaveProjects'
import { type Company } from '@/interfaces/company'
import { type ApiResponse } from '@/interfaces/apiResponse'
import Button from '@/components/button/button'

interface FilterProps {
  toggle: boolean
}

const Filter = ({ toggle }: FilterProps): JSX.Element => {
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
    if (toggle) {
      getCompanies()
        .then((response: ApiResponse<Company[]>) => {
          setCompanies(response.data)
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [toggle])

  return (
    <section
      className={styles.popup}
      style={{ display: toggle ? 'flex' : 'none' }}
    >
      <p>Company:</p>
      <select defaultValue={'DEFAULT'}>
        <option value="DEFAULT" disabled hidden>
          Select a company...
        </option>
        {Array.isArray(companies) &&
          companies.map((company: Company) => (
            <option key={company.companyId} value={company.companyId}>
              {company.name}
            </option>
          ))}
      </select>
      <Button
        text="Apply filters"
        backgroundColor="#6499E9"
        effectColor="#27005D"
        textColor="white"
        width="105px"
      />
      {error !== null && (
        <p style={{ fontSize: '8px', textAlign: 'center' }}>
          {error.toString()}
        </p>
      )}
    </section>
  )
}

export default Filter
