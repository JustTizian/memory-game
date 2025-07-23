function $(query) {
    return document.querySelector(query)
}

const cardContainer = $('#card-container')
const textBox = $('#text-box')
const resetButton = $('#reset-btn')

textBox.textContent = "Fails: 0"

const cardSymbols = ["👾", "💩", "😶‍🌫️", "🫡", "🤢", "😎", "❤️", "🥶"]

const cards1 = cardSymbols.map(_symbol => {
    return createCard(_symbol)
})

const cards2 = cardSymbols.map(_symbol => {
    return createCard(_symbol)
})

function createCard(_symbol) {
    const symbol = _symbol
    const turned = false
    const solved = false
    const button = document.createElement("button")
    
    const card = { symbol, turned, button }
    card.button.addEventListener("click", () => flipCard(card))
    
    return card
}

let cards = [...cards1, ...cards2]

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5)
}

startGame()
function startGame() {
    shuffleCards()
    
    cardContainer.replaceChildren(...cards.map(card => card.button))
    
    updateUI()
}

function updateUI() {
    cards.forEach(card => {
        card.solved && (card.turned = true)
        !card.turned ? card.button.textContent = "?" : card.button.textContent = card.symbol
    })
}

let fails = 0;
const flippedCards = []
function flipCard(card) {

    if (card.turned === true) { console.log("Fail"); fails++; return }

    if (flippedCards.length >= 2) {
        flippedCards.forEach(card => card.turned = false)
        flippedCards.length = 0
    }

    card.turned = !card.turned
    
    flippedCards.push(card)
    if (flippedCards.length >= 2) {
        if (flippedCards[0].symbol === flippedCards[1].symbol) {
            flippedCards.forEach(card => card.solved = true)
        } else {
            fails++
            textBox.textContent = `Fails: ${fails}`
        }
    }
    
    updateUI()

    if (cards.every(card => card.solved || card.turned)) {
        textBox.textContent = `You won with ${fails} fails!`
        clearInterval(autoPlay)
    }
}

function reset() {
    flippedCards.length = 0
    fails = 0
    textBox.textContent = `Fails: ${fails}`
    cards.forEach(card => {
        card.solved = false
        card.turned = false
    })
    startGame()
}
resetButton.addEventListener("click", reset)



const autoPlay = setInterval(() => {
    const unturnedCards = cards.filter(card => !card.turned)
    if(unturnedCards.length === 0) return;
    const cardToFlip = unturnedCards[Math.floor(Math.random() * unturnedCards.length)]
    flipCard(cardToFlip)
    console.log(fails)
}, 1)



