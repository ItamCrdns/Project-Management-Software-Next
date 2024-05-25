import React from 'react'
import UserPage from './_user/page'

interface AdminDashboardProps {
  children: React.ReactNode
  timeline: React.ReactNode
}

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  return (
    <section className='flex flex-col items-center p-8'>
      <UserPage />
      {props.timeline}
    </section>
  )
}

export default AdminDashboard
