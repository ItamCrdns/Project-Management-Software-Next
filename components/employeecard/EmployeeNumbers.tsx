'use client'
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
    <section className='relative flex w-full justify-around'>
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
            <div className='my-4'>
              <p className='font-bold text-theming-dark100 dark:text-theming-white100 text-center text-xs'>{item.totalCount}</p>
              <p className='font-bold text-theming-dark100 dark:text-theming-white100 text-center text-xs'>{item.name}</p>
            </div>
            {hoveredLink === item.link && (
              <div className='absolute flex gap-4 shadow-md py-4 px-8 top-12 z-50 rounded-lg bg-theming-white100 dark:bg-theming-dark300'>
                <p className='font-bold text-theming-dark100 dark:text-theming-white100 text-xs'>
                  {item.createdCount} created {item.name}
                </p>
                <p className='font-bold text-theming-dark100 dark:text-theming-white100 text-xs'>
                  {item.participantCount} participant {item.name}
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
