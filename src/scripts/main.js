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

    gameManager = new GameManager();

    mainCamera = new Camera();
    mainCamera.setZoom(0.85);

    background(0);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {

    deltaTime = 1 / frameRate();
    time += deltaTime;

    mainCamera.beginFrame();
    background(16,21,27);
    
    
    gameManager.update();


    mainCamera.endFrame();
}
