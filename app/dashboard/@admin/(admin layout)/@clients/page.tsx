import { getClientsServer } from '@/api-calls/getClientsServer'
import ClientsBanner from './ClientsBanner'

const ClientsPage = async () => {
  const { data: clients, status } = await getClientsServer()

  if (clients === null || status !== 200) {
    return <div>Failed to load clients</div>
  }

  return <ClientsBanner clients={clients} />
}

export default ClientsPage
