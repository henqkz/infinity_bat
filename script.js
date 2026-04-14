const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const bgFar = new Image();
bgFar.src = "assets/bg_far.png";

const bgNear = new Image();
bgNear.src = "assets/bg_near.png";

const batFrames = ["assets/bat1.png", "assets/bat2.png", "assets/bat3.png"];
const batImages = [];

let loaded = 0;
batFrames.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        loaded++;
        if (loaded === batFrames.length) animate();
    };
    batImages.push(img);
});

let frame = 0;
let timer = 0;

let farX = 0;
let nearX = 0;

function drawCover(img, x, speed) {
    const cw = canvas.width;
    const ch = canvas.height;

    const scale = Math.max(cw / img.width, ch / img.height);

    const drawW = img.width * scale;
    const drawH = img.height * scale;

    const y = (ch - drawH) / 2;

    x -= speed;

    if (x <= -drawW) x = 0;

    ctx.drawImage(img, x, y, drawW, drawH);
    ctx.drawImage(img, x + drawW, y, drawW, drawH);

    return x;
}

function animate() {
    requestAnimationFrame(animate);

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    farX = drawCover(bgFar, farX, 0.3);

    nearX = drawCover(bgNear, nearX, 1.2);

    timer++;
    if (timer > 8) {
        frame = (frame + 1) % batImages.length;
        timer = 0;
    }

    const batW = 150;
    const batH = 150;

    ctx.drawImage(
        batImages[frame],
        (w - batW) / 2,
        (h - batH) / 2,
        batW,
        batH
    );
}