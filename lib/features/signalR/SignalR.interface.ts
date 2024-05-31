import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'
import { DataCountPages } from '@/interfaces/DataCountPages.interface'
import { Notification } from '@/interfaces/Notification.interface'

export interface SignalR {
  eventsHubStatus: 'connected' | 'disconnected' | 'connecting'
  notificationsHubStatus: 'connected' | 'disconnected' | 'connecting'

  events: DataCountPages<Timeline>
  notifications: DataCountPages<Notification>
  currentEvent: Timeline | null
}
