import { getLatestPasswordVerification } from '@/api-calls/getLatestPasswordVerification'
import EditProfile from './_edit-profile/EditProfile'
import VerifyPassword from './_verify-password/VerifyPassword'

const ProfileSettings: React.FC<{ children: React.ReactNode }> = async (props) => {
  const { data } = await getLatestPasswordVerification()

  const passwordVerified = data?.success // Check if the password has been verified in the last 5 minutes

  if (passwordVerified === true) {
    return (
      <>
        <EditProfile />
        {props.children}
      </>
    )
  } else {
    return <VerifyPassword />
  }
}

export default ProfileSettings
