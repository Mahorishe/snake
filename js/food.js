export class Food {
    constructor(gridSize) {
        this.position = this.getRandomPosition(gridSize);
    }

    respawn(gridSize, snakeBody) {
        let newPosition;
        do {
            newPosition = this.getRandomPosition(gridSize);
        } while (snakeBody.some(segment => segment.x === newPosition.x && segment.y === newPosition.y));
        this.position = newPosition;
    }

    getRandomPosition(gridSize) {
        return {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    }
}