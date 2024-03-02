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
                    shapeTexture.noStroke();
                    shapeTexture.rect(0,0,shapeTexture.width,shapeTexture.height);
                    shapeTexture.shader(shapeShader);
                    // set the color, converted into a vec4
                    shapeShader.setUniform('uColor', [red(this.color) / 255, green(this.color) / 255, blue(this.color) / 255, 1]);

                    // set the resolution
                    shapeShader.setUniform('uResolution', [shapeTexture.width, shapeTexture.height]);

                    // set the position
                    // map the position to a range of 0 to 1
                    let x = map(this.position.x + j, 0, grid.width, 0.5, 1);
                    let y = map(this.position.y + i, 0, grid.height, 0, 1);
                    shapeShader.setUniform('uPosition', [x, 1 - y]);

                    //set the time
                    shapeShader.setUniform('uTime', millis() / 1000);

                    // set the mouse uniform

                    //map the mouse position to a range of 0 to 1 relative to the shape

                    let mx = map(mouseX, 0, width, 0.5, 1);
                    let my = map(mouseY, 0, height, 0, 1);
                    shapeShader.setUniform('uMouse', [mx, 1 - my]);

                    //fill(this.color);
                    texture(shapeTexture);
                    
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