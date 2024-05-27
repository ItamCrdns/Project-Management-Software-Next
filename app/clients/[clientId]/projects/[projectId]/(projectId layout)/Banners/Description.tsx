const Description: React.FC<{ description?: string }> = (props) => {
  return (
    <div className='p-8 space-y-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 min-w-52 max-w-96'>
      <h1 className='font-semibold'>Description</h1>
      <p>{props.description}</p>
    </div>
  )
}

export { Description }
