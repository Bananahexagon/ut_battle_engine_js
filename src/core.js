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

        await this.Asset.loadAssets();
    },
    stamp: function (name, dx, dy, size = 100, wh = 1, sx = 0, sy = 0, sw = undefined, sh = undefined) {
        let costume = this.Asset.Images[name];
        let sw2 = sw != undefined ? sw : costume.naturalWidth;
        let sh2 = sh != undefined ? sh : costume.naturalHeigth;
        this.ctx.drawImage(costume, sx, sy, sw2, sh2, dx, dy, costume.naturalWidth * size * wh / 100, costume.naturalHeigth * size / 100);
    }
};