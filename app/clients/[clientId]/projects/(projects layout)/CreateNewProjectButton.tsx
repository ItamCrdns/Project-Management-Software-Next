'use client'

import { Button } from '@/components/Button/Button'

const CreateNewProjectButton = ({ clientId }: { clientId: string }) => {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <Button
          text='Create new project'
          href={`/clients/${clientId}/projects/create`}
        />
      </div>
      <p className='select-none text-xs'>&middot;</p>
      <div>
        <Button text='Some other button' />
      </div>
    </div>
  )
}

export default CreateNewProjectButton
