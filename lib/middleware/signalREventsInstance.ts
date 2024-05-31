import { HubConnectionBuilder } from '@microsoft/signalr'

const eventsConnection = new HubConnectionBuilder()
  .withUrl(process.env.NEXT_PUBLIC_SIGNALR_EVENTS_HUB_URL as string)
  .build()

export default eventsConnection
