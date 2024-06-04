import { Button } from '@/components/Button/Button'
import { Upload } from '@/icons/Upload'
import { useRef, useState } from 'react'
import Resume from './Resume'
import Image from 'next/image'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { Close } from '@/icons/Close'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { useAppSelector } from '@/lib/hooks/hooks'

const AddImages: React.FC<{ goBack: () => void }> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [showResume, setShowResume] = useState<boolean>(false)

  const pictures = useAppSelector((state) => state.newProjectData.pictures)

  const { setPictures, removePicture } = useNewProjectActions()

  const { setAlert } = useAlertActions()

  return (
    <>
      {showResume ? (
        <Resume
          goBack={() => {
            setShowResume(false)
          }}
        />
      ) : (
        <>
          <h1 className='text-center text-2xl'>
            Would you like to add images to your project?
          </h1>
          {pictures.length > 0 && (
            <>
              <p className='text-center my-4 mb-8'>
                Here are the images you have selected. You can add more or
                remove, up to 10 images
              </p>
              <div className='grid grid-cols-4 gap-4'>
                {pictures.map((picture) => (
                  <div key={picture.id} className='relative'>
                    <div
                      className='absolute -top-2 -right-2 bg-red-500 rounded-full p-[2px] cursor-pointer'
                      onClick={() => removePicture(picture.id)}
                    >
                      <Close small color='text-white' />
                    </div>
                    <Image
                      alt={picture.id}
                      src={URL.createObjectURL(picture.file)}
                      width={100}
                      height={100}
                      className='shadow-md'
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          <input
            type='file'
            name='images'
            ref={inputRef}
            hidden
            accept='image/*'
            multiple
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const fileArray = Array.from(e.target.files || [])

              const newPictures: { file: File; id: string }[] = pictures.concat(
                fileArray.map((file) => ({
                  file,
                  id: file.name + Date.now()
                }))
              )

              if (newPictures.length > 10) {
                setAlert({
                  id: fileArray.map((x) => x.name).toString(),
                  message: 'You can only upload up to 10 images',
                  type: 'error'
                })

                return
              }

              setPictures(newPictures)
            }}
          />
          <div className='space-y-4'>
            <div className='flex items-center gap-4 mt-4'>
              <Button
                text={
                  pictures.length > 0
                    ? 'Select more images (10 max)'
                    : 'Select images (10 max)'
                }
                icon={<Upload />}
                func={() => {
                  if (inputRef.current !== null) {
                    inputRef.current.click()
                  }
                }}
              />
              <Button
                text='Return'
                func={() => {
                  props.goBack()
                }}
                borderOnly={true}
                txtColor='black'
              />
            </div>
            {pictures.length > 0 ? (
              <Button
                text='Continue'
                func={() => {
                  setShowResume(true)
                }}
              />
            ) : (
              <Button
                text='Continue without adding images'
                func={() => {
                  setShowResume(true)
                }}
                borderOnly={true}
                txtColor='black'
              />
            )}
          </div>
        </>
      )}
    </>
  )
}

export default AddImages
