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
        for (let x = 0; x < this.width + 1; x++) {
            for (let y = 0; y < this.height + 1; y++) {
                stroke(134, 154, 179);
                strokeWeight(3);
                line(0 - this.width * 25, y * 50, this.width * 25, y * 50);
            }
            stroke(134, 154, 179);
            line(x * 50 - this.width * 25, 0, x * 50 - this.width * 25, this.height * 50);
        }
    }

    checkRows() {
        let rows = [];
        for (let y = 0; y < this.height; y++) {
            let full = true;
            for (let x = 0; x < this.width; x++) {
                if (!this.spaces[x][y] || isNaN(this.spaces[x][y])) {
                    full = false;
                }
            }
            if (full) {
                rows.push(y);
            }
        }
        return rows;
    }

    clearRows(rows) {
        for (let i = 0; i < rows.length; i++) {
            for (let x = 0; x < this.width; x++) {
                for (let y = rows[i]; y > 0; y--) {
                    this.spaces[x][y] = this.spaces[x][y - 1];
                }
            }
        }
    }
}