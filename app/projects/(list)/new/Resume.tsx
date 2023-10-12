import { type NewProjectData } from '@/interfaces/NewProjectData'
import handleSubmitProject from './postProject'
import Button from '@/components/button/button'
import { useRouter } from 'next/navigation'
import styles from './newProject.module.css'
import { type Employee } from '@/interfaces/employee'
import EmployeeOfTheList from '../EmployeeOfTheList'

interface LastPageProps {
  project: NewProjectData
  employees: Employee[] | null
  goBack: () => void
}

const Resume = ({ project, employees, goBack }: LastPageProps): JSX.Element => {
  const router = useRouter()

  const handleCreateProject = (): void => {
    const formData = new FormData()

    formData.append('name', project.data.name)
    formData.append('description', project.data.description)
    formData.append('companyId', project.data.companyId?.toString() ?? '')
    formData.append('priority', project.data.priority?.toString() ?? '')

    if (employees !== null) {
      employees.forEach((employee) => {
        formData.append('employees', employee.employeeId.toString())
      })
    }

    handleSubmitProject(formData)
      .then((res) => {
        if (res.status === 200) {
          router.push(`/projects/${res.data}`)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleGoBack = (): void => {
    goBack()
  }

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
      </div>
      <div className={styles.companyprioritywrapper}>
        <span>
          <p>Priority</p>
          <h2>{project.data.priorityLabel}</h2>
        </span>
        <span>
          <p>Company</p>
          <h2>{project.data.companyName}</h2>
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
        <div onClick={handleCreateProject}>
          <Button
            text="Create project"
            backgroundColor="#80B3FF"
            width="120px"
            textColor="white"
          />
        </div>
        <div onClick={handleGoBack}>
          <Button
            text="Go back"
            backgroundColor="var(--darker-banner-color)"
            effectColor="var(--banner-color)"
            textColor="var(--text-color)"
          />
        </div>
      </div>
    </section>
  )
}

export default Resume
