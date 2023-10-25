'use client'
import styles from '@/app/employees/[username]/employee.module.css'
import { type Employee } from '@/interfaces/employee'
import Link from 'next/link'
import { useState } from 'react'

interface EmployeeNumbersProps {
  employee: Employee | null
}

const EmployeeNumbers: React.FunctionComponent<EmployeeNumbersProps> = ({
  employee
}) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const employeeNumbersList = [
    {
      name: 'Projects',
      link: `/employees/${employee?.username}/projects`,
      totalCount: employee?.projectTotalCount,
      createdCount: employee?.projectsCreated,
      participantCount: employee?.projectsParticipant
    },
    {
      name: 'Tasks',
      link: `/employees/${employee?.username}/tasks`,
      totalCount: employee?.taskTotalCount,
      createdCount: employee?.tasksCreated,
      participantCount: employee?.tasksParticipant
    },
    {
      name: 'Issues',
      link: `/employees/${employee?.username}/issues`,
      totalCount: employee?.issueTotalCount,
      createdCount: employee?.issuesCreated,
      participantCount: employee?.issuesParticipant
    }
  ]

  return (
    <section className={styles.employeenumbers}>
      {employeeNumbersList.map((item, index) => {
        return (
          <Link
            onMouseEnter={() => {
              setHoveredLink(item.link)
            }}
            onMouseLeave={() => {
              setHoveredLink(null)
            }}
            href={item.link}
            key={index}
          >
            <p>{item.totalCount}</p> {item.name}
            {hoveredLink === item.link && (
              <div className={styles.employeenumbersbanner}>
                <p>
                  <span style={{ fontWeight: 700, fontSize: '18px' }}>
                    {item.createdCount}
                  </span>{' '}
                  created {item.name}
                </p>
                <p>
                  <span style={{ fontWeight: 700, fontSize: '18px' }}>
                    {item.participantCount}
                  </span>{' '}
                  participant {item.name}
                </p>
              </div>
            )}
          </Link>
        )
      })}
    </section>
  )
}

export default EmployeeNumbers
