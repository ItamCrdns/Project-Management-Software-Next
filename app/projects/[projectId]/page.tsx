import getProject from '../../../api-calls/getProject'
import styles from './project.module.css'
import { type Images } from '@/interfaces/images'
import Image from 'next/image'
import { relativeTime } from '@/utility/relativeTime'

const ProjectId = async ({
  params
}: {
  params: { projectId: string }
}): Promise<JSX.Element> => {
  const data = await getProject(params.projectId)
  const project = data.data
  const images = data.data?.images as Images

  return (
    <article className={styles.project}>
      <h1>{project?.name}</h1>
      <p>{project?.description}</p>
      <p>Created {relativeTime(new Date(project?.created ?? '').getTime())}</p>
      {Array.isArray(images) && (
        <ul>
          {images.map((image) => (
            <li key={image.imageId}>
              <Image
                src={image.imageUrl}
                alt={image.publicId}
                width={125}
                height={125}
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default ProjectId
