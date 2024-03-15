const Resume: React.FC<{ return: () => void }> = (props) => {
  return (
    <section className='flex items-center flex-col justify-center space-y-4'>
      <h1 className='text-2xl text-center'>Your new task overview</h1>
      <p className='w-96 mb-4 text-center'>
        Please carefully review the information you are about to submit.
      </p>
    </section>
  )
}

export { Resume }
