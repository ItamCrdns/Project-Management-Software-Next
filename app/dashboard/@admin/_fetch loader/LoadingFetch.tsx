const LoadingFetch: React.FC<{ entityName: string }> = (props) => {
  return (
    <div className='w-full space-y-4'>
      <div className='flex items-center justify-center gap-4 h-80'>
        <span className='h-6 w-6 animate-spin-fast rounded-full border-t-2 border-theming-dark100 dark:border-theming-white100'></span>
        <p>Loading {props.entityName}...</p>
      </div>
    </div>
  )
}

export default LoadingFetch
