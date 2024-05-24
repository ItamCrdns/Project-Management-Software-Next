import { TimelineType } from './Timeline.interface'

export const determineColorByEventType = (eventType: TimelineType) => {
  switch (eventType) {
    case 'Login':
      return 'bg-blue-400'
    case 'Logout':
      return 'bg-red-400'
    case 'Update':
      return 'bg-blue-400'
    case 'Delete':
      return 'bg-red-400'
    case 'Create':
      return 'bg-green-400'
    case 'Register':
      return 'bg-green-400'
    case 'Assign':
      return 'bg-green-400'
    case 'Unassign':
      return 'bg-red-400'
    case 'Start':
      return 'bg-green-400'
    case 'Finish':
      return 'bg-green-400'
    case 'Cancel':
      return 'bg-red-400'
    default:
      return 'bg-gray-400'
  }
}
