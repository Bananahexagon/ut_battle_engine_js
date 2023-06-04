"use strict"

const Core = {
    canvas: document.getElementById("canvas"),
    ctx: this.canvas.getContext("2d"),
    Asset: {
        Images: {},
        Audios: {},
        loadAssets: async function () {
            const index = await importJson("./assets/index.json", "assetIndex", true);
            P.map(index, (element) => {
                new Promise((resolve) => {
                    switch (element.type) {
                        case "image":
                            {
                                let image = new Image();
                                image.src = element.src;
                                image.onload = () => {
                                    this.Images[element.name] = image;
                                    resolve();
                                }
                            } break;
                        case "audio":
                            {
                                let audio = new Audio();
                                audio.src = element.src;
                                audio.onload = () => {
                                    this.Audios[element.name] = audio;
                                    resolve();
                                }
                            } break;
                        case "data":
                            {
                                importJson(element.src, element.name).then(() => {
                                    resolve();
                                })
                            } break;
                    };
                });
            });
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
    stamp: function (name, dx, dy, dd = 0, size = 100, wh = 1, sx = 0, sy = 0, sw = undefined, sh = undefined) {
        const costume = this.Asset.Images[name];
        const sw2 = sw != undefined ? sw : costume.width - sx;
        const sh2 = sh != undefined ? sh : costume.height - sy;
        this.ctx.save();
        this.ctx.translate(dx * 2, dy * 2);
        this.ctx.rotate(dd * Math.PI / 180);
        this.ctx.drawImage(costume, sx, sy, sw2, sh2, -sw2 * size * wh / 100, -sh2 * size / 100, sw2 * size * wh / 50, sh2 * size / 50);
        this.ctx.restore();
    }
};

const Game = {
    player: {
        x: 0,
        y: 0,
        lv: 19,
        hp: 92,
        max: 92,
        name: "chara",
    },
    timer: 0,
    settings: {},
    scene: "menu",
    init: () => {
        Global.fontData = {
            en: readJsonData("fontDataEn"),
            status: readJsonData("fontDataStatus"),
        }
    }
}

let Global = {
    displayStrings: {},
    fontData: {
        en: {},
        status: {},
    },
}