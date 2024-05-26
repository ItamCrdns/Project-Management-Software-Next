import getColleagues from '@/api-calls/getColleagues'
import { IndividualEmployee } from '@/components/Generic Entity Renderer/IndividualEmployee'
import Link from 'next/link'

const CoworkersCard: React.FC<{ username: string }> = async (props) => {
  const { username } = props

  const { data } = await getColleagues(username, '1', '5')

  const colleagues = data?.data ?? []
  const colleaguesCount = data?.count ?? 0

  return (
    <section className='flex items-center flex-col text-sm gap-4 shadow-md p-4 rounded-md bg-theming-white100 dark:bg-theming-dark300'>
      <h2 className='font-semibold text-xl'>Coworkers</h2>
      {Array.isArray(colleagues) && colleagues.length > 0 ? (
        <>
          <ul className='px-4 grid grid-cols-2 gap-4 place-items-center justify-items-center justify-center place-content-center'>
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
            href={`/employee/${username}/coworkers`}
          >
            See all {colleaguesCount} coworkers
          </Link>
        </>
      ) : (
        <p>No coworkers found</p>
      )}
    </section>
  )
}

export default CoworkersCard
