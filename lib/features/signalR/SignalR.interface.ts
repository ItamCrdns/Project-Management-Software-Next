import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'
import { DataCountPages } from '@/interfaces/DataCountPages.interface'

export interface SignalR {
  status: 'connected' | 'disconnected'
  events: DataCountPages<Timeline>
  currentEvent: Timeline | null
}
