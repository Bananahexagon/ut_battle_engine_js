const Core = {
    canvas: document.getElementById("canvas"),
    ctx: this.canvas.getContext("2d"),
    Asset: {
        Images: {},
        Audios: {},
        loadAssets: async function () {
            let promises = [];
            let index = await import("../assets/index.json")
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
    }
};