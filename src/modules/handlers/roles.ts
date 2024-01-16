import { users } from "./room"

export const createRoleForUsers = (room : string) => {
    const usersRoles : {id : string, role : string}[] = []
    const roomUsers = users.filter((user) => user.room === room)
    const ghostIndex = Math.floor(Math.random() * roomUsers.length)

    roomUsers[ghostIndex].role = 'ghost'

    for(let user of roomUsers){
        if(user.role === 'none'){
            user.role = 'psychic'
        }
        usersRoles.push({id : user.id, role : user.role })
    }

    return usersRoles
}