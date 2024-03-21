import ProjectCreator from '@/app/projects/(individual)/[projectId]/(projectId)/ProjectCreator'
import { Creator } from '@/svg/Creator'
import { Users } from '@/svg/Users'
import React from 'react'
import { IndividualEmployee } from '../Generic Entity Renderer/IndividualEmployee'
import { type Employee } from '@/interfaces/employee'
import Link from 'next/link'

// * Used for both TaskUI and ProjectUI
const TeamAndCreator: React.FC<{
  creator?: Employee
  team?: Employee[]
  teamCount?: number
  teamHref?: string
}> = (props) => {
  const { creator, team, teamCount, teamHref } = props

  return (
    <div className='flex items-center gap-4 flex-col'>
      <div className='w-full space-y-2'>
        {creator !== undefined && (
          <>
            <div className='flex items-center justify-center gap-2'>
              <h1 className='text-center font-semibold'>Created by</h1>
              <Creator />
            </div>

            <div className='flex justify-center p-4 bg-theming-white100 dark:bg-theming-dark300 rounded-md shadow-md'>
              <ProjectCreator
                creator={creator}
                pictureSize={35}
                showUsername={true}
                position={{ left: '1rem' }}
              />
            </div>
          </>
        )}
      </div>
      {Array.isArray(team) && team.length > 0 && (
        <div className='w-full space-y-2'>
          <div className='flex items-center justify-center gap-2'>
            <h1 className='text-center font-semibold'>Team</h1>
            <Users />
          </div>
          <ul className='rounded-md w-full shadow-md bg-theming-white100 dark:bg-theming-dark300 p-4 flex flex-col gap-4 items-center justify-center'>
            {team.map((employee: Employee, index: number) => (
              <li key={index} className='relative'>
                <IndividualEmployee
                  employee={employee}
                  size={35}
                  redirectMe={true}
                  showName={true}
                  position={{ left: '1rem' }}
                />
              </li>
            ))}
          </ul>
          <p className='text-center font-semibold text-sm'>
            {teamHref !== '' && teamHref !== undefined
              ? (
              <Link href={teamHref}>{teamCount} employees in this team</Link>
                )
              : (
              `${teamCount} employees in this team`
                )}
          </p>
        </div>
      )}
    </div>
  )
}

export { TeamAndCreator }
