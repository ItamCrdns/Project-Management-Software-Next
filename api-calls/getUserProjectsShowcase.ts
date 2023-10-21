import { type Project } from '@/interfaces/project'
import paginatedFetcher from '@/utility/paginatedFetcher'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

/**
 * Fetches a paginated list of projects for a user from the specified endpoint.
 * @param endpoint - The API endpoint to fetch the projects from.
 * @param page - The page number to fetch.
 * @param pageSize - The number of projects to fetch per page.
 * @returns A Promise that resolves to an object containing the fetched projects and the HTTP status code.
 */
const getUserProjectsShowcase = async (
  username: string,
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Project> | null, status: number }> =>
  await paginatedFetcher(`Employee/${username}/projects/showcase`, page, pageSize)

export default getUserProjectsShowcase
