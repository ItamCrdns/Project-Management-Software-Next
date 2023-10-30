import styles from '@/app/projects/(list)/userbanner.module.css'
import useCompanyDropdown from '@/utility/CompanyDropdown'
import CustomSelect, { type Option } from '@/components/select/select'
import useCompanyOptions from '@/utility/companyOptions'
import { useRouter } from 'next/navigation'

interface FilterProps {
  toggle: boolean
}

const ProjectsFilter: React.FC<FilterProps> = (props) => {
  const { companies, error } = useCompanyDropdown({ dependency: props.toggle })

  const companyOptions = useCompanyOptions({ companies })

  const router = useRouter()
  const handleCompanySelect = (selectedValue: Option): void => {
    const companyId = selectedValue.value
    const companyName = selectedValue.label
    router.push(`/projects/company/${companyId}/${companyName}`)
  }

  return (
    <section
      className={styles.popup}
      style={{ display: props.toggle ? 'flex' : 'none' }}
    >
      <p>Company:</p>
      <CustomSelect
        text="company"
        options={companyOptions ?? []}
        defaultValue=""
        onSelect={handleCompanySelect}
      />
      {error !== null && (
        <p style={{ fontSize: '8px', textAlign: 'center' }}>
          {error.toString()}
        </p>
      )}
    </section>
  )
}

export default ProjectsFilter
