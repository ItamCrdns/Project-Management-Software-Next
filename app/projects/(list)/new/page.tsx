'use client'
import { useRef, useState } from 'react'
import styles from './newProject.module.css'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { type Company } from '@/interfaces/company'
import useCompanyDropdown from '@/utility/CompanyDropdown'
import { type NewProjectData } from '@/interfaces/NewProjectData'
import AddDescription from './AddDescription'
import CustomSelect, { type Option } from '@/components/select/select'
import { InputAndCharacterCount } from '@/components/charactercount/CharacterCount'
import { type Employee } from '@/interfaces/employee'
import { useRouter } from 'next/navigation'
import UnsavedChanges from './UnsavedChanges'

const initialState: NewProjectData = {
  data: {
    name: '',
    description: '',
    companyId: 0,
    companyName: '',
    priority: 0,
    priorityLabel: '',
    employees: null
  },
  setData: () => {}
}

const NewProjectModal = (): JSX.Element => {
  const { companies, error } = useCompanyDropdown({ dependency: true })
  const [data, setData] = useState<NewProjectData>(initialState) // * Data to send to the backend

  const [readyForNextPage, setReadyForNextPage] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    setReadyForNextPage(true)
  }

  const handleClick = useSubmitRef(formRef)

  const projectName = data.data.name
  const companyId = data.data.companyId

  const dependency = projectName !== '' && companyId !== 0 && readyForNextPage

  const companyOptions = companies?.map((company: Company) => ({
    value: parseInt(company.companyId.toString()),
    label: company.name,
    info: ''
  }))

  /**
   * Callback function passed as props that updates the state with the selected company's ID and name.
   * @param selectedValue - The selected company's option object.
   */
  const handleCompanySelect = (selectedValue: Option): void => {
    setData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        companyId: selectedValue.value,
        companyName: selectedValue.label
      }
    }))
  }

  const handleInputSubmit = (projectName: string): void => {
    setData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        name: projectName
      }
    }))
  }

  // Catch the values of the description and priority fields from the next page
  const handleReturnHere = (
    descriptionValue: string,
    priorityValue: number | null,
    priorityLabel: string | null,
    employeesValue: Employee[] | null
  ): void => {
    setReadyForNextPage(false)

    // * And set the again so we dont lose the data when navigating with the buttons
    setData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        description: descriptionValue,
        priorityLabel: priorityLabel ?? '',
        priority: priorityValue ?? 0,
        employees: employeesValue
      }
    }))
  }

  const [showUnsavedChanges, setShowUnsavedChanges] = useState<boolean>(false)

  const router = useRouter()

  const handleExitNewProjectCreation = (): void => {
    if (data.data.name !== '' || data.data.companyId !== 0) {
      setShowUnsavedChanges(true)
    } else {
      router.push('/projects/')
      setShowUnsavedChanges(false)
    }
  }

  const handleCancelClose = (): void => {
    setShowUnsavedChanges(false)
  }

  return (
    <section className={styles.newprojectwrapper}>
      {showUnsavedChanges && <UnsavedChanges goBack={handleCancelClose} />}
      <section className={styles.newproject}>
        <span
          onClick={handleExitNewProjectCreation}
          className={`material-symbols-outlined ${styles.closebutton}`}
        >
          close
        </span>
        {dependency
          ? (
          <AddDescription data={data} goBack={handleReturnHere} />
            )
          : (
          <>
            <h1>Create a new project</h1>
            <form ref={formRef} onSubmit={handleSubmit}>
              <p style={{ width: '400px', marginTop: '0' }}>
                Enter a clear project name. It&apos;ll appear to your team
                members and should indicate what the project is focused on.
              </p>
              <InputAndCharacterCount
                defaultValue={data.data.name ?? ''}
                name="name"
                placeholder="Project name"
                limit={255}
                onSubmit={handleInputSubmit}
              />
              <CustomSelect
                defaultValue={data.data.companyName ?? ''}
                options={companyOptions ?? []}
                text="company"
                onSelect={handleCompanySelect}
              />
            </form>
            {error !== null && (
              <p style={{ fontSize: '8px', textAlign: 'center' }}>
                {error.toString()}
              </p>
            )}
            <div onClick={handleClick}>
              <RippleButton text="Next" backgroundColor="#80B3FF" textColor="white" />
            </div>
          </>
            )}
      </section>
    </section>
  )
}

export default NewProjectModal
