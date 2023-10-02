import getProjects from './getProjects'
import Link from 'next/link'
import styles from '../banner.module.css'

const Projects = async (): Promise<JSX.Element> => {
  const data = await getProjects('1', '5')
  const projects = data.data

  return (
    <article className={styles.banner}>
      <ul>
        {Array.isArray(projects) &&
          projects.map((project) => (
            <li key={project.projectId}>
              <h2>
                <Link href={`/projects/${project.projectId}`}>{project.name}</Link>
              </h2>
              <p>{project.description}</p>
              {/* <ul>
                {project.images.map((image: Images) => (
                  <li key={image.publicId}>
                    <Image
                      src={image.imageUrl}
                      alt={image.publicId}
                      width="200"
                      height="200"
                    />
                  </li>
                ))}
              </ul> */}
            </li>
          ))}
      </ul>
    </article>
  )
}

export default Projects
