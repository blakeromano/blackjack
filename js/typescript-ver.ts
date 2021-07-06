let dealCardAudio: HTMLAudioElement = new Audio("./sounds/dealCard.wav")
let casinoNoise: HTMLAudioElement = new Audio("./sounds/casinoNoise.mp3")
dealCardAudio.volume = 0.2


// Variables
let cardsLeft: number = null
let aces: string[] = ["dA", "hA", "cA", "sA"]
let wallet: number = 10000
let bet: number = null
let deck: string[][] = [
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
]
let playersHandValue: number = null
let dealersHandValue: number = null
let card: string = ""
let newDiv: any
let mysteryCard: string
let cardValue: number = null
let theyDoubledDown: boolean = false
let aceCountPlayer: number = 0
let aceCountDealer: number = 0
// Cached Reference Elements
let currentBalMesEl: HTMLElement = document.querySelector("#current-balance")
let betInputEl: HTMLElement = document.querySelector('#bet-input')
let betSubmitEl:HTMLElement = document.querySelector("#bet-submit")
let dealersHandEl: HTMLElement = document.querySelector("#dealers-hand")
let playersHandEl:HTMLElement = document.querySelector("#players-hand")
let betDivEl:HTMLElement = document.querySelector("#betting-menu")
let chipSectionEl:HTMLElement = document.querySelector("#chip-section")
let currentBetBalEl:HTMLElement = document.querySelector("#current-bet-balance")
let resetBetBtnEl:HTMLElement = document.querySelector("#bet-reset")
let playersChoices: any = document.querySelectorAll(".players-choices")
let controlsEl: any = document.querySelector(".controls")
let messageEl: HTMLElement = document.querySelector("#message")
let resetBtn: HTMLElement = document.querySelector(".reset")
// Event Listeners
chipSectionEl.addEventListener("click", function(el: any) {
    let chipSelected = Number(el.target.id)
    bet = chipSelected + bet
    currentBetBalEl.innerHTML = `Your current Bet Balance is: $${bet}`
})
resetBetBtnEl.addEventListener("click", () => {
    bet = 0
    currentBetBalEl.innerHTML = `Your current Bet Balance is: $${bet}`
})
betSubmitEl.addEventListener("click", () => {
    init()
})
controlsEl.addEventListener("click", (el: any) => {
    let playerAction = el.target.id
    if (playerAction === "hit-btn") {
        playerHit()
    } else if (playerAction === "stand-btn") {
        playerStand()
    } else if (playerAction === "double-down-btn") {
        playerDoubleDown()
    } else {}
})

resetBtn.addEventListener("click", () => {
    deck.forEach(deck => {
        cardsLeft = deck.length + cardsLeft
        return cardsLeft
    })
    if (cardsLeft <  75) {
        deck = [
            ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
            ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
            ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
            ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
            ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
            ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
        ]
    }
    betDivEl.style.width = "max-content"
    betDivEl.style.height = "max-content"
    playersHandValue = 0
    dealersHandValue = 0
    theyDoubledDown = false
    card = ""
    cardValue = null
    mysteryCard = ""
    bet = 0
    aceCountDealer = 0
    aceCountPlayer = 0
    playersHandEl.innerHTML = ""
    dealersHandEl.innerHTML = ""
    messageEl.innerHTML = "MESSAGE"
    messageEl.style.visibility = "hidden"
    dealersHandEl.style.visibility = "hidden"
    playersHandEl.style.visibility = "hidden"
    betDivEl.style.visibility = "inherit"
    resetBtn.style.visibility = "hidden"
    resetBtn.style.width = "0"
    resetBtn.style.height = "0"
    resetBtn.style.padding = "0"
    resetBtn.style.margin = "0"
    resetBtn.style.border = "0px outset whitesmoke"
    currentBetBalEl.innerHTML = `Your current Bet Balance is: $${bet}`
    document.querySelector("h4").innerHTML = `Your current balance is: $${wallet}`
    })


