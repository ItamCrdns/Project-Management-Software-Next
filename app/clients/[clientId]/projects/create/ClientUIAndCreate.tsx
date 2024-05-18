import { getCompany } from '@/api-calls/getCompanyById'
import getEmployeeTier from '@/api-calls/getEmployeeTier'
import ClientUI from '@/components/UI/ClientUI/ClientUI'
import UnauthorizedToCreate from './UnauthorizedToCreate'
import CreateProjectModal from './CreateProject'
import { redirect } from 'next/navigation'

const ClientUIAndCreate: React.FC<{ clientId: string }> = async (props) => {
  const clientData = getCompany(props.clientId)

  const employeeTierData = getEmployeeTier()

  const [client, employeeTier] = await Promise.all([
    clientData,
    employeeTierData
  ])

  if (client.status !== 200) {
    redirect('/')
  }

  return (
    <>
      <ClientUI clientId={props.clientId} client={client.data} />
      {employeeTier.data?.name === 'Supervisor' && client.data !== null ? (
        <CreateProjectModal
          clientId={client.data.companyId}
          clientName={client.data.name}
        />
      ) : (
        <UnauthorizedToCreate />
      )}
    </>
  )
}

export default ClientUIAndCreate
