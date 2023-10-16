import Resume from '../Resume'
import Search from '@/components/search/search'
import EmployeeList from './EmployeeList'
import Pagination from '@/components/pagination/pagination'
import Buttons from './Buttons'
import { type NewProjectData } from '@/interfaces/NewProjectData'
import { type Employee } from '@/interfaces/employee'

interface EmployeesRenderProps {
  showResume: boolean
  newData: NewProjectData
  selectedEmployees: Employee[] | null
  handleReturnHere: () => void
  data: NewProjectData
  getInputValue: (input: string) => void
  employeeList: Employee[]
  message: string
  handleEmployeeClick: (employee: Employee) => void
  totalPages: number
  handlePageChange: (page: number) => void
  resetPage: boolean
  handleSubmit: () => void
  handleGoBack: () => void
}

const EmployeesRender: React.FunctionComponent<EmployeesRenderProps> = ({
  showResume,
  newData,
  selectedEmployees,
  handleReturnHere,
  data,
  getInputValue,
  employeeList,
  message,
  handleEmployeeClick,
  totalPages,
  handlePageChange,
  resetPage,
  handleSubmit,
  handleGoBack
}) => {
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
          <Search maxInputLength={16} onSearch={getInputValue} />
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
