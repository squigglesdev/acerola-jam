class Dots {
    constructor() {
        this.downDots = [];
        this.fillDown(this.downDots);

        this.upDots = [];
        this.fillUp(this.upDots);

        this.position = createVector(0, 0);
    }

    fillUp(arr) {
        for (let i = -200; i < width + 200; i++) {
            if (i % 150 == 0) {
                for (let j = -100; j <= height + 100; j++) {
                    if (j % 100 == 0) {
                        arr.push(createVector(i-width/2, j-height/2));
                    }
                }
            }
        }
    }

    fillDown(arr) {
        for (let i = -200; i < width + 200; i++) {
            if (i % 150 == 0) {
                for (let j = -100; j <= height + 100; j++) {
                    if (j % 100 == 0) {
                        arr.push(createVector(i-width/2 + 75, j-height/2 + 50));
                    }
                }
            }
        } 
    }

    draw() {
        
        push();
        noStroke();
        translate(this.position.x, this.position.y);
        fill("#E883E2");
        this.upDots.forEach(dot => {
            circle(dot.x, dot.y, 50),
            dot.y -= deltaTime * 10;
            if (dot.y + 25 < -height/2 - 100) {
                dot.y = height/2 + 125;
            }
        });
        this.downDots.forEach(dot => {
            circle(dot.x, dot.y, 50)
            dot.y += deltaTime * 10
            if (dot.y - 25 > height/2 + 100) {
                dot.y = -height/2 - 125;
            }
        });
        pop();
        this.position.add(deltaTime);
        push();
        fill("#ffa0fa");
        rect(-125, -25, 250, 250, 25);
        noStroke();
        fill("#E883E2");
        rect(-100, 0, 200, 200);
        pop();
    }
}

//#E883E2