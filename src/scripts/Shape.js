class Shape {
    constructor() {
        // Shape matrix
        this.shape = Shapes.randomShapes();

        // Position - start in the centre
        if (this.shape === Shapes.O) {
            this.position = createVector(4, 0);
        } else {
            this.position = createVector(3, 0);
        }

        // Color
        this.color = color(random(255), random(255), random(255));
    }

    draw() {
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) {
                    push();
                    rectMode(CORNER);
                    fill(this.color);
                    rect((this.position.x + j) * 50 - grid.width * 25, (this.position.y + i) * 50, 50, 50);
                    pop();
                    
                    // Set the corresponding grid space to true
                    grid.setSpace(this.position.x + j, this.position.y + i, true);
                }
            }
        }
    }

    moveDown() {
        grid.generate();
        this.position.y++;
    }
}