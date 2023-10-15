'use client'
// import getProjectEmployees from '@/api-calls/getEmployeeProjects'
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

  const [currentPage, setCurrentPage] = useState<string>('1')

  const handlePageChange = (page: number): void => {
    setCurrentPage(page.toString()) // Get the Pagination component page number with a callback function (convert it to string too!)
    if (searchValue === '') {
      fetchEmployees({ projectId: params.projectId, page: page.toString() })
        .then((res) => {
          setEmployees(res as DictionaryResponse<Employee>)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const [searchValue, setSearchValue] = useState<string>('')
  const getInputValue = (e: React.SyntheticEvent): void => {
    const input = e.target as HTMLInputElement
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
          setEmployees(res as DictionaryResponse<Employee>)
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (searchValue === '') {
      fetchEmployees({ projectId: params.projectId, page: currentPage })
        .then((res) => {
          setEmployees(res as DictionaryResponse<Employee>)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [searchValue, currentPage])

  const totalPages = employees?.pages ?? 0
  const employeeList = employees?.data ?? []

  const [searchResult, setSearchResult] = useState<string>('Loading...')

  useEffect(() => {
    if (employeeList.length <= 0) {
      setSearchResult('No employees match your search criteria.')
    }
  }, [employeeList])

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
                <p>{searchResult}</p>
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
