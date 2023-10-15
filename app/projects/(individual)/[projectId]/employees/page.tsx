'use client'
import getProjectEmployees from '@/api-calls/getEmployeeProjects'
import { type Employee } from '@/interfaces/employee'
import styles from './employees.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/components/pagination/pagination'
import { useEffect, useState } from 'react'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import Search from '@/components/search/search'

interface EmployeeProps {
  params: { projectId: string }
}

const EmployeesList = ({ params }: EmployeeProps): JSX.Element => {
  const [employees, setEmployees] =
    useState<DictionaryResponse<Employee> | null>(null)

  const handlePageChange = (page: number): void => {
    getProjectEmployees(
      `Project/${params.projectId ?? 0}/employees`,
      page.toString(),
      '5'
    )
      .then((res) => {
        setEmployees(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const [searchValue, setSearchValue] = useState<string>('')
  const getInputValue = (e: React.SyntheticEvent): void => {
    const input = e.target as HTMLInputElement
    setSearchValue(input.value)
  }

  useEffect(() => {
    if (searchValue !== '') {
      getProjectEmployees(`Project/${params.projectId ?? 0}/employees/search/${searchValue}`, '1', '5')
        .then((res) => {
          setEmployees(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    } else if (searchValue === '') {
      getProjectEmployees(
        `Project/${params.projectId ?? 0}/employees`,
        '1',
        '5'
      )
        .then((res) => {
          setEmployees(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [searchValue])

  useEffect(() => {
    console.log(searchValue)
  }, [searchValue])

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
        {Array.isArray(employeeList) && employeeList.length > 0 && (
          <>
            <h1>All employees</h1>
            <Search onSearch={getInputValue} />
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
          </>
        )}
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
    </section>
  )
}

export default EmployeesList
