let CURRENTPHASE;

let dialogueSystem;

let gameCanvas;
let gameManager;

let pixelArtManager;
let mainCamera;
let npc;

let mainGame = false;
let grid;
let deltaTime;
let time = 0;

let shapes;

let shapeShader;
let thumbsup;

let cuteBG;

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

    cuteOverlay = loadImage('src/images/OVERLAY.png');
    cuteLogo = loadImage('src/images/LOGO.png');

    strawbSprite = loadImage('src/images/NPC.png');
    bubbleSpriteLeading = loadImage('src/images/BUBBLE_LEADING.png');
    bubbleSpriteEnding = loadImage('src/images/BUBBLE_ENDING.png');

    spaceSprite0 = loadImage('src/images/space00.png');
    spaceSprite1 = loadImage('src/images/space01.png');

    pixeloid = loadFont('src/fonts/pixeloid.ttf');

    phase1Dialogue = loadJSON("src/dialogue/phase1.json");
    phase2Dialogue = loadJSON("src/dialogue/phase2.json");

    speakSound = loadSound("src/sounds/speak.mp3");
}

function setup() {
    imageMode(CENTER);
    gameCanvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    setupShaders();

    shapes = new Shapes();

    pixelArtManager = new PixelArtManager();

    mainCamera = new Camera();
    mainCamera.setZoom(0.85);

    npc = new NPC();

    background(0);

    frameRate(165);

    dialogueSystem = new DialogueSystem();
    dialogueSystem.start();
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    if (!mainGame) {
        npc.position = createVector(-width/2 + 100, height/2 - 125);
    } else {
        npc.position = createVector(-width/2, height/2);
    }
}

function draw() {

    deltaTime = 1 / frameRate();
    time += deltaTime;

    
    background(16,21,27);
    
    switch (mainGame) {
        case true:
            mainCamera.beginFrame();
            gameManager.update();
            mainCamera.endFrame();
            break;
        case false:
            pixelArtManager.update();
            break;
    }

    npc.draw();
    
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

function waitUntil(condition) {
    const poll = resolve => {
        if(condition()) resolve();
        else setTimeout(_ => poll(resolve), 100);
    }

    return new Promise(poll);
}

const delay = ms => new Promise(res => setTimeout(res, ms));
