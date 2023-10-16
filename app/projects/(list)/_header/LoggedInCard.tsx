'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import styles from '../userbanner.module.css'
import RippleButton from '@/components/ripplebutton/RippleButton'
import Filter from './Filter'

const LoggedInCard = (): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(false)
  const { user } = useAuth()

  const currentUser = user as Employee
  return (
    <section className={styles.banner}>
      {currentUser.profilePicture !== ''
        ? (
        <div className={styles.options}>
          <p
            onClick={() => {
              setToggle(!toggle)
            }}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Options
          </p>
          <span
            onClick={() => {
              setToggle(!toggle)
            }}
            style={{ fontSize: '1.5rem', cursor: 'pointer' }}
            className="material-symbols-outlined"
          >
            {!toggle ? 'expand_more' : 'expand_less'}
          </span>
          <Image
            src={currentUser.profilePicture}
            alt={currentUser.username}
            width={35}
            height={35}
          />
        </div>
          )
        : (
        <div className={styles.nouser}></div>
          )}
      <RippleButton
        text="New project"
        icon="add"
        iconSize="20px"
        width="130px"
        href="/projects/new"
      />
      <Filter toggle={toggle} />
    </section>
  )
}

export default LoggedInCard
