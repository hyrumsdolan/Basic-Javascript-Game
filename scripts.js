let currentColumn
let currentRow;
let hasKey = false;
var winMessage = document.getElementById('win-message');
let moveTime = 0
let moveSpeed = 500
const gameMapSource = [
    [1, 4, 1, 1, 1, 1, 1, 1], // row 1
    [1, 0, 1, 0, 0, 0, 0, 1], // row 2
    [1, 0, 1, 0, 1, 1, 0, 1], // row 3
    [1, 0, 1, 0, 1, 0, 0, 3], // row 4
    [1, 0, 1, 0, 1, 0, 1, 1], // row 5
    [1, 0, 1, 0, 1, 1, 1, 1], // row 6
    [1, 0, 0, 0, 0, 0, 2, 1], // row 7
    [1, 1, 1, 1, 1, 1, 1, 1] // row 8
];
let gameMap = JSON.parse(JSON.stringify(gameMapSource));

// Initialize the game
generateKeysDoorsWalls();



// Movement Behavior and logic
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'w':
            console.log("Pressed: W");
            if (checkForUpWall(currentColumn, currentRow)) currentRow--;
            break;
        case 'a':
            console.log("pressed: A")
            if (checkForLeftWall(currentColumn, currentRow)) currentColumn--;
            break;
        case 's':
            console.log("Pressed: S");
            if (checkForDownWall(currentColumn, currentRow)) currentRow++;
            break;
        case 'd':
            console.log("Pressed: D");
            if (checkForRightWall(currentColumn, currentRow)) currentColumn++;
            break;
        case ' ': // Reset game
            console.log("space");
            gameMap = JSON.parse(JSON.stringify(gameMapSource));
            hasKey = false;
            hideWinMessage()
            generateKeysDoorsWalls();
            break;
    }
    moveTime += 500
    moveToSquare(currentColumn, currentRow);
    console.log("C:", currentColumn, "R:", currentRow);
});

function moveToSquare(squareCol, squareRow) {
    var character = document.querySelector('.character');

    // Calculate the center of the square
    var x = (squareCol - 0) * 100 + 50; // Column center
    var y = (squareRow - 0) * 100 + 50; // Row center

    // Position the character
    character.style.left = x + 'px';
    character.style.top = y + 'px';
    
    character.classList.add('wobble-animation');

    var intervalId = setInterval(function() {
        moveTime -= 100;
    
        if (moveTime <= 0) {
            clearInterval(intervalId); // Clear the interval to stop the function
            character.classList.remove('wobble-animation');
        }
    }, 100);

}

function checkForUpWall(col, row) {
    let targetCell = gameMap[row - 1][col];
    return checkCell(targetCell, col, row - 1);
}

function checkForDownWall(col, row) {
    let targetCell = gameMap[row + 1][col];
    return checkCell(targetCell, col, row + 1);
}

function checkForLeftWall(col, row) {
    let targetCell = gameMap[row][col - 1];
    return checkCell(targetCell, col - 1, row);
}

function checkForRightWall(col, row) {
    let targetCell = gameMap[row][col + 1];
    return checkCell(targetCell, col + 1, row);
}



// Item Pickup Behavior and logic
function checkCell(cellValue, col, row) {
    switch(cellValue) {
        case 0: // Empty space
            return true;
        case 1: // Wall
            return false;
        case 2: // Key
            hasKey = true;
            console.log("Got key!");
            removeItemFromMap(col, row, 2);

            return true;
            case 3: // Door
            if (hasKey) {
                removeItemFromMap(col, row, 3);
                console.log("Opened door!");
                showWinMessage();
                return true;
            }
            return false;
        default:
            return false;
    }
}

function findElementAtPosition(row, col, className) {
    let elements = document.querySelectorAll('.' + className);
    for (let element of elements) {
        // Calculate the center position of the element
        let elementRow = Math.round(parseInt(element.style.top) / 100) - 1;
        let elementCol = Math.round(parseInt(element.style.left) / 100) - 1;

        if (elementRow === row && elementCol === col) {
            return element;
        }
    }
    return null;
}

function removeItemFromMap(col, row, itemType) {
    // Update the gameMap array
    gameMap[row][col] = 0;

    // Find the corresponding DOM element and remove it
    let elementToRemove;
    if (itemType === 2) { // Key
        elementToRemove = findElementAtPosition(row, col, 'key');
    } else if (itemType === 3) { // Door
        elementToRemove = findElementAtPosition(row, col, 'door');
    }

    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}




// WIN MESSAGE BEHAVIOR
function showWinMessage() {
    console.log("You win!");
    winMessage.style.display = 'block';

}

function hideWinMessage() {
    console.log("restart");
    winMessage.style.display = 'none';
}

//Initializing Fuction
function generateKeysDoorsWalls() {
    let keysContainer = document.getElementById('keys-container');
    let doorsContainer = document.getElementById('doors-container');
    let wallsContainer = document.getElementById('walls-container');
    let character = document.querySelector('.character');

    keysContainer.innerHTML = '';
    doorsContainer.innerHTML = '';
    wallsContainer.innerHTML = '';

    for (let row = 0; row < gameMap.length; row++) {
        for (let col = 0; col < gameMap[row].length; col++) {
            let element;
            switch (gameMap[row][col]) {
                case 2: // Key
                    element = document.createElement('div');
                    element.className = 'key';
                    keysContainer.appendChild(element);
                    break;
                case 3: // Door
                    element = document.createElement('div');
                    element.className = 'door';
                    doorsContainer.appendChild(element);
                    break;
                case 1: // Wall
                    element = document.createElement('div');
                    element.className = 'wall';
                    wallsContainer.appendChild(element);
                    break;
                case 4: // Character Starting Position
                    currentColumn = col;
                    currentRow = row;
                    
                    moveToSquare(col, row);
                    gameMap[row][col] = 0;
                    break;

            }
            if (element) {
                element.style.top = (row * 100 + 50) + 'px';
                element.style.left = (col * 100 + 50) + 'px';
            }
        }
    }
}