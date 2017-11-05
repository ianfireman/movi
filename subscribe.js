const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')


client.on('connect', () => {
  client.subscribe('movi/info')
})

client.on('message', (topic, message) => {
  if(topic === 'movi/info') {
    console.log(message.toString())
  }
})