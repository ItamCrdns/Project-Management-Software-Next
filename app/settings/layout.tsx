import Menu from './_menu/Menu'

const Settings: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <section className='flex justify-center p-8'>
      <div className='bg-theming-white100 dark:bg-theming-dark300 rounded-md p-8 w-[1500px] flex flex-col gap-4 shadow-md'>
        <header>
          <h1 className='text-xl'>Settings</h1>
        </header>
        <Menu />
        {props.children}
      </div>
    </section>
  )
}

export default Settings
