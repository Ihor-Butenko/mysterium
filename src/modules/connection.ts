import { Socket } from "socket.io"
import io from '../app'

const socketConnected = new Set<string>()

export const onConnected = (socket : Socket) => {
    console.log(socket.id)
    socketConnected.add(socket.id)

    io.emit('clients-total', socketConnected.size)

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
        socketConnected.delete(socket.id)
        io.emit('clients-total', socketConnected.size)
    })

    socket.on("incoming-message", (data) => {
        socket.broadcast.emit('chat-message', data)
    })

    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
    })
}