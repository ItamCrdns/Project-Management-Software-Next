import Link from 'next/link'

const Client: React.FC<{ name?: string; clientId?: string }> = (props) => {
  return (
    <div className='p-8 space-y-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <h1 className='font-semibold'>Client</h1>
      <h1>
        <Link href={`/clients/${props.clientId}`}>{props.name}</Link>
      </h1>
    </div>
  )
}

export { Client }
