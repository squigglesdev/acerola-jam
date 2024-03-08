class GameManager {
    constructor() {
        this.grid = new Grid(10 , 20);
        this.grid.generate(false);
        this.score = 0;
        this.turn = 1;
        this.speed = 4;
        this.turnInProgress = false;
        this.gameOver = false;

        this.spawnShape();
        this.oldShapes = [];

        npc.position = createVector(-width/2,height/2);

    }

    update() {
        this.handleInput();


        if (this.turnInProgress) {
            // every second, move the current shape down
            if (time % (1/this.speed) < deltaTime) {
                this.turnInProgress = this.currentShape.moveDown();
            }
        } else {
            this.oldShapes.push(this.currentShape);
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
        if (keyIsDown(LEFT_ARROW) && time % 0.05 < deltaTime) {
            this.currentShape.moveLeft();
        }
        if (keyIsDown(RIGHT_ARROW) && time % 0.05 < deltaTime) {
            this.currentShape.moveRight();
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.speed = 16;
        } else {
            this.speed = 4;
        }
        if (keyIsDown(UP_ARROW) && time % 0.1 < deltaTime) {
            this.currentShape.rotate(this.grid);
        }
        if (keyIsDown(32) && time % 0.1 < deltaTime) {
            this.currentShape.drop();
        }
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
            this.oldShapes.forEach(shape => {
                rows.forEach(row => {
                    let shapeRows = shape.getRows();
                    if(shapeRows.includes(row)) {
                        shape.setShapeFromRow(shapeRows.indexOf(row) + shape.position.y);
                    }
                    
                });
                shape.position.y += 1;
            });
        }
    }
}