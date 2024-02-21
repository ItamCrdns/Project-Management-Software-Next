import Resume from '../Resume'
import Search from '@/components/search/search'
import EmployeeList from './EmployeeList'
import Pagination from '@/components/pagination/pagination'
import Buttons from './Buttons'
import { type EmployeesRenderProps } from '@/interfaces/props/EmployeesRenderProps'
import { useAppSelector } from '@/lib/hooks/hooks'

const EmployeesRender: React.FC<EmployeesRenderProps> = (props) => {
  const newProject = useAppSelector((state) => state.newProjectData)

  const {
    employeeList,
    message,
    handleEmployeeClick,
    handleSubmit,
    handleGoBack,
    showResume,
    handleReturnHere,
    handlePageChange,
    totalPages,
    resetPage,
    getInputValue
  } = props

  return (
    <>
      {showResume
        ? (
        <Resume goBack={handleReturnHere} />
          )
        : (
        <>
          <h1 className='text-center line-clamp-2'>Who will be working on {newProject.name}?</h1>
          <Search
            maxInputLength={16}
            stateBasedSearch={true}
            stateBasedGetInputValue={getInputValue}
          />
          <EmployeeList
            employeeList={employeeList}
            selectedEmployees={newProject.employees}
            message={message}
            handleEmployeeClick={handleEmployeeClick}
          />
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            reset={resetPage}
          />
          <Buttons
            selectedEmployees={newProject.employees}
            handleSubmit={handleSubmit}
            handleGoBack={handleGoBack}
          />
        </>
          )}
    </>
  )
}

export default EmployeesRender
