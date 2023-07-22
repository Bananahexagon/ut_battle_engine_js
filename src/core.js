"use strict"

const Core = {
    canvas: document.getElementById("canvas"),
    ctx: this.canvas.getContext("2d"),
    Asset: {
        Images: {},
        Audios: {},
        loadAssets: async function () {
            const index = await importJSon("./assets/index.json", "assetIndex", true);
            let promises = [];
            index.forEach(element => {
                promises.push(new Promise(resolve => {
                    switch (element.type) {
                        case "image": {
                            let image = new Image();
                            image.src = element.src;
                            image.onload = () => {
                                this.Images[element.name] = image;
                                resolve();
                            }
                        } break;
                        case "audio": {
                            let audio = new Audio();
                            audio.src = element.src;
                            audio.onload = () => {
                                this.Audios[element.name] = audio;
                                resolve();
                            }
                        } break;
                        case "data": {
                            importJSon(element.src, element.name).then(() => {
                                resolve();
                            })
                        } break;
                    };
                }));
            });
            await Promise.all(promises);
        },
    },
    init: async function () {
        this.canvas.height = 960;
        this.canvas.width = 1280;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;

        window.addEventListener("keydown", e => {
            switch (e.key) {
                case "ArrowUp":
                    this.inputKeys.up = true;
                    break;
                case "ArrowDown":
                    this.inputKeys.down = true;
                    break;
                case "ArrowLeft":
                    this.inputKeys.left = true;
                    break;
                case "ArrowRight":
                    this.inputKeys.right = true;
                    break;
                case "z":
                case "Z":
                    this.inputKeys.z = true;
                    break;
                case "x":
                case "X":
                    this.inputKeys.x = true;
                    break;
                case "c":
                case "C":
                    this.inputKeys.c = true;
            }
        });

        window.addEventListener("keyup", e => {
            switch (e.key) {
                case "ArrowUp":
                    this.inputKeys.up = false;
                    break;
                case "ArrowDown":
                    this.inputKeys.down = false;
                    break;
                case "ArrowLeft":
                    this.inputKeys.left = false;
                    break;
                case "ArrowRight":
                    this.inputKeys.right = false;
                    break;
                case "z":
                case "Z":
                    this.inputKeys.z = false;
                    break;
                case "x":
                case "X":
                    this.inputKeys.x = false;
                    break;
                case "c":
                case "C":
                    this.inputKeys.c = false;
            }
        });

        await this.Asset.loadAssets();

        Game.init();
    },
    inputKeys: {
        up: false,
        down: false,
        left: false,
        right: false,
        z: false,
        x: false,
        c: false,
    },
    stamp(name, dx, dy, dd = 0, size = 100, wh = 1, sx = 0, sy = 0, sw = undefined, sh = undefined) {
        const costume = this.Asset.Images[name];
        const sw2 = sw != undefined ? sw : costume.width - sx;
        const sh2 = sh != undefined ? sh : costume.height - sy;
        this.ctx.save();
        this.ctx.translate(dx * 2, dy * 2);
        this.ctx.rotate(dd * Math.PI / 180);
        this.ctx.drawImage(costume, sx, sy, sw2, sh2, -sw2 * size * wh / 100, -sh2 * size / 100, sw2 * size * wh / 50, sh2 * size / 50);
        this.ctx.restore();
    },
    rect(dx, dy, width, heigth, color, direction = 0, type = 1) {
        this.ctx.save();
        this.ctx.translate(dx * 2 + width * type, dy * 2 + heigth * type);
        this.ctx.rotate(direction * Math.PI / 180);
        this.ctx.beginPath();
        this.ctx.rect(-width * type, -heigth * type, width * 2, heigth * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.restore();
    },
    drawLine(lx, ly, d, len, width, color, type = 0) {
        this.ctx.beginPath();
        switch (type) {
            case 0: {
                this.ctx.moveTo(lx * 2 - len * Math.sin(d), ly * 2 + len * Math.cos(d));
                this.ctx.lineTo(lx * 2 + len * Math.sin(d), ly * 2 - len * Math.cos(d));
            } break;
            case 1: {
                this.ctx.moveTo(lx * 2, ly * 2);
                this.ctx.lineTo(lx * 2 + len * Math.sin(d) * 2, ly * 2 - len * Math.cos(d) * 2);
            } break;
        }
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
    }
};

let Game = {
    player: {
        x: 0,
        y: 0,
        lv: 19,
        hp: 92,
        max: 92,
        name: "chara",
    },
    box: {
        center: {
            x: 320,
            y: 240,
        },
        width: 30,
        heigth: 120,
        direction: 0,
    },
    enemy: {
        costume: "sans",
        x: 320,
        y: 240,
        size: 200,
        direction: 0
    },
    timer: 0,
    settings: {},
    scene: "box",
    init: () => {
        Global.fontData = {
            en: readJSonData("fontDataEn"),
            status: readJSonData("fontDataStatus"),
        }
    },
    game_option: {
    }
}

let Global = {
    displayStrings: {},
    fontData: {
        en: {},
        status: {},
    },
    enemyAttacks: {

    },
}