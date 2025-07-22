function $(query) {
    return document.querySelector(query)
}

const cardContainer = $('#card-container')

const cardSymbols = ["👾", "💩", "😶‍🌫️", "🫡", "🎶", "😎", "❤️", "🥶"]

let cards;
const cards1 = cardSymbols.map(_symbol => {
    const symbol = _symbol
    const turned = false
    const solved = false
    const button = document.createElement("button")
    return { symbol, turned, button }
})

const cards2 = cardSymbols.map(_symbol => {
    const symbol = _symbol
    const turned = false
    const solved = false
    const button = document.createElement("button")
    return { symbol, turned, button }
})

cards = [...cards1, ...cards2]
cards.sort(() => Math.ceil(Math.random() * 10) - 5)

const flippedCards = []

cards.forEach(card => {
    card.button.addEventListener("click", () => flipCard(card))
    cardContainer.appendChild(card.button)
})

updateUI()
function updateUI() {
    cards.forEach(card => {
        card.solved && (card.turned = true)
        !card.turned ? card.button.textContent = "?" : card.button.textContent = card.symbol
    })
}

let fails = 0;

function flipCard(card) {

    if (card.turned === true) { console.log("Fail"); return }

    if (flippedCards.length === 2) {
        flippedCards.forEach(card => card.turned = false)
        flippedCards.length = 0
    }

    updateUI()
    card.turned = !card.turned
    flippedCards.push(card)
    if (flippedCards.length === 2) {
        if (flippedCards[0].symbol === flippedCards[1].symbol) {
            flippedCards.forEach(card => card.solved = true)
        } else {
            fails++
        }
    }
    updateUI()

    if (cards.every(card => card.solved || card.turned)) {
        console.log("You won!")
    }
}

cards.forEach(card => console.log(card.symbol))

/*setInterval(() => {
    const unturnedCards = cards.filter(card => !card.turned)
    const cardToFlip = unturnedCards[Math.floor(Math.random() * unturnedCards.length)]
    flipCard(cardToFlip)
    console.log(fails)
}, 100)*/

