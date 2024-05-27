import { getCompany } from '@/api-calls/getCompanyById'
import ClientUI from '@/components/UI/ClientUI/ClientUI'
import { EntityNotFound } from '@/components/UI/EntityNotFound'

const ClientIdPage = async ({
  params: { clientId }
}: {
  params: {
    clientId: string
  }
}) => {
  const { data, status } = await getCompany(clientId)

  if (data === null && status === 404) {
    return (
      <div className='m-8'>
        <EntityNotFound entity='Client' />
      </div>
    )
  }

  return (
    <div className='flex justify-center items-center p-8'>
      <ClientUI clientId={clientId} client={data} />
    </div>
  )
}

export default ClientIdPage
