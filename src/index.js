"use strict"

window.onload = async () => {
    await load();
    await Core.init();
    main();
}

let _importedJsonData = {};
let _importedJsFiles = {
    "./src/index.js": true,
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
                resolve(element)
            }
            element.onerror = (e) => reject(e);
        })
    }
}

function importJson(src, name, opt = false) {
    return new Promise((resolve, reject) => {
        const head = document.getElementsByTagName("head")[0];
        let element = document.createElement("script");
        element.src = src + ".js";
        head.appendChild(element);
        element.onload = () => {
            element.remove();
            let data = opt ? readJsonData(name) : _importedJsonData[name];
            resolve(data);
        };
        element.onerror = (e) => reject(e);
    })
}

function readJsonData(name) {
    let data = structuredClone(_importedJsonData[name]);
    delete _importedJsonData[name];
    return data
}

async function load() {
    let a = await importJson("./index.json", "index", true);
    let promises = [];
    a.forEach((e) => {
        promises.push(importJs(e));
    });
    await Promise.all(promises)

}