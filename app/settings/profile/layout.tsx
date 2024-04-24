import { getLatestPasswordVerification } from '@/api-calls/getLatestPasswordVerification'

interface ProfileSettingsProps {
  editprofile: React.ReactNode
  children: React.ReactNode
  verifypassword: React.ReactNode
}

const ProfileSettings: React.FC<ProfileSettingsProps> = async (props) => {
  const { data } = await getLatestPasswordVerification()

  const passwordVerified = data?.success // Check if the password has been verified in the last 5 minutes

  if (passwordVerified === true) {
    return (
      <>
        {props.editprofile}
        {props.children}
      </>
    )
  } else {
    return <>{props.verifypassword}</>
  }
}

export default ProfileSettings
