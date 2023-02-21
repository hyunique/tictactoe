'use strict'


const startPage = document.querySelector('.start_page')
const startBtn = document.querySelector('.start_btn')
const gamePage = document.querySelector('.game_page')
const gameBoard = document.querySelector('.game_board')
const boardCell = [...document.querySelectorAll('.slot')] // Converting nodeList to an array
const player0Display =document.querySelector('.player--0')
const player1Display = document.querySelector('.player--1')
const nameInput1 =document.querySelector('.name_input_0')
const nameInput2 = document.querySelector('.name_input_1')
const winner = document.querySelector('.winner')
const winnerIs = document.querySelector('.winner_is')
const restartBtn=document.querySelector('.restart_btn')
const players = []
let activePlayer = 0


const Player = function(name, marker,markedCell=[]) {
    this.name = name,
    this.marker = marker,
    this.markedCell = markedCell
}


const renderPlayer = function () {
     
           // Take names from user input and save them in array  
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

const switchPlayer = function () {
    // if player 0 is playing, give activePlayer to 1
    activePlayer = activePlayer === 0 ? 1 : 0

    player0Display.classList.toggle('player--active')
    player1Display.classList.toggle('player--active')
}


const checkWinner = function () {
    if(players[0].markedCell===5||players[1].markedCell===5) alert('Draw!')
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
        let result_O = combi.every((item) => players[0].markedCell.includes(item))
        let result_X = combi.every((item) => players[1].markedCell.includes(item))
        if (result_O) return gameOver(players[0])
        if (result_X) return gameOver(players[1])
    }
}

const gameOver = function (player) {
    // Announce winner
    winner.style.display = 'flex'
    winnerIs.innerHTML = `${player.name} won!`

    // Reset all data and ui
    restartBtn.addEventListener('click', () => {
        players.splice(0,2)
        nameInput1.value = nameInput2.value = ''
        boardCell.forEach(cell => cell.textContent = '')
        activePlayer = 0
        startPage.style.display = 'flex'
        gamePage.classList.add('invisible') 
        winner.style.display = 'none'
    })
}

const Game = function () {
    player0Display.classList.add('player--active')
    
    // Hide start page and reveal game board on click
    startBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if (nameInput1.value !== '' && nameInput2.value !== '') {
            renderPlayer()
            startGame()
        } else {
            alert("Please fill in names")
        }
     
    });
    
    boardCell.forEach(cell => cell.addEventListener('click', (e) => {
        if(cell.textContent===''){
            if (activePlayer === 0) {
                cell.textContent = players[0].marker            
                players[0].markedCell.push(+e.target.dataset.index)
                
                checkWinner()
            } else if (activePlayer === 1) {
                cell.textContent = players[1].marker
                players[1].markedCell.push(+e.target.dataset.index)
                checkWinner()
            };  
            
            switchPlayer()
        }
    }))        
}()    



// Player.prototype.sayName = function () {
//     console.log(this.name)
// }

//TODO
//Refactor winner announcement : color change in cell
//
  
