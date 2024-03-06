class Shape {
    constructor() {
        // Shape matrix
        this.shapeChoice = shapes.randomShapes();
        this.shape = this.shapeChoice.shape;

        // Position - start in the centre
        if (this.shape === shapes.O) {
            this.position = createVector(4, 0);
        } else {
            this.position = createVector(3, 0);
        }

        this.identifier = random(1000000);

        // Color
        this.color = this.shapeChoice.color;

        // Texture
        this.texture = this.shapeChoice.texture;

        // Shader
        this.shader = this.shapeChoice.shader;
    }

    draw(grid) {
        this.grid = grid;
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) {
                    push();
                    rectMode(CORNER);
                    if (this.texture !== undefined || this.texture !== null) {
                        this.texture.noStroke();
                        this.texture.rect(0,0,this.texture.width,this.texture.height);
                        this.texture.shader(this.shader);
                        
                        // set the color, converted into a vec4
                        this.shader.setUniform('uColor', [red(this.color) / 255, green(this.color) / 255, blue(this.color) / 255, 1]);

                        // set the resolution
                        this.shader.setUniform('uResolution', [this.texture.width, this.texture.height]);

                        // set the position
                        // map the position to a range of 0 to 1
                        let x = map(this.position.x + j, 0, this.grid.width, 0.5, 1);
                        let y = map(this.position.y + i, 0, this.grid.height, 0, 1);
                        this.shader.setUniform('uPosition', [x, 1 - y]);

                        //set the time
                        this.shader.setUniform('uTime', millis() / 1000);

                        // set the mouse uniform

                        //map the mouse position to a range of 0 to 1 relative to the shape

                        let mx = map(mouseX, 0, width, 0.5, 1);
                        let my = map(mouseY, 0, height, 0, 1);
                        this.shader.setUniform('uMouse', [mx, 1 - my]);

                        //fill(this.color);
                        texture(this.texture);
                    }
                    if (!(this.position.y + i > 19)) {
                        rect((this.position.x + j) * 50 - grid.width * 25, (this.position.y + i) * 50, 50, 50);
                    }
                    pop();
                    
                    // Set the corresponding grid space to the shape's identifier
                    //console.log(!(this.position.y + i > 19));
                    if (!(this.position.y + i > 19)) {
                        grid.setSpace(this.position.x + j, this.position.y + i, this.identifier);
                    }
                }
            }
        }
    }
        

    getRows() {
        let rows = [];
        for (let i = 0; i < this.shape.length; i++) {
            let row = this.position.y + i - 1;
            if (!rows.includes(row)) {
                rows.push(row);
            }
        }
        return rows;
    }

    //used for clearing rows
    setShapeFromRow(row) {
        let y = this.gridToLocal(0, row).y;
        //console.log(row)
        console.log(y)
        //make the shape at row y 0
        this.shape[y].forEach(block => {
            block = 0;
        });
    }

    //Returns the position of a space in the shape matrix given a space in the grid
    gridToLocal(x, y) {
        return createVector(x - this.position.x, y - this.position.y);
    }

    moveDown() {
        if (this.canMoveDown()) {
            this.position.y++;

            //reset spaces above
            for (let i = 0; i < this.shape.length; i++) {
                for (let j = 0; j < this.shape[i].length; j++) {
                    if (this.shape[i][j] === 1) {
                        this.grid.setSpace(this.position.x + j, this.position.y - 1 + i, false);
                    }
                }
            }

            return true;
        }
        return false;
    }

    moveLeft() {
        if (this.canMoveHorizontal(-1)) {
            this.position.x--;

            //reset spaces to the left
            for (let i = 0; i < this.shape.length; i++) {
                for (let j = 0; j < this.shape[i].length; j++) {
                    if (this.shape[i][j] === 1) {
                        this.grid.setSpace(this.position.x + 1 + j, this.position.y + i, false);
                    }
                }
            }

            return true;
        }
        return false;
    }

    moveRight() {
        if (this.canMoveHorizontal(1)) {
            this.position.x++;

            //reset spaces to the right
            for (let i = 0; i < this.shape.length; i++) {
                for (let j = 0; j < this.shape[i].length; j++) {
                    if (this.shape[i][j] === 1) {
                        this.grid.setSpace(this.position.x - 1 + j, this.position.y + i, false);
                    }
                }
            }

            return true;
        }
        return false;
    }

    canMoveDown() {
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) {
                    // Check if the shape is at the bottom of the grid, or if there is another shape below it
                    if (this.position.y + i + 1 >= this.grid.height || (this.grid.spaces[this.position.y + i + 1][this.position.x + j] !== this.identifier && this.grid.spaces[this.position.y + i + 1][this.position.x + j])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    canMoveHorizontal(direction) {
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) {
                    // Check if the shape is at the edge of the grid, or if there is another shape to the side
                    if (this.position.x + j + direction < 0 || this.position.x + j + direction >= this.grid.width || (this.grid.spaces[this.position.y + i][this.position.x + j + direction] !== this.identifier && this.grid.spaces[this.position.y + i][this.position.x + j + direction])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}