const config = require('../config/config.json')
const redis = require('redis')
const client = redis.createClient(config.redis.port)

client.on('error', function(err) {
  console.log('Error ' + err)
})

redis.client = client

module.exports = redis
