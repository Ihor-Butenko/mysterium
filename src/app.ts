import express, { Application, Request, Response } from 'express'
import { createServer } from 'node:http'
import path, { dirname } from 'path'
import { Server, Socket } from 'socket.io' 
import { onConnected } from './modules/connection'

const app : Application = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', onConnected)

server.listen(process.env.PORT || 4040, () => {
    console.log('http://localhost:4040')
})


export default io