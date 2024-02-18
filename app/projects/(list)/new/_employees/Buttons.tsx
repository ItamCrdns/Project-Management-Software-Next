import RippleButton from '@/components/ripplebutton/RippleButton'
import styles from '../newProject.module.css'
import { type ButtonsProps } from '@/interfaces/props/EmployeeButtonsProps'

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { selectedEmployees, handleSubmit, handleGoBack } = props
  return (
    <>
      {selectedEmployees !== null && selectedEmployees.length > 0
        ? (
        <div className={styles.buttonwrapper}>
          <RippleButton
            text={`Add ${selectedEmployees.length} employees`}
            backgroundColor='var(--blue)'
            textColor='white'
            func={handleSubmit}
          />
          <RippleButton
            text='Go back'
            backgroundColor='var(--darker-banner-color)'
            effectColor='var(--banner-color)'
            textColor='var(--text-color)'
            func={handleGoBack}
          />
        </div>
          )
        : (
        <div className={styles.buttonwrapper}>
          <RippleButton
            text='Continue without adding employees'
            backgroundColor='var(--darker-banner-color)'
            effectColor='var(--banner-color)'
            textColor='var(--text-color)'
            func={handleSubmit}
          />
          <RippleButton
            text='Go back'
            backgroundColor='var(--darker-banner-color)'
            effectColor='var(--banner-color)'
            textColor='var(--text-color)'
            func={handleGoBack}
          />
        </div>
          )}
    </>
  )
}

export default Buttons
