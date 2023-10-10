import { useState, useEffect } from 'react'
import { type Employee } from '@/interfaces/employee'
import getPaginatedEmployees from '@/api-calls/getPaginatedEmployees'

interface GetEmployeesHookProps {
  dependency: boolean
}

const useGetEmployees = ({ dependency }: GetEmployeesHookProps): Employee[] | null => {
  const [employees, setEmployees] = useState<Employee[] | null>(null)

  const getEmployees = (): void => {
    getPaginatedEmployees('1', '5')
      .then((response) => {
        setEmployees(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (dependency) {
      getEmployees()
    }
  }, [dependency])

  return employees
}

export default useGetEmployees
