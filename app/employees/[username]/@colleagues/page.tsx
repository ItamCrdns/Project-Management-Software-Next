import styles from '../employee.module.css'
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
  const data = await getColleagues(username)
  const colleagues = data?.data as Employee

  return (
    <section className={styles.colleagues}>
      <div className={styles.titlewrapper}>
        <span className="material-symbols-outlined">groups</span>
        <h1>Colleagues</h1>
      </div>
      <ul>
        {Array.isArray(colleagues) &&
          colleagues.map((colleague) => (
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
    </section>
  )
}

export default Colleagues
