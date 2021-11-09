const redis = require('redis')
const client = redis.createClient()
const Express = require('express')
const app = Express()
const axios = require('axios')
const { response } = require('express')

// client.on('connect',()=>{
//     console.log("Connected!")
// })

//-----------------Redis Data Type-----------------------------

//------------------String--------------
// client.set('framework','Ritesh Prajapati',(err,reply)=>{
//     console.log(reply)
// })

//                      or

// client.set(['framework', 'ReactJS'],(err,reply)=>{
//     console.log(reply)
// });


// client.get('framework',(err,reply)=>{
//     console.log(reply)
// })

//--------------Hashes-------------------
// client.hmset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express');
//                          or
// client.hmset('frameworks_hash',{
//     'javsacript':'reactJS',
//     'css': 'TailwindCSS',
//     'node': 'Express',
// })

// client.hgetall('frameworks_hash', (err, object)=> {
//   console.log(object); 
// });

//-------------List-------------------
// client.rpush(['frameworks_list','ReactJS','MongoDB'],(err,reply)=>{
//     console.log(reply)
// })

// client.lrange('frameworks_list',0,-1,(err,reply)=>{
//     console.log(reply)
// })

//-------------Sets------------------
// client.sadd(['frameworks_set', 'ReactJS', 'Angular', 'Svelte', 'VueJS', 'VueJS'],(err,reply)=>{
//     console.log(reply)
// })

// client.smembers('frameworks_set',(err,reply)=>{
//     console.log(reply)
// })

//----------------------Redis Operation---------------------------

//Checking the existence of keys
// client.exists('framework',(err,reply)=>{
//     if(reply === 1){
//         console.log("Exists")
//     }
//     else{
//         console.log("Doesent Exits")
//     }
// })

//Deleting and expiring keys
// client.del('framework',(err,reply)=>{
//     console.log(reply)
// })

//Incrementing  
// client.set('working_days',4,()=>{
//     //.....incr()
//     client.incr('working_days',(err,reply)=>{
//         console.log(reply)
//     })

//     //......incrby()
//     client.incrby('working_days',5,(err,reply)=>{
//         console.log(reply)
//     })
// })

//decrementing
// client.set('Ruppe', 10,()=>{
//     //.......decr()
//     client.decr('Rupee',(err,rupee)=>{
//         console.log(rupee)
//     })

//     //.....decrby()
//     client.decrby('Rupee',10,(err,rupee)=>{
//         console.log(rupee)
//     })
// })

//----------Redis uses Cases
const USERS_API = 'https://jsonplaceholder.typicode.com/users/';

app.get('/users',(req,res)=>{
    try{
        axios.get(`${USERS_API}`).then((response)=>{
            const users = response.data
            console.log("User retrived from the api");
            res.status(200).send(users)  
        })
    } catch(err){
        res.status(500).send({error:err.message})
    }
})

app.get('/cached-users',(req,res)=>{
    try{
        client.get('user',(err,data)=>{
            if(err){
                console.error(err)
                throw err
            }
            if(data){
                console.log("Users retrived from Redis")
                res.status(200).send(JSON.parse(data))
            }
            else{
                axios.get(`${USERS_API}`).then((response)=>{
                    const users = response.data
                    client.setex('users',600, JSON.stringify(users))
                    console.log("Users retrived from the API")
                    res.status(200).send(users)
                })
            }

        })
    }
    catch(err){
        res.status(500).send({error : err.message})
    }
})

app.listen(3000,()=>{
    console.log("Server started at server 3000")
})