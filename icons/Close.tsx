import { RiCloseLargeLine } from '@remixicon/react'
import { RiCloseLine } from '@remixicon/react'
import { ICON_SIZE } from './iconSize'

const Close = ({
  small = false,
  color = 'white'
}: {
  small?: boolean
  color?: string
}) => {
  return small ? (
    <RiCloseLine size={ICON_SIZE} className={color} />
  ) : (
    <RiCloseLargeLine size={ICON_SIZE} className={color} />
  )
}

export { Close }
