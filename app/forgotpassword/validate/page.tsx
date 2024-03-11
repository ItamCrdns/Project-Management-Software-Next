import { requestExists } from './requestExists'
import { redirect } from 'next/navigation'
import { TokenExpired } from './TokenExpired'
import { ValidateTokenAndResetPassword } from './ValidateTokenAndResetPassword'

const TokenSent: React.FC<{ searchParams: { request: string } }> = async (
  props
) => {
  const { request } = props.searchParams

  const { success, message, data } = await requestExists(request)

  if (success && message === 'Valid') {
    return <ValidateTokenAndResetPassword request={request} email={data} />
  } else if (success && message === 'Expired') {
    return <TokenExpired email={data} />
  } else if (!success) {
    redirect('/forgotpassword')
  }
}

export default TokenSent
