'use client'
import { useContext } from 'react'
import { FilterContext } from '@/context/Filter/FilterContext'
import { type FilterContextType } from '@/interfaces/props/context props/FilterContextType'
import useTasksGetter from '@/api-calls/getTasksAdmin'
import TasksList from './TasksList'
import entitySetter from '../../EntitySetter'
import { type IEntity } from '@/interfaces/props/context props/IEntity'

const Tasks: React.FC = () => {
  const { filter, entity, updateEntity } = useContext(
    FilterContext
  ) as FilterContextType

  const currentPage = filter.tasks.currentPage ?? '1'
  const pageSize = filter.tasks.pageSize ?? '1'

  const { tasks, isLoading, isError } = useTasksGetter(currentPage, pageSize)

  const props = {
    entityT: tasks,
    entityU: entity,
    entityName: 'tasks' as keyof IEntity,
    updateEntity
  }

  entitySetter(props)

  return <TasksList isLoading={isLoading} isError={isError} tasks={tasks} />
}

export default Tasks
