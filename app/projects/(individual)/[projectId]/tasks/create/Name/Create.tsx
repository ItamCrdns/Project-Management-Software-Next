'use client'
import { Button } from '@/components/Button/Button'
import { useNewTaskActions } from '@/lib/hooks/New task actions/useNewTaskActions'
import { useAppSelector } from '@/lib/hooks/hooks'
import { DatePicker, type DatePickerValue, TextInput } from '@tremor/react'
import { useState } from 'react'
import { AddDescription } from '../Description/AddDescription'
import { type CreateProps } from './Create.interface'
import { StartedWorkingSwitch } from './StartedWorkingSwitch'
import ProjectUI from '@/components/UI/ProjectUI/ProjectUI'
import { ReturnBadge } from '@/components/UI/Return/ReturnBadge'
import { debounce } from '@/utility/debouce'
import { useWarnings } from '@/hooks/useWarnings'
import { TimePicker } from '@/components/Time Picker/TimePicker'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { timeAmPmTo24h } from '@/utility/timeAmPmTo24h'

const Create: React.FC<CreateProps> = (props) => {
  const newTask = useAppSelector((state) => state.newTaskData)
  const { setName, setExpectedDeliveryDate, setProjectId } = useNewTaskActions()

  const [ready, setReady] = useState<boolean>(false)

  const taskExpectedDeliveryDate = new Date(newTask.expectedDeliveryDate)

  const { warnings, handleSetWarning, handleFilterWarning } = useWarnings()

  const handleDisabledClick = (): void => {
    if (newTask.name === '') {
      handleSetWarning('Task name is required', 'name')
    } else {
      handleFilterWarning('name')
    }

    if (newTask.expectedDeliveryDate === '') {
      handleSetWarning(
        'Expected delivery date is required',
        'expectedDeliveryDate'
      )
    } else {
      handleFilterWarning('expectedDeliveryDate')
    }
  }

  const nameWarning: boolean =
    newTask.name === '' && warnings.some((w) => w.field === 'name')

  const expectedDeliveryDateWarning: boolean =
    newTask.expectedDeliveryDate === '' &&
    warnings.some((w) => w.field === 'expectedDeliveryDate')

  const [selectedTime, setSelectedTime] = useState<Option>({
    value: 1,
    label: '12:00 AM'
  })

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
                  error={nameWarning}
                  errorMessage='Task name is required'
                  maxLength={255}
                />
              </div>
              <DatePicker
                onValueChange={(date: DatePickerValue) => {
                  if (date === undefined) {
                    return
                  }

                  const utcDate = new Date(
                    Date.UTC(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate()
                    )
                  )

                  setExpectedDeliveryDate(utcDate.toISOString())
                }}
                placeholder='Set a delivery date for this task'
                defaultValue={
                  !isNaN(taskExpectedDeliveryDate.getTime())
                    ? taskExpectedDeliveryDate
                    : undefined
                }
                minDate={new Date()}
                className={`${
                  expectedDeliveryDateWarning
                    ? 'border border-red-500 rounded-md'
                    : ''
                }`}
              />
              <div className='w-full'>
                <TimePicker
                  selectedTime={selectedTime}
                  onChange={(newTime) => {
                    if (isNaN(taskExpectedDeliveryDate.getTime())) {
                      return
                    }

                    const timeAs24Hour = timeAmPmTo24h(newTime.label)

                    const newDateWithTime = new Date(
                      taskExpectedDeliveryDate.getTime()
                    )
                    newDateWithTime.setUTCHours(
                      Number(timeAs24Hour.split(':')[0])
                    )
                    newDateWithTime.setUTCMinutes(
                      Number(timeAs24Hour.split(':')[1])
                    )

                    setExpectedDeliveryDate(newDateWithTime.toISOString())
                    setSelectedTime(newTime)
                  }}
                  disabled={isNaN(taskExpectedDeliveryDate.getTime())}
                />
              </div>
              {expectedDeliveryDateWarning && (
                <p className='text-sm text-red-500 -mt-2 flex self-start'>
                  {
                    warnings.find((w) => w.field === 'expectedDeliveryDate')
                      ?.message
                  }
                </p>
              )}
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
                disabledFunc={handleDisabledClick}
              />
            </>
              )}
        </div>
      </div>
    </section>
  )
}

export { Create }
