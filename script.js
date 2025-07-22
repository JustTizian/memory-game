function $(query) {
    return document.querySelector(query)
}

const cardContainer = $('#card-container')

const cardSymbols = ["👾","💩","😶‍🌫️","🫡","🎶","😎","❤️","🥶"]

let cards;
const cards1 = cardSymbols.map(_symbol => {
    const symbol = _symbol
    const turned = false
    const button = document.createElement("button")
    return { symbol, turned, button}
})

const cards2 = cardSymbols.map(_symbol => {
    const symbol = _symbol
    const turned = false
    const button = document.createElement("button")
    return { symbol, turned, button}
})

cards = [...cards1, ...cards2]
cards.sort(() => Math.ceil(Math.random() * 10) - 5)

const flippedCards = []

cards.forEach(card => card.button.addEventListener("click", () => flipCard(card)))

updateUI()
function updateUI() {
    cards.forEach(card => {
        !card.turned ? card.button.textContent = "?" : card.button.textContent = card.symbol
        cardContainer.appendChild(card.button)
    })
}

function flipCard(card) {
    card.turned = !card.turned
    flippedCards.push(card)
    if(flippedCards.length === 2){
        console.log(flippedCards[0].symbol === flippedCards[1].symbol)
        flippedCards.pop()
        flippedCards.pop()
    }
    updateUI()
}

