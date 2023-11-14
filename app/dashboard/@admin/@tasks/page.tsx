'use client'
import { useContext } from 'react'
import { FilterContext } from '@/context/Filter/FilterContext'
import { type FilterContextType } from '@/interfaces/props/context props/FilterContextType'
import useTasksGetter from '@/api-calls/getTasksAdmin'
import TasksList from './TasksList'
import entitySetter from '../../EntitySetter'
import { type IEntity } from '@/interfaces/props/context props/IEntity'

const Tasks: React.FC = () => {
  const { filter, entity, updateEntity, updateFilter } = useContext(
    FilterContext
  ) as FilterContextType

  const { tasks, isLoading, isError } = useTasksGetter(filter.tasks)

  const props = {
    entityT: tasks,
    entityU: entity,
    entityName: 'tasks' as keyof IEntity,
    updateEntity
  }

  entitySetter(props)

  return (
    <TasksList
      isLoading={isLoading}
      isError={isError}
      tasks={tasks}
      updateFilter={updateFilter}
    />
  )
}

export default Tasks
