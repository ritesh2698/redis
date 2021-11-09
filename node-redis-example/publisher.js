const redis = require('redis')
const publisher = redis.createClient()

const channel = 'status';

const publish= async()=>{
    console.log(`Started ${channel} channel publisher........`)
    publisher.publish(channel,'free')
}

publish()