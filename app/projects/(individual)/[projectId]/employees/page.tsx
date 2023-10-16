'use client'
import { useState } from 'react'
import EmployeesRender from './EmployeesRender'
import useGetEmployees, {
  type EmployeeFetchProps,
  type UseGetEmployeesProps
} from '@/utility/employees/useGetEmployees'
import fetchEmployees from './fetchEmployees'

interface EmployeeProps {
  params: { projectId: string }
}

/**
 * Renders a list of employees for a given project.
 * @param {EmployeeProps} params - The props containing the project ID.
 * @returns {JSX.Element} - The rendered component.
 */
const EmployeesList = ({ params }: EmployeeProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('')

  /**
   * Sets the search value state based on user input.
   * @param {string} input - The user input.
   * @returns {void}
   */
  const getInputValue = (input: string): void => {
    setSearchValue(input)
  }

  /**
   * useGetEmployees hook.
   * Defining props for the hook.
   * @typedef {Object} UseGetEmployeesProps
   * @property {string} entityId - The ID of the entity to fetch employees for.
   * @property {string} searchValue - The search value to filter employees by.
   * @property {Function} fetchEmployees - The function to fetch employees.
   *
   * The reason why this takes a function as argument is because the hook is made to fetch
   * from different endpoints. sometimes to get the employees from a company
   * other times to get the employees from a project
   * this way we avoid code repetition and follow (kinda) SOLID principles
   */

  const employeesProps: UseGetEmployeesProps = { // Defining the props outside
    entityId: params.projectId.toString(),
    searchValue,
    fetchEmployees: async ({
      entityId: projectId,
      searchValue,
      page
    }: EmployeeFetchProps) =>
      await fetchEmployees({ projectId, searchValue, page })
  }

  const { employeeList, totalPages, handlePageChange, message } =
    useGetEmployees(employeesProps) // Passing the props to the hook

  return (
    <EmployeesRender
      projectId={params.projectId}
      employeeList={employeeList}
      message={message}
      searchValue={searchValue}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
      getInputValue={getInputValue}
    />
  )
}

export default EmployeesList
