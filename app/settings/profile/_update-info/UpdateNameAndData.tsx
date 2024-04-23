import { type Employee } from '@/interfaces/employee'
import { NumberInput, TextInput } from '@tremor/react'

const UpdateNameAndData: React.FC<{
  employee: Employee
}> = (props) => {
  const { employee } = props

  return (
    <section className='space-y-8 flex flex-col justify-end'>
      <div className='flex gap-8'>
        <div className='space-y-8'>
          <div className='space-y-2 w-[250px]'>
            <h2 className='font-medium'>First name</h2>
            <TextInput
              name='firstname'
              placeholder='First name'
              defaultValue={employee.firstName}
            />
          </div>
          <div className='space-y-2 w-[250px]'>
            <h2 className='font-medium'>Username</h2>
            <TextInput
              name='username'
              placeholder='Username'
              defaultValue={employee.username}
            />
          </div>
        </div>
        <div className='space-y-8'>
          <div className='space-y-2 w-[250px]'>
            <h2 className='font-medium'>Last name</h2>
            <TextInput
              name='lastname'
              placeholder='Last name'
              defaultValue={employee.lastName}
            />
          </div>
          <div className='space-y-2 w-[250px]'>
            <h2 className='font-medium'>Phone number</h2>
            <NumberInput
              name='phoneNumber'
              placeholder='Phone number'
              enableStepper={false}
              defaultValue={employee.phoneNumber}
            />
          </div>
          <div className='space-y-2 w-[250px]'>
            <h2 className='font-medium'>Email address</h2>
            <TextInput
              name='email'
              placeholder='Email address'
              defaultValue={employee.email}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpdateNameAndData
