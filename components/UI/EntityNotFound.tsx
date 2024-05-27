import { Button } from '../Button/Button'

const EntityNotFound: React.FC<{ entity: string }> = (props) => {
  return (
    <aside className='flex flex-col items-center gap-8'>
      <div className='flex flex-col gap-8 w-[400px]'>
        <div className='w-full'>
          <div className='flex flex-col space-y-4 items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
            <h1 className='text-center font-semibold'>
              {props.entity} not found
            </h1>
            <Button
              text='Return to homepage'
              borderOnly={true}
              txtColor='black'
              href='/'
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

export { EntityNotFound }
