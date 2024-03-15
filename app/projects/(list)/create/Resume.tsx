import { Button } from '@/components/Button/Button'
import { IndividualEmployee } from '@/components/Generic Entity Renderer/IndividualEmployee'
import { useAppSelector } from '@/lib/hooks/hooks'
import { Divider } from '@tremor/react'
import { useState } from 'react'
import CreatedDialog from './CreatedDialog'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { debounce } from '@/utility/debouce'
import { createProject } from './actions/createProject'
import { createClient } from './actions/createClient'

const Resume: React.FC<{ goBack: () => void }> = (props) => {
  const newProject = useAppSelector((state) => state.newProjectData)
  const employees = newProject.employees

  const [response, setResponse] = useState<OperationResult<number> | null>(null)

  const client =
    newProject.companyName === ''
      ? newProject.clientName
      : newProject.companyName

  return (
    <>
      <CreatedDialog
        response={response}
        closeDialog={() => {
          setResponse(null)
        }}
      />
      <section className='w-500 flex items-center flex-col justify-center'>
        <h1 className='text-2xl mb-4'>Your new project overview</h1>
        <p className='w-96 mb-4 text-center'>
          Please carefully review the information you are about to submit.
        </p>
        <div className='w-500 flex items-center flex-col'>
          <div className='flex items-start w-full justify-center gap-4 rounded-lg p-4 py-0'>
            <div className='flex flex-col items-center w-full'>
              <Divider>Name</Divider>
              <h2 className='text-center line-clamp-2'>{newProject.name}</h2>
            </div>
            <div className='flex flex-col items-center w-full'>
              <Divider>Description</Divider>
              <h2 className='text-center line-clamp-2'>
                {newProject.description}
              </h2>
            </div>
          </div>
          <div className='flex items-center flex-col w-full p-4 py-0'>
            <Divider>Expected delivery date</Divider>
            <h2>
              {new Date(newProject.expectedDeliveryDate).toLocaleDateString()}
            </h2>
          </div>
          <div className='flex items-center w-full justify-center gap-4 rounded-lg p-4 py-0'>
            <div className='flex flex-col items-center w-full'>
              <Divider>Priority</Divider>
              <h2 className='text-center'>{newProject.priorityLabel}</h2>
            </div>
            <div className='flex flex-col items-center w-full'>
              <Divider>Client</Divider>
              <h2 className='text-center'>{client}</h2>
            </div>
          </div>
        </div>
        <div className='flex items-center flex-col w-full p-4 py-0'>
          <Divider>Employees</Divider>
          {Array.isArray(employees) && employees.length > 0
            ? (
            <ul className='relative list-none flex items-center -space-x-4 justify-center p-6 pt-0'>
              {employees.map((employee, index) => (
                <li key={index} className='p-4 relative'>
                  <IndividualEmployee
                    key={employee.username}
                    employee={employee}
                    size={50}
                    redirectMe={false}
                    position={{ top: '2.5rem' }}
                    showName={false}
                  />
                </li>
              ))}
            </ul>
              )
            : (
            <p className='mb-4 text-center'>
              You didn&apos;t add any employees, but don&apos;t worry, you can
              add them later.
            </p>
              )}
        </div>
        <div className='flex gap-4'>
          <Button
            text='Create project'
            func={debounce(() => {
              void (async () => {
                console.log('calling...')
                const formData = new FormData()

                const selectedDeliveryDate = new Date(
                  newProject.expectedDeliveryDate
                ).toUTCString()

                formData.append('name', newProject.name)
                formData.append('description', newProject.description)
                formData.append(
                  'priority',
                  newProject.priority?.toString() ?? ''
                )
                formData.append('expectedDeliveryDate', selectedDeliveryDate)

                if (newProject.startedWorking) {
                  formData.append('shouldStartNow', 'true')
                }

                const companyClientName = newProject.clientName
                const companyId = newProject.companyId

                // * Check if the clientName has been provided. If it is, it means that the user its creating a new client instead of selecting an existing one
                // * And we will call the create client method, get the returned value after the client is created and append it to the form data
                if (companyClientName !== undefined && companyId === 0) {
                  const res = await createClient(companyClientName)

                  if (res === null) {
                    return
                  }

                  formData.append('companyId', res.toString())
                } else if (companyId !== null && companyId !== 0) {
                  formData.append('companyId', companyId.toString())
                }

                const employees = newProject.employees

                if (employees !== null && employees.length > 0) {
                  employees.forEach((employee) => {
                    formData.append('employees', employee.employeeId.toString())
                  })
                }

                const res = await createProject(formData)
                setResponse(res)
              })()
            }, 500)}
          />
          <Button
            text='Go back'
            func={() => {
              props.goBack()
            }}
          />
        </div>
      </section>
    </>
  )
}

export default Resume
