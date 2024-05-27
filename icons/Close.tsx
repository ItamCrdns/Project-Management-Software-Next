import { RiCloseLargeLine } from '@remixicon/react'
import { RiCloseLine } from '@remixicon/react'
import { ICON_SIZE } from './iconSize'

const Close = ({
  small = false
}: {
  small?: boolean
}) => {
  return small ? (
    <RiCloseLine size={ICON_SIZE} color='white' />
  ) : (
    <RiCloseLargeLine size={ICON_SIZE} color='white' />
  )
}

export { Close }
