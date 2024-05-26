import { Workload } from '@/interfaces/Workload'
import { BadgeComponent } from '../UI/ProjectUI/BadgeComponent'

const EmployeeWorkload = async ({
  workload
}: {
  workload: Workload | null
}) => {
  return (
    <section className='flex flex-col gap-4 items-center rounded-md shadow-md p-8 bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex gap-4 items-center'>
        <h2 className='font-semibold text-xl'>Workload</h2>
        <BadgeComponent
          content={workload?.workloadSum ?? 'None'}
          tooltip={`${workload?.workloadSum} workload`}
          color={(() => {
            switch (workload?.workloadSum) {
              case 'None':
                return 'gray'
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
      </div>
    </section>
  )
}

export default EmployeeWorkload
