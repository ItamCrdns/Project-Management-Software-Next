import { Button } from '@/components/Button/Button'
import { Dialog, DialogPanel, List, ListItem } from '@tremor/react'
import { type ErrorMessages } from './errorMessages'

interface DialogProps {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  messages: ErrorMessages
}

const DialogComponent: React.FC<DialogProps> = (props) => {
  const { isOpen, setIsOpen, messages } = props

  return (
    <Dialog open={isOpen} onClose={setIsOpen} static={true}>
      <DialogPanel>
        <h3 className='text-center font-bold'>
          Please review the following fields
        </h3>
        <div className='mb-4'>
          {Object.values(messages).map(
            (message: string, index) =>
              message !== '' && (
                <List key={index}>
                  <ListItem>
                    <span>{message}</span>
                    <span className='text-azure-radiance-500'>Missing</span>
                  </ListItem>
                </List>
              )
          )}
        </div>
        <Button
          text='Close'
          func={() => {
            setIsOpen(false)
          }}
        />
      </DialogPanel>
    </Dialog>
  )
}

export default DialogComponent
