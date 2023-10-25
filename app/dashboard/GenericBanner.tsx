import styles from './banner.module.css'
import Link from 'next/link'

/** Since entities have different identifiers, its necessary to convert them so they can fit as an Item
 *  For example: projectId, taskId, and issueId they all should be converted to id
 * Examples of the conversion could be found in components that use this generic component
 * . */
export interface Item {
  id: number
  name: string
}

/**
 * Props for the Banner component.
 * @template T - The type of items in the banner.
 */
interface BannerProps<T extends Item> {
  /** An array of items to display in the banner. */
  items: T[]
  /** Icon from google material. */
  entityIcon: string
  /** The name of the entity associated with the banner. */
  entityName: string
}

const GenericBanner: React.FunctionComponent<BannerProps<Item>> = <
  T extends Item
>({
    items,
    entityIcon,
    entityName
  }: BannerProps<T>) => {
  return (
    <article className={styles.banner}>
      <div className={styles.header}>
        <div>
          <span className="material-symbols-outlined">{entityIcon}</span>
          <h1>{entityName}</h1>
        </div>
        <h2>All</h2>
      </div>
      {Array.isArray(items) && (
        <ul>
          {items.map((item: T) => (
            <li key={item.id}>
              <h2>
                <Link href={`/${entityName}/${item.id}`}>{item.name}</Link>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default GenericBanner
