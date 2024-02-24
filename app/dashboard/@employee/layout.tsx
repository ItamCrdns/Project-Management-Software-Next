const EmployeeDashboard: React.FC<{ projects: React.ReactNode }> = (props) => {
  return (
    <section className='flex flex-col items-center p-8'>
      {props.projects}
    </section>
  )
}

export default EmployeeDashboard
