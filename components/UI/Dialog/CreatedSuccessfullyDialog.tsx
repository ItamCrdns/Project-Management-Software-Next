import { Button } from '@/components/Button/Button'
import { type ApiResponse } from '@/interfaces/apiResponse'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { Dialog, DialogPanel } from '@tremor/react'

const CreatedSuccessfullyDialog: React.FC<{
  response: ApiResponse<OperationResult<number>> | null
  closeDialog: () => void
  entity: string
  href: string
}> = (props) => {
  const { response, closeDialog, entity, href } = props

  const { clear } = useNewProjectActions()

  return (
    <Dialog open={response !== null} onClose={closeDialog} static={true}>
      <DialogPanel>
        {response?.data?.success === true
          ? (
          <>
            <h3 className='text-center font-bold'>
              <span className='capitalize'>{entity}</span> created
            </h3>
            <p className='text-center mb-4'>
              Your <span className='lowercase'>{entity}</span> has been created
              successfully
            </p>
            <div className='space-y-4'>
              <div
                onClick={() => {
                  clear()
                }}
              >
                <Button
                  text={`Go to ${entity}`}
                  href={`/${href}/${response.data.data}`}
                />
              </div>
              <div
                onClick={() => {
                  clear()
                }}
              >
                <Button text='Close' href={`/${href}`} />
              </div>
            </div>
          </>
            )
          : (
          <>
            <h3 className='text-center font-bold'>Oops!</h3>
            <p className='text-center'>{response?.error?.title}</p>
            <p className='text-center text-xs mb-4'>
              Contact your administrator
            </p>
            {Object.entries(response?.error?.errors ?? []).map(
              ([key, value]) => (
                <div key={key} className='flex flex-col items-center'>
                  <h4 className='text-center'>
                    {'>'} {key}
                  </h4>
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

export { CreatedSuccessfullyDialog }
