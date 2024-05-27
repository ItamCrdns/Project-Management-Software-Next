import { EntityNotFound } from '../EntityNotFound'
import { type IssueUIProps } from './IssueUI.interface'
import { TeamAndCreator } from '../TeamAndCreator'
import IssueUI from './IssueUI'

const IssueUITeamAndCreator: React.FC<IssueUIProps> = (props) => {
  const { issue, noIssue } = props

  if (noIssue) {
    return <EntityNotFound entity='Issue' />
  }

  return (
    <aside className='flex flex-col items-center gap-8'>
      <div className='flex flex-col gap-8 w-[400px]'>
        <div className='w-full space-y-2'>
          {issue?.entity && <IssueUI issue={issue?.entity} />}
        </div>
        <TeamAndCreator
          creator={issue?.entity.issueCreator}
          team={issue?.entity.employees}
          teamCount={issue?.entity.employeeCount}
          teamHref={''}
        />
      </div>
    </aside>
  )
}

export default IssueUITeamAndCreator
