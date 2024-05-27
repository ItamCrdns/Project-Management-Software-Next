import { ICON_SIZE } from '@/icons/iconSize'
import { RiIdCardLine } from '@remixicon/react'

const CompanyLogo = () => {
  return (
    <div className='flex gap-2 items-center'>
      <RiIdCardLine size={ICON_SIZE} />
      <p className='font-bold text-sm'>ACME Corporation</p>
    </div>
  )
}

export { CompanyLogo }
