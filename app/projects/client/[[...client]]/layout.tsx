import { type ClientNameProps } from '@/interfaces/props/ClientNameProps'
import { ClientInfoAndFilters } from './ClientInfoAndFilters'
import { projectSortValues } from '@/components/Data Header/sortValues'
import DataHeader from '@/components/Data Header/DataHeader'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import HeaderDivider from './HeaderDivider'
import { PopUpConfirmationBanner } from './PopUpConfirmationBanner'

const CompanyProjectsPage: React.FC<ClientNameProps> = (props) => {
  const clientId = props.params.client[0]

  const paginationProps = {
    totalPages: 10,
    entityName: 'Projects',
    totalEntitesCount: 10,
    unknownProperties: true
  }

  return (
    <main className='flex items-center flex-col p-8'>
      <div className='flex items-start gap-8'>
        <ClientInfoAndFilters clientId={clientId} />
        <div className='flex flex-col'>
          <DataHeader
            dashboard={false}
            pushSearchParams
            entity='projectsfromcompany'
            width='300px'
            sortValues={projectSortValues}
          />
          <div className='space-y-8'>
            <QueryParamsPagination paginationProps={paginationProps} />
            <PopUpConfirmationBanner />
            <HeaderDivider text='Ongoing' />
            {props.ongoingProjects}
            <HeaderDivider text='Finished' />
            {props.finishedProjects}
            <HeaderDivider text='Overdue' />
            {props.overdueProjects}
          </div>
        </div>
      </div>
    </main>
  )
}

export default CompanyProjectsPage
