import { ProjectPicture } from '@/interfaces/ProjectPicture.interface'
import { useOutsideClick } from '@/utility/closeOnOutsideClick'
import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'framer-motion'

const PictureModal = ({
  picture,
  close
}: {
  picture: ProjectPicture
  close: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick({ ref, closeThis: close })

  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className='fixed inset-0 inset-y-12 bg-black bg-opacity-20 w-full h-full flex flex-col items-center justify-center  mt-8 p-0 z-999'
    >
      <div
        ref={ref}
        className='absolute top-8 flex items-center justify-center flex-col min-h-96 bg-theming-white100 dark:bg-theming-dark300 p-8 rounded-md shadow-md'
      >
        <Image
          alt={picture.cloudinaryPublicId}
          src={picture.imageUrl}
          sizes='100vw'
          style={{
            width: '100%',
            height: 'auto'
          }}
          width={600}
          height={300}
          className='select-none shadow-md'
        />
      </div>
      <div className='absolute bottom-16 p-8'>
        <p>Click outside to close</p>
      </div>
    </motion.section>
  )
}

export default PictureModal
