import styles from './newProject.module.css'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { useRouter } from 'next/navigation'
import { type UnsavedChangesProps } from '@/interfaces/props/UnsavedChangesProps'
import { useNewProjectActions } from '@/lib/hooks/useNewProjectActions'

const UnsavedChanges: React.FC<UnsavedChangesProps> = (props) => {
  const { clear } = useNewProjectActions()
  const router = useRouter()

  const handleGoBack = (): void => {
    props.goBack()
  }

  const handleExit = (): void => {
    clear()
    router.push('/projects')
  }

  return (
    <section className={styles.unsavedchangeswrapper}>
      <section className={styles.unsavedchanges}>
        <h1>Unsaved changes</h1>
        <p>Are you sure you want to discard this new project?</p>
        <p>Changes you have made will not be saved.</p>
        <div className={styles.buttonwrapper}>
          <RippleButton
            text='Go back'
            backgroundColor='#80B3FF'
            textColor='white'
            func={handleGoBack}
          />

          <RippleButton
            text='Discard'
            backgroundColor='rgb(255, 80, 120)'
            effectColor='rgb(255, 50, 120)'
            textColor='white'
            func={handleExit}
          />
        </div>
      </section>
    </section>
  )
}

export default UnsavedChanges
