let gameCanvas;
let mainCamera;
let grid;
let deltaTime;

function setup() {
    gameCanvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    mainCamera = new Camera();
    grid = new Grid(10, 20);
    grid.generate();

    shape = new Shape();
    background(200);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    deltaTime = 1 / frameRate();
    mainCamera.beginFrame();
    background(200);
    grid.draw();

    shape.draw();
    mainCamera.endFrame();
}
