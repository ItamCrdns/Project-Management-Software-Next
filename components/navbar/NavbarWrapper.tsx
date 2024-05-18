import { getMyEmployee } from '@/api-calls/getMyEmployee'
import Navbar from './Navbar'

const NavbarWrapper: React.FC<{ currentTheme: string }> = async (props) => {
  const { data: myUser, status } = await getMyEmployee()

  return (
    <Navbar
      currentTheme={props.currentTheme}
      user={myUser}
      statusCodeFromBackend={status}
    />
  )
}

export { NavbarWrapper }
