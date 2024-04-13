import { Button } from '@/components/Button/Button'

const CannotCreate: React.FC = () => {
  return (
    <section className='flex items-center justify-center w-500'>
      <div className='flex flex-col items-center w-full gap-4 justify-center p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <h1 className='font-semibold text-lg text-center'>You do not participate or own this project.</h1>
        <div className='flex gap-4'>
          <Button text='Request to participate' />
          <Button text='Return' />
        </div>
      </div>
    </section>
  )
}

export default CannotCreate
