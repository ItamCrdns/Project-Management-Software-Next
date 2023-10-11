import { type NewProjectData } from '@/interfaces/NewProjectData'
import handleSubmitProject from './postProject'
import Button from '@/components/button/button'
import { useRouter } from 'next/navigation'
import styles from './newProject.module.css'
import { type Employee } from '@/interfaces/employee'
import EmployeeOfTheList from '../../EmployeeOfTheList'

interface LastPageProps {
  project: NewProjectData
  employees: Employee[] | null
}

const Resume = ({ project, employees }: LastPageProps): JSX.Element => {
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
      {Array.isArray(employees) && (
        <section className={styles.employeesresume}>
          <ul>
            {employees.map((employee) => (
              <EmployeeOfTheList key={employee.username} employee={employee} size={50} redirectMe={false} />
            ))}
          </ul>
        </section>
      )}
      <div className={styles.buttonwrapper}>
        <div onClick={handleCreateProject}>
          <Button
            text="Create project"
            backgroundColor="#352F44"
            width="120px"
          />
        </div>
        <div>
          <Button text="Reset" backgroundColor="white" textColor="black" />
        </div>
      </div>
    </section>
  )
}

export default Resume
