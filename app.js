'use strict'

 
const nameInput1 =document.querySelector('.name_input_1')
const nameInput2 =document.querySelector('.name_input_2')
const players = []
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





const Player = function(name, marker) {
    this.name = name
    this.marker = marker
}


const Game = function () {
    const startPage = document.querySelector('.start_page')
    const startBtn = document.querySelector('.start_btn')
    const gamePage = document.querySelector('.game_page')
    const gameBoard = document.querySelector('.game_board')
    const boardCell = document.querySelectorAll('.slot')
    const player1Display =document.querySelector('.player_1')
    const player2Display =document.querySelector('.player_2')
    startBtn.addEventListener('click', (e) => {
        e.preventDefault()
        startPage.style.display = 'none'
        gamePage.classList.remove('invisible')
        renderPlayer()
    });
    boardCell.forEach(cell => cell.addEventListener('click', () => {
        cell.textContent='O'
    }))

    const renderPlayer = function () {
        if (nameInput1.value === '' || nameInput2.value === '') {
            return alert("Please fill in names")
        }
        player1Display.textContent=nameInput1.value
        player2Display.textContent=nameInput2.value
        const player1=new Player(nameInput1.value, 'O')
        const player2=new Player(nameInput2.value, 'X')
        players.push(player1,player2)
    }


}()


// Player.prototype.sayName = function () {
//     console.log(this.name)
// }

  
