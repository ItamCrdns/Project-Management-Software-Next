import { getIssue } from '@/api-calls/getIssue'
import { NotFound } from '@/components/404 Not Found/NotFound'
import IssueUI from '@/components/UI/IssueUI/IssueUI'
import { Description } from '../../../../(projectId layout)/Banners/Description'
import { Attachments } from '../../../../(projectId layout)/Banners/Attachments'

const Issue: React.FC<{
  issueId: string
  taskId: string
  projectId: string
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
      <IssueUI issue={data} showGeneralInfo={true} noIssue={status !== 200} />
      <div className='space-y-8 w-[300px]'>
        <Description description={data?.entity.description} />
      </div>
      <div className='space-y-8 w-[300px]'>
        <Attachments />
      </div>
    </>
  )
}

export { Issue }
