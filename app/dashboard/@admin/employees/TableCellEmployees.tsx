'use client'
import useCardVisibility from '@/components/Generic Entity Renderer/useCardVisibility'
import EmployeeCard from '@/components/employeecard/EmployeeCard'
import { type Employee } from '@/interfaces/employee'
import { TableCell } from '@tremor/react'
import Image from 'next/image'
import Link from 'next/link'

const TableCellEmployees: React.FC<{ employee: Employee }> = (props) => {
  const employee = props.employee
  const { username, profilePicture } = employee

  const { showCard, handleShowCard, handleHideCard } = useCardVisibility()

  return (
    <TableCell className='flex gap-4 items-center justify-center w-[300px]'>
      <Image
        onMouseOver={handleShowCard}
        onMouseLeave={handleHideCard}
        src={profilePicture}
        alt={username}
        width={35}
        height={35}
        className='rounded-full'
      />
      <Link
        className='text-sm font-bold text-theming-dark100 dark:text-theming-white100 text-center'
        href={`/employee/${profilePicture}`}
      >
        {username}
      </Link>
      {showCard && (
        <div
          onMouseOver={handleShowCard}
          onMouseLeave={handleHideCard}
          className='absolute flex items-center justify-center self-center left-36 mt-[300px]'
        >
          <EmployeeCard
            employee={employee}
            isProfile={false}
            redirectMe={true}
          />
        </div>
      )}
    </TableCell>
  )
}

export { TableCellEmployees }
