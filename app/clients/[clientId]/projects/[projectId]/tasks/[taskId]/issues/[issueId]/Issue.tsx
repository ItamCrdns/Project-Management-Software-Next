import { getIssue } from '@/api-calls/getIssue'
import { NotFound } from '@/components/404 Not Found/NotFound'
import IssueUI from '@/components/UI/IssueUI/IssueUITeamAndCreator'
import { Description } from '../../../../(projectId layout)/Banners/Description'
import Task from '../Banners/Task'
import IssuePictures from '../Banners/IssuePictures'

const Issue: React.FC<{
  issueId: string
  taskId: string
  projectId: string
  clientId: string
}> = async (props) => {
  const { data, status } = await getIssue(
    props.issueId,
    props.taskId,
    props.projectId
  )

  if (status !== 200) {
    return (
      <NotFound
        text='Issue not found'
        buttonText='Return to homepaghe'
        href='/'
      />
    )
  }

  return (
    <>
      <IssueUI issue={data} noIssue={status !== 200} />
      <div className='space-y-8 w-[300px]'>
        <Task
          name={data?.entity.task.name}
          clientId={props.clientId}
          projectId={props.projectId}
          taskId={props.taskId}
        />
        <Description description={data?.entity.description} />
      </div>
      <div className='space-y-8 w-[300px]'>
        <IssuePictures />
      </div>
    </>
  )
}

export { Issue }
