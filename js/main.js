/*----- constants -----*/
const LENGTH_OF_WORD = 5
const MAX_GUESSES = 6
const ALLOWED_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const WORD_BANK = ['stars', 'earth', 'pluto', 'venus', 'astro', 'cosmo', 'comet', 'rings', 'space', 'world', 'alien', 'night', 'cloud', 'plant', 'orbit', 'giant']

/*----- app's state (variables) -----*/
let chosenLetters, chosenWords, currentNumOfGuesses, secretWord, currentGuess

/*----- cached element references -----*/
const keyboard = document.getElementById('keyboard')
const guessesBoard = document.getElementById('guesses-board')
const currentGuessEl = document.getElementById('current-guess')

/*----- event listeners -----*/
keyboard.addEventListener('click', handleClick)


/*----- functions -----*/
function initGame() {
    secretWord = getSecretWord()
    chosenLetters = []
    currentNumOfGuesses = 0
    currentGuess = ''
    generateKeyboard()
}

function getSecretWord() {
    const randomInt = Math.floor(Math.random() * WORD_BANK.length)
    return WORD_BANK[randomInt]
}

function generateKeyboard() {
    // GENERATES THE LETTER KEYS
    ALLOWED_LETTERS.forEach(function(letter) {
        const cell = document.createElement('div')
        cell.innerText = letter.toUpperCase()
        cell.classList.add('cell')
        keyboard.appendChild(cell)
    })
    // GENERATES THE DELETE KEY
    const deleteCell = document.createElement('div')
    deleteCell.innerText = 'DELETE'
    deleteCell.classList.add("wide-cell")
    keyboard.appendChild(deleteCell)

    // GENERATES THE SUBMIT KEY
    const submitCell = document.createElement('div')
    submitCell.innerText = 'SUBMIT'
    submitCell.classList.add("wide-cell")
    keyboard.appendChild(submitCell)
}

function handleClick(evt) {
    if(evt.target.innerText === "DELETE") {
        handleDelete()
        render()
    } else if(evt.target.innerText === "SUBMIT") {
        console.log('SUBMIT was clicked')
    } else {
        updateCurrentGuess(evt.target.innerText)
        render()
    }
}

function updateCurrentGuess(letter) {
    if(currentGuess.length < LENGTH_OF_WORD) {
        currentGuess += letter
    }
    console.log(currentGuess)
}

function handleDelete() {
    currentGuess = currentGuess.slice(0, currentGuess.length - 1)
    console.log(currentGuess)
}

function render() {
    while(currentGuessEl.firstElementChild) {
        currentGuessEl.removeChild(currentGuessEl.firstElementChild)
    }
    const currentGuessArr = currentGuess.split('')
    currentGuessArr.forEach(function(letter) {
        const cell = document.createElement('div')
        cell.innerText = letter
        cell.classList.add('cell')
        currentGuessEl.appendChild(cell)
    })
}

initGame()