const ProjectPriority = ({ priority }: { priority: number }): JSX.Element => {
  let priorityText: string = ''
  let color: string = ''

  switch (priority) {
    case 1:
      priorityText = 'Low'
      color = 'green'
      break
    case 2:
      priorityText = 'Moderate'
      color = 'rgb(237, 194, 0)'
      break
    case 3:
      priorityText = 'Normal'
      break
    case 4:
      priorityText = 'High'
      color = 'orange'
      break
    case 5:
      priorityText = 'Urgent'
      color = 'red'
      break
    default:
      priorityText = 'Not valid'
  }

  return (
    <div>
      <p style={{ color }}>{priorityText}</p>
    </div>
  )
}
export default ProjectPriority
