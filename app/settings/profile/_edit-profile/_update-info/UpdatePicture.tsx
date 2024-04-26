'use client'
import { Button } from '@/components/Button/Button'
import { Trash } from '@/svg/Trash'
import { Upload } from '@/svg/Upload'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface UpdatePictureProps {
  username: string
  picture: string
}

const UpdatePicture: React.FC<UpdatePictureProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [picturePreview, setPicturePreview] = useState<string>('')

  return (
    <div className='flex gap-4 items-center'>
      {picturePreview === ''
        ? (
        <Image
          alt={props.username}
          src={props.picture}
          width={100}
          height={100}
          className='rounded-full shadow-md'
        />
          )
        : (
        <div className='relative rounded-full shadow-md w-[100px] h-[100px]'>
          <Image
            alt={props.username}
            src={picturePreview}
            fill={true}
            className='rounded-full object-cover'
          />
        </div>
          )}
      <div className='space-y-2'>
        <h1 className='font-semibold'>Change profile picture</h1>
        <div className='flex gap-4'>
          <Button
            text='Upload picture'
            icon={<Upload />}
            func={() => {
              if (inputRef.current !== null) {
                inputRef.current.click()
              }
            }}
          />
          <Button text='Remove' bgColor='bg-red-500' icon={<Trash />} />
          <input
            type='file'
            name='profilePicture'
            ref={inputRef}
            hidden
            accept='image/*'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0]
              if (file !== undefined) {
                setPicturePreview(URL.createObjectURL(file))
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default UpdatePicture
