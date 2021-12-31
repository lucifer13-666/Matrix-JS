let charArr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "А",
    "В",
    "Г",
    "Д",
    "Є",
    "Ѕ",
    "З",
    "И",
    "Ѳ",
    "І",
    "К",
    "Л",
    "М",
    "Н",
    "Ѯ",
    "Ѻ",
    "П",
    "Ч",
    "Р",
    "С",
    "Т",
    "Ѵ",
    "Ф",
    "Х",
    "Ѱ",
    "Ѿ",
    "Ц",
];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cw = window.innerWidth;
let ch = window.innerHeight;

canvas.width = cw;
canvas.height = ch;

let maxCharCount = 1000;
let fallingCharArr = [];
let fontSize = 15;
let maxColumns = cw / fontSize;
let frames = 0;

class FallingChar {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // vẽ random 1 ký tự màu xanh tại vị trí x,y
    draw(ctx) {
        this.value =
            charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase(); // random lấy 1 ký tự trong mảng charArr và viết hoa

        this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

        ctx.fillStyle = "rgba(0,255,0)"; // màu xanh
        ctx.font = fontSize + "px san-serif";
        ctx.fillText(this.value, this.x, this.y);
        // fillText() sử dụng để vẽ chữ đã được đổ màu trong canvas. Mặc định là màu đen.
        this.y += this.speed;

        if (this.y > ch) {
            this.y = (Math.random() * ch) / 2 - 50;
            this.x = Math.floor(Math.random() * maxColumns) * fontSize;
            this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        }
    }
}

let update = () => {
    if (fallingCharArr.length < maxCharCount) {
        let fallingChar = new FallingChar(
            Math.floor(Math.random() * maxColumns) * fontSize,
            (Math.random() * ch) / 2 - 50
        ); //tạo mới class FallingChar

        fallingCharArr.push(fallingChar);
    }

    ctx.fillStyle = "rgba(0,0,0,0.05)"; // màu đen
    ctx.fillRect(0, 0, cw, ch); //vẽ hình chữ nhật

    for (let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++) {
        fallingCharArr[i].draw(ctx);
    }

    requestAnimationFrame(update);
    frames++;
};

update();