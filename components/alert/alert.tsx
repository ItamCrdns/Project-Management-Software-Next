/**
 * Alert component to display messages with optional loading and ready states.
 * @param message - The message to display in the alert.
 * @param width - The width of the alert. Default is '125px'.
 * @param color - The color of the text in the alert. Default is 'black'.
 * @param backgroundColor - The background color of the alert. Default is 'white'.
 * @param boxShadow - The box shadow of the alert. Default is `0px 0px 15px 0px ${backgroundColor}`.
 * @param ready - The ready state of the alert. Set to `true` to show the alert with slide in animation, `false` to show the alert with slide out animation, and `null` to hide the alert. Default is `null`.
 * @param loading - The loading state of the alert. Set to `true` to show the alert with slide in animation and loading spinner, `false` to show the alert with slide out animation, and `null` to hide the alert. Default is `null`.
 * @returns The Alert component or null if `loading` and `ready` are both `null`.
 */
import styles from './alert.module.css'

interface AlertProps {
  message?: string
  width?: string
  color?: string
  backgroundColor?: string
  boxShadow?: string
  ready?: boolean | null
  loading?: boolean | null
}

const Alert = ({
  message,
  width = '125px',
  color = 'white',
  backgroundColor = 'white',
  boxShadow = `0px 0px 15px 0px ${backgroundColor}`,
  ready, // * bool. set tiemout back to false to define the duration of the alert. state initial value should be null to avoid slideOut animation on initial render
  loading = null // * for promises
}: AlertProps): JSX.Element | null => {
  if (loading !== null) {
    return (
      <section
        style={{ width, backgroundColor, boxShadow, color }}
        className={`${styles.customalert} ${
          loading ? styles.slideIn : styles.slideOut
        }`}
      >
        <div className={styles.ldsring}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </section>
    )
  }

  if (ready !== null) {
    return (
      <section
        style={{ width, backgroundColor, boxShadow, color }}
        className={`${styles.customalert} ${
          ready === true
            ? styles.slideIn
            : ready === false
            ? styles.slideOut
            : ''
        }`}
      >
        <span>{message}</span>
      </section>
    )
  }

  return null
}

export default Alert
