import RippleButton from '@/components/ripplebutton/RippleButton'
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
          <RippleButton
            text='Go back'
            backgroundColor='var(--blue)'
            textColor='white'
            func={() => {
              setIsOpen(false)
            }}
          />
          <RippleButton
            text='Discard'
            backgroundColor='rgb(255, 80, 120)'
            effectColor='rgb(255, 50, 120)'
            textColor='white'
            func={handleExit}
          />
        </div>
      </DialogPanel>
    </Dialog>
  )
}

export default UnsavedChanges
