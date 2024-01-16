import { Users, users } from "./room"

export const searchUserById = (id : string) => {
    const roomUsers = users.find((user) => user.id === id)
    return roomUsers
} 

export const findUserbyUsername = (username : string) => {
    const userId = users.find((user) => user.username === username)
    return userId
}