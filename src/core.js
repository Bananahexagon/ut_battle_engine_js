const Core = {
    canvas: document.getElementById("canvas"),
    ctx: this.canvas.getContext("2d"),
    Asset: {
        Images: {},
        Audios: {},
        loadAssets: async function () {
            let promises = [];
            let index = await importJson("./assets/index.json", "asset_index")
            index.forEach((element) => {
                let promise = new Promise((resolve) => {
                    switch (element.type) {
                        case "image":
                            let image = new Image();
                            image.src = element.src;
                            image.onload = () => {
                                this.Images[element.name] = image;
                                resolve();
                            }
                            break;
                        case "audio":
                            let audio = new Audio();
                            audio.src = element.src;
                            audio.onload = () => {
                                this.Audios[element.name] = audio;
                                resolve();
                            }
                            break;
                        case "data":
                            importJson(element.src);
                            break;
                    };
                });
                promises.push(promise);
            });
            await Promise.all(promises);
        },
    },
    init: async function () {
        this.canvas.height = 480;
        this.canvas.width = 640;
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
        const sw2 = sw != undefined ? sw : costume.width;
        const sh2 = sh != undefined ? sh : costume.height;
        const width = sw2 - sx;
        const height = sh2 - sy;
        this.ctx.save();
        this.ctx.translate(dx, dy);
        this.ctx.rotate(dd * Math.PI / 180);
        this.ctx.drawImage(costume, sx, sy, sw2, sh2, -width * size * wh / 200, -height * size / 200, width * size * wh / 100, height * size / 100);
        this.ctx.restore();
    }
};

const Game = {
    player: { x: 0, y: 0 },
    settings: {},
}

let Global = {}