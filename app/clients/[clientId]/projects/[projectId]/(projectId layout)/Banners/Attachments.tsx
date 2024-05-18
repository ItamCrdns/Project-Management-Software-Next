import { PaperClip } from '@/svg/PaperClip'

const Attachments: React.FC = () => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-center gap-2'>
        <p className='font-semibold'>Attachments</p>
        <PaperClip />
      </div>
      <div className='p-8 space-y-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <p>Attachments will be displayed here.</p>
      </div>
    </div>
  )
}

export { Attachments }
