import { Button } from '@/components/Button/Button'
import { type ButtonsProps } from '@/interfaces/props/EmployeeButtonsProps'

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { selectedEmployees, handleSubmit, handleGoBack } = props

  return selectedEmployees !== null && selectedEmployees.length > 0
    ? (
    <div className='flex gap-4'>
      <Button
        text={`Add ${selectedEmployees.length} employees`}
        func={handleSubmit}
      />
      <Button text='Go back' func={handleGoBack} />
    </div>
      )
    : (
    <div className='flex gap-4'>
      <Button text='Continue without adding employees' func={handleSubmit} />
      <Button text='Go back' func={handleGoBack} />
    </div>
      )
}

export default Buttons
