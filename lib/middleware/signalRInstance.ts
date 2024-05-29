import { HubConnectionBuilder } from '@microsoft/signalr'

const connection = new HubConnectionBuilder()
  .withUrl(process.env.NEXT_PUBLIC_SIGNALR_URL as string)
  .build()

export default connection
