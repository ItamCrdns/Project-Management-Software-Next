import { Button } from '@/components/Button/Button'
import { IndividualEmployee } from '@/components/Generic Entity Renderer/IndividualEmployee'
import { useAppSelector } from '@/lib/hooks/hooks'
import { Badge, Divider } from '@tremor/react'
import { debounce } from '@/utility/debouce'
import { CreatedSuccessfullyDialog } from '@/components/UI/Dialog/CreatedSuccessfullyDialog'
import { callCreateProjectServerActions } from './callCreateProjectServerActions'
import { revalidateOngoingFinishedAndOverdueProjects } from '../(projects layout)/actions/revalidateOngoingFinishedAndOverdueProjects'
import { useDialogShowAndResponse } from '@/hooks/useDialogShowAndResponse'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { useId } from 'react'

const Resume: React.FC<{ goBack: () => void }> = (props) => {
  const newProject = useAppSelector((state) => state.newProjectData)
  const employees = newProject.employees

  const client =
    newProject.companyName === ''
      ? newProject.clientName
      : newProject.companyName

  const { setAlert } = useAlertActions()

  const { clear } = useNewProjectActions()

  const {
    response,
    showCreatedDialog,
    btnClicked,
    handleSetResponse,
    handleSetShowCreatedDialog,
    handleSetBtnClicked
  } = useDialogShowAndResponse()

  const alertId = useId()

  return (
    <>
      <CreatedSuccessfullyDialog
        response={response}
        showDialog={showCreatedDialog}
        closeDialog={() => {
          clear()
          handleSetShowCreatedDialog(false)
        }}
        entity='project'
        href={`clients/${newProject.companyId}/projects`}
        clearState={clear}
      />
      <section className='w-500 flex items-center flex-col justify-center'>
        <h1 className='text-2xl mb-4'>Your new project overview</h1>
        <p className='w-96 text-center'>
          Please carefully review the information you are about to submit.
        </p>
        <div className='w-500 flex items-center flex-col'>
          <div className='flex items-start w-full justify-center gap-4 rounded-lg p-4 py-0'>
            <div className='flex flex-col items-center w-full'>
              <Divider>Name</Divider>
              <h2 className='text-center line-clamp-2'>{newProject.name}</h2>
            </div>
            <div className='flex flex-col items-center w-full'>
              <Divider>Description</Divider>
              <h2 className='text-center line-clamp-2'>
                {newProject.description}
              </h2>
            </div>
          </div>
          <div className='flex items-center flex-col w-full p-4 py-0'>
            <Divider>Expected delivery date</Divider>
            <h2>
              {new Date(newProject.expectedDeliveryDate).toLocaleDateString(
                'en-us',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'UTC'
                }
              )}
            </h2>
          </div>
          <div className='flex items-center w-full justify-center gap-4 rounded-lg p-4 py-0'>
            <div className='flex flex-col items-center w-full'>
              <Divider>Priority</Divider>
              <h2 className='text-center'>{newProject.priorityLabel}</h2>
            </div>
            <div className='flex flex-col items-center w-full'>
              <Divider>Client</Divider>
              <div className='flex gap-2 items-center'>
                <h2 className='text-center'>{client}</h2>
                {newProject.clientName !== '' &&
                  newProject.companyName === '' && <Badge size='xs'>New</Badge>}
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center flex-col w-full p-4 py-0'>
          <Divider>Employees</Divider>
          {Array.isArray(employees) && employees.length > 0 ? (
            <>
              <p className='text-xs mb-4'>Hover them to see more information</p>
              <ul className='relative list-none flex items-center -space-x-4 justify-center pt-0'>
                {employees.map((employee, index) => (
                  <li key={index}>
                    <IndividualEmployee
                      employee={employee}
                      size={50}
                      redirectMe={false}
                      position={{ top: '2.5rem' }}
                      showName={false}
                      showImageBorder={true}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className='mb-4 text-center'>
              You didn&apos;t add any employees, but don&apos;t worry, you can
              add them later
            </p>
          )}
        </div>
        <div className='flex items-center flex-col w-full p-4 py-0 mt-0 mb-8'>
          <Divider>Project start date</Divider>
          {newProject.startedWorking ? (
            <p>Immediately</p>
          ) : (
            <p>Not specified</p>
          )}
        </div>
        <div className='flex gap-4'>
          <div
            className='w-[125px]'
            onClick={() => {
              handleSetBtnClicked(true)
            }}
          >
            <Button
              text='Create project'
              loading={btnClicked}
              func={debounce(() => {
                ;(async () => {
                  const res = await callCreateProjectServerActions(newProject)
                  handleSetResponse(res)
                  handleSetBtnClicked(false)

                  if (res?.data?.success) {
                    handleSetShowCreatedDialog(true)
                    await revalidateOngoingFinishedAndOverdueProjects()
                    setAlert({
                      id: alertId + '-project-created',
                      message: 'Project created successfully',
                      type: 'success'
                    })
                  } else {
                    setAlert({
                      id: alertId + '-project-creation-failed',
                      message: 'Project creation failed',
                      type: 'error'
                    })
                  }
                })()
              }, 500)}
            />
          </div>
          <Button
            text='Return'
            func={() => {
              props.goBack()
            }}
            borderOnly={true}
            txtColor='black'
          />
        </div>
      </section>
    </>
  )
}

export default Resume
