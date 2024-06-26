import Link from 'next/link'
import Image from 'next/image'
import { type Employee } from '@/interfaces/employee'
import { Button } from '../Button/Button'
import NoPicture from '../No profile picture/NoPicture'
import EmployeeWorkload from './EmployeeWorkload.'
import { Workload } from '@/interfaces/Workload'

interface EmployeeCardProps {
  employee: Employee | null
  supervisor?: Employee | null
  workload?: Workload | null
  isProfile: boolean // * Should we show the supervisor card too or not?
  // ? || used to track if the cardwill be diplayted in the profile, if yes: more properties will be dispalyed. If no: only a few will because its a modal card being displayed somewhere in the page
  redirectMe: boolean // * Should we redirect to the employee profile or not?
}

const EmployeeCard: React.FC<EmployeeCardProps> = (props) => {
  const { employee, supervisor, isProfile, redirectMe } = props

  return (
    <section className='space-y-8 z-[998]'>
      <section className='flex flex-col gap-4 items-center rounded-md shadow-md p-4 bg-theming-white100 dark:bg-theming-dark300'>
        {employee?.profilePicture !== null &&
        employee?.profilePicture !== undefined ? (
          <Image
            src={employee.profilePicture}
            alt={employee.username}
            width={175}
            height={175}
            className='rounded-full'
          />
        ) : (
          <NoPicture width='175px' height='175px' questionMarkSize='6.5rem' />
        )}
        {isProfile ? (
          <h1 className='text-xl font-bold'>{employee?.username}</h1>
        ) : redirectMe ? (
          <Link
            className='text-xl font-bold text-theming-dark100 dark:text-theming-white100'
            href={`/employee/${employee?.username}`}
          >
            {employee?.username}
          </Link>
        ) : (
          <h1 className='text-xl font-bold'>{employee?.username}</h1>
        )}
        <p className='capitalize text-xs -mt-4'>{employee?.role}</p>
        <div className='flex gap-4'>
          <Button text='Message' />
          <Button text='More' borderOnly={true} txtColor='black' />
        </div>
      </section>
      {isProfile && props.workload && (
        <EmployeeWorkload workload={props.workload} />
      )}
      {supervisor !== null && isProfile && (
        <section className='flex flex-col items-center rounded-md shadow-md p-4 bg-theming-white100 dark:bg-theming-dark300'>
          <h2 className='font-semibold'>Under suppervision of</h2>
          <div className='flex gap-2 p-2 items-center '>
            {supervisor?.profilePicture !== null &&
            supervisor?.profilePicture !== undefined ? (
              <Image
                src={supervisor?.profilePicture}
                alt={supervisor?.username}
                width={35}
                height={35}
                className='rounded-full'
              />
            ) : (
              <NoPicture width='50px' height='50px' />
            )}
            <Link
              className='font-bold text-sm text-theming-dark100 dark:text-theming-white100'
              href={`/employee/${supervisor?.username}`}
            >
              {supervisor?.username}
            </Link>
          </div>
        </section>
      )}
    </section>
  )
}

export default EmployeeCard
