import { Socket } from 'socket.io'
import genKey from './func/generateKey'
import io from '../../app'

export interface Users {
    id : string
    room : string
    username : string
    role : string
}

export const users : Users[] = []

export const createRoom = (socket : Socket, username : string, id : string) => {
    const room = genKey(5)
    const user = {id, room, username, role : 'none'}
    users.push(user)
    return user
}

export const joinToRoom = (socket : Socket, room : string, username : string, id : string) => {
    const user = {id,room, username, role : 'none'}
    users.push(user)
    return user
}

export const disconnectFromRoom = (id : string) => {
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1) return users.splice(index, 1)[0]
}

export const getRoomUsers = (room : string) => {
    const roomUsers = users.filter((user) => user.room === room)
    const usernames = []

    for(let room of roomUsers){
        usernames.push(room.username)
    }
    return usernames
}

export const getRoomUsersWithRoles = (room : string) => {
    const roomUsers : Users[] = users.filter((user) => user.room === room)
    const usernamesAndRoles : Record<string, string> = {}

    for(let room of roomUsers){
        usernamesAndRoles[room.username] = room.role
    }

    return usernamesAndRoles
}
