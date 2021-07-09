// AUDIO ELEMENTS
// Declare Audio and set volume and loop attributes as needed
let dealCardAudio = new Audio("./sounds/dealCard.wav")
let casinoNoise = new Audio("./sounds/casinoNoise.mp3")
dealCardAudio.volume = 0.2
casinoNoise.loop = true
casinoNoise.volume = 0.03


// Variables
let cardsLeft = null
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
let tableOverlayEl = document.querySelector(".table-overlay")
// Event Listeners
// Chip Selection event listener checks to determine if the chip they selected is a valid chip and if it is then it will add it to the bet variable and display the bet value on to the page
chipSectionEl.addEventListener("click", function(el) {
    if (el.target.id === "10" || el.target.id === "25" || el.target.id === "50" || el.target.id === "100" || el.target.id === "500"){
    let chipSelected = Number(el.target.id)
    bet = chipSelected + bet
    currentBetBalEl.innerHTML = `Your current Bet Balance is: $${bet}`
    }
})
// This button sets the value of bet back to 0 and then displays that change to the HTML
resetBetBtnEl.addEventListener("click", () => {
    bet = 0
    currentBetBalEl.innerHTML = `Your current Bet Balance is: $${bet}`
})
// This submits the bet as what the player has choosen and calls the init function which starts the round
betSubmitEl.addEventListener("click", () => {
    init()
})
// determines what action the player wants to take and invokes the appropriate function
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
// This resets all the variables to the initalized state, for the deck it determines if the amount of cards left is less than 75 and if it is then it adds all the cards back to the deck. Resets HTML elements back to their inital state so player can add a new bet value.
resetBtn.addEventListener("click", () => {
    // determines how many cards are left in the deck
    deck.forEach(deck => {
        cardsLeft = deck.length + cardsLeft
        return cardsLeft
    })
    // if deck has left then 75 cards left then it resets the deck
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
    // resets variables back to an initalized state
    playersHandValue = 0
    dealersHandValue = 0
    theyDoubledDown = false
    card = ""
    cardValue = null
    mysteryCard = ""
    bet = 0
    aceCountDealer = 0
    aceCountPlayer = 0
    // Initalizes CSS and HTML attributes and styles back to normal state
    tableOverlayEl.style.width = "0"
    tableOverlayEl.style.height = "0"
    betDivEl.style.width = "max-content"
    betDivEl.style.height = "max-content"
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

//Init function is run first by submitting the bet
function init () {
    // starts background audio no matter if it is a valid bet
    casinoNoise.play()
    // checks to see if the bet amount is a valid bet if not then it displays a warning message
    if (bet < 25) {
        currentBetBalEl.innerHTML = `You can't Place a Bet less than $25! Add more money!`
    }else if (bet > wallet) {
        currentBetBalEl.innerHTML = `You can't bet more money then you have!`
    } else {
        // sets the CSS/HTML for the round
        tableOverlayEl.style.width = "80vw"
        tableOverlayEl.style.height = "80vh"
        dealersHandEl.style.visibility = "inherit"
        playersHandEl.style.visibility = "inherit"
        betDivEl.style.visibility = "hidden"
        betDivEl.style.width = "0"
        betDivEl.style.height = "0"
        playersChoices.forEach(btn => {
            btn.style.visibility = "inherit"
            btn.style.width = "125px"
            btn.style.height = "75px"
            btn.style.padding = "5px"
            btn.style.margin = "5px"
            btn.style.border = "3px outset whitesmoke"
        })
        // deducts bet from wallet and resets the cardsLeft value and calls the inital card dealing function
        wallet = wallet - bet
        cardsLeft = null
        initalCardDealing()
    }
}

// This function picks a random card from the deck, removes that card from the deck and stores it in a variable
function pickCard() {
    let deckPickedIdx = Math.floor(Math.random() * deck.length)
    let cardPickedIdx = Math.floor(Math.random() * deck[deckPickedIdx].length)
    card = deck[deckPickedIdx][cardPickedIdx]
    deck[deckPickedIdx].splice(cardPickedIdx, 1)
}

// called after the init function is done
function initalCardDealing() {
    // plays audio for card dealing, picks a card, determines the value for the specific player, makes a new div for the card to be held in for the specific player then adds the card as a class which renders it on to the screen
    dealCardAudio.play()
    pickCard()
    determineCardValue(card, "dealer")
    dealersHandValue = dealersHandValue + cardValue
    makeNewCardDiv("dealer")
    newDiv.classList.add(card)
    // does the same thing over again but within a timeout to add realism and make sounds play synchonously, does this 3 times because each player starts with two cards
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
    // Checks to see if a player got black jack or if the dealer got two aces it deals with it. If both player and dealer get black jack they push and it renders it automatically
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

// creates a new div and stores in a variable, sees who is getting the div and adds the div to their parent node and gives them classes to make it a card and to make it a large card
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

// Determines value of the card being dealt to the specific player
function determineCardValue (card, p) {
    if (card === "dA" || card === "hA" || card ==="cA" || card === "sA"){
        // determines palyer getting assigned an ace then it sets the value to 11 automatically and it increases the aceCount by 1 for the given player
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
    // Hides the doubledown button, plays a deal card, renders it, adds cardValue to handValue
    document.querySelector("#double-down-btn").style.visibility = "hidden"
    dealCardAudio.play()
    pickCard()
    makeNewCardDiv("player")
    newDiv.classList.add(card)
    determineCardValue(card, "player")
    playersHandValue = playersHandValue + cardValue
    // checks to see if handValue is greater then 21, before it busts it checks to see if the player has an ace, if they do it decreases the value of their hand by 10 (there for setting the value of the ace to 1) then decreasing the acecount by 1
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
// doubles player bet and automatically makes them stand after hitting, does same thing as hit otherwise.
function playerDoubleDown() {
    dealCardAudio.play()
    wallet = wallet - bet
    theyDoubledDown = true
    pickCard()
    makeNewCardDiv("player")
    newDiv.classList.add(card)
    determineCardValue(card)
    playersHandValue = playersHandValue + cardValue
    // checks to see if handValue is greater then 21, before it busts it checks to see if the player has an ace, if they do it decreases the value of their hand by 10 (there for setting the value of the ace to 1) then decreasing the acecount by 1
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
// renders the win state
function renderWinner(winStatus) {
    // sets HTML/CSS to render that there is a winner
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
    // sets win message depending on what winStatus was passed into the function and also puts winnings into wallet if there is any money earned
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
    //hides players choices buttons
    playersChoices.forEach(btn => {
        btn.style.visibility = "hidden"
        btn.style.width = "0"
        btn.style.height = "0"
        btn.style.padding = "0"
        btn.style.margin = "0"
        btn.style.border = "0px outset whitesmoke"
    })
    // flips mystery card over
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
        // checks to see if handValue is greater then 21, before it busts it checks to see if the player has an ace, if they do it decreases the value of their hand by 10 (there for setting the value of the ace to 1) then decreasing the acecount by 1
        if (dealersHandValue > 21) {
            if (aceCountDealer > 0) {
                dealersHandValue = dealersHandValue - 10
                aceCountDealer = aceCountDealer - 1
            } 
            else {
                renderWinner("playerWin")
            }
        }
    // if dealer hasn't bust and no winner has been determined then it determines the winner by who has highest hand value
    }
    if (messageEl.innerHTML === "MESSAGE") {
        determineWinner()
    }
}
// Determines winner by hand value, if dealer is higher dealer wins, if player is higher player wins, and if they are equal it is a push
function determineWinner() {
    if (dealersHandValue > playersHandValue) {
        renderWinner("playerLose")
     } else if (playersHandValue > dealersHandValue) {
        renderWinner("playerWin")
    } else if (playersHandValue === dealersHandValue) {
        renderWinner("push")
    }
}