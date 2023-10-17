import { type Employee } from '@/interfaces/employee'
import RippleButton from '@/components/ripplebutton/RippleButton'
import styles from '../newProject.module.css'

interface ButtonsProps {
  selectedEmployees: Employee[] | null
  handleSubmit: () => void
  handleGoBack: () => void
}

const Buttons = ({
  selectedEmployees,
  handleSubmit,
  handleGoBack
}: ButtonsProps): JSX.Element => {
  return (
    <>
      {selectedEmployees !== null && selectedEmployees.length > 0
        ? (
        <div className={styles.buttonwrapper}>
          <RippleButton
            text={`Add ${selectedEmployees.length} employees`}
            width="120px"
            backgroundColor="#80B3FF"
            textColor="white"
            func={handleSubmit}
          />
          <RippleButton
            text="Go back"
            backgroundColor="var(--darker-banner-color)"
            effectColor="var(--banner-color)"
            textColor="var(--text-color)"
            func={handleGoBack}
          />
        </div>
          )
        : (
        <div className={styles.buttonwrapper}>
          <RippleButton
            text="Continue without adding employees"
            width="250px"
            backgroundColor="var(--darker-banner-color)"
            effectColor="var(--banner-color)"
            textColor="var(--text-color)"
            func={handleSubmit}
          />
          <RippleButton
            text="Go back"
            backgroundColor="var(--darker-banner-color)"
            effectColor="var(--banner-color)"
            textColor="var(--text-color)"
            func={handleGoBack}
          />
        </div>
          )}
    </>
  )
}

export default Buttons
