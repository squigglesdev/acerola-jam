class GameManager {
    constructor() {
        this.grid = new Grid(10 , 20);
        this.grid.generate();
        this.score = 0;
        this.turn = 1;
        this.turnInProgress = false;
        this.gameOver = false;

        this.spawnShape();
        this.oldShapes = [];
    }

    update() {
        this.handleInput();

        if (this.turnInProgress) {
            // every second, move the current shape down
            if (time % 1 < deltaTime) {
                this.turnInProgress = this.currentShape.moveDown();
            }
        } else {
            this.oldShapes.push(this.currentShape);
            this.currentShape.stopTexture();
            this.checkRows();
            this.spawnShape();
        }

        if (this.gameOver) {
            noLoop();
            console.log('Game Over');
        }

        this.currentShape.draw(this.grid);

        if (this.oldShapes.length > 0) {
            this.oldShapes.forEach(shape => {
                shape.draw(this.grid);
            });
        }

        this.grid.draw();
    }

    handleInput() {
        if (keyIsDown(LEFT_ARROW)) {
            this.currentShape.moveLeft();
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.currentShape.moveRight();
        }
        //if (keyIsDown(DOWN_ARROW)) {
        //    this.currentShape.moveDown();
        //}
        //if (keyIsDown(UP_ARROW)) {
        //    this.currentShape.rotate();
        //}
    }

    spawnShape() {
        this.currentShape = new Shape();
        this.turnInProgress = true;
    }

    checkRows() {
        let rows = this.grid.checkRows();
        if (rows.length > 0) {
            this.score += rows.length * 100;
            this.grid.clearRows(rows);
        }
    }
}