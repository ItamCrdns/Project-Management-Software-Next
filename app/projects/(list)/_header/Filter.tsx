import styles from '../userbanner.module.css'
import RippleButton from '@/components/ripplebutton/RippleButton'
import useCompanyDropdown from '@/utility/CompanyDropdown'
import CustomSelect, { type Option } from '@/components/select/select'
import useCompanyOptions from '@/utility/companyOptions'

interface FilterProps {
  toggle: boolean
}

const Filter = ({ toggle }: FilterProps): JSX.Element => {
  const { companies, error } = useCompanyDropdown({ dependency: toggle })

  const companyOptions = useCompanyOptions({ companies })

  const handleCompanySelect = (selectedValue: Option): void => {}

  return (
    <section
      className={styles.popup}
      style={{ display: toggle ? 'flex' : 'none' }}
    >
      <p>Company:</p>
      <CustomSelect
        text="company"
        options={companyOptions ?? []}
        defaultValue=""
        onSelect={handleCompanySelect}
      />
      <RippleButton
        text="Apply filters"
        backgroundColor="#80B3FF"
        textColor="white"
        width="105px"
      />
      {error !== null && (
        <p style={{ fontSize: '8px', textAlign: 'center' }}>
          {error.toString()}
        </p>
      )}
    </section>
  )
}

export default Filter
