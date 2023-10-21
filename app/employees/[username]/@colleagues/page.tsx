import styles from '@/app/projects/(individual)/[projectId]/project.module.css'
import getColleagues from '@/api-calls/getColleagues'
import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import Link from 'next/link'

const Colleagues = async ({
  params
}: {
  params: { username: string }
}): Promise<JSX.Element> => {
  const { username } = params
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
      <ul>
        {Array.isArray(colleagues) &&
          colleagues.map((colleague: Employee) => (
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
          See all {colleaguesCount} {username} colleagues
        </Link>
      </h3>
    </section>
  )
}

export default Colleagues
