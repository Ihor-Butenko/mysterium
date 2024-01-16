import { pickRandomItems, pickRandomItemFromArray } from './func/pickRandomItesms'

const places = ['place 1', 'place 2', 'place 3', 'place 4', 'place 5', 'place 6', 'place 7', 'place 8', 'place 9', 'place 10']
const persons = ['person 1', 'person 2', 'person 3', 'person 4', 'person 5', 'person 6', 'person 7', 'person 8', 'person 9', 'person 10']
const things = ['thing 1', 'thing 2', 'thing 3', 'thing 4', 'thing 5', 'thing 6', 'thing 7', 'thing 8', 'thing 9', 'thing 10']

export interface GameCards {
    places : {[room : string] : {
        allCards : string[]
        psychicCards : {[username : string] : string}
    }}
    persons : {[room : string] : {
        allCards : string[]
        psychicCards : {[username : string] : string}
    }}
    things : {[room : string] : {
        allCards : string[]
        psychicCards : {[username : string] : string}
    }}
}

export const gameCards: GameCards = {
    places: {},
    persons: {},
    things: {}
}

export const createCards = (room: string) => {
    gameCards.places[room] = {
        allCards: pickRandomItems(6, places),
        psychicCards: {}
    }

    gameCards.persons[room] = {
        allCards: pickRandomItems(6, persons),
        psychicCards: {}
    }

    gameCards.things[room] = {
        allCards: pickRandomItems(6, things),
        psychicCards: {}
    }
};


export const definePsyhicCards = (users : object, room : string) => {
    const psychicCardsArray = Object.entries(users)
        .filter(([username, role]) => role === 'psychic')
        
    for(let psychic of psychicCardsArray){
        gameCards.places[room].psychicCards[psychic[0]] = pickRandomItemFromArray(gameCards.places[room].allCards)
        gameCards.persons[room].psychicCards[psychic[0]] = pickRandomItemFromArray(gameCards.persons[room].allCards)
        gameCards.things[room].psychicCards[psychic[0]] = pickRandomItemFromArray(gameCards.things[room].allCards)
    }
}