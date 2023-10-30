import { type LatestWeek } from '@/interfaces/LatestWeek'
import serverFetcher from '@/utility/serverFetcher'

const getEntitiesCreatedLastWeek = async (): Promise<{
  data: LatestWeek | null
  status: number
}> => await serverFetcher('LatestStuff/lastweek')

export default getEntitiesCreatedLastWeek
