import React from 'react'

interface NoPictureProps {
  width: string
  height: string
  questionMarkSize?: string
}

const NoPicture: React.FC<NoPictureProps> = (props) => {
  const style: React.CSSProperties = {
    width: props.width,
    height: props.height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: '50%',
    userSelect: 'none',
    color: 'white',
    fontSize: props.questionMarkSize ?? '1.25rem'
  }

  return <div style={style}>?</div>
}

export default NoPicture
