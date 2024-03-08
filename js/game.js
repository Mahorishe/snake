import { Snake } from './snake.js';
import { Food } from './food.js';

export class Game {
    constructor(containerId, gameFieldId, gridSize = 15) {
        this.gridSize = gridSize;
        this.container = document.getElementById(containerId);
        this.gameField = document.getElementById(gameFieldId);
        this.snake = new Snake();
        this.food = new Food(gridSize);
        this.score = 0;
        this.speed = 200;
        this.running = false;
        this.init();
    }

    init() {
        const startButton = document.getElementById('startButton');
        startButton.addEventListener('click', () => {
            startButton.style.display = 'none'
            this.container.style.display = 'block';
            this.playBackgroundMusic()
            this.running = true;
            this.reset();
        });

        document.getElementById('restartButton').addEventListener('click', () => {
            document.getElementById('gameOver').style.display = 'none';
            this.playBackgroundMusic()
            this.reset();
        });

        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }


    reset() {
        this.gameField.innerHTML = '';
        this.snake = new Snake();
        this.food = new Food(this.gridSize);
        this.score = 0;
        this.speed = 200;
        this.updateScoreDisplay()
        this.draw();
        this.running = true;
        this.gameLoop();
    }

    gameLoop() {
        if (!this.running) return;
        if (this.snake.checkCollision(this.gridSize)) {
            this.running = false;
            this.stopBackgroundMusic()
            document.getElementById('finalScore').textContent = this.score;
            document.getElementById('gameOver').style.display = 'block';
            return;
        }

        setTimeout(() => {
            const ateFood = this.food.position.x === this.snake.getHead().x && this.food.position.y === this.snake.getHead().y;
            if (ateFood) {
                this.score++;
                this.speed = Math.max(this.speed - 10, 100);
                this.food.respawn(this.gridSize, this.snake.body);
                this.updateScoreDisplay()
            }
            this.snake.move(ateFood);
            this.gameField.innerHTML = '';
            this.draw();
            this.gameLoop();
        }, this.speed);
    }

    updateScoreDisplay() {
        const scoreElement = document.getElementById('scoreValue');
        scoreElement.textContent = this.score;
    }

    playBackgroundMusic() {
        const music = document.getElementById('backgroundMusic');
        music.play();
    }

    stopBackgroundMusic() {
        const music = document.getElementById('backgroundMusic');
        music.pause();
        music.currentTime = 0;
    }

    draw() {
        this.drawFood();
        this.drawSnake();
    }

    drawFood() {
        const foodElement = document.createElement('div');
        foodElement.style.gridColumnStart = this.food.position.x + 1;
        foodElement.style.gridRowStart = this.food.position.y + 1;
        foodElement.className = 'apple';
        this.gameField.appendChild(foodElement);
    }

    drawSnake() {
        this.snake.body.forEach((segment, index) => {
            const segmentElement = document.createElement('div');
            segmentElement.style.gridColumnStart = segment.x + 1;
            segmentElement.style.gridRowStart = segment.y + 1;
            segmentElement.className = index === 0 ? 'snake-head' : 'snake';
            this.gameField.appendChild(segmentElement);
        });
    }

    handleKeydown(e) {
        switch (e.key) {
            case 'ArrowUp': this.snake.changeDirection({x: 0, y: -1}); break;
            case 'ArrowDown': this.snake.changeDirection({x: 0, y: 1}); break;
            case 'ArrowLeft': this.snake.changeDirection({x: -1, y: 0}); break;
            case 'ArrowRight': this.snake.changeDirection({x: 1, y: 0}); break;
        }
    }
}