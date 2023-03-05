const redis = require('redis');
const { createClient } = require('redis');
const redisClient = createClient('redis://localhost:6379');
const redisConnection=redisClient.connect();
redisConnection.then((value)=>{
  console.log('connected to redis');
  console.log(redisClient.isReady===true?'redis ready':'not ready');
});
module.exports={redisClient};