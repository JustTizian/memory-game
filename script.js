function $(query) {
    return document.querySelector(query)
}

const cardContainer = $('#card-container')

const cardsData = [
    {
        symbol: "1",
        turned: false
    },
    {
        symbol: "2",
        turned: false
    },
    {
        symbol: "3",
        turned: false
    },
    {
        symbol: "4",
        turned: false
    },
    {
        symbol: "5",
        turned: false
    },
    {
        symbol: "6",
        turned: false
    },
    {
        symbol: "7",
        turned: false
    },
    {
        symbol: "8",
        turned: false
    }
]

const cards = cardsData.map(card => {
    const button = document.createElement("button")
    return { ...card, button: button }
})

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
    updateUI()
}

