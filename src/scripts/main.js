let gameCanvas;
let mainCamera;
let grid;
let deltaTime;
let time = 0;

let shapeShader;
let shapeTexture;

function preload() {
    shapeShader = loadShader('src/shaders/shape.vert', 'src/shaders/shape.frag');
}

function setup() {
    gameCanvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    shapeTexture = createGraphics(50, 50, WEBGL);

    mainCamera = new Camera();
    mainCamera.setZoom(0.85);
    grid = new Grid(10, 20);
    grid.generate();

    shape = new Shape();
    background(0);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {

    deltaTime = 1 / frameRate();
    mainCamera.beginFrame();
    background(0);
    grid.draw();

    shape.draw();
    mainCamera.endFrame();
}
