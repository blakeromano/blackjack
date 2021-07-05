// Psuedocode
// 1) Define our cached elements including divs, messages given to the user, betting ability etc;
// 2) Define our required variables, this is going to include an array for our cards in the deck, players hand, dealers hand, value of bet, how much money is in the players wallet, and isWinner
// 3) Create an initialize function which will set up the deck, this will be called after the user inputs a starting wallet value with a valid number and has submitted it where we will add that value to the wallet and hide that div.
// 4) Create a pick a card function which will use mathrandom and math floor to pick from one of the 52 cards in a deck of cards, it will then remove that card from the deck by splicing it from the array.
// 5) Create a start round function which will distribute the cards to the player and the dealer where the second card from the dealer will show the flip side of the card, it will also submit the value of the bet from the user and remove it from the player's wallet.
// 6) Create a function that displays for the user if they want to hit, double down, split or stand after the cards have been dealt
// 7) Create a function for each of the options which will execute what the player decides if the user hits a card will be added to their hand, if the user doubles down a card will be added to their hand and the value of their bet will be deducted from their bet again, stand will allow the dealer to play, split would let the user have two seperate hands and then be able to play indiviually two hands if the cards are of the same value (A king and a jack can't split but a king and a king can).
// 8) Create a dealer play function where the dealer will hit if the value of his cards are under 16 once it is over he will stop. 
// 9) Create a check winner function where if the value of the dealers hand is over the player's but equal to or under 21 the dealer wins, if dealers hand is over 21 but the player's isn't then the player wins, we will check if the player busts in the function laid out in 7. If the value of their cards is the same and under 21 it will be a push.
// 10) Create a function to redistribute the winnings. If the player has won we will add to their wallet 2X the value of the bet, if they won and doubled down then they will get 4X the value of the bet. If they split and won both then they get 4X if they split win one lost one then they will get the bet back. If it is a push they will recieve the value of the bet back and if they lose they will get nothing back.
// 11) Create a function to playAgain where it will check their wallet and if their wallet is under a certain amount they will be prompted as to if they would like to add more money to their wallet, the deck will be checked and if the amount of cards left is over 25 then the deck will not be reshuffled if it is the deck will be reshuffled, it will clear the playershand, dealershand, value of bet, and isWinner variables.
// 12) Have a reset everything button which will reload the game so user can input a wallet balance again etc;
// 13) Add event listeners for buttons to start game, startround, hit, split, doubledown, stand, new round buttons and invoke the needed functions in the eventlistener.  
// CHALLENGES: If possible I would like to add the following to BlackJack: AI Users to play with, ability to split hand, Card animations for dealing and shuffling with noises, a timer for user to have to select option, Add time between card's being dealt to add some realism
// AUDIO ELEMENTS
let dealCardAudio = new Audio("./sounds/dealCard.wav")
let casinoNoise = new Audio("./sounds/casinoNoise.mp3")
dealCardAudio.volume = 0.2


// Variables
let cardsLeft = null
let aces = ["dA", "hA", "cA", "sA"]
let wallet = 10000
let bet = null
let deck = [
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
]
let playersHandValue = null
let dealersHandValue = null
let card = ""
let newDiv
let mysteryCard
let cardValue = null
let theyDoubledDown = false
let aceCountPlayer = 0
let aceCountDealer = 0
// Cached Reference Elements
let currentBalMesEl = document.querySelector("#current-balance")
let betInputEl = document.querySelector('#bet-input')
let betSubmitEl = document.querySelector("#bet-submit")
let dealersHandEl = document.querySelector("#dealers-hand")
let playersHandEl = document.querySelector("#players-hand")
let betDivEl = document.querySelector("#betting-menu")
let chipSectionEl = document.querySelector("#chip-section")
let currentBetBalEl = document.querySelector("#current-bet-balance")
let resetBetBtnEl = document.querySelector("#bet-reset")
let playersChoices = document.querySelectorAll(".players-choices")
let controlsEl = document.querySelector(".controls")
let messageEl = document.querySelector("#message")
let resetBtn = document.querySelector(".reset")
// Event Listeners
chipSectionEl.addEventListener("click", function(el) {
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
controlsEl.addEventListener("click", (el) => {
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
    determineCardValue(card)
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