type AllowedFilterNames = 'alphabetical' | 'date' | 'priority' | 'status'
type AllowedValues = 'ascending' | 'descending' | 'completed' | 'in_progress' | 'not_started'

export interface UpdateFilterProps {
  name: AllowedFilterNames | ''
  value: AllowedValues | ''
}
