'use client'
import { Button } from '@/components/Button/Button'
import { useNewTaskActions } from '@/lib/hooks/New task actions/useNewTaskActions'
import { useAppSelector } from '@/lib/hooks/hooks'
import { DatePicker, type DatePickerValue, TextInput } from '@tremor/react'
import { useState } from 'react'
import { AddDescription } from '../Description/AddDescription'
import { type CreateProps } from './Create.interface'
import { StartedWorkingSwitch } from './StartedWorkingSwitch'
import ProjectUI from '@/components/ProjectUI/ProjectUI'
import { ReturnBadge } from '@/components/UI/Return/ReturnBadge'
import { debounce } from '@/utility/debouce'

const Create: React.FC<CreateProps> = (props) => {
  const newTask = useAppSelector((state) => state.newTaskData)
  const { setName, setExpectedDeliveryDate, setProjectId } = useNewTaskActions()

  const [ready, setReady] = useState<boolean>(false)

  const taskExpectedDeliveryDate = new Date(newTask.expectedDeliveryDate)

  return (
    <section className='flex items-start justify-center py-8 px-0 space-x-8'>
      <ProjectUI project={props.project} showButtons={false} />
      <div className='flex w-500 justify-center gap-4 p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <div className='flex flex-col items-center gap-4 w-96'>
          <ReturnBadge callback={() => {}} />
          {ready
            ? (
            <AddDescription
              return={() => {
                setReady(false)
              }}
            />
              )
            : (
            <>
              <h1 className='text-2xl text-center'>
                Create new task for {props.project?.entity.name}
              </h1>
              <p className='w-96 text-center'>
                First, enter a descriptive name for this new task
              </p>
              <div className='w-full'>
                <TextInput
                  type='text'
                  placeholder='Task name'
                  defaultValue={newTask.name}
                  onValueChange={debounce((name) => {
                    setName(name)
                  }, 500)}
                />
              </div>
              <DatePicker
                onValueChange={(date: DatePickerValue) => {
                  setExpectedDeliveryDate(date?.toString() ?? '')
                }}
                placeholder='Set a delivery date for this task'
                defaultValue={
                  !isNaN(taskExpectedDeliveryDate.getTime())
                    ? taskExpectedDeliveryDate
                    : undefined
                }
                minDate={new Date()}
              />
              <StartedWorkingSwitch />
              <Button
                text='Next'
                disabled={
                  newTask.name === '' || newTask.expectedDeliveryDate === ''
                }
                func={() => {
                  setReady(true)
                  if (props.project !== null) {
                    setProjectId(props.project.entity.projectId)
                  }
                }}
              />
            </>
              )}
        </div>
      </div>
    </section>
  )
}

export { Create }
