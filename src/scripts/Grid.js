class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.spaces = [];
    }

    generate(value) {
        for (let y = 0; y < this.height; y++) {
            this.spaces[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.spaces[y][x] = value;
            }
        }
    }

    setSpace(x, y, value) {
        try {
            this.spaces[y][x] = value;
            return this.spaces[y][x];
        } catch (e) {
            console.log('error setting space', x, y, value);
        }
    }

    draw() {
        if (this.spaces.length === 0) {
            return;
        }
        for (let x = 0; x < this.width + 1; x++) {
            for (let y = 0; y < this.height + 1; y++) {
                stroke('#fff');
                strokeWeight(3);
                line(0 - this.width * 25, y * 50, this.width * 25, y * 50);

                try {
                    
                    if (!mainGame && this.spaces !== undefined && this.spaces[y][x] === 1 ) {
                        push();
                        rectMode(CORNER);
                        noStroke();
                        rect(x * 50 - this.width * 25, y * 50, 50, 50);
                        pop();
                    }
                } catch {}
            }
            stroke('#fff');
            line(x * 50 - this.width * 25, 0, x * 50 - this.width * 25, this.height * 50);
        }
    }

    checkRows() {
        let rows = [];
        for (let y = 0; y < this.height; y++) {
            let isRow = true;
            for (let x = 0; x < this.width; x++) {
                if (!this.spaces[y][x]) {
                    isRow = false;
                    break;
                }
            }
            if (isRow) {
                rows.push(y);
            }
        }
        return rows;
    }

    clearRows(rows) {
        rows.sort((a, b) => b - a); // sort rows in descending order
        rows.forEach(row => {
            this.spaces.splice(row, 1);
            this.spaces.unshift(new Array(this.width).fill(false));
        });
    }
}