type CoreT = {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    Assets: Assets,
    init: () => {},
    inputKeys: {
        up: boolean,
        down: boolean,
        left: boolean,
        right: boolean,
        z: boolean,
        x: boolean,
        c: boolean,
    },
    stamp: (name: string, dx: number, dy: number, dd:number, size:number, wh:number, sx:number, sy:number, sw:number | undefined, sh:number | undefined) => void,
}



type Assets = {
    Images: {[index: string]: HTMLImageElement},
    Audios: {[index: string]: HTMLAudioElement},
    Datas: {[index: string]: any},
    loadAssets: ()=>{},
}

let a = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d");

const Core: CoreT = {
    canvas: document.getElementById("canvas") as HTMLCanvasElement,
    ctx: (this as unknown as CoreT).canvas.getContext("2d")!,
    Assets: {
        Images: {},
        Audios: {},
        Datas: {},
        loadAssets: async function () {
            type Asset = {
                type: string,
                name: string,
                src: string,
            };
            let promises: Promise<void>[] = [];
            let index = await require("./assets/index.json")
            index.forEach((element: Asset) => {
                promises.push(new Promise((resolve) => {
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
                            this.Datas[element.name] = require(element.src);
                            break;
                    };
                }));
            });
            await Promise.all(promises);
        },
    },
    init: async function () {
        this.canvas.height = 480;
        this.canvas.width = 640;
        this.ctx.imageSmoothingEnabled = false;
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

        await this.Assets.loadAssets();

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
    stamp: function (name: string, dx: number, dy: number, dd = 0, size = 100, wh = 1, sx = 0, sy = 0, sw = undefined, sh = undefined) {
        const costume = this.Assets.Images[name];
        const sw2 = sw != undefined ? sw : costume.width - sx;
        const sh2 = sh != undefined ? sh : costume.height - sy;
        this.ctx.save();
        this.ctx.translate(dx, dy);
        this.ctx.rotate(dd * Math.PI / 180);
        this.ctx.drawImage(costume, sx, sy, sw2, sh2, -sw2 * size * wh / 200, -sh2 * size / 200, sw2 * size * wh / 100, sh2 * size / 100);
        this.ctx.restore();
    }
};

const Game = {
    player: { x: 0, y: 0 },
    timer: 0,
    settings: {},
    init: () => {
        Global.fontData = Core.Assets.Datas.fontData
    }
}

let Global: {
    [index: string]: any
} = {
    DisplayStrings: {}
}

export { Core, Game, Global };