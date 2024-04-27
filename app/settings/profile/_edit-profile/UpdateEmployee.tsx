'use client'
import { type Employee } from '@/interfaces/employee'
import UpdatePicture from './_update-info/UpdatePicture'
import { UpdatePassword } from './_update-info/UpdatePassword'
import UpdateNameAndData from './_update-info/UpdateNameAndData'
import { Button } from '@/components/Button/Button'
import { useFormState } from '@/hooks/useFormState'
import { useState } from 'react'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { updateEmployee } from '@/api-calls/patch/updateEmployee'
import { debounce } from '@/utility/debouce'
import { revalidateMyEmployeeTag } from './actions/revalidateMyEmployeeTag'

const UpdateEmployee: React.FC<{ employee: Employee }> = (props) => {
  const { employee } = props

  const { setAlert } = useAlertActions()
  const { formRef, handleClick, handleSetBtnClicked, btnClicked } =
    useFormState()

  const [gender, setGender] = useState<string | null>(null)

  return (
    <section className='space-y-8 flex flex-col justify-end'>
      <form
        ref={formRef}
        action={debounce((formData: FormData) => {
          void (async (formData: FormData) => {
            formData.append('gender', gender ?? employee.gender)

            const picture = formData.get('profilePicture') as File

            if (picture.size <= 0 || picture === null) {
              formData.delete('profilePicture')
            }

            // * Create a new FormData object to only send the values that have changed
            const newFormData = new FormData()

            formData.forEach((value, key) => {
              if (employee[key as keyof typeof employee] !== value) {
                newFormData.append(key, value)
              }
            })

            const hasEntries = newFormData.entries().next().done === false

            if (hasEntries) {
              handleSetBtnClicked(true)
              const res = await updateEmployee(newFormData)
              handleSetBtnClicked(false)
              if (res.message !== undefined && res.success !== undefined) {
                await revalidateMyEmployeeTag()
                setAlert({
                  message: res.message,
                  type: res.success ? 'success' : 'error'
                })
              }
            } else {
              setAlert({ message: 'No field changes', type: 'error' })
            }
          })(formData)
        }, 500)}
        className='flex gap-16 items-start justify-between w-full'
      >
        <aside className='w-full'>
          <div className='border-b border-gray-200 dark:border-gray-800 pb-4'>
            {employee.username !== undefined &&
              employee.profilePicture !== undefined && (
                <UpdatePicture
                  username={employee.username}
                  picture={employee.profilePicture}
                />
            )}
          </div>
          <UpdatePassword />
        </aside>
        <UpdateNameAndData
          employee={employee}
          selectedGender={gender ?? employee.gender}
          updateFormData={(gender) => {
            setGender(gender)
          }}
        />
      </form>
      <div className='flex gap-4 self-end'>
        <div className='w-[125px]'>
          <Button text='Save changes' func={handleClick} loading={btnClicked} />
        </div>
        <div>
          <Button text='Cancel' borderOnly={true} txtColor='black' />
        </div>
      </div>
    </section>
  )
}

export default UpdateEmployee
