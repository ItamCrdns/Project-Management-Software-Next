const Loading: React.FC<{ entityName: string }> = (props) => {
  return (
    <div className='flex gap-4 items-center justify-center w-12 h-12'>
      <span className='h-6 w-6 animate-spin-fast rounded-full border-t-2 border-theming-dark100 dark:border-theming-white100'></span>
      <p>Loading {props.entityName}...</p>
    </div>
  )
}

export default Loading
