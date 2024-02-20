import RippleButton from '@/components/ripplebutton/RippleButton'
import styles from './new-task.module.css'

const CannotCreate: React.FC = () => {
  return (
    <section className={styles.newtaskwrapper}>
      <div className={styles.newtask}>
        <p>You do not participate or own this project.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RippleButton
            text='Request to participate'
            backgroundColor='var(--blue)'
            textColor='white'
          />
          <RippleButton
            text='Return'
            backgroundColor='var(--darker-banner-color)'
          />
        </div>
      </div>
    </section>
  )
}

export default CannotCreate
