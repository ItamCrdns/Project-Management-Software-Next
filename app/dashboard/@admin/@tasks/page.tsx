'use client'
import { useContext } from 'react'
import { FilterContext } from '@/context/Filter/FilterContext'
import { type FilterContextType } from '@/interfaces/props/context props/FilterContextType'
import useTasksGetter from '@/api-calls/getTasksAdmin'
import TasksList from './TasksList'

const Tasks: React.FC = () => {
  const { filter, updateEntity } = useContext(
    FilterContext
  ) as FilterContextType

  const { tasks, isLoading, isError } = useTasksGetter(
    filter.tasks.currentPage,
    filter.tasks.pageSize
  )

  return <TasksList isLoading={isLoading} isError={isError} tasks={tasks} />
}

export default Tasks
