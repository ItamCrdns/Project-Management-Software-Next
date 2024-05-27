import ProjectCreator from '@/app/clients/[clientId]/projects/[projectId]/(projectId layout)/ProjectCreator'
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
    <div className='flex items-center gap-8 flex-col'>
      <div className='w-full space-y-2'>
        {creator !== undefined && (
          <div className='flex flex-col gap-4 items-center justify-center p-8 bg-theming-white100 dark:bg-theming-dark300 rounded-md shadow-md'>
            <h1 className='font-semibold self-start'>Created by</h1>
            <ProjectCreator
              creator={creator}
              pictureSize={35}
              showUsername={true}
              position={{ left: '1rem' }}
            />
          </div>
        )}
      </div>
      {Array.isArray(team) && (
        <div className='w-full space-y-2'>
          <div className='rounded-md w-full shadow-md bg-theming-white100 dark:bg-theming-dark300 p-8 space-y-4'>
            <h1 className='font-semibold'>Team</h1>
            <ul className='space-y-4 flex flex-col justify-center items-center'>
              {team.length > 0 ? (
                team.map((employee: Employee, index: number) => (
                  <li key={index} className='relative'>
                    <IndividualEmployee
                      employee={employee}
                      size={35}
                      redirectMe={true}
                      showName={true}
                      position={{ left: '1rem' }}
                    />
                  </li>
                ))
              ) : (
                <p className='text-center font-semibold text-sm'>
                  No employees in this team
                </p>
              )}
            </ul>
            {team.length > 0 && (
              <p className='text-center font-semibold text-sm'>
                {teamHref !== '' && teamHref !== undefined ? (
                  <Link href={teamHref}>
                    {teamCount} employees in this team
                  </Link>
                ) : (
                  `${teamCount} employees in this team`
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export { TeamAndCreator }
