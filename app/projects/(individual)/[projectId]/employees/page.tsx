'use client'
import getProjectEmployees from '@/api-calls/getEmployeeProjects'
import { type Employee } from '@/interfaces/employee'
import styles from './employees.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/components/pagination/pagination'
import { useState } from 'react'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

interface EmployeeProps {
  params: { projectId: string }
}

const EmployeesList = ({ params }: EmployeeProps): JSX.Element => {
  const [employees, setEmployees] =
    useState<DictionaryResponse<Employee> | null>(null)

  const handlePageChange = (page: number): void => {
    getProjectEmployees(params.projectId ?? 0, page.toString(), '5')
      .then((res) => {
        setEmployees(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

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
