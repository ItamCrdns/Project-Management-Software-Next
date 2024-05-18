import { getCompany } from '@/api-calls/getCompanyById'
import ClientUI from '@/components/UI/ClientUI/ClientUI'

const ClientIdPage = async ({
  params: { clientId }
}: {
  params: {
    clientId: string
  }
}) => {
  const { data } = await getCompany(clientId)

  return (
    <div className='flex justify-center items-center p-8'>
      <ClientUI clientId={clientId} client={data} />
    </div>
  )
}

export default ClientIdPage
