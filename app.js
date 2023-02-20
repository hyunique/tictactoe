'use strict'


const startPage = document.querySelector('.start_page')
const startBtn = document.querySelector('.start_btn')
const gamePage = document.querySelector('.game_page')
const gameBoard = document.querySelector('.game_board')
const boardCell = [...document.querySelectorAll('.slot')] // Converting nodeList to an array
const player0Display =document.querySelector('.player--0')
const player1Display = document.querySelector('.player--1')
const nameInput1 =document.querySelector('.name_input_0')
const nameInput2 =document.querySelector('.name_input_1')
const players = []
let indexMarked_O = []
let indexMarked_X = []
let activePlayer = 0


const Player = function(name, marker) {
    this.name = name
    this.marker = marker
}

const switchPlayer = function () {
    // if player 0 is playing, give activePlayer to 1
    activePlayer = activePlayer === 0 ? 1 : 0

    player0Display.classList.toggle('player--active')
    player1Display.classList.toggle('player--active')
}

const renderPlayer = function () {
    if (nameInput1.value === '' || nameInput2.value === '') {
        return alert("Please fill in names")
    }

    // Add names to object  
    const player0 = new Player(nameInput1.value, 'O')
    const player1 = new Player(nameInput2.value, 'X')
    players.push(player0, player1)
    // Display names on game board from user input
    player0Display.textContent=player0.name
    player1Display.textContent=player1.name
}

const startGame = function () {
    // Hide start page and reveal game board
    startPage.style.display = 'none'
    gamePage.classList.remove('invisible')   
}

const controllWinner = function () {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combi of winningConditions) {
        let test = combi.every((item) => indexMarked_O.includes(item))
        if(test) alert(`${players[1].name} won!`)
    }

}

const Game = function () {
    player1Display.classList.add('player--active')
    
    // Hide start page and reveal game board on click
    startBtn.addEventListener('click', (e) => {
        e.preventDefault()
        startGame()
        renderPlayer()
    });
    
    boardCell.forEach(cell => cell.addEventListener('click', (e) => {
        if(cell.textContent===''){
            if (activePlayer === 0) {
                cell.textContent = players[0].marker            
                indexMarked_O.push(+e.target.dataset.index)
                
                controllWinner()
            } else if (activePlayer === 1) {
                cell.textContent = players[1].marker
                indexMarked_X.push(+e.target.dataset.index)

            };  
            switchPlayer()
        }
    }))        
}()    

// const getIndex = function () {
//     return boardCell
//     .filter(cell => cell.textContent === 'O')
//     .forEach(cell => (+cell.dataset.index))
// }






// Player.prototype.sayName = function () {
//     console.log(this.name)
// }

  
