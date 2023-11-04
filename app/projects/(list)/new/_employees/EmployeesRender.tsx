import Resume from '../Resume'
import Search from '@/components/search/search'
import EmployeeList from './EmployeeList'
import Pagination from '@/components/pagination/pagination'
import Buttons from './Buttons'
import { type EmployeesRenderProps } from '@/interfaces/props/EmployeesRenderProps'

const EmployeesRender: React.FC<EmployeesRenderProps> = (props) => {
  const {
    data,
    newData,
    employeeList,
    selectedEmployees,
    message,
    handleEmployeeClick,
    handleSubmit,
    handleGoBack,
    showResume,
    handleReturnHere,
    handleInputChange,
    handlePageChange,
    totalPages,
    resetPage,
    getInputValue
  } = props
  return (
    <>
      {showResume
        ? (
        <Resume
          project={newData}
          employees={selectedEmployees}
          goBack={handleReturnHere}
        />
          )
        : (
        <>
          <h1>Who will be working on {data.data.name}?</h1>
          <Search
            maxInputLength={16}
            onInputChange={handleInputChange}
            stateBasedSearch={true}
            stateBasedGetInputValue={getInputValue}
          />
          <EmployeeList
            employeeList={employeeList}
            selectedEmployees={selectedEmployees}
            message={message}
            handleEmployeeClick={handleEmployeeClick}
          />
          <p style={{ margin: 0, fontSize: '12px' }}>
            Showing only {data.data.companyName} employees
          </p>
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            reset={resetPage}
          />
          <Buttons
            selectedEmployees={selectedEmployees}
            handleSubmit={handleSubmit}
            handleGoBack={handleGoBack}
          />
        </>
          )}
    </>
  )
}

export default EmployeesRender
