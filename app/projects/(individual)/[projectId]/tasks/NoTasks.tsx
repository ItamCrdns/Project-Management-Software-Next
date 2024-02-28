import { Button } from '@/components/Button/Button'

const NoTasks: React.FC<{ isOwner: boolean, projectId: number }> = (props) => {
  return (
    <div className='flex flex-col items-center gap-4 p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <div>
        <h1 className='text-xl font-semibold text-center'>
          There are no tasks associated with this project
        </h1>
        <div>
          <p className='text-center'>
            {'Don\'t worry, we\'re here to help you get things moving.'}
          </p>
        </div>
      </div>
      {props.isOwner && (
        <Button
          text='Create new task'
          href={`/projects/${props.projectId}/tasks/create`}
        />
      )}
    </div>
  )
}

export { NoTasks }
