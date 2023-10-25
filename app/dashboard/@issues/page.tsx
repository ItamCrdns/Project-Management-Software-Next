import getIssuesShowcase from '@/api-calls/getIssuesShowcase'
import EachBanner, { type Item } from '../GenericBanner'

const Issues: React.FunctionComponent = async () => {
  const { data } = await getIssuesShowcase('1', '5')
  const issues = data?.data ?? []

  const issuesAsItem: Item[] = issues.map((issue) => ({
    id: issue.issueId,
    name: issue.name
  }))

  return (
    <EachBanner
      items={issuesAsItem}
      entityIcon="campaign"
      entityName="Issues"
    />
  )
}

export default Issues
