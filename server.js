import * as path from 'path'

import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'

const app = express()
const http = createServer(app)
const ioServer = new Server(http)



app.use(express.static(path.resolve('public')))


ioServer.on('connection', (client) => {
  console.log(client)
  console.log(`user ${client.id} connected`)
  ioServer.emit(`user ${client.id} connected`)

  client.on('message', (message) => {
    console.log(`user ${client.id} sent message: ${message}`)
    ioServer.emit('message', message)
  })

  client.on('disconnect', () => {
    console.log(`user ${client.id} disconnected`)
  })
})



const port = process.env.PORT || 4242
http.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})
