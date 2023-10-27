'use client'
import { useAuth } from '@/context/AuthContext'
import { type Employee } from '@/interfaces/employee'
import getEmployeeClient from '@/api-calls/getEmployeeClient'
import styles from '../dashboard.module.css'
import stylesloader from '@/components/ripplebutton/ripplebutton.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const UserPage = (): JSX.Element => {
  const { user } = useAuth() // * Might instead get the user from a fetch request because we need to display different dashboard pages for different roles.

  const userFromLocalStorage = user as Employee

  const [employee, setEmployee] = useState<Employee | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (
      userFromLocalStorage.username !== '' &&
      userFromLocalStorage.username !== null
    ) {
      getEmployeeClient(userFromLocalStorage.username)
        .then((res) => {
          setEmployee(res.data)
        })
        .catch((error) => {
          setError(error.message)
        })
    }
  }, [user])

  return (
    <section className={styles.welcomewrapper}>
      {employee !== null && employee !== undefined
        ? (
        <Image
          src={employee.profilePicture}
          alt={employee.username}
          width={50}
          height={50}
        />
          )
        : (
        <div className={stylesloader.loaderwrapper}>
          <span
            style={{
              borderTop: '2px solid black',
              width: '25px',
              height: '25px'
            }}
            className={stylesloader.loader}
          ></span>
        </div>
          )}
      {employee !== null && employee !== undefined
        ? (
        <h1>
          Welcome, <span>{employee?.username}</span>
        </h1>
          )
        : (
        <h1>Loading your user information. Please wait...</h1>
          )}
      {error !== '' && <p>{error}</p>}
    </section>
  )
}

export default UserPage
