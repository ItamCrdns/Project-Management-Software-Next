const Reset: React.FC<{ reset?: () => void }> = (props) => {
  return (
    <span
      className='ml-4 cursor-pointer hover:text-azure-radiance-600'
      onClick={props.reset}
    >
      Clear
    </span>
  )
}

export { Reset }
