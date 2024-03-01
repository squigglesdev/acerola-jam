class Shapes {
    static I = [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    static J = [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ];

    static L = [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ];

    static O = [
        [1, 1],
        [1, 1]
    ];

    static S = [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ];

    static T = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ];

    static Z = [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ];

    static shapes = [Shapes.I, Shapes.J, Shapes.L, Shapes.O, Shapes.S, Shapes.T, Shapes.Z];

    static randomShapes() {
        return Shapes.shapes[Math.floor(Math.random() * Shapes.shapes.length)];
    }
}