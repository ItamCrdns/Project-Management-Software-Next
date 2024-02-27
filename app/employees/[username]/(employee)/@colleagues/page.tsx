import getColleagues from '@/api-calls/getColleagues'
import Link from 'next/link'
import { type UsernameParamsProps } from '@/interfaces/props/UsernameParamsProps'
import { IndividualEmployee } from '@/components/Generic Entity Renderer/IndividualEmployee'

const Colleagues: React.FC<UsernameParamsProps> = async (props) => {
  const { username } = props.params
  const { data } = await getColleagues(username, '1', '5')
  const colleagues = data?.data
  const colleaguesCount = data?.count

  return (
    <section className='flex items-center flex-col text-sm gap-4 shadow-md px-8 py-4 rounded-lg bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex items-center gap-4 justify-between border-b-2 border-azure-radiance-200 pb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
          />
        </svg>
        <h1 className='text-2xl m-0'>Colleagues</h1>
        <h3 className='m-0'>List</h3>
      </div>
      {Array.isArray(colleagues) && colleagues.length > 0
        ? (
        <>
          <ul className='flex flex-col gap-4'>
            {colleagues.map((colleague) => (
              <li
                className='flex items-center gap-4 relative'
                key={colleague.employeeId}
              >
                <IndividualEmployee
                  employee={colleague}
                  size={40}
                  redirectMe={true}
                  showName={true}
                />
              </li>
            ))}
          </ul>
          <Link
            className='font-semibold text-theming-dark100 dark:text-theming-white100'
            href={`/employees/${username}/colleagues`}
          >
            See all {colleaguesCount} colleagues
          </Link>
        </>
          )
        : (
        <p>No colleagues found</p>
          )}
    </section>
  )
}

export default Colleagues
