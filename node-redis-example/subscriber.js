const redis = require('redis')
const subscriber = redis.createClient()

const channel = 'status'

subscriber.subscribe(channel,(err,channel)=>{
    if(err){
        throw new Error(err)
    }
    console.log(`Subscriber to ${channel} channel.listening for updates on the ${channel} channel ....`)
})

subscriber.on('message', (channel, message) => {
    console.log(`Received message from ${channel} channel: ${message}`);
  });