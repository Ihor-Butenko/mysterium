import express, { Application, Request, Response } from 'express'
import { createServer } from 'node:http'
import path from 'path'
import { Server } from 'socket.io' 
import { onConnected } from './modules/connection'

const app : Application = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', onConnected)

server.listen(8080, () => {
    console.log('http://localhost:3030')
})


export default io