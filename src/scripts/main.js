let gameCanvas;
let mainCamera;
let grid;
let deltaTime;

function setup() {
    gameCanvas = createCanvas(800, 800);
    mainCamera = new Camera();
    grid = new Grid(16, 16);
    grid.generate();
    background(200);
}

function draw() {
    deltaTime = 1 / frameRate();
    mainCamera.beginFrame();
    background(200);
    grid.draw();


    mainCamera.endFrame();
}
