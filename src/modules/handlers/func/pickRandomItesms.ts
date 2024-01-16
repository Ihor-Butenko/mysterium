export const pickRandomItems = (count: number, cardArray: string[]) : string[] => {
    let copy = cardArray.slice(0)
    const selectedItemsArray = []
    
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * copy.length)
        const selectedItem = copy[randomIndex]

        copy.splice(randomIndex, 1)

        selectedItemsArray.push(selectedItem)
    }

    return selectedItemsArray
}

export const pickRandomItemFromArray = (array : string[]) => {
    const randomIndex = Math.floor(Math.random() * array.length)
    const selectedItem = array[randomIndex]

    return selectedItem
}