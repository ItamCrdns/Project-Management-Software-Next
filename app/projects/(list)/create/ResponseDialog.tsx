import { Button } from '@/components/Button/Button'
import { type ApiResponse } from '@/interfaces/apiResponse'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { Dialog, DialogPanel } from '@tremor/react'
import { useRouter } from 'next/navigation'

interface CreatedDialogProps {
  response: ApiResponse<OperationResult<number>> | null
  closeDialog: () => void
}

const ResponseDialog: React.FC<CreatedDialogProps> = (props) => {
  const { response, closeDialog } = props

  const { clear } = useNewProjectActions()

  const router = useRouter()

  const handleCloseAndClear = (): void => {
    clear()
    router.push('/projects')
  }

  const handleCloseAndGoToProject = (): void => {
    clear()
    router.push(`/projects/${response?.data?.data}`)
  }

  return (
    <Dialog open={response !== null} onClose={closeDialog} static={true}>
      <DialogPanel>
        {response?.data?.success === true
          ? (
          <>
            <h3 className='text-center font-bold'>Project created</h3>
            <p className='text-center mb-4'>
              Your project has been created successfully
            </p>
            <div className='space-y-4'>
              <Button text='See project' func={handleCloseAndGoToProject} />
              <Button text='Close' func={handleCloseAndClear} />
            </div>
          </>
            )
          : (
          <>
            <h3 className='text-center font-bold'>Oops!</h3>
            <p className='text-center'>{response?.error?.title}</p>
            <p className='text-center text-xs mb-4'>Contact your administrator</p>
            {Object.entries(response?.error?.errors ?? []).map(
              ([key, value]) => (
                <div key={key} className='flex flex-col items-center'>
                  <h4 className='text-center'>{'>'} {key}</h4>
                  <ul className='list-disc mb-4'>
                    {value.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
            <Button text='Close' func={closeDialog} />
          </>
            )}
      </DialogPanel>
    </Dialog>
  )
}

export default ResponseDialog
