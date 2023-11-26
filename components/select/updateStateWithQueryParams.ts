import { type Employee } from '@/interfaces/employee'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { useEffect, useState } from 'react'
import { type SelectUIProps } from './SelectUI'

// ? This function takes a defEmployees which comes from an API request that gets all employees entities based on the IDs in the URL.
// ? In other words, it gets the employees that are selected in the URL, as long as they are valid.
// ? However, getting them from the URL is not enough, because we need to update the state of the select component with the employees that are selected in the URL.
// ? This way, the select component will have all URL options selected by default. And clicking them again will de-select them both in the URL and in the select component.

// * Using an extra state to prevent useEffect from running more than once
// ? I cant use empty array as a dependency because the data its coming from an API, so it will always be empty on the first render
// ? So we must wait until the data is ready to run useEffect
// TODO: 0 employes might introduce infinite loop?

// TODO: query param author when its value its 'all' doesnt actually work. Adjust it so it makes an API request to get all employees entities
export const updateStateWithQueryParams = (
  defEmployees: Employee[],
  props: Partial<SelectUIProps>
): void => {
  const [useEffectHasRun, setUseEffectHasRun] = useState<boolean>(false)

  useEffect(() => {
    // * Currently, this manages employees only. If we were to manage other entities, we would need to change this to a more generic approach.
    // * By the time being, this is fine. I will change it later on, if needed.
    if (defEmployees.length > 0 && !useEffectHasRun) {
      setUseEffectHasRun(true)
      defEmployees?.forEach((e) => {
        const newOption: Option = {
          value: e.employeeId,
          label: e.username,
          info: '',
          picture: e.profilePicture
        }
        if (defEmployees.length === 1) {
          // ? This fixes the bug where the first option is not selected if no query params are present
          props.handleMultipleOptionClick?.(newOption)
        }
        props.handleMultipleOptionClick?.(newOption)
      })
    }
  }, [defEmployees])
}
