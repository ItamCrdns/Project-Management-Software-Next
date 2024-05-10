import { getMyTeam } from '@/api-calls/getMyTeam'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { BadgeComponent } from '@/components/UI/ProjectUI/BadgeComponent'
import { DateBadge } from '@/components/UI/ProjectUI/Badges/DateBadge'
import { Table, TableBody, TableCell, TableRow } from '@tremor/react'
import { TableCellEmployees } from './TableCellEmployees'
import { SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import generateQueryParams from '@/app/projects/client/queryParams'

const MyTeam: React.FC<{ searchParams: SearchParamsPageSize }> = async (
  props
) => {
  const queryParams = generateQueryParams(props.searchParams)

  const { data: team } = await getMyTeam(queryParams)

  const paginationProps = {
    totalPages: team?.pages ?? 0,
    entityName: 'Employees',
    totalEntitesCount: team?.count ?? 0,
    defaultPageSize: !isNaN(Number(queryParams.pageSize))
      ? Number(queryParams.pageSize)
      : 5
  }

  return (
    <>
      <QueryParamsPagination paginationProps={paginationProps} />
      <section className='bg-theming-white100 dark:bg-theming-dark300 rounded-md p-8 flex flex-col gap-4 shadow-md mt-8 relative'>
        <Table>
          <TableBody>
            {team?.data.map((employee) => (
              <TableRow
                key={employee.employeeId}
                className='flex justify-center items-center overflow-hidden'
              >
                <TableCellEmployees employee={employee} />
                <TableCell className='flex justify-center w-[300px]'>
                  <DateBadge
                    date={employee.lastLogin}
                    showCustomColor={true}
                    text=''
                    textSize='text-sm'
                  />
                </TableCell>
                <TableCell className='flex justify-center w-[300px]'>
                  {employee.tier.name}
                </TableCell>
                <TableCell className='flex justify-center w-[300px]'>
                  {employee.tier.duty}
                </TableCell>
                {employee.workload !== null &&
                employee.workload !== undefined ? (
                  <TableCell className='flex justify-center w-[300px]'>
                    <BadgeComponent
                      content={employee.workload}
                      tooltip={`${employee.workload} workload`}
                      color={(() => {
                        switch (employee.workload) {
                          case 'None':
                            return 'blue'
                          case 'Low':
                            return 'green'
                          case 'Medium':
                            return 'yellow'
                          case 'High':
                            return 'orange'
                          case 'Very High':
                            return 'red'
                          default:
                            return 'blue'
                        }
                      })()}
                    />
                  </TableCell>
                ) : (
                  <TableCell className='flex justify-center w-[300px]'>
                    None
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  )
}

export { MyTeam }
