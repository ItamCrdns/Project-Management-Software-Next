'use client'
import { type Employee } from '@/interfaces/employee'
import styles from './employees.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/components/pagination/pagination'
import { useEffect, useState } from 'react'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import Search from '@/components/search/search'
import fetchEmployees from './fetchEmployees'

interface EmployeeProps {
  params: { projectId: string }
}

const EmployeesList = ({ params }: EmployeeProps): JSX.Element => {
  const [employees, setEmployees] =
    useState<DictionaryResponse<Employee> | null>(null)

  const [message, setMessage] = useState<string>('Loading...')

  const [currentPage, setCurrentPage] = useState<string>('1')

  const handlePageChange = (page: number): void => {
    setCurrentPage(page.toString()) // Get the Pagination component page number with a callback function (convert it to string too!)
    if (searchValue === '') {
      fetchEmployees({ projectId: params.projectId, page: page.toString() }) // Promises are already coming fulfilled so we cannot catch the error, its gonna come in the .then instead the .catch
        .then((res) => {
          if (typeof res === 'string') { // If the res its a string that means that the API returned an error
            setMessage(res)
          }
          setEmployees(res as DictionaryResponse<Employee>)
        })
        .catch((err) => { // Still have the catch otherwise eslint gets mad
          setMessage(err)
        })

      // * Above comments also apply to the code below
    }
  }

  const [searchValue, setSearchValue] = useState<string>('')
  const getInputValue = (e: React.SyntheticEvent): void => {
    const input = e.target as HTMLInputElement
    if (employeeList.length <= 0) {
      setMessage('No employees match your search criteria.')
    }
    setSearchValue(input.value)
  }

  useEffect(() => {
    if (searchValue !== '') {
      fetchEmployees({
        projectId: params.projectId,
        searchValue,
        page: currentPage
      })
        .then((res) => {
          if (typeof res === 'string') { // If the res its a string that means that the API returned an error
            setMessage(res)
          }
          setEmployees(res as DictionaryResponse<Employee>)
        })
        .catch((err) => {
          setMessage(err)
        })
    } else if (searchValue === '') {
      fetchEmployees({ projectId: params.projectId, page: currentPage })
        .then((res) => {
          if (typeof res === 'string') { // If the res its a string that means that the API returned an error
            setMessage(res)
          }
          setEmployees(res as DictionaryResponse<Employee>)
        })
        .catch((err) => {
          setMessage(err)
        })
    }
  }, [searchValue, currentPage])

  const totalPages = employees?.pages ?? 0
  const employeeList = employees?.data ?? []

  return (
    <section className={styles.employeeswrapper}>
      <section className={styles.employees}>
        <Link
          href={`/projects/${params.projectId}`}
          className={`material-symbols-outlined ${styles.closebutton}`}
        >
          close
        </Link>
        {Array.isArray(employeeList) && (
          <>
            <h1>All employees</h1>
            <Search onSearch={getInputValue} />
            {employeeList.length > 0
              ? (
              <ul>
                {employeeList.map((employee: Employee) => (
                  <li key={employee.employeeId}>
                    <Link href={`/employees/${employee.username}`}>
                      <Image
                        src={employee.profilePicture}
                        alt={employee.username}
                        width={50}
                        height={50}
                      />
                    </Link>
                    <p>
                      <Link href={`/employees/${employee.username}`}>
                        {employee.username}
                      </Link>
                    </p>
                  </li>
                ))}
              </ul>
                )
              : (
              <div className={styles.noemployeesfound}>
                <p>{message}</p>
              </div>
                )}
          </>
        )}
        <Pagination reset={searchValue !== ''} totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
    </section>
  )
}

export default EmployeesList
