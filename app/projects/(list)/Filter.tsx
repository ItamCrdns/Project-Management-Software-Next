import styles from './userbanner.module.css'
import { type Company } from '@/interfaces/company'
import RippleButton from '@/components/ripplebutton/RippleButton'
import useCompanyDropdown from '@/utility/CompanyDropdown'

interface FilterProps {
  toggle: boolean
}

const Filter = ({ toggle }: FilterProps): JSX.Element => {
  const { companies, error } = useCompanyDropdown({ dependency: toggle })

  return (
    <section
      className={styles.popup}
      style={{ display: toggle ? 'flex' : 'none' }}
    >
      <p>Company:</p>
      <select defaultValue={'DEFAULT'}>
        <option value="DEFAULT" disabled hidden>
          Select a company...
        </option>
        {Array.isArray(companies) &&
          companies.map((company: Company) => (
            <option key={company.companyId} value={company.companyId}>
              {company.name}
            </option>
          ))}
      </select>
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
