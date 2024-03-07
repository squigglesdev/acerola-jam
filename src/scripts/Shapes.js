class Shapes {
    constructor() {
        this.I = { shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ], color: "#6bdbc1", texture: iTexture, shader: iShader};

        this.J = { shape: [
            [1,0,0,1]
        ], color: "#4a5db0", texture: jTexture, shader: jShader};

        this.L = { shape: [
            [1,1,1],
            [1,1],
            [1]
        ], color: "#fc4e03", texture: lTexture, shader: lShader};

        this.O = { shape: [
            [1, 0, 1],
            [1, 1, 1]
        ], color: "#ebd515", texture: oTexture, shader: oShader};

        this.S = { shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ], color: "#69e34d", texture: sTexture, shader: sShader};

        this.T = { shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ], color: "#d444ca", texture: tTexture, shader: tShader};

        this.Z ={ shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ], color: "#d63838", texture: zTexture, shader: zShader};

        this.shapes = [this.I, this.J, this.L, this.O, this.S, this.T, this.Z];
    }

    randomShapes() {
        return this.shapes[Math.floor(Math.random() * this.shapes.length)];
    }
}