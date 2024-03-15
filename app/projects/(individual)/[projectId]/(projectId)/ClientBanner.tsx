import { Client } from '@/svg/Client'

const ClientBanner: React.FC<{ name?: string }> = (props) => {
  const { name } = props

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-center gap-2'>
        <h1 className='text-center font-semibold'>Client</h1>
        <Client />
      </div>
      <div className='p-4 space-y-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <p className='text-center font-semibold text-lg'>{name}</p>
      </div>
    </div>
  )
}

export { ClientBanner }
