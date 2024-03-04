let gameCanvas;
let gameManager;
let mainCamera;
let grid;
let deltaTime;
let time = 0;

let shapes;

let shapeShader;

let iTexture;
let jTexture;
let lTexture;
let oTexture;
let sTexture;
let tTexture;
let zTexture;

let iShader;
let jShader;
let lShader;
let oShader;
let sShader;
let tShader;
let zShader;


function preload() {
    shapeShader = loadShader('src/shaders/shape.vert', 'src/shaders/shape.frag');
        
    
}

function setup() {
    gameCanvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    setupShaders();
    shapes = new Shapes();

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

function setupShaders() {
    iTexture = createGraphics(50, 50, WEBGL);
    iTexture.background(0);
    iTexture.fill(255);
    iTexture.rect(0, 0, 50, 50);
    iShader = shapeShader.copyToContext(iTexture);

    jTexture = createGraphics(50, 50, WEBGL);
    jTexture.background(0);
    jTexture.fill(255);
    jTexture.rect(0, 0, 50, 50);
    jShader = shapeShader.copyToContext(jTexture);

    lTexture = createGraphics(50, 50, WEBGL);
    lTexture.background(0);
    lTexture.fill(255);
    lTexture.rect(0, 0, 50, 50);
    lShader = shapeShader.copyToContext(lTexture);

    oTexture = createGraphics(50, 50, WEBGL);
    oTexture.background(0);
    oTexture.fill(255);
    oTexture.rect(0, 0, 50, 50);
    oShader = shapeShader.copyToContext(oTexture);

    sTexture = createGraphics(50, 50, WEBGL);
    sTexture.background(0);
    sTexture.fill(255);
    sTexture.rect(0, 0, 50, 50);
    sShader = shapeShader.copyToContext(sTexture);

    tTexture = createGraphics(50, 50, WEBGL);
    tTexture.background(0);
    tTexture.fill(255);
    tTexture.rect(0, 0, 50, 50);
    tShader = shapeShader.copyToContext(tTexture);

    zTexture = createGraphics(50, 50, WEBGL);
    zTexture.background(0);
    zTexture.fill(255);
    zTexture.rect(0, 0, 50, 50);
    zShader = shapeShader.copyToContext(zTexture);
}
