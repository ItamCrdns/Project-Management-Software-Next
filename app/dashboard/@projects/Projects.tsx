'use client'
import { useEffect, useState } from 'react'
import getProjects from './getProjects'
import { type Project } from '@/interfaces/project'
import Link from 'next/link'
import styles from './projects.module.css'

const Projects = (): JSX.Element => {
  const [projects, setProjects] = useState<Project | null>(null)
  const fetchProjects = async (): Promise<void> => {
    const projs = await getProjects('1', '5')
    setProjects(projs.data)
  }

  useEffect(() => {
    void fetchProjects()
  }, [])

  return (
    <article className={styles.projects}>
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
