import getEntitiesCreatedLastWeek from '@/api-calls/getEntitiesCreatedLastWeek'

const AdminBanners: React.FC = async () => {
  const { data } = await getEntitiesCreatedLastWeek()

  const projectsLastWeek = data?.projectsLastWeek
  const tasksLastWeek = data?.tasksLastWeek
  const issuesLastWeek = data?.issuesLastWeek

  return (
    <>
      <div className='flex items-center justify-between gap-4 p-4 rounded-lg shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <div>
          <h1 className='font-semibold m-0'>New projects</h1>
          <p className='text-center m-0'>{projectsLastWeek} this week</p>
        </div>
        <span className='text-white bg-azure-radiance-300 p-4 rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
            />
          </svg>
        </span>
      </div>
      <div className='flex items-center justify-between gap-4 p-4 rounded-lg shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <div>
          <h1 className='font-semibold m-0'>New tasks</h1>
          <p className='text-center m-0'>{tasksLastWeek} this week</p>
        </div>
        <span className='text-white bg-azure-radiance-300 p-4 rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3'
            />
          </svg>
        </span>
      </div>
      <div className='flex items-center justify-between gap-4 p-4 rounded-lg shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <div>
          <h1 className='font-semibold m-0'>New issues</h1>
          <p className='text-center m-0'>{issuesLastWeek} this week</p>
        </div>
        <span className='text-white bg-azure-radiance-300 p-4 rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46'
            />
          </svg>
        </span>
      </div>
    </>
  )
}

export default AdminBanners
