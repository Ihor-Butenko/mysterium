import { Socket } from 'socket.io'
import io from '../app'
import { createRoom, joinToRoom, disconnectFromRoom, getRoomUsers, Users, getRoomUsersWithRoles } from './handlers/room'
import { createRoleForUsers } from './handlers/roles'
import { createCards, gameCards, definePsyhicCards } from './handlers/cards'
import { sleep } from './handlers/day'
import { DayObject } from './handlers/day'
import { pickRandomItems } from './handlers/func/pickRandomItesms'

const socketConnected = new Set<string>()

export const onConnected = (socket : Socket) => {
    socketConnected.add(socket.id)
    console.log(socketConnected.size)

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
        socketConnected.delete(socket.id)
        io.emit('clients-total', socketConnected.size)   
        console.log(socketConnected.size)

        const user = disconnectFromRoom(socket.id)

        if(user){
            const roomObj = {
                room: user.room,
                users: getRoomUsers(user.room)
            }
            io.to(user.room).emit("users-in-room", JSON.stringify(roomObj))

            if(roomObj.users.length === 0){
                delete gameCards.places[roomObj.room]
                delete gameCards.persons[roomObj.room]
                delete gameCards.things[roomObj.room]
            }
        }
    })

    socket.on('create-room', (data) => {
        const obj = JSON.parse(data)
        const user : Users = createRoom(socket, obj.username, socket.id)

        socket.join(user.room)

        const roomObj = {
            room: user.room,
            users: getRoomUsers(user.room)
        }

        io.to(user.room).emit("users-in-room", JSON.stringify(roomObj))
    })

    socket.on('join-room', data => {
        const rooms = io.of("/").adapter.rooms
        const obj = JSON.parse(data)
        if(rooms.has(obj.room)){
        const user : Users = joinToRoom(socket, obj.room, obj.username, socket.id)

        socket.join(user.room)

        const roomObj = {
            room: user.room,
            users: getRoomUsers(user.room)
        }

        io.to(user.room).emit('users-in-room', JSON.stringify(roomObj))
        }else{
            io.to(socket.id).emit('no-rooms-found')
        }
    })

    socket.on('create-user-roles', (data) => {
        io.to(data).emit('show-role', createRoleForUsers(data))
        createCards(data)
    })

    socket.on('show-game-table', (data) => {
        const obj = JSON.parse(data);
        definePsyhicCards(getRoomUsersWithRoles(obj.room), obj.room)

        io.to(socket.id).emit('show-cards', [gameCards, {
            room : obj.room,
            count : 1,
            currentTypeOfCards : 'persons',
            personsCardsLeft : gameCards.persons.psychicCards,
            placesCardsLeft : gameCards.places.psychicCards,
            thingsCardsLeft : gameCards.things.psychicCards,
            sleep : pickRandomItems(6, sleep)
        } as DayObject])
    })  

}