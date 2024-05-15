'use client'
import { Button } from '@/components/Button/Button'
import { useEntitySelectModeActions } from '@/lib/hooks/Entity select mode actions/useEntitySelectModeActions'
import { useAppSelector } from '@/lib/hooks/hooks'
import { debounce } from '@/utility/debouce'
import { setProjectsFinishedBulkAction } from './actions/setProjectsFinishedBulkAction'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { revalidateOngoingFinishedAndOverdueProjects } from './actions/revalidateOngoingFinishedAndOverdueProjects'

const PopUpConfirmationBanner = () => {
  const entityOnSelectMode = useAppSelector((state) => state.entitySelectMode)

  const { clearSelectedIds } = useEntitySelectModeActions()
  const { setAlert } = useAlertActions()

  if (entityOnSelectMode.selectedIds.length > 0) {
    return (
      <div className='flex flex-col p-4 px-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <div className='flex justify-between'>
          <div>
            <h1 className='text-base font-semibold'>
              Are you sure you want to set the selected projects as finished?
            </h1>
            <p>This action cannot be undone</p>
          </div>
          <div className='flex gap-8 items-center'>
            <div className='w-[250px]'>
              <Button
                text='Confirm'
                func={debounce(() => {
                  ;(async () => {
                    setAlert({
                      message: 'Setting projects as finished...',
                      type: 'loading'
                    })

                    const res = await setProjectsFinishedBulkAction(
                      entityOnSelectMode.selectedIds
                    )

                    if (res.success === true) {
                      clearSelectedIds()
                      setAlert({
                        message:
                          res.message ?? 'Projects finished successfully',
                        type: 'success'
                      })

                      // Re-fetch the projects
                      await revalidateOngoingFinishedAndOverdueProjects()
                    } else {
                      setAlert({
                        message: res.message ?? 'Something went wrong',
                        type: 'error'
                      })
                    }
                  })()
                }, 500)}
              />
            </div>
            <div className='w-[150px]'>
              <Button
                text='Cancel'
                bgColor='bg-red-500'
                func={clearSelectedIds}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { PopUpConfirmationBanner }
