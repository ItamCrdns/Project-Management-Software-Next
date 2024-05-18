import { Button } from '@/components/Button/Button'

const UnauthorizedToCreate = () => {
  return (
    <section className='flex items-center justify-center w-500'>
      <div className='flex flex-col items-center w-full gap-4 justify-center p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <h1 className='font-semibold text-center'>
          You are not authorized to create a project for this client.
        </h1>
        <Button text='Return to homepage' href='/' />
      </div>
    </section>
  )
}

export default UnauthorizedToCreate
