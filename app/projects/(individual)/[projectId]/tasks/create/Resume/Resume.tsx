import { Button } from '@/components/Button/Button'
import { IndividualEmployee } from '@/components/Generic Entity Renderer/IndividualEmployee'
import { useAppSelector } from '@/lib/hooks/hooks'
import { Divider } from '@tremor/react'

const Resume: React.FC<{ return: () => void }> = (props) => {
  const newTask = useAppSelector((state) => state.newTaskData)

  return (
    <section className='flex items-center flex-col justify-center'>
      <h1 className='text-2xl text-center'>Your new task overview</h1>
      <p className='w-96 text-center mt-4'>
        Please carefully review the information you are about to submit.
      </p>
      <div className='w-500 flex items-center flex-col px-4'>
        <div className='flex items-start w-full justify-center rounded-lg'>
          <div className='flex flex-col items-center w-full'>
            <Divider>Name</Divider>
            <h2 className='text-center line-clamp-2'>{newTask.name}</h2>
          </div>
          <div className='flex flex-col items-center w-full'>
            <Divider>Description</Divider>
            <h2 className='text-center line-clamp-2'>{newTask.description}</h2>
          </div>
        </div>
        <div className='flex items-center flex-col w-full'>
          <Divider>Expected delivery date</Divider>
          <h2>{new Date(newTask.expectedDeliveryDate).toLocaleDateString()}</h2>
        </div>
      </div>
      <div className='flex items-center flex-col w-full px-4'>
        <Divider>Employees</Divider>
        {Array.isArray(newTask.employees) && newTask.employees.length > 0
          ? (
          <>
            <p className='text-xs mb-4'>Hover them to see more information</p>
            <ul className='relative list-none flex items-center -space-x-4 justify-center pt-0'>
              {newTask.employees.map((employee) => (
                <li key={employee.employeeId}>
                  <IndividualEmployee
                    employee={employee}
                    size={50}
                    redirectMe={false}
                    position={{ top: '2.5rem' }}
                    showName={false}
                    showImageBorder={true}
                  />
                </li>
              ))}
            </ul>
          </>
            )
          : (
          <p className='text-center'>
            You didn&apos;t add any employees, but don&apos;t worry, you can add
            them later
          </p>
            )}
      </div>
      <div className='flex items-center flex-col w-full px-4 mb-8'>
        <Divider>Task start date</Divider>
        {newTask.startedWorking ? <p>Immediately</p> : <p>Not specified</p>}
      </div>
      <div className='flex gap-4'>
        <Button text='Create task' />
        <Button text='Go back' />
      </div>
    </section>
  )
}

export { Resume }
