import { Button } from '@/components/Button/Button'
import { useRouter } from 'next/navigation'
import { useNewProjectActions } from '@/lib/hooks/useNewProjectActions'
import { Dialog, DialogPanel } from '@tremor/react'

interface UnsavedChangesProps {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
}

const UnsavedChanges: React.FC<UnsavedChangesProps> = (props) => {
  const { isOpen, setIsOpen } = props
  const { clear } = useNewProjectActions()
  const router = useRouter()

  const handleExit = (): void => {
    clear()
    router.push('/projects')
  }

  return (
    <Dialog open={isOpen} onClose={setIsOpen} static={true}>
      <DialogPanel>
        <h3 className='text-center font-bold'>Unsaved changes</h3>
        <p className='text-center'>
          Are you sure you want to discard this new project?
        </p>
        <p className='text-center'>Changes you have made will not be saved.</p>
        <div className='flex mt-4'>
          <Button
            text='Go back'
            func={() => {
              setIsOpen(false)
            }}
          />
          <Button text='Discard' func={handleExit} />
        </div>
      </DialogPanel>
    </Dialog>
  )
}

export default UnsavedChanges
