class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.spaces = [];
    }

    generate() {
        for (let x = 0; x < this.width; x++) {
            this.spaces[x] = [];
            for (let y = 0; y < this.height; y++) {
                this.spaces[x][y] = false;
            }
        }
    }

    setSpace(x, y, value) {
        this.spaces[x][y] = value;
    }

    draw() {
        if (this.spaces.length === 0) {
            return;
        }
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.spaces[x][y]) {
                    fill(0);
                    noStroke();
                    square(x * 50, y * 50, 50);
                }
                stroke(255);
                line(0, y * 50, this.width * 50, y * 50);
            }
            stroke(255);
            line(x * 50, 0, x * 50, this.height * 50);
        }
    }
}