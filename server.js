import * as path from 'path'

import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'

const app = express()
const http = createServer(app)
const ioServer = new Server(http)



app.use(express.static(path.resolve('public')))


ioServer.on('connection', (client, name) => {

  ioServer.on('user', name){
    console.log(`user ${name} connected`)
    ioServer.emit(`new user conected ${name}`)
  }

  client.on('message', (message) => {
    console.log(`user ${client.id} sent message: ${message}`)
    ioServer.emit('message', message)
  })

  client.on('disconnect', () => {
    console.log(`user ${client.id} disconnected`)
    ioServer.emit(`user ${client.id} disconnected`)
  })
})



const port = process.env.PORT || 4242
http.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})
