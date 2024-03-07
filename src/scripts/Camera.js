class Camera {
    constructor() {
        this.position = createVector(0, height/2.2);
        this.targetposition = createVector(0, height/2.2);
        this.shakeDuration = 0;
        this.shakeStrength = 0;
        this.zoom = 1;
    }

    setZoom(zoom) {
        this.zoom = zoom;
        this.targetposition = createVector(0, height/2.2);
    }

    setPosition(position) {
        this.targetposition = position;
    }

    shake(strength, duration) {
        this.shakeStrength = strength;
        this.shakeDuration = duration;
    }

    performShake() {
        this.position.x += random(-this.shakeStrength, this.shakeStrength);
        this.position.y += random(-this.shakeStrength, this.shakeStrength);
    }

    beginFrame() {
        this.position.x = lerp(this.position.x, this.targetposition.x, deltaTime * 10);
        this.position.y = lerp(this.position.y, this.targetposition.y, deltaTime * 10);
        translate(-this.position.x, -this.position.y);

        rectMode(CENTER);
        scale(this.zoom);
        if (this.shakeDuration > 0) {
            this.shakeDuration-= deltaTime;
            this.performShake();
        }
    }

    endFrame() {  
        translate(this.position.x, this.position.y);
        scale(2);
    }
}