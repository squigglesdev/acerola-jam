class DialogueSystem {
    constructor() {
        if (CURRENTPHASE == 1 || CURRENTPHASE == undefined) {
            this.dialogue = Object.values(phase1Dialogue);
        } else if (CURRENTPHASE == 2) {
            this.dialogue = Object.values(phase2Dialogue);
        } else if (CURRENTPHASE == 3) {
            this.dialogue = Object.values(phase3Dialogue);
        } else if (CURRENTPHASE == 4) {
            this.dialogue = Object.values(phase4Dialogue);
        }

        this.spaceCanBePressed = false;
        setTimeout(() => {
            this.spaceCanBePressed = true;
        },1000);

        this.mouseCanBeClicked = false;
        setTimeout(() => {
            this.mouseCanBeClicked = true;
        },1000);

        this.enterCanBePressed = false;
        setTimeout(() => {
            this.enterCanBePressed = true;
        },1000);

        this.startTime = 1;
    }

    async start() {
        if (CURRENTPHASE == 1 || CURRENTPHASE == undefined) {
            this.dialogue = Object.values(phase1Dialogue);
        } else if (CURRENTPHASE == 2) {
            this.dialogue = Object.values(phase2Dialogue);
        } else if (CURRENTPHASE == 3) {
            this.dialogue = Object.values(phase3Dialogue);
        } else if (CURRENTPHASE == 4) {
            this.dialogue = Object.values(phase4Dialogue);
        }

        for (let line = 0; line < this.dialogue.length; line++) {
            npc.say(this.dialogue[line].dialogue, this.dialogue[line].animationDuration, this.dialogue[line].staysUntil);
            console.log(this.dialogue[line].dialogue)
            if (this.dialogue[line].staysUntil == "spacebar") {
                this.spaceCanBePressed = false;
                setTimeout(() => {
                    this.spaceCanBePressed = true;
                }, 500);
                await waitUntil(_ => (keyIsDown(32) === true && this.spaceCanBePressed === true));
                
            } else if (this.dialogue[line].staysUntil == "mouseclick") { 
                this.mouseCanBeClicked = false;
                setTimeout(() => {
                    this.mouseCanBeClicked = true;
                }, 2500);
                await waitUntil(_ => (mouseIsPressed === true && this.mouseCanBeClicked === true));
            } else if (this.dialogue[line].staysUntil == "enter") {
                this.enterCanBePressed = false;
                setTimeout(() => {
                    this.enterCanBePressed = true;
                }, 500);
                await waitUntil(_ => (keyIsDown(ENTER) === true && this.enterCanBePressed === true)); 
            } else if (this.dialogue[line].staysUntil > 0) {
                await delay((this.dialogue[line].staysUntil + this.dialogue[line].animationDuration) * 1000); 
            } else if (this.dialogue[line].staysUntil == "reload") {
                location.reload();
            }
        }
    }
}