import CustomSelect from '@/components/select/select'
import { type Employee } from '@/interfaces/employee'
import { NumberInput, TextInput } from '@tremor/react'
import { genderOptions } from './genderOptions'
import { useState } from 'react'

interface Props {
  employee: Employee
  selectedGender: string | null
  updateFormData: (value: string) => void
}

const UpdateNameAndData: React.FC<Props> = (props) => {
  const { employee, selectedGender, updateFormData } = props

  const [toggleSelect, setToggleSelect] = useState<boolean>(false)

  return (
    <section className='space-y-8 flex flex-col justify-end'>
      <div className='flex gap-8'>
        <div className='space-y-8'>
          <div className='space-y-2 w-64'>
            <h2 className='font-medium'>First name</h2>
            <TextInput
              name='firstName'
              placeholder='First name'
              defaultValue={employee.firstName}
            />
          </div>
          <div className='space-y-2 w-64'>
            <h2 className='font-medium'>Username</h2>
            <TextInput
              placeholder='Username'
              defaultValue={employee.username}
              disabled={true}
            />
          </div>
          <div className='space-y-2 w-64'>
            <h2 className='font-medium'>Gender</h2>
            <CustomSelect
              defaultValue={selectedGender ?? 'Gender'}
              options={genderOptions}
              shouldShowDropdown={toggleSelect}
              onShowDropdown={() => {
                setToggleSelect(!toggleSelect)
              }}
              closeDropdown={() => {
                setToggleSelect(false)
              }}
              sendStateToParent={(option) => {
                updateFormData(option.label)
              }}
            />
          </div>
        </div>
        <div className='space-y-8'>
          <div className='space-y-2 w-64'>
            <h2 className='font-medium'>Last name</h2>
            <TextInput
              name='lastName'
              placeholder='Last name'
              defaultValue={employee.lastName}
            />
          </div>
          <div className='space-y-2 w-64'>
            <h2 className='font-medium'>Phone number</h2>
            <NumberInput
              name='phoneNumber'
              placeholder='Phone number'
              enableStepper={false}
              defaultValue={employee.phoneNumber}
            />
          </div>
          <div className='space-y-2 w-64'>
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
