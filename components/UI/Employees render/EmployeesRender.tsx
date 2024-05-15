import EmployeeList from '@/components/UI/Employees render/EmployeeList'
import ServerPagination from '@/components/pagination/ServerPagination'
import ReturnBadgeLink from '@/components/UI/Return/ReturnBadgeLink'
import { EmployeesRenderProps } from './EmployeesRenderProps.interface'

const EmployeesRender: React.FC<EmployeesRenderProps> = (props) => {
  return (
    <section className='fixed bg-black bg-opacity-20 w-full h-full flex flex-col items-center justify-center m-0 p-0 z-999'>
      <div className='absolute top-8 flex items-center justify-center flex-col min-h-96 bg-theming-white100 dark:bg-theming-dark300 p-8 rounded-lg shadow-md'>
        <div className='absolute flex self-end top-0 right-0 m-4'>
          <ReturnBadgeLink path={props.closeButtonHref} />
        </div>
        <EmployeeList
          headerText={props.headerText}
          employeeList={props.employeeList}
          isLoading={props.isLoading}
        />
        <ServerPagination
          currentPage={Number(props.searchParams.page)}
          totalPages={props.totalPages}
        />
      </div>
    </section>
  )
}

export default EmployeesRender
