class NPC {
    constructor() {
        this.position = createVector(-width/2 + 100, height/2 - 125);
        this.sprite = strawbSprite;
        this.bubbleSpriteLeading = bubbleSpriteLeading;
        this.bubbleSpriteEnding = bubbleSpriteEnding

        this.currentChar = 0;
        this.duration = 0;
        this.inputMethod = "";
        this.currentString = "";
        this.fullString = "";
        this.endPhrase = false;
    }

    draw() {
        push();
        if (mainGame) {
            scale(0.5);
        }

        
        imageMode(CENTER);
        image(this.sprite, this.position.x, this.position.y, this.sprite.width/2, this.sprite.height/2);

        
        this.drawBubble();
        this.drawText();
        let oldChar = this.currentChar;

        this.currentChar += this.duration * (deltaTime * 25);
        this.currentChar = constrain(this.currentChar, 0, this.fullString.length);
        this.currentString = this.fullString.substring(0, this.currentChar);

        this.endPhrase = false;

        if (this.currentChar == this.fullString.length) {
            this.endPhrase = true;
        }

        if (this.fullString[this.currentChar] != " " && time % 0.05 < deltaTime && !this.endPhrase) {
            random(speakSounds).play();
        }


        pop();
    }

    drawText() {
        textSize(32);
        textFont(pixeloid);
        textAlign(LEFT, TOP);
        fill("#000");
        text(this.currentString, this.position.x + 120 + this.bubbleSpriteLeading.width/4, this.position.y - 21);
        
    }

    drawBubble() {
        let bounds = pixeloid.textBounds(this.currentString, this.position.x + 100 + this.bubbleSpriteLeading.width/4, this.position.y - 21, 32);
        

        push();
        fill("#fff");
        imageMode(CORNER);
        noStroke();
        rectMode(CORNER);
        if (this.currentString != "") {
            image(this.bubbleSpriteLeading, this.position.x + 100, this.position.y - this.bubbleSpriteLeading.height/8, this.bubbleSpriteLeading.width/4, this.bubbleSpriteLeading.height/4);
            rect(this.position.x + 100 + this.bubbleSpriteLeading.width/4, this.position.y - this.bubbleSpriteLeading.height/8, bounds.w + 40, this.bubbleSpriteLeading.height/4);
            image(this.bubbleSpriteEnding, this.position.x + 140 + this.bubbleSpriteLeading.width/4 + bounds.w, this.position.y - this.bubbleSpriteLeading.height/8, this.bubbleSpriteEnding.width/4, this.bubbleSpriteLeading.height/4)
        }
        pop();
        push();
        imageMode(CENTER);
        if (this.currentChar == this.fullString.length && this.inputMethod == "spacebar") {
            //swap sprites after 0.5s
            if (time % 1 < 0.5) {
                image(spaceSprite1, this.position.x + 200 + this.bubbleSpriteLeading.width/4 + bounds.w, this.position.y, spaceSprite0.width/2, spaceSprite0.height/2);
            } else {
                image(spaceSprite0, this.position.x + 200 + this.bubbleSpriteLeading.width/4 + bounds.w, this.position.y, spaceSprite1.width/2, spaceSprite1.height/2);
            }
        }
        pop();
    }

    say(text, duration, inputMethod) {
        this.currentChar = 0
        this.duration = duration;
        this.fullString = text;
        this.inputMethod = inputMethod;
    }
}