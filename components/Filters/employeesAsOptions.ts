import { type Employee } from '@/interfaces/employee'
import { type Option } from '@/interfaces/props/CustomSelectProps'

export const employeesAsOptions = (employees?: Employee[]): Option[] => {
  const employeesArray: Option[] = [] // ? Initialize the array

  // ? Translating the employees array to an array of options that the CustomSelect component can understand
  // TODO: Might create a generic method that can be used for all the entities, as of now this method its rewritten two times
  employees?.forEach((employee) => {
    const entityAsEmployee: Option = {
      value: employee.employeeId,
      label: employee.username,
      info: '', // ? We dont need this for the employee. And not specifying it will it undefined which I dont want so just empty string
      picture: employee.profilePicture
    }

    employeesArray.push(entityAsEmployee) // ? Push the employee to the array on each iteration
  })

  return employeesArray // ? Return the array
}
