import { type Style } from './EntityRenderer'

interface EntityPriorityProps {
  priority: number
  style: Style
}

const EntityPriority: React.FunctionComponent<EntityPriorityProps> = (props) => {
  let priorityText: string = ''
  let color: string = ''

  switch (props.priority) {
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
    <div style={props.style}>
      <p style={{ color }}>{priorityText}</p>
    </div>
  )
}
export default EntityPriority
