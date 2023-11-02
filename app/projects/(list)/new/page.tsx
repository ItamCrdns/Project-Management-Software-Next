'use client'
import { useRef, useState } from 'react'
import styles from './newProject.module.css'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { useSubmitRef } from '@/utility/formSubmitRef'
import useCompanyDropdown from '@/utility/CompanyDropdown'
import { type NewProjectData } from '@/interfaces/NewProjectData'
import AddDescription from './AddDescription'
import CustomSelect, { type Option } from '@/components/select/select'
import { InputAndCharacterCount } from '@/components/charactercount/CharacterCount'
import { type Employee } from '@/interfaces/employee'
import { useRouter } from 'next/navigation'
import UnsavedChanges from './UnsavedChanges'
import useCompanyOptions from '@/utility/companyOptions'
import ExpectedDeliveryDateSelector from './ExpectedDeliveryDateSelector'
import CreateNewClient from './CreateNewClient'

const initialState: NewProjectData = {
  data: {
    name: '',
    description: '',
    companyId: 0,
    companyName: '',
    priority: 0,
    priorityLabel: '',
    employees: null,
    expectedDeliveryDate: '',
    clientName: ''
  },
  setData: () => {}
}

const NewProjectModal = (): JSX.Element => {
  const { companies, error } = useCompanyDropdown({ dependency: true })
  const [data, setData] = useState<NewProjectData>(initialState) // * The new project data

  const [readyForNextPage, setReadyForNextPage] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    setReadyForNextPage(true)
  }

  const handleClick = useSubmitRef(formRef)

  const projectName = data.data.name
  const companyId = data.data.companyId
  const expectedDeliveryDate = data.data.expectedDeliveryDate

  const clientProvided = data.data.clientName !== '' || companyId !== 0

  const dependency =
    projectName !== '' &&
    clientProvided &&
    expectedDeliveryDate !== '' &&
    readyForNextPage

  const companyOptions = useCompanyOptions({ companies })

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

  const getDateCallback = (date: string): void => {
    setData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        expectedDeliveryDate: date
      }
    }))
  }

  const getClientName = (clientName: string): void => {
    // If the user creates a new client, the client name will be passed to the data state
    setData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        clientName
      }
    }))
  }

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  const checkIfNewClientFormIsOpen = (isOpen: boolean): void => {
    setIsFormOpen(isOpen)
  }

  const companySelected = data.data.companyId !== 0

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
                text="client"
                onSelect={handleCompanySelect}
                width="100%"
                disabled={isFormOpen}
              />
              <CreateNewClient
                sendClientName={getClientName}
                newClientOpen={checkIfNewClientFormIsOpen}
                companySelected={companySelected}
              />
              <ExpectedDeliveryDateSelector
                getDate={getDateCallback}
                defaultValue={expectedDeliveryDate}
              />
            </form>
            {error !== null && (
              <p style={{ fontSize: '8px', textAlign: 'center' }}>
                {error.toString()}
              </p>
            )}
            <RippleButton
              text="Next"
              backgroundColor="#80B3FF"
              textColor="white"
              func={handleClick}
            />
          </>
            )}
      </section>
    </section>
  )
}

export default NewProjectModal
