import getIssuesShowcase from '@/api-calls/getIssuesShowcase'
import EachBanner, { type Item } from '../../GenericBanner'

const Issues: React.FunctionComponent = async () => {
  const { data } = await getIssuesShowcase('1', '5')
  const issues = data?.data ?? []
  // const issuesCount = data?.count ?? 0

  const issuesAsItem: Item[] = issues.map((issue) => ({
    id: issue.issueId,
    name: issue.name
  }))

  return (
    <EachBanner
      items={issuesAsItem}
      entityIcon="campaign"
      entityName="Issues"
      // entityCount={issuesCount}
    />
  )
}

export default Issues
