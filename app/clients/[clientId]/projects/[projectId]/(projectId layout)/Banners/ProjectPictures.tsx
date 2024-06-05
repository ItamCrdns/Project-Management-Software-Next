import { ProjectPicture } from '@/interfaces/ProjectPicture.interface'
import Image from 'next/image'

interface ProjectPicturesProps {
  pictures: ProjectPicture[]
}

const ProjectPictures: React.FC<ProjectPicturesProps> = (props) => {
  const { pictures } = props

  return (
    <div className='p-8 space-y-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <h1 className='font-semibold'>Pictures</h1>
      {Array.isArray(pictures) && pictures.length > 0 ? (
        <ul className='grid grid-cols-4 gap-4'>
          {pictures.map((picture) => (
            <li key={picture.projectPictureId}>
              <Image
                src={picture.imageUrl}
                alt={picture.cloudinaryPublicId}
                width={100}
                height={100}
                className='shadow-md'
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Pictures will be displayed here.</p>
      )}
    </div>
  )
}

export { ProjectPictures }
