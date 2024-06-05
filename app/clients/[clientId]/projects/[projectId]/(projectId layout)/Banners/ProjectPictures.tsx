'use client'
import { ProjectPicture } from '@/interfaces/ProjectPicture.interface'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import PictureModal from './PictureModal'
import { AnimatePresence } from 'framer-motion'

interface ProjectPicturesProps {
  projectId: string
  pictures: ProjectPicture[]
}

const ProjectPictures: React.FC<ProjectPicturesProps> = (props) => {
  const { pictures } = props

  const [currentPicture, setCurrentPicture] = useState<ProjectPicture | null>(
    null
  )

  return (
    <>
      <div className='p-8 space-y-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <h1 className='font-semibold'>Pictures</h1>
        {Array.isArray(pictures) && pictures.length > 0 ? (
          <div className='flex flex-col justify-center items-center'>
            <ul className='grid grid-cols-4 gap-4'>
              {pictures.map((picture) => (
                <React.Fragment key={picture.projectPictureId}>
                  <Image
                    src={picture.imageUrl}
                    alt={picture.cloudinaryPublicId}
                    width={100}
                    height={100}
                    className='shadow-md cursor-pointer'
                    onClick={() => setCurrentPicture(picture)}
                  />
                </React.Fragment>
              ))}
            </ul>
            <Link
              className='text-center font-semibold text-sm mt-4'
              href={`${props.projectId}/pictures`}
            >
              See all pictures
            </Link>
          </div>
        ) : (
          <p>Pictures will be displayed here.</p>
        )}
      </div>
      <AnimatePresence>
        {currentPicture && (
          <PictureModal
            picture={currentPicture}
            close={() => {
              setCurrentPicture(null)
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export { ProjectPictures }
