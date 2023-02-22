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
const modalBgr=document.querySelector('.modal_background')
const winner = document.querySelector('.winner')
const winnerIs = document.querySelector('.winner_is')
const tryagainBtn=document.querySelector('.tryagain_btn')
const restartBtn=document.querySelector('.restart_btn')
const players = []
let activePlayer = 0
let isGameOver = false


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
    player1Display.textContent = player1.name    
}

const startGame = function () {
    // Hide start page and reveal game board
    startPage.style.display = 'none'
    gamePage.classList.remove('invisible')
    winner.style.display = 'none'
    modalBgr.style.display = 'none'
}

const switchPlayer = function () {
    if(!isGameOver){
    // if player 0 is playing, give activePlayer to 1
    activePlayer = activePlayer === 0 ? 1 : 0

    player0Display.classList.toggle('player--active')
    player0Display.style.transition='color .5s, scale .5s'
    player1Display.classList.toggle('player--active')
    player1Display.style.transition = 'color .5s, scale .5s'
    }
}


const checkWinner = function () {
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
    
    let result_O = winningConditions.some(combi => combi.every((item) => players[0].markedCell.includes(item)))
    let result_X = winningConditions.some(combi => combi.every((item) => players[1].markedCell.includes(item)))
    if (result_O) gameOver(players[0]);
    if (result_X) gameOver(players[1]);
    if((players[0].markedCell.length)===5||(players[1].markedCell.length)===5) gameOver('draw')
}

const gameOver = function (player) {
    isGameOver = true;
    // Announce winner
    modalBgr.style.display='block'
    winner.style.display = 'flex'
    if (player === 'draw') {
        winnerIs.innerHTML = `Tie game!`
    } else {winnerIs.innerHTML = `${player.name} won!`}

    // Reset all data and ui
    restartBtn.addEventListener('click', () => {
        players.splice(0,2)
        nameInput1.value = nameInput2.value = ''
        boardCell.forEach(cell => cell.textContent = '')
        activePlayer = 0
        startPage.style.display = 'flex'
        gamePage.classList.add('invisible') 
        winner.style.display = 'none'
        modalBgr.style.display='none'
    })
    tryagainBtn.addEventListener('click', () => {
        isGameOver=false
        switchPlayer()
        boardCell.forEach(cell => cell.textContent = '')
        players.forEach(player=>player.markedCell=[])
        startGame()
    })
}

const runGame = function () {
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
        // Only mark when cell is empty
        if (cell.textContent === '') {

            // Mark cell with marker and push index number to array
            if (activePlayer === 0) {
                cell.textContent = players[0].marker            
                players[0].markedCell.push(+e.target.dataset.index)
            } else if (activePlayer === 1) {
                cell.textContent = players[1].marker
                players[1].markedCell.push(+e.target.dataset.index)
            };  
            
            checkWinner()
            if(!checkWinner()) switchPlayer()
        }
    }))        
}()    



// Player.prototype.sayName = function () {
//     console.log(this.name)
// }

//TODO
//Refactor winner announcement : color change in cell
//gameOver modal fade-in
  
