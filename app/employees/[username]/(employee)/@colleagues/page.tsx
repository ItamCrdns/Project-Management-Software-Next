import styles from '@/app/projects/(individual)/[projectId]/(projectId)/project.module.css'
import getColleagues from '@/api-calls/getColleagues'
import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import Link from 'next/link'
import { type UsernameParamsProps } from '@/interfaces/props/UsernameParamsProps'

const Colleagues: React.FC<UsernameParamsProps> = async (props) => {
  const { username } = props.params
  const { data } = await getColleagues(username, '1', '5')
  const colleagues = data?.data
  const colleaguesCount = data?.count

  return (
    <section className={styles.employees}>
      <div className={styles.headerwrapper}>
        <div>
          <span className="material-symbols-outlined">groups</span>
          <h1>Colleagues</h1>
        </div>
        <h3>List</h3>
      </div>
      {Array.isArray(colleagues) && colleagues.length > 0
        ? (
        <>
          <ul>
            {colleagues.map((colleague: Employee) => (
              <li key={colleague.employeeId}>
                <Link href={`/employees/${colleague.username}`}>
                  <Image
                    src={colleague.profilePicture ?? ''}
                    alt={colleague.username ?? ''}
                    width={50}
                    height={50}
                  />
                </Link>
                <p>
                  <Link href={`/employees/${colleague.username}`}>
                    {colleague.username}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
          <h3>
            <Link href={`/employees/${username}/colleagues`}>
              See all {colleaguesCount} colleagues
            </Link>
          </h3>
        </>
          )
        : (
        <p>No colleagues found</p>
          )}
    </section>
  )
}

export default Colleagues
