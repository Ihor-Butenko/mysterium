export const sleep : string[] = ['sleep 1', 'sleep 2', 'sleep 3', 'sleep 4', 'sleep 5', 'sleep 6', 'sleep 7', 'sleep 8', 'sleep 9', 'sleep 10', 'sleep 11', 'sleep 12', 'sleep 13', 'sleep 14', 'sleep 15', 'sleep 16', 'sleep 17', 'sleep 18', 'sleep 19', 'sleep  20']

export interface DayObject {
    room : string
    count : number
    currentTypeOfCards : string
    personsCardsLeft : {}
    placesCardsLeft : {}
    thingsCardsLeft : {}
    sleep : string[]
}