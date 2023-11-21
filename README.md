# Basic Javascript Game
This was just a small learning project for myself to learn how to make a game with JS.

## The Logic
- There is a array map that has a 0-4 specifying the spawn locations of 0-Open Area, 1-Walls, 2-Keys, 3-Door, 4-Character
- Everytime the user hits an input key (WASD) it goes through the array map to check what number is in the block it's moving into
- If it's a wall it denies movement, if it's a key it will move to the space and delete the key and set the hasKey value to True
- If it's a door it will only move in and delete the door if hasKey value is true
- On space press the game resets all values and reintitalizes the board.

  ## New Concepts Learned
  - If you set thisValue = thatValue, they become intertwined. A change to thisValue also changes thatValue since they now point to the same memory spot. So you need to clone the data by doing thisValue = JSON.parse(JSON.stringify(thatValue))
  - setInterval is similar to a while loop, but a key difference it is asynchronous while a 'while' loop is synchronous and will block the other code from running until it's done.
  - Learned about the transtition property in CSS, but need a lot more work on learning animations in CSS.
  
