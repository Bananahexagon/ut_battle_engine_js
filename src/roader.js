let _importedJsonDatas = {};
let _importedJsFiles = {
    "./src/index.js": true,
    "./src/roader.js": true,
};

function importJs(src) {
    if (!_importedJsFiles[src]) {
        return new Promise((resolve, reject) => {
            const head = document.getElementsByTagName("head")[0];
            let element = document.createElement("script");
            element.src = src;
            head.appendChild(element)
            element.onload = () => {
                _importedJsFiles[src] = true;
                resolve()
            }
            element.onerror = (e) => reject(e);
        })
    }
}

function importJson(src, name) {
    return new Promise((resolve, reject) => {
        const head = document.getElementsByTagName("head")[0];
        let element = document.createElement("script");
        element.src = src + ".js";
        head.appendChild(element);
        element.onload = () => {
            element.remove();
            let data = _importedJsonDatas[name];
            delete _importedJsonDatas[name];
            resolve(data);
        };
        element.onerror = (e) => reject(e);
    })
}

async function load() {
    let a = await importJson("./index.json", "index");
    let promises = [];
    a.forEach((e) => {
        promises.push(importJs(e));
    });
    await Promise.all(promises)
}