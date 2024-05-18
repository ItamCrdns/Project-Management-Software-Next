import { type ClientNameProps } from '@/interfaces/props/ClientNameProps'
import { ClientInfoAndFilters } from './ClientInfoAndFilters'
import { projectSortValues } from '@/components/Data Header/sortValues'
import DataHeader from '@/components/Data Header/DataHeader'
import HeaderDivider from './HeaderDivider'
import { PopUpConfirmationBanner } from './PopUpConfirmationBanner'

const CompanyProjectsPage: React.FC<ClientNameProps> = (props) => {
  const clientId = props.params.clientId

  return (
    <main className='flex items-center flex-col p-8'>
      {props.children}
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
            <PopUpConfirmationBanner />
            <HeaderDivider text='Ongoing' />
            {props.ongoingProjects}
            <HeaderDivider text='Finished' />
            {props.finishedProjects}
            <HeaderDivider text='Overdue' />
            {props.overdueProjects}
            <HeaderDivider text='Not started' />
            {props.notStartedProjects}
          </div>
        </div>
      </div>
    </main>
  )
}

export default CompanyProjectsPage
