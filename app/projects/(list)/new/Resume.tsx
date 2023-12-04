import handleSubmitProject from '@/api-calls/postProject'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { useRouter } from 'next/navigation'
import styles from './newProject.module.css'
import EmployeeOfTheList from '@/components/Generic Entity Renderer/EmployeeOfTheList'
import { type NewProjectResumeProps } from '@/interfaces/props/NewProjectResumeProps'
import { handleCreateClient } from './handlePostClient'
import { useState } from 'react'

const Resume: React.FC<NewProjectResumeProps> = (props) => {
  const { project, employees, goBack } = props

  const router = useRouter()

  const [error, setError] = useState<string>('')

  const handleCreateProject = async (): Promise<void> => {
    const formData = new FormData()

    formData.append('name', project.data.name)
    formData.append('description', project.data.description)
    formData.append('priority', project.data.priority?.toString() ?? '')
    formData.append(
      'expectedDeliveryDate',
      project.data.expectedDeliveryDate ?? null
    )

    const companyClientName = project.data.clientName
    const companyId = project.data.companyId

    try {
      // * Check if the clientName has been provided. If it is, it means that the user its creating a new client instead of selecting an existing one
      // * And we will call the create client method, get the returned value after the client is created and append it to the form data
      if (companyClientName !== undefined && companyId === 0) {
        const res = await handleCreateClient(companyClientName)
        formData.append('companyId', res.toString())
      } else if (companyId !== null && companyId !== 0) {
        formData.append('companyId', companyId.toString())
      }

      if (employees !== null) {
        employees.forEach((employee) => {
          formData.append('employees', employee.employeeId.toString())
        })
      }

      if (companyClientName !== undefined || companyId !== 0) {
        const res = await handleSubmitProject(formData) // * Post the new project if atleast a new client has been created or existing company has been selected
        if (res.status === 200) {
          router.push(`/projects/${res.data}`)
        }
      }
    } catch (error: any) {
      console.error(error)
      setError(error.toString())
    }
  }

  const handleGoBack = (): void => {
    goBack()
  }

  const client =
    project.data.companyName === ''
      ? project.data.clientName
      : project.data.companyName

  return (
    <section className={styles.summary}>
      <h1>Your new project overview</h1>
      <p>Please carefully review the information you are about to submit.</p>
      <div className={styles.summarydatawrapper}>
        <span className={styles.summaryinfo}>
          <p>Name</p>
          <h2>{project.data.name}</h2>
        </span>
        <span className={styles.summaryinfo}>
          <p>Description</p>
          <h2>{project.data.description}</h2>
        </span>
        <span className={styles.summaryinfo}>
          <p>Expected delivery date</p>
          <h2>{project.data.expectedDeliveryDate}</h2>
        </span>
      </div>
      <div className={styles.companyprioritywrapper}>
        <span>
          <p>Priority</p>
          <h2>{project.data.priorityLabel}</h2>
        </span>
        <span>
          <p>Client</p>
          <h2>{client}</h2>
        </span>
      </div>
      {Array.isArray(employees) &&
        (employees.length > 0
          ? (
          <section className={styles.employeesresume}>
            <ul>
              {employees.map((employee) => (
                <EmployeeOfTheList
                  key={employee.username}
                  employee={employee}
                  size={50}
                  redirectMe={false}
                />
              ))}
            </ul>
          </section>
            )
          : (
          <p>
            You didn&apos;t add any employees, but don&apos;t worry, you can add
            them later.
          </p>
            ))}
      <div className={styles.buttonwrapper}>
        <RippleButton
          text='Create project'
          backgroundColor='#80B3FF'
          textColor='white'
          asyncFunc={handleCreateProject}
        />
        <RippleButton
          text='Go back'
          backgroundColor='var(--darker-banner-color)'
          effectColor='var(--banner-color)'
          textColor='var(--text-color)'
          func={handleGoBack}
        />
      </div>
      {error !== '' && <p>{error}</p>}
    </section>
  )
}

export default Resume
