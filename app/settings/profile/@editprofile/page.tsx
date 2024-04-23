import { getMyEmployee } from '@/api-calls/getMyEmployee'
import UpdateEmployee from './UpdateEmployee'

const EditProfile: React.FC = async () => {
  const myUser = await getMyEmployee()

  return (
    <>
      <div className='border-b border-gray-200 dark:border-gray-800 pb-4'>
        <h1 className='font-semibold'>Profile settings</h1>
        <p className='opacity-50 text-sm'>
          Update your picture and personal details here
        </p>
      </div>
      <div className='flex gap-16 items-start justify-between'>
        {myUser.data !== null && <UpdateEmployee employee={myUser.data} />}
      </div>
    </>
  )
}

export default EditProfile
