import { Button } from '@/components/Button/Button'

const CannotCreate: React.FC = () => {
  return (
    <section className='flex items-center justify-center py-8 px-0'>
      <div className='flex flex-col items-center gap-4 justify-center p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <p>You do not participate or own this project.</p>
        <div className='flex gap-4'>
          <Button text='Request to participate' />
          <Button text='Return' />
        </div>
      </div>
    </section>
  )
}

export default CannotCreate
