'use client'
import { useAuth } from '@/context/AuthContext'
import { type Employee } from '@/interfaces/employee'
import styles from '../dashboard.module.css'
import Image from 'next/image'

const UserPage = (): JSX.Element => {
  const { user } = useAuth() // * Might instead get the user from a fetch request because we need to display different dashboard pages for different roles.

  const employee = user as Employee

  return (
    <section className={styles.welcomewrapper}>
      <Image
        src={employee.profilePicture}
        alt={employee.username}
        width={50}
        height={50}
      />
      <h1>
        Welcome, <span>{employee.username}</span>
      </h1>
    </section>
  )
}

export default UserPage