// Functions
function init () {
    casinoNoise.play()
    casinoNoise.loop = true
    casinoNoise.volume = 0.03
    if (bet < 25) {
        currentBetBalEl.innerHTML = `You can't Place a Bet less than $25! Add more money!`
    }else if (bet > wallet) {
        currentBetBalEl.innerHTML = `You can't bet more money then you have!`
    } else {
        dealersHandEl.style.visibility = "inherit"
        playersHandEl.style.visibility = "inherit"
        betDivEl.style.visibility = "hidden"
        betDivEl.style.width = "0"
        betDivEl.style.height = "0"
        wallet = wallet - bet
        playersChoices.forEach(btn => {
            btn.style.visibility = "inherit"
            btn.style.width = "125px"
            btn.style.height = "75px"
            btn.style.padding = "5px"
            btn.style.margin = "5px"
            btn.style.border = "3px outset whitesmoke"
        })
        cardsLeft = null
        initalCardDealing()
    }
}

function pickCard() {
    let deckPickedIdx = Math.floor(Math.random() * deck.length)
    let cardPickedIdx = Math.floor(Math.random() * deck[deckPickedIdx].length)
    card = deck[deckPickedIdx][cardPickedIdx]
    deck[deckPickedIdx].splice(cardPickedIdx, 1)
}

function initalCardDealing() {
    dealCardAudio.play()
    pickCard()
    determineCardValue(card, "dealer")
    dealersHandValue = dealersHandValue + cardValue
    makeNewCardDiv("dealer")
    newDiv.classList.add(card)
    setTimeout(() => {
        dealCardAudio.play()
        pickCard()
        determineCardValue(card, "player")
        playersHandValue = playersHandValue + cardValue
        makeNewCardDiv("player")
        newDiv.classList.add(card)
    }, 1000)
    setTimeout(() => {
        dealCardAudio.play()
        pickCard()
        determineCardValue(card, "dealer")
        dealersHandValue = dealersHandValue + cardValue
        makeNewCardDiv("dealer")
        mysteryCard = card
        if (card.includes("d") || card.includes("h")) {
            newDiv.classList.add("back-red", "mystery-card")
        } else if (card.includes("c") || card.includes("s")) {
            newDiv.classList.add("back-blue", "mystery-card")
        }
    }, 2000)
    setTimeout(() => {
        dealCardAudio.play()
        pickCard()
        determineCardValue(card, "player")
        playersHandValue = playersHandValue + cardValue
        makeNewCardDiv("player")
        newDiv.classList.add(card)
    }, 3000)
    setTimeout(() => {
        if (playersHandValue === 21) {
            renderWinner("playerWin")
        }
        if (dealersHandValue > 21) {
            aceCountDealer = aceCountDealer - 1
            dealersHandValue = dealersHandValue - 10
        }
        if (playersHandValue === 21 && dealersHandValue === 21) {
            renderWinner("push")
        }
    }, 3001)
}

function makeNewCardDiv (personRecievingCard) {
    newDiv = document.createElement("div")
    if (personRecievingCard === "player") {
        playersHandEl.appendChild(newDiv)
        newDiv.classList.add("card", "large")
    } else if (personRecievingCard === "dealer") {
        dealersHandEl.appendChild(newDiv)
        newDiv.classList.add("card", "large")
    }
}

