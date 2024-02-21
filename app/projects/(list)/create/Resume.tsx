import handleSubmitProject from '@/api-calls/postProject'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { useRouter } from 'next/navigation'
import styles from './newProject.module.css'
import EmployeeOfTheList from '@/components/Generic Entity Renderer/EmployeeOfTheList'
import { handleCreateClient } from './handlePostClient'
import { useState } from 'react'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useNewProjectActions } from '@/lib/hooks/useNewProjectActions'
import { Divider } from '@tremor/react'

const Resume: React.FC<{ goBack: () => void }> = (props) => {
  const newProject = useAppSelector((state) => state.newProjectData)
  const { clear } = useNewProjectActions()
  const employees = newProject.employees

  const router = useRouter()

  const [error, setError] = useState<string>('')

  const handleCreateProject = async (): Promise<void> => {
    const formData = new FormData()

    const selectedDeliveryDate = new Date(
      newProject.expectedDeliveryDate
    ).toISOString()

    formData.append('name', newProject.name)
    formData.append('description', newProject.description)
    formData.append('priority', newProject.priority?.toString() ?? '')
    formData.append('expectedDeliveryDate', selectedDeliveryDate)

    const companyClientName = newProject.clientName
    const companyId = newProject.companyId

    try {
      // * Check if the clientName has been provided. If it is, it means that the user its creating a new client instead of selecting an existing one
      // * And we will call the create client method, get the returned value after the client is created and append it to the form data
      if (companyClientName !== undefined && companyId === 0) {
        const res = await handleCreateClient(companyClientName)
        formData.append('companyId', res.toString())
      } else if (companyId !== null && companyId !== 0) {
        formData.append('companyId', companyId.toString())
      }

      if (employees !== null && employees.length > 0) {
        employees.forEach((employee) => {
          formData.append('employees', employee.employeeId.toString())
        })
      }

      if (companyClientName !== undefined || companyId !== 0) {
        const res = await handleSubmitProject(formData) // * Post the new project if atleast a new client has been created or existing company has been selected
        if (res.status === 200) {
          clear() // Clear new project state after project has been created
          router.push(`/projects/${res.data}`)
        }
      }
    } catch (error: any) {
      setError(error.toString())
    }
  }

  const client =
    newProject.companyName === ''
      ? newProject.clientName
      : newProject.companyName

  return (
    <section className={styles.summary}>
      <h1>Your new project overview</h1>
      <p className='mb-4'>
        Please carefully review the information you are about to submit.
      </p>
      <div className={styles.summarydatawrapper}>
        <div className='flex items-start w-full justify-center gap-4 rounded-lg p-4 pt-0'>
          <div className='flex flex-col w-full items-center'>
            <Divider>Name</Divider>
            <h2 className='text-center w-80'>{newProject.name}</h2>
          </div>
          <div className='flex flex-col w-full items-center'>
            <Divider>Description</Divider>
            <h2 className='text-center w-80'>{newProject.description}</h2>
          </div>
        </div>
        <Divider>Expected delivery date</Divider>
        <h2>
          {new Date(newProject.expectedDeliveryDate).toLocaleDateString()}
        </h2>
        <div className='flex items-center w-full justify-center gap-4 rounded-lg p-4 pt-0'>
          <div className='flex flex-col items-center w-full'>
            <Divider>Priority</Divider>
            <h2>{newProject.priorityLabel}</h2>
          </div>
          <div className='flex flex-col items-center w-full'>
            <Divider>Client</Divider>
            <h2>{client}</h2>
          </div>
        </div>
      </div>
      <Divider>Employees</Divider>
      {Array.isArray(employees) && employees.length > 0
        ? (
        <section className={styles.employeesresume}>
          <ul className='relative'>
            {employees.map((employee) => (
              <EmployeeOfTheList
                key={employee.username}
                employee={employee}
                size={50}
                redirectMe={false}
                position={{ left: '2rem' }}
              />
            ))}
          </ul>
        </section>
          )
        : (
        <p className='mb-4'>
          You didn&apos;t add any employees, but don&apos;t worry, you can add
          them later.
        </p>
          )}
      <div className={styles.buttonwrapper}>
        <RippleButton
          text='Create project'
          backgroundColor='var(--blue)'
          textColor='white'
          asyncFunc={handleCreateProject}
        />
        <RippleButton
          text='Go back'
          backgroundColor='var(--darker-banner-color)'
          effectColor='var(--banner-color)'
          textColor='var(--text-color)'
          func={() => {
            props.goBack()
          }}
        />
      </div>
      {error !== '' && <p>{error}</p>}
    </section>
  )
}

export default Resume
