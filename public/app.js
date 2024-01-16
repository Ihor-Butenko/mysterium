const socket = io()

window.onload = () => {
    const render = new Render
    const client = new Client

    render.inputContainerRender()

    document.querySelector('.create-room').addEventListener('click', () => {
        client.createRoom(document.querySelector('.username').value)

        render.createStartButton()
    })
    document.querySelector('.join-room').addEventListener('click', () => {

        client.joinRoom(document.querySelector('.username').value, document.querySelector('.room-code').value)
    })

    socket.on('users-in-room', (data) => {
        client.usersInRoom(render.removeElement.bind(render, document.querySelector('.input-container')), render.createRoomLobby.bind(render), JSON.parse(data))

        if(document.querySelector('.start-button')){
        document.querySelector('.start-button').addEventListener('click', () => {
            socket.emit('create-user-roles', client.currentRoom)
        })}
    })

    socket.on('show-role', (data) => {
        client.showUsersRole(render.removeElement.bind(render), render.createRoleContainer.bind(render), data.find((user) => user.id === socket.id))
    })

    socket.on('show-cards', (data) => {
        console.log(data)
        client.showCards(render.createGameTable.bind(render), render.removeElement.bind(render), data)
    })

}


class Render {
    inputContainerRender() {
        const inputContainer = document.createElement('div')

        inputContainer.className = 'input-container'
        inputContainer.innerHTML = `
            <input class="room-code" placeholder="Room code">
            <input class="username" placeholder="username">
            <button class="create-room">Create room</button>
            <button class="join-room">Join room</button>
            <div class="error-message"></div>
            `

        document.body.appendChild(inputContainer)
    }

    removeElement(element){
        if(element){
            element.remove()
        }
    }

    createRoomLobby(){
        const roomLobbyContainer = document.createElement('div')

        roomLobbyContainer.classList += 'room'
        roomLobbyContainer.innerHTML = `
            <p class="room-id"></p>
            <div class="users-in-room"></div>
        `

        document.body.appendChild(roomLobbyContainer)
    }

    createStartButton(){
        const btn = document.createElement('button')
        
        btn.classList += 'start-button'
        btn.innerHTML = 'Start Game'

        document.body.appendChild(btn)
    }

    createRoleContainer(){
        const roleContainer = document.createElement('div')
        roleContainer.classList += 'role-container'

        document.body.appendChild(roleContainer)
    }

    createGameTable(){
        const gameTable = document.createElement('div')
        gameTable.classList += 'game-table'

        document.body.appendChild(gameTable)
    }
}

class Client {

    currentRoom
    currentRole

    createRoom(usernameValue) {
        const obj = { username: usernameValue }

        socket.emit('create-room', JSON.stringify(obj))
    }

    joinRoom(usernameValue, roomCodeValue){
            const obj = { room: roomCodeValue, username: usernameValue }

            socket.emit('join-room', JSON.stringify(obj))
            socket.on('no-rooms-found', () => {
                document.querySelector('.error-message').innerHTML = '<p>No rooms found!</p>'
            })
    }

    usersInRoom(removeInputFunction, createRoomLobby, roomObj) {
        removeInputFunction()
        createRoomLobby()
        
        this.currentRoom = roomObj.room

        document.querySelector('.room-id').innerHTML = roomObj.room
        document.querySelector('.users-in-room').innerHTML = ''
        for (let user of roomObj.users) {
            const userElement = document.createElement('h1');
            userElement.textContent = user;
            document.querySelector('.users-in-room').appendChild(userElement);
        }
    }

    showUsersRole(removeRoomFunction, createRoleContainer, userWithRole){
        removeRoomFunction(document.querySelector('.room'))
        createRoleContainer()

        this.currentRole = userWithRole.role   

        document.querySelector('.role-container').innerHTML = `<h1>You are: ${userWithRole.role}</h1>`

        setTimeout(() => {
            socket.emit('show-game-table', JSON.stringify({ role: userWithRole.role, room: this.currentRoom }))
            removeRoomFunction(document.querySelector('.role-container'))
        }, 3000)
    }

    showCards(createGameTable, clearGameTable, data){    
        const obj = data[0]
        const dayObj = data[1]

        if(document.querySelector('.game-table')){
            clearGameTable(document.querySelector('.game-table'))
        }

        createGameTable()
        if(this.currentRole === 'ghost'){

            for (let sleep of dayObj.sleep) {
                const sleepElement = document.createElement('h1')
                sleepElement.className = sleep.replace(/\s/g, '')
                sleepElement.textContent = `${sleep}`

                document.querySelector('.game-table').appendChild(sleepElement.cloneNode(true))
            }
            
            if(dayObj.currentTypeOfCards === 'persons'){

                for (let card in obj.persons[this.currentRoom].psychicCards) {
                    const personElement = document.createElement('h1')
                    personElement.className = card.replace(/\s/g, '')
                    personElement.textContent = `${card} : ${obj.persons[this.currentRoom].psychicCards[card]}`

                    document.querySelector('.game-table').appendChild(personElement.cloneNode(true))
                }
                
            }else if(dayObj.currentTypeOfCards === 'places'){

                for (let card in obj.places[this.currentRoom].psychicCards) {
                    const placeElement = document.createElement('h1')
                    placeElement.className = card.replace(/\s/g, '')
                    placeElement.textContent = `${card} : ${obj.places[this.currentRoom].psychicCards[card]}`

                    document.querySelector('.game-table').appendChild(placeElement.cloneNode(true))
                }

            }else if(dayObj.currentTypeOfCards === 'things'){

                for (let card in obj.things[this.currentRoom].psychicCards) {
                    const thingElement = document.createElement('h1')
                    thingElement.className = card.replace(/\s/g, '')
                    thingElement.textContent = `${card} : ${obj.things[this.currentRoom].psychicCards[card]}`

                    document.querySelector('.game-table').appendChild(thingElement.cloneNode(true))
                }
            }
        }else{
            if(dayObj.currentTypeOfCards === 'persons'){
                for (let card of obj.persons[this.currentRoom].allCards) {
                    const personElement = document.createElement('h1')
                    personElement.className = card.replace(/\s/g, '')
                    personElement.textContent = `${card}`
                    console.log('action work')
                    document.querySelector('.game-table').appendChild(personElement.cloneNode(true))
                }
            }else if(dayObj.currentTypeOfCards === 'places'){

                for (let card of obj.places[this.currentRoom].allCards) {
                    const placeElement = document.createElement('h1')
                    placeElement.className = card.replace(/\s/g, '')
                    placeElement.textContent = `${card}`

                    document.querySelector('.game-table').appendChild(placeElement.cloneNode(true))
                }
            }else if(dayObj.currentTypeOfCards === 'things'){

                for (let card of obj.things[this.currentRoom].allCards) {
                    const thingElement = document.createElement('h1')
                    thingElement.className = card.replace(/\s/g, '')
                    thingElement.textContent = `${card}`

                    document.querySelector('.game-table').appendChild(thingElement.cloneNode(true))
                }
            }
        }
    }

}