function determineCardValue (card, p) {
    if (card === "dA" || card === "hA" || card ==="cA" || card === "sA"){
        if (p === "player") {
            aceCountPlayer ++
            cardValue = 11
        } else {
            aceCountDealer ++
            cardValue = 11
        }
    }
    if (card === "dQ" || card === "hQ" || card === "cQ" || card === "sQ" ||
    card === "dK" || card === "hK" || card === "cK" || card === "sK" ||
    card === "dJ" || card === "hJ" || card === "cJ" || card === "sJ" ||
    card === "d10" || card === "h10" || card === "c10" || card === "s10"){
        cardValue = 10;
    }
    if (card === "d09" || card === "h09" || card ==="c09" || card === "s09"){
        cardValue = 9;
    }
    if (card === "d08" || card === "h08" || card ==="c08" || card === "s08"){
        cardValue = 8;
    }
    if (card === "d07" || card === "h07" || card ==="c07" || card === "s07"){
        cardValue = 7;
    }
    if (card === "d06" || card === "h06" || card ==="c06" || card === "s06"){
        cardValue = 6;
    }
    if (card === "d05" || card === "h05" || card ==="c05" || card === "s05"){
        cardValue = 5;
    }
    if (card === "d04" || card === "h04" || card ==="c04" || card === "s04"){
        cardValue = 4;
    }
    if (card === "d03" || card === "h03" || card ==="c03" || card === "s03"){
        cardValue = 3;
    }
    if (card === "d02" || card === "h02" || card ==="c02" || card === "s02"){
        cardValue = 2;
    }    
    return cardValue;
    
}
// has player take a new card 
function playerHit () {
    dealCardAudio.play()
    pickCard()
    makeNewCardDiv("player")
    newDiv.classList.add(card)
    determineCardValue(card, "player")
    playersHandValue = playersHandValue + cardValue
    if (playersHandValue > 21) {
        if(aceCountPlayer > 0) {
            playersHandValue = playersHandValue - 10
            aceCountPlayer = aceCountPlayer - 1
        } else {
            renderWinner("playerLose")
        }
    }
}
// forces dealer to play
function playerStand () {
    dealerPlay()
}
// doubles player bet and automatically makes them stand after hitting
function playerDoubleDown() {
    dealCardAudio.play()
    wallet = wallet - bet
    theyDoubledDown = true
    pickCard()
    makeNewCardDiv("player")
    newDiv.classList.add(card)
    determineCardValue(card, "player")
    playersHandValue = playersHandValue + cardValue
    if (playersHandValue > 21) {
        if(aceCountPlayer > 0) {
            playersHandValue = playersHandValue - 10
            aceCountPlayer = aceCountPlayer - 1
        } else {
            renderWinner("playerLose")
        }
    } else {
        dealerPlay()
    }
}
// Shows that player won

function renderWinner(winStatus) {
    resetBtn.style.visibility = "inherit"
    resetBtn.style.width = "125px"
    resetBtn.style.height = "75px"
    resetBtn.style.padding = "5px"
    resetBtn.style.margin = "5px"
    resetBtn.style.border = "3px outset whitesmoke"
    messageEl.style.visibility = "inherit"
    playersChoices.forEach(btn => {
        btn.style.visibility = "hidden"
        btn.style.width = "0"
        btn.style.height = "0"
        btn.style.padding = "0"
        btn.style.margin = "0"
        btn.style.border = "0px outset whitesmoke"
    })
    if (winStatus === "playerLose") {
        messageEl.innerHTML = "DEALER WON!"
    } else if (winStatus === "playerWin" && theyDoubledDown === true) {
        messageEl.innerHTML = "PLAYER WON!"
        wallet = wallet + (bet * 4)
    } else if (winStatus === "push") {
        messageEl.innerHTML = "PUSH!"
        wallet = wallet + bet
    } else if (winStatus === "playerWin" && theyDoubledDown === false) {
        messageEl.innerHTML = "PLAYER WON!"
        wallet = wallet + (bet * 2)
    }
} 

// Dealer has to play once player stands or if they double down, only done if player hasn't busted
function dealerPlay() {
    playersChoices.forEach(btn => {
        btn.style.visibility = "hidden"
        btn.style.width = "0"
        btn.style.height = "0"
        btn.style.padding = "0"
        btn.style.margin = "0"
        btn.style.border = "0px outset whitesmoke"
    })
    let mysteryCardEl = document.querySelector(".mystery-card")
    mysteryCardEl.remove()
    makeNewCardDiv("dealer")
    newDiv.classList.add(mysteryCard)
    dealCardAudio.play()
    // Makes dealer pick a card until the value of their hand is 17 or more
    while (dealersHandValue <= 16) {
        pickCard()
        determineCardValue(card, "dealer")
        dealersHandValue = dealersHandValue + cardValue
        makeNewCardDiv("dealer")
        newDiv.classList.add(card)
        if (dealersHandValue > 21) {
            if (aceCountDealer > 0) {
                dealersHandValue = dealersHandValue - 10
                aceCountDealer = aceCountDealer - 1
            } 
            else {
                renderWinner("playerWin")
            }
        }
    }
    if (messageEl.innerHTML === "MESSAGE") {
        determineWinner()
    }
}
// Determines winner if neither dealer or player bust
function determineWinner() {
    if (dealersHandValue > playersHandValue) {
        renderWinner("playerLose")
     } else if (playersHandValue > dealersHandValue) {
        renderWinner("playerWin")
    } else if (playersHandValue === dealersHandValue) {
        renderWinner("push")
    }
}