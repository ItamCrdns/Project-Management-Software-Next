import { type SelectUIProps } from './SelectUI'
import styles from './select.module.css'

const ResetUI: React.FC<Partial<SelectUIProps>> = (props) => {
  if (
    props.defaultValue !== '' &&
    props.showReset !== null &&
    props.showReset === true
  ) {
    return (
      <span className={styles.reset} onClick={props.resetSelectedOption}>
        Reset
      </span>
    )
  }
}

export default ResetUI
