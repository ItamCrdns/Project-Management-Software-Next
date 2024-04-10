import { type ClientNameProps } from '@/interfaces/props/ClientNameProps'
import DataHeader from '@/components/Data Header/DataHeader'
import { projectSortValues } from '@/components/Data Header/sortValues'
import { Projects } from './Projects'
import { CompanyUI } from './CompanyUI'
import { Suspense } from 'react'
import { Loading } from './Loading'

const CompanyProjectsPage: React.FC<ClientNameProps> = (props) => {
  const clientId = props.params.client[0]

  const key = new URLSearchParams(Object.entries(props.searchParams))

  console.log('CompanyProjectsPage', key.toString())

  return (
    <main className='flex items-center flex-col p-8'>
      <div>
        <div className='flex justify-end'>
          <DataHeader
            dashboard={false}
            pushSearchParams
            entity='projectsfromcompany'
            width='300px'
            sortValues={projectSortValues}
          />
        </div>
        <div className='flex items-start gap-8'>
          <CompanyUI clientId={clientId} />
          <Suspense
            key={key.toString()}
            fallback={
              <Loading skeletonCount={Number(props.searchParams.pagesize)} />
            }
          >
            <Projects clientId={clientId} searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

export default CompanyProjectsPage
