class PixelArtManager {

    constructor() {
        this.grid = new Grid(4 , 4);
        this.grid.generate(0);

        this.dots = new Dots();

        this.enterCanBePressed = false;
        setTimeout(() => {
            this.enterCanBePressed = true;
        }, 1000);

        this.canClick = true;
        this.mouseDragging = false;

        this.mouseTimer = 0;

        this.drawcount = 0;
        CURRENTPHASE = 1;
    }

    update() {
        
        background("#ffa0fa")
        //image(cuteBG, -width/2, -height/2, width, (width/16) * 9)
        this.dots.draw();
        this.handleInput();
        push();
        imageMode(CENTER);
        image(cuteLogo, 0, -height/3, cuteLogo.width/2, cuteLogo.height/2);
        image(cuteOverlay, 0, height/2, width, (width/16) * 9);
        pop();
        this.grid.draw();
    }

    // click on grid spaces to toggle them
    handleInput() {
        if (keyIsDown(ENTER) && this.enterCanBePressed && this.drawcount < 6) {
            this.enterCanBePressed = false;
            setTimeout(() => {
                this.enterCanBePressed = true;
            }, 1000);
            
            mainCamera.shake(5, 0.1);
            shapes.shapes[this.drawcount + 1].shape = [...this.grid.spaces];
            this.drawcount++;
            this.grid.generate(0);
            
        } else if (this.drawcount >= 6) {
            gameManager = new GameManager();
            this.enterCanBePressed = false;
            mainGame = true;
        }
        if (this.mouseDragging) {
            let m2g = this.mouseToGridSpace(mouseX, mouseY);
            let x = m2g.x;
            let y = m2g.y;
            if (x >= 0 && x < this.grid.width && y >= 0 && y < this.grid.height) {
                this.grid.setSpace(x, y, 1);
            }
        } else if (mouseIsPressed && this.canClick) {
            let m2g = this.mouseToGridSpace(mouseX, mouseY);
            let x = m2g.x;
            let y = m2g.y;
            if (x >= 0 && x < this.grid.width && y >= 0 && y < this.grid.height) {
                if (this.grid.spaces[y][x] === 1) {
                    this.grid.setSpace(x, y, 0);
                } else if (this.grid.spaces[y][x] === 0) {
                    this.grid.setSpace(x, y, 1);
                }
            }
            this.canClick = false;
            setTimeout(() => {
                this.canClick = true;
            }, 250);
        } 
        if (mouseIsPressed) {
            this.mouseTimer += deltaTime;
        } else {
            this.mouseTimer = 0;
        }

        if (this.mouseTimer > 0.25) {
            this.mouseDragging = true;
        } else {
            this.mouseDragging = false;
        }
    }

    calculateBBox() {
        //reduce the size of the array to the smallest possible still containing the shape
        let bbox = {x: 0, y: 0, width: 0, height: 0};
        let found = false;
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                if (this.grid.spaces[y][x] === 1) {
                    if (!found) {
                        bbox.x = x;
                        bbox.y = y;
                        found = true;
                    } else {
                        bbox.x = Math.min(bbox.x, x);
                        bbox.y = Math.min(bbox.y, y);
                    }
                    bbox.width = Math.max(bbox.width, x - bbox.x + 1);
                    bbox.height = Math.max(bbox.height, y - bbox.y + 1);
                }
            }
        }
        let newArray = [];
        for (let i = 0; i < bbox.height; i++) {
            newArray[i] = [];
            for (let j = 0; j < bbox.width; j++) {
                newArray[i][j] = this.grid.spaces[i + bbox.y][j + bbox.x];
            }
        }
        return newArray;
    }

    mouseToGridSpace(x, y) {
        let x2 = Math.floor(((x - width / 2) + 100) / 50);
        let y2 = Math.floor(((y - height / 2)) / 50);
        return {x: x2, y: y2};
    }
}