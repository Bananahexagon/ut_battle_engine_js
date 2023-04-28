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
        this.Asset.loadAssets();
    },
    stamp: function (costume, dx, dy, size = 100, wh = 1, sx = 0, sy = 0, sw, sh) {
        let image = Core.Asset.Images[costume];
        let sw2 = sw == undefined ? sw : image.width;
        let sh2 = sh == undefined ? sh : image.heigth;
        Core.ctx.drawImage(image, sx, sy, sw2, sh2, dx, dy, image.width * size / 100, image.height * size / 100);
    }
};