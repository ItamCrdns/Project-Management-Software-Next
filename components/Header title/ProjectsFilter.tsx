import styles from '@/app/projects/(list)/userbanner.module.css'
import useCompanyDropdown from '@/utility/CompanyDropdown'
import CustomSelect from '@/components/select/select'
import useCompanyOptions from '@/utility/companyOptions'
import { useRouter } from 'next/navigation'
import { type Option } from '@/interfaces/props/CustomSelectProps'

interface FilterProps {
  toggle: boolean
}

const ProjectsFilter: React.FC<FilterProps> = (props) => {
  const { clients, isError } = useCompanyDropdown({ shouldFetch: props.toggle }) // ? Empty object to avoid error

  const companyOptions = useCompanyOptions({ clients })

  const router = useRouter()
  const handleCompanySelect = (selectedValue: Option): void => {
    const companyId = selectedValue.value
    const companyName = selectedValue.label
    router.push(`/projects/client/${companyId}/${companyName}`)
  }

  if (props.toggle) {
    return (
      <section className={styles.popup}>
        <p>Client:</p>
        <CustomSelect
          text="client"
          options={companyOptions ?? []}
          defaultValue=""
          onSelect={handleCompanySelect}
        />
        {isError !== null && (
          <p style={{ fontSize: '8px', textAlign: 'center' }}>
            {isError?.toString()}
          </p>
        )}
      </section>
    )
  }
}

export default ProjectsFilter
