import React from 'react'
import UserPage from './_user/page'

interface AdminDashboardProps {
  children: React.ReactNode
  timeline: React.ReactNode
  clients: React.ReactNode
}

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  return (
    <section className='flex flex-col items-center p-8'>
      <UserPage />
      <div className='flex gap-8 items-start'>
        {props.timeline}
        {props.clients}
      </div>
    </section>
  )
}

export default AdminDashboard
