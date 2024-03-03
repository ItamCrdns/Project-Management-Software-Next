const Loading: React.FC = () => {
  return (
    <div className='flex items-center gap-4'>
      <span className='h-4 w-4 animate-spin-fast rounded-full border-t-2 border-theming-dark100 dark:border-theming-white100'></span>
      <p className=''>Loading...</p>
    </div>
  )
}

export { Loading }
