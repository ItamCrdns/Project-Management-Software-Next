import LoggedInCard from '@/components/Header title/LoggedInCard'

const EntityHeader: React.FC<{ name: string }> = (props) => {
  return (
    <div className='flex justify-between items-center'>
      <h1 className='text-2xl font-semibold'>
        All <span className='capitalize'>{props.name}</span> overview
      </h1>
      <LoggedInCard
        optionsText='Filters'
        entityName={props.name}
        isDashboard
      />
    </div>
  )
}

export default EntityHeader
