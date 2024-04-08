const RecentActivity: React.FC<{ params: { username: string } }> = ({
  params
}) => {
  return (
    <section className='flex items-center flex-col text-sm shadow-md p-8 rounded-lg bg-theming-white100 dark:bg-theming-dark300'>
      <h1>
        Recent activity of <span>{params.username}</span>
      </h1>
      <section className='flex items-center justify-center flex-col'>
        <p>Here we will show their recent stuff.</p>
      </section>
    </section>
  )
}

export default RecentActivity
