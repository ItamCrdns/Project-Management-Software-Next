interface AdminDashboardProps {
  children: React.ReactNode
  currentUser: React.ReactNode
  timeline: React.ReactNode
  clients: React.ReactNode
}

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  return (
    <section className='flex flex-col items-center p-8'>
      {props.currentUser}
      <div className='flex gap-8 items-start'>
        {props.timeline}
        {props.clients}
      </div>
    </section>
  )
}

export default AdminDashboard
