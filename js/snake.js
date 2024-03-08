export class Snake {
    constructor() {
        this.body = [{x: 7, y: 7}, {x: 7, y: 8}, {x: 7, y: 9}];
        this.direction = {x: 0, y: -1};
        this.newDirection = {x: 0, y: -1};
    }

    move(grow = false) {
        const newHead = {x: this.body[0].x + this.newDirection.x, y: this.body[0].y + this.newDirection.y};
        this.body.unshift(newHead);
        if (!grow) {
            this.body.pop();
        }
        this.direction = {...this.newDirection};
    }

    changeDirection(newDirection) {
        const {x, y} = newDirection;
        if (-x !== this.direction.x || -y !== this.direction.y) {
            this.newDirection = newDirection;
        }
    }

    getHead() {
        return this.body[0];
    }

    checkCollision(gridSize) {
        const {x, y} = this.getHead();
        const hitWall = x < 0 || x >= gridSize || y < 0 || y >= gridSize;
        const hitSelf = this.body.slice(1).some(segment => segment.x === x && segment.y === y);
        return hitWall || hitSelf;
    }
}