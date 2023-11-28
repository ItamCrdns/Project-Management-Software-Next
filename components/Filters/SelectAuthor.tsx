import getEmployeesThatHaveCreatedProjects from '@/api-calls/getEmployeesThatHaveCreatedProjects'
import { useParams } from 'next/navigation'
import CustomSelect from '../select/select'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import { employeesAsOptions } from './employeesAsOptions'
import React, { useState } from 'react'
import { type IParams, type ISelectAuthorProps } from './SelectAuthorInterfaces'
import { type Option } from '@/interfaces/props/CustomSelectProps'

const SelectAuthor: React.FC<ISelectAuthorProps> = (props) => {
  const params: IParams = useParams()
  if (params.client === undefined) return null // ? Should never return null, but just in case

  const clientId = parseInt(params.client[0]) ?? 1

  const [currentPage, setCurrentPage] = useState<string>('1')
  const handlePageChange = (page: number): void => {
    setCurrentPage(page.toString())
  }

  const queryParams: Partial<IFilterProperties> = {
    page: currentPage,
    pageSize: '5'
  }

  const { employees } = getEmployeesThatHaveCreatedProjects(
    clientId,
    true, // TODO: Change this dependency.
    queryParams
  )

  const handleEmployeeSelect = (selectedEmployees: Option | Option[]): void => {
    if (Array.isArray(selectedEmployees)) {
      props.getAuthorsIDValues(selectedEmployees?.map((e) => e.value))
    }
  }

  return (
    <CustomSelect
      options={employeesAsOptions(employees?.data)} // ? Make the employees fit the options interface
      text="Author or authors"
      onSelect={handleEmployeeSelect}
      isPaginated
      pageSize={employees?.pages}
      onPageChange={handlePageChange}
      defaultValue={props.employeesPictures} // ? This will show the employees pictures on the select component default value. Only if they exist in the URL
      defaultEntities={props.defaultEmployees} // ! Will pass the employees object down to the select. Might not be the most generic way to do it, but I just want to get it done.
      defaultSelectedOptions={props.defaultSectedValues} // ? Will convert it to an array
      showPictures={props.showPictures}
      clearSelectedOptions={props.clearValues}
      multiple={true} // ? This will allow multiple option selection
      showCloseButton={true}
      shouldShowDropdown={props.shouldShowDropdown}
      onShowDropdown={props.onShowDropdown}
      resetActiveDropdown={props.resetActiveDropdown}
      showReset
    />
  )
}

export default SelectAuthor
