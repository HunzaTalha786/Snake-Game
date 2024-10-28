// const canvas =document.getElementById("canvasGame");
// const ctx =canvas.getContext('2d');

// // size of one snak segment
// const box =20; 
// let snake = [{x:9 *box, y:10 *box}];//initial snake position
// let direction = 'RIGHT';//initial movement direction
// //random food position
// let food={
//     x:Math.floor(Math.random()*19 +1)*box,
//     y:Math.floor(Math.random()*19 +1)*box
// }

// let score =0;
// let gameOver = false;
// let game;

// function initializeGame() {
//     snake = [{x: 9 * box, y: 10 * box}];
//     direction = 'RIGHT';
//     food = {
//         x: Math.floor(Math.random() * 19 + 1) * box,
//         y: Math.floor(Math.random() * 19 + 1) * box
//     };
//     score = 0;
//     gameOver = false; // Reset the game 

//     clearInterval(game);
//     game = setInterval(create, 350);
// }

// //control the snake direction
// document.addEventListener('keydown',snakeDirection);

// function snakeDirection(event){
//     if (event.keyCode===37 && direction !== 'RIGHT') {
//         direction = 'LEFT';
//     }
//     else if (event.keyCode===38 && direction !== 'DOWN'){
//         direction='UP';
//     }
//     else if(event.keyCode===39 && direction !== 'LEFT'){
//         direction= 'RIGHT';
//     }    
//     else if(event.keyCode===40 && direction !=='UP')
//         direction = 'DOWN';  
// }

// // New function to set direction from buttons
// function setDirection(newDirection) {
//     if (newDirection === 'LEFT' && direction !== 'RIGHT') {
//         direction = 'LEFT';
//     } else if (newDirection === 'UP' && direction !== 'DOWN') {
//         direction = 'UP';
//     } else if (newDirection === 'RIGHT' && direction !== 'LEFT') {
//         direction = 'RIGHT';
//     } else if (newDirection === 'DOWN' && direction !== 'UP') {
//         direction = 'DOWN';
//     }
// }

// // Working for drawing snake

// function drawSnake(){
//     for(let i=0 ; i<snake.length; i++){
//         ctx.fillStyle =(i===0) ? 'purple':'plum';
//         ctx.fillRect(snake[i].x, snake[i].y, box,box);
//         ctx.strokeRect(snake[i].x, snake[i].y, box, box);
//         ctx.strokeStyle = 'purple';
//         ctx.strokeRect(snake[i].x, snake[i].y, box, box);
//     }
// }
// //working for preparing snake food
// function drawFood(){
//     ctx.fillStyle = '  rgb(53, 167, 175)';
//     ctx.fillRect(food.x, food.y, box,box);
// }


// function updateGame(){
//     if (gameOver) return; // Skip update if the game is over

//     let snakeX = snake[0].x ;
//     let snakeY = snake[0].y;


// //move snake in current direction

// if(direction === 'LEFT') snakeX -= box;
// if(direction === 'UP') snakeY -= box ;
// if(direction ==='RIGHT') snakeX += box;
// if(direction === 'DOWN') snakeY += box;

// // check if snake eat food

// if(snakeX === food.x && snakeY === food.y){
//     score++;
//     food ={
//         x:Math.floor(Math.random()*19 +1)*box,
//         y:Math.floor(Math.random()*19 +1)*box
        
//     };//snake food regenerate

// }
// else{
//     snake.pop();//removing of snake tail if food is  not eaten
// }

// //Add new head to tail of snake
// let newHead ={
//     x:snakeX,
//     y:snakeY
// };

// //working to check if snake collaps with wall or itself

// if(snakeX<0 || snakeY <0 || snakeX>=20 *box ||  snakeY >=20*box || collision(newHead , snake )){
//     clearInterval(game);//game over
//     gameOver = true; // Set game over

// }

// snake.unshift(newHead);//add new head
// }

// //collision checking

// function collision(head, array){
//     for (let i = 0; i<array.length; i++){
//         if (head.x === array[i].x && head.y === array[i].y){
//             return true;
//         }
//     }
//     return false;
// }

// //Main game loop

// function create(){
//     ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
//     drawSnake();
//     drawFood();
//     updateGame();
//     ctx.fillStyle = 'purple';
//     ctx.font = ' 1.5rem monospace';
//     ctx.fillText(`Score: ${score}`, box, box);

//     // Display "Game Over" if the game is over
//     if (gameOver) {
//         ctx.fillStyle = 'red';
//         ctx.font = '2rem monospace';
//         ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
//     }
// }

const canvas = document.getElementById("canvasGame");
const ctx = canvas.getContext('2d');

// Size of one snake segment
const box = 20; 

// Set canvas size based on the window size
canvas.width = Math.min(window.innerWidth, 400); // Max width for canvas
canvas.height = canvas.width; // Keep it square

let snake = [{ x: 9 * box, y: 10 * box }]; // Initial snake position
let direction = 'RIGHT'; // Initial movement direction
let food; // Food variable
let score = 0;
let gameOver = false;
let game;

// Function to generate food that doesn't overlap with the snake
function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)); // Ensure food is not on the snake
    return newFood;
}

function initializeGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = 'RIGHT';
    food = generateFood(); // Generate new food
    score = 0;
    gameOver = false; // Reset the game 

    clearInterval(game);
    game = setInterval(create, 350);
}

// Control the snake direction
document.addEventListener('keydown', snakeDirection);

function snakeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';  
    }
}

// Function to set direction from buttons
function setDirection(dir) {
    if (dir === 'LEFT' && direction !== 'RIGHT') direction = 'LEFT';
    if (dir === 'UP' && direction !== 'DOWN') direction = 'UP';
    if (dir === 'RIGHT' && direction !== 'LEFT') direction = 'RIGHT';
    if (dir === 'DOWN' && direction !== 'UP') direction = 'DOWN';
}

// Drawing functions
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'purple' : 'plum';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'purple';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    ctx.fillStyle = 'rgb(53, 167, 175)';
    ctx.fillRect(food.x, food.y, box, box);
}

function updateGame() {
    if (gameOver) return; // Skip update if the game is over

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move snake in current direction
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Check if snake eats food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = generateFood(); // Regenerate food
    } else {
        snake.pop(); // Remove snake tail if food is not eaten
    }

    // Add new head to the snake
    let newHead = { x: snakeX, y: snakeY };

    // Check for collision with wall or itself
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game); // Game over
        gameOver = true; // Set game over
    }

    snake.unshift(newHead); // Add new head
}

// Collision checking function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Main game loop
function create() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing
    drawSnake();
    drawFood();
    updateGame();
    ctx.fillStyle = 'purple';
    ctx.font = '1.5rem monospace';
    ctx.fillText(`Score: ${score}`, box, box);

    // Display "Game Over" if the game is over
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '2rem monospace';
        ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
    }
}




