import { type SelectUIProps } from './SelectUI'

const ResetUI: React.FC<Partial<SelectUIProps>> = (props) => {
  if (
    props.defaultValue !== '' &&
    Array.isArray(props.defaultValue) &&
    props.defaultValue.length > 0 &&
    props.showReset === true
  ) {
    return (
      <span
        className='ml-4 cursor-pointer hover:text-azure-radiance-600'
        onClick={props.resetSelectedOption}
      >
        Reset
      </span>
    )
  }
}

export default ResetUI
