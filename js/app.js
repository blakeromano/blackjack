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

// Variables
let wallet = 10000
let bet = null
let deck = [[], [], [], [], []]
let playersHand = []
let dealershand =[]


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
betSubmitEl.addEventListener("click", ()=> {
init()
})



// Functions
function init () {
    if (bet < 50) {
        currentBetBalEl.innerHTML = `You can't Place a Bet less than $50! Add more money!`
    }else if (bet > wallet) {
        currentBetBalEl.innerHTML = `You can't bet more money then you have!`
    } else{
    deck = [
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"],
    ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
    ]
    dealersHandEl.style.visibility = "inherit"
    playersHandEl.style.visibility = "inherit"
    betDivEl.style.visibility = "hidden"
    dealersHandEl.visibility = "inherit"
    playersHandEl.visibility = "inherit"
    wallet = wallet - bet
    playersChoices.forEach(btn => {
        btn.style.visibility = "inherit"
    })
    }
}


