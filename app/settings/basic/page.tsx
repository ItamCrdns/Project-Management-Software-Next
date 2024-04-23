import { cookies } from 'next/headers'
import { HintsSwitch } from './_items/HintsSwitch'
import { ResetAll } from './_items/ResetAll'

const BasicSettings: React.FC = () => {
  const configCookie = cookies().get('config')?.value

  return (
    <>
      <HintsSwitch config={configCookie} />
      <ResetAll />
    </>
  )
}

export default BasicSettings
