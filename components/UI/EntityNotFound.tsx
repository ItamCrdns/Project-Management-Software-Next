const EntityNotFound: React.FC<{ entity: string }> = (props) => {
  return (
    <aside className='flex flex-col items-center gap-8'>
      <div className='flex flex-col gap-8 w-[400px]'>
        <div className='w-full space-y-2'>
          <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
            <h1 className='text-center font-semibold'>
              {props.entity} not found
            </h1>
          </div>
        </div>
      </div>
    </aside>
  )
}

export { EntityNotFound }
