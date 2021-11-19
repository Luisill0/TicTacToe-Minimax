window.addEventListener("DOMContentLoaded", () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = [
        ['','',''],
        ['','',''],
        ['','',''],
    ]
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    function roundWon(){
        let roundWon = false;
        var countXrow = 0, countXcolumn = 0, countXdiagL = 0, countXdiagR = 0;
        var countOrow = 0, countOcolumn = 0, countOdiagL = 0, countOdiagR = 0;
        for(let i = 0; i < 3 && !roundWon; i++){
            countXrow = countXcolumn = countOrow = countOcolumn = 0;
            for(let j = 0; j < 3; j++){
                //Count rows
                if(board[i][j] == 'X'){
                    countXrow++;
                }
                else if(board[i][j] == 'O'){
                    countOrow++;
                }
                //Count columns
                if(board[j][i] == 'X'){
                    countXcolumn++;
                }
                else if(board[j][i] == 'O'){
                    countOcolumn++;
                }
            }
            //Count diagonals
            if(board[i][i] == 'X'){
                countXdiagL++;
            }
            else if(board[i][i] == 'O'){
                countOdiagL++;
            }
            if(board[i][2-i] == 'X'){
                countXdiagR++;
            }
            else if(board[i][2-i] == 'O'){
                countOdiagR++;
            }
            roundWon = countXrow == 3 || countOrow == 3 || countXcolumn == 3 || countOcolumn == 3 ||
                       countXdiagL == 3 || countOdiagL == 3 || countXdiagR == 3 || countOdiagR == 3;
        }
        return roundWon;
    }

    function handleResultValidation() {
        if(roundWon()){
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
        }
        else{
            let canMove = false;
            for(let i = 0; i < 3 && !canMove; i++){
                for(let j = 0; j < 3 && !canMove; j++){
                    canMove = board[i][j] == '';
                }
            }
            if(!canMove){
                announce(TIE);
            }
        }
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
                break;
        }
        announcer.classList.remove('hide');
    }

    const isValidAction = (tile) => {
        return !(tile.innerText === 'X' || tile.innerText === 'O');
    }

    const updateBoard = (index) => {
        board[Math.floor(index/3)][index%3] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile,index) => {
        if(isValidAction(tile) && isGameActive){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = [
            ['','',''],
            ['','',''],
            ['','',''],
        ];
        isGameActive = true;
        announcer.classList.add('hide');
    
        if(currentPlayer === 'O'){
            changePlayer();
        }
    
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile,index));
    })

    resetButton.addEventListener('click', resetBoard);
})
