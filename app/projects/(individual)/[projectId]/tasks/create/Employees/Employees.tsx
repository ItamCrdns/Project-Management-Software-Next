const Employees: React.FC = () => {
  return (
    <>
      <h1 className='text-center line-clamp-2 text-2xl'>
        Assign employees to work on this task.
      </h1>
      <p className='w-96 text-center'>
        Please note that you can only add employees that are already working in
        this project.
      </p>
    </>
  )
}

export { Employees }
