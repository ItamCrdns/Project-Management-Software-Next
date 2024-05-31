import { HubConnectionBuilder } from '@microsoft/signalr'

const notificationsConnection = new HubConnectionBuilder()
  .withUrl(process.env.NEXT_PUBLIC_SIGNALR_NOTIFICATIONS_HUB_URL as string)
  .build()

export default notificationsConnection
