import { Button } from '@/components/Button/Button'
import { IndividualEmployee } from '@/components/Generic Entity Renderer/IndividualEmployee'
import { useAppSelector } from '@/lib/hooks/hooks'
import { debounce } from '@/utility/debouce'
import { Divider } from '@tremor/react'
import { createTask } from '../actions/createTask'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { useState } from 'react'
import { type ApiResponse } from '@/interfaces/apiResponse'
import { CreatedSuccessfullyDialog } from '@/components/UI/Dialog/CreatedSuccessfullyDialog'

const Resume: React.FC<{ return: () => void }> = (props) => {
  const newTask = useAppSelector((state) => state.newTaskData)

  const [response, setResponse] = useState<ApiResponse<
    OperationResult<number>
  > | null>(null)

  return (
    <>
      <CreatedSuccessfullyDialog
        response={response}
        closeDialog={() => {
          setResponse(null)
        }}
        entity='task'
        href={`projects/${newTask.projectId}/tasks`}
      />
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
              <h2 className='text-center line-clamp-2'>
                {newTask.description}
              </h2>
            </div>
          </div>
          <div className='flex items-center flex-col w-full'>
            <Divider>Expected delivery date</Divider>
            <h2>
              {new Date(newTask.expectedDeliveryDate).toLocaleDateString(
                'en-us',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'UTC'
                }
              )}
            </h2>
          </div>
        </div>
        <div className='flex items-center flex-col w-full px-4'>
          <Divider>Employees</Divider>
          {Array.isArray(newTask.employees) && newTask.employees.length > 0 ? (
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
          ) : (
            <p className='text-center'>
              You didn&apos;t add any employees, but don&apos;t worry, you can
              add them later
            </p>
          )}
        </div>
        <div className='flex items-center flex-col w-full px-4 mb-8'>
          <Divider>Task start date</Divider>
          {newTask.startedWorking ? <p>Immediately</p> : <p>Not specified</p>}
        </div>
        <div className='flex gap-4'>
          <Button
            text='Create task'
            func={debounce(() => {
              ;(async () => {
                const formData = new FormData()

                formData.append('name', newTask.name)
                formData.append('description', newTask.description)
                formData.append(
                  'expectedDeliveryDate',
                  new Date(newTask.expectedDeliveryDate).toUTCString()
                )
                formData.append('projectId', newTask.projectId.toString())

                if (newTask.startedWorking) {
                  formData.append('shouldStartNow', 'true')
                }

                const employees = newTask.employees

                if (employees !== null && employees.length > 0) {
                  employees.forEach((employee) => {
                    formData.append('employees', employee.employeeId.toString())
                  })
                }

                const res = await createTask(formData)
                setResponse(res)
              })()
            }, 500)}
          />
          <Button text='Go back' func={props.return} />
        </div>
      </section>
    </>
  )
}

export { Resume }
