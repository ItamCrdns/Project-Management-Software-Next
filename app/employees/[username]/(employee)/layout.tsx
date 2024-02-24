import { type EmployeeIdProps } from '@/interfaces/props/EmployeeIdProps'

const EmployeeIdLayout: React.FC<EmployeeIdProps> = async (props) => {
  return (
    <>
      {props.children}
      <main className='flex justify-center p-8 gap-8'>
        {props.employeeCard}
        <section className='flex flex-col gap-8'>
          {props.projects}
          {props.tasks}
          {props.issues}
        </section>
        <section className='flex flex-col gap-8'>
          {props.colleagues}
        </section>
      </main>
    </>
  )
}

export default EmployeeIdLayout
