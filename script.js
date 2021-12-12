const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const board = document.getElementById('board')
const cellElements = document.querySelectorAll('.cell')
const winningText = document.getElementById('winning-text')
const winningMessage = document.getElementById('winning-message')
var circleTurn



const WINNIG_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const restart = document.getElementById('restart')

startGame()
restart.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessage.classList.remove('show')
}



function handleClick(e) {
    const cell = e.target
        //if (cell.classList.contains(CIRCLE_CLASS) || cell.classList.contains(X_CLASS)) return
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)


    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        circleTurn = !circleTurn
        setBoardHoverClass()
    }

}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function setBoardHoverClass() {
    if (circleTurn) {
        board.classList.remove(X_CLASS);
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.remove(CIRCLE_CLASS)
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    // return WINNIG_COMBINATIONS.some(combination => {
    //         return combination.every(index => {
    //             return cellElements[index].classList.contains(currentClass)
    //         })
    //     })
    for (let i = 0; i < WINNIG_COMBINATIONS.length; i++) {
        let flag = true
        for (let j = 0; j < 3; j++) {
            var temp = WINNIG_COMBINATIONS[i][j]
            if (!cellElements[temp].classList.contains(currentClass)) {
                flag = false
                break
            }
        }
        if (flag) return true
    }
    return false
}

function endGame(draw) {
    if (draw) {
        winningText.innerHTML = 'Draw !'
    } else {
        //  winningText.innerHTML = `${circleTurn ? "O" : "X"}` + 'Wins !'
        winningText.innerHTML = circleTurn ? "O's" : "X's" + 'Wins !'
    }
    winningMessage.classList.add('show');

}

function isDraw() {
    // return [...cellElements].every(cell => {
    //         return cell.classList.contains(CIRCLE_CLASS) || cell.classList.contains(X_CLASS)
    //     })
    for (let i = 0; i < cellElements.length; i++) {
        if (!(cellElements[i].classList.contains(CIRCLE_CLASS) ||
                cellElements[i].classList.contains(X_CLASS))) return false;
    }
    return true;
}
