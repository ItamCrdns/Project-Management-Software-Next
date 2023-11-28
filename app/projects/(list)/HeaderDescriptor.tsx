'use client'
import styles from './projectslist.module.css'
import {
  type HeaderDescriptorProps,
  type Style
} from '@/interfaces/props/HeaderDescriptorProps'
import HeaderItem from './HeaderItem'
import { setInitialSearchParams } from '@/components/Filters/setInitialSearchParams'
import { usePathname, useRouter } from 'next/navigation'
import { type OrderBy, type IFilterProperties, type Sort, type IFilter } from '@/interfaces/props/context props/IFilter'

const HeaderDescriptor: React.FC<HeaderDescriptorProps> = (props) => {
  const pathname = usePathname()
  const router = useRouter()

  const searchParams = setInitialSearchParams()

  const handleSortChange = (sortValue: string, sort: string): void => {
    // TODO: Fix dashboard state pagination
    if (props.dashboard) {
      const newFilter: IFilterProperties = {
        orderBy: sortValue as OrderBy,
        sort: sort === 'ascending' ? 'descending' : 'ascending' as Sort
      }

      console.log(newFilter)

      props.updateFilter?.(props.entity as keyof IFilter, newFilter)
    } else {
      searchParams.set('orderby', sortValue.toLowerCase())
      searchParams.set('sort', sort.toLowerCase())

      if (searchParams !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const style: Style = {
    width: props.width
  }

  // TODO: Fix initial render problem that will render that we are always at the "Created" column.
  // TODO: Fix slow state when clicking a different column and you can see two columns being highlighted at the same time.
  return (
    <header className={styles.descriptor}>
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        icon="signature"
        label="Name"
        sortValue={props.sortValues.name}
        searchParams={searchParams}
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        icon="person"
        label="Creator"
        sortValue={props.sortValues.creator}
        searchParams={searchParams}
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        icon="group"
        label="Team"
        sortValue={props.sortValues.team}
        searchParams={searchParams}
      />
      {props.entity === 'projects' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          icon="priority_high"
          label="Priority"
          sortValue={props.sortValues.priority}
          searchParams={searchParams}
        />
      )}
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        icon="calendar_month"
        label="Created"
        sortValue={props.sortValues.created}
        searchParams={searchParams}
      />
      {props.dashboard && props.entity === 'projects' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          icon="store"
          label="Company"
          sortValue={props.sortValues.company}
          searchParams={searchParams}
        />
      )}
      {props.dashboard && props.entity === 'tasks' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}

          icon="emoji_objects"
          label="Project"
          sortValue={props.sortValues.project}
          searchParams={searchParams}
        />
      )}
      {props.dashboard && props.entity === 'issues' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          // order={order}
          icon="note_stack"
          label="Task"
          sortValue={props.sortValues.task}
          searchParams={searchParams}
        />
      )}
    </header>
  )
}

export default HeaderDescriptor
