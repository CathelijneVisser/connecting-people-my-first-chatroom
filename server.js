import * as path from 'path'

import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'

const app = express()
const http = createServer(app)
const ioServer = new Server(http)



app.use(express.static(path.resolve('public')))


ioServer.on('connection', (client) => {

  client.on('user', (name) => {

    console.log(`user ${name} connected`)

    ioServer.emit('user', name)

    client.on('message', (message) => {
      console.log(`user ${name} sent message: ${message}`)
      ioServer.emit('message', {name: name, message: message})
    })

    client.on('disconnect', (name) => {
      ioServer.emit('disconnect', (name))
      console.log(`user ${name} disconnected`)
    })
  })
})



const port = process.env.PORT || 4242
http.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})
