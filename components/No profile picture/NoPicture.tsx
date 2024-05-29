interface NoPictureProps {
  width: string
  height: string
  questionMarkSize?: string
}

const NoPicture: React.FC<NoPictureProps> = (props) => {
  const questionMarkSize = props.questionMarkSize ?? '1rem'

  const height = props.height
  const width = props.width

  return (
    <div
      className={`w-[${width}] h-[${height}] flex items-center justify-center bg-azure-radiance-400 rounded-full select-none text-white text-[${questionMarkSize}]`}
    >
      ?
    </div>
  )
}

export default NoPicture
