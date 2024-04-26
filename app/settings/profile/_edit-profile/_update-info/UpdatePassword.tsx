import Link from 'next/link'

const UpdatePassword: React.FC = () => {
  return (
    <h2 className='font-semibold text-azure-radiance-400 py-4'>
      <Link href='/settings/profile/password'>Click here to change your password</Link>
    </h2>
  )
}

export { UpdatePassword }
