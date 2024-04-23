'use client'
import { type Employee } from '@/interfaces/employee'
import UpdatePicture from '../_update-info/UpdatePicture'
import { UpdatePassword } from '../_update-info/UpdatePassword'
import UpdateNameAndData from '../_update-info/UpdateNameAndData'
import { Button } from '@/components/Button/Button'
import { useFormState } from '@/hooks/useFormState'

const UpdateEmployee: React.FC<{ employee: Employee }> = (props) => {
  const { employee } = props

  const { formRef, handleClick } = useFormState()

  return (
      <section className='space-y-8 flex flex-col justify-end'>
        <form
          ref={formRef}
          action={(fd: FormData) => {
            console.log(fd.get('profilePicture'))
          }}
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
          <UpdateNameAndData employee={employee} />
        </form>
        <div className='flex gap-4 self-end'>
          <div>
            <Button text='Save changes' func={handleClick} />
          </div>
          <div>
            <Button text='Cancel' borderOnly={true} txtColor='black' />
          </div>
        </div>
      </section>
  )
}

export default UpdateEmployee
