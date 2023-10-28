// 'use client'
// import styles from '../dashboard.module.css'
// import EmployeeBanner from './EmployeeBanner'
// import Loading from './Loading'
// import useGetEmployee from './useGetEmployee'
import getEmployeeTier from '@/api-calls/getEmployeeTier'

const UserPage = async (): Promise<JSX.Element> => {
  const tier = await getEmployeeTier()

  console.log(tier)
  // const { employee, error } = useGetEmployee()

  // return (
  //   <section className={styles.welcomewrapper}>
  //     {employee !== null && employee !== undefined
  //       ? (
  //       <EmployeeBanner employee={employee} />
  //         )
  //       : (
  //       <Loading />
  //         )}
  //     {error !== '' && <p>{error}</p>}
  //   </section>
  // )
}

export default UserPage
