'use client'
import React, { useRef, useState } from 'react'
import styles from './newProject.module.css'
import Button from '@/components/button/button'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { type Company } from '@/interfaces/company'
import useCompanyDropdown from '@/utility/companyDropdown'
// import { type Employee } from '@/interfaces/employee'
import { type NewProjectData } from '@/interfaces/NewProjectData'
// import useGetEmployees from './useGetEmployees'
// import AddEmployeesToProject from './Employees'
import AddDescription from './AddDescription'

const initialState: NewProjectData = {
  data: {
    name: '',
    description: '',
    companyId: 0,
    companyName: '',
    priority: 0,
    employees: null
  },
  setData: () => {}
}

const NewProjectModal = (): JSX.Element => {
  const { companies, error } = useCompanyDropdown({ dependency: true })
  const [data, setData] = useState<NewProjectData>(initialState) // * Data to send to the backend

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    )

    setData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        name: formData.name as string,
        companyId: parseInt((formData.companyId as string) ?? '0'),
        companyName: (
          companies?.find(
            (company: Company) =>
              company.companyId ===
              parseInt((formData.companyId as string) ?? '0')
          ) ?? { name: '' }
        ).name
      }
    }))
  }

  const handleClick = useSubmitRef(formRef)

  const projectName = data.data.name
  const companyId = data.data.companyId
  // const companyName = data.data.companyName

  const dependency = projectName !== '' && companyId !== 0

  return (
    <section className={styles.newprojectwrapper}>
      <section className={styles.newproject}>
        {dependency
          ? (
            <AddDescription data={data} />
            )
          : (
          <>
            <h1>Create a new project</h1>
            <form ref={formRef} onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Project name" />
              <select defaultValue={'DEFAULT'} name="companyId">
                <option value="DEFAULT" disabled hidden>
                  Select a company...
                </option>
                {Array.isArray(companies) &&
                  companies.map((company: Company) => (
                    <option key={company.companyId} value={company.companyId}>
                      {company.name}
                    </option>
                  ))}
              </select>
            </form>
            {error !== null && (
              <p style={{ fontSize: '8px', textAlign: 'center' }}>
                {error.toString()}
              </p>
            )}
            <div onClick={handleClick}>
              <Button text="Next" backgroundColor="blue" />
            </div>
          </>
            )}
      </section>
    </section>
  )
}

export default NewProjectModal
