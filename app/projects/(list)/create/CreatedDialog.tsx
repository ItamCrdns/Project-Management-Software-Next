import RippleButton from '@/components/ripplebutton/RippleButton'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { useNewProjectActions } from '@/lib/hooks/useNewProjectActions'
import { Dialog, DialogPanel } from '@tremor/react'
import { useRouter } from 'next/navigation'

interface CreatedDialogProps {
  response: OperationResult<number> | null
  closeDialog: () => void
}

const CreatedDialog: React.FC<CreatedDialogProps> = (props) => {
  const { response, closeDialog } = props

  const { clear } = useNewProjectActions()

  const router = useRouter()

  const handleCloseAndClear = (): void => {
    clear()
    router.push('/projects')
  }

  const handleCloseAndGoToProject = (): void => {
    clear()
    router.push(`/projects/${response?.data}`)
  }

  return (
    <Dialog open={response !== null} onClose={closeDialog} static={true}>
      <DialogPanel>
        {response?.success === false
          ? (
          <>
            <h3 className='text-center font-bold'>Oops!</h3>
            <p className='text-center mb-4'>{response?.message}</p>
            <RippleButton
              text='Close'
              backgroundColor='var(--darker-banner-color)'
              func={closeDialog}
            />
          </>
            )
          : (
          <>
            <h3 className='text-center font-bold'>Project created</h3>
            <p className='text-center mb-4'>
              Your project has been created successfully
            </p>
            <div className='space-y-4'>
              <RippleButton
                text='See project'
                backgroundColor='var(--blue)'
                textColor='white'
                func={handleCloseAndGoToProject}
              />
              <RippleButton
                text='Close'
                backgroundColor='var(--darker-banner-color)'
                func={handleCloseAndClear}
              />
            </div>
          </>
            )}
      </DialogPanel>
    </Dialog>
  )
}

export default CreatedDialog
