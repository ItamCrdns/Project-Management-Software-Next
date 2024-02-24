import { Button } from '@/components/Button/Button'

const CannotCreate: React.FC = () => {
  return (
    <section className='flex items-center justify-center py-8 px-0'>
      <div className='flex flex-col items-center justify-center p-8 rounded-md shadow-md bg-theming-white100 dark:text-theming-dark300'>
        <p>You do not participate or own this project.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button text='Request to participate' />
          <Button text='Return' />
        </div>
      </div>
    </section>
  )
}

export default CannotCreate
