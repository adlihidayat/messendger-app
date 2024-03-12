import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'ap1',
  useTLS: true,
});

export const pusherClient = new PusherClient(
  "f6921b1bc4f3e9999770"
  ,
  {
    cluster: 'ap1',
  }
);