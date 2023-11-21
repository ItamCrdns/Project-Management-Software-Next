interface TaskIdProps {
  params: { projectId: string, taskId: string }
}

const TaskId: React.FC<TaskIdProps> = (props) => {
  return (
    <section>
      {props.params.projectId}/{props.params.taskId}
    </section>
  )
}

export default TaskId
