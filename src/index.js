"use strict"

window.onload = async () => {
    await load();
    await Core.init();
    main();
}

let _importedJSonData = {};
let _importedJSFiles = {
    "./src/index.js": true,
};

function importJS(src) {
    if (!_importedJSFiles[src]) {
        return new Promise((resolve, reject) => {
            const head = document.getElementsByTagName("head")[0];
            let element = document.createElement("script");
            element.src = src;
            head.appendChild(element)
            element.onload = () => {
                _importedJSFiles[src] = true;
                resolve(element)
            }
            element.onerror = (e) => reject(e);
        })
    }
}

function importJSon(src, name, opt = false) {
    return new Promise((resolve, reject) => {
        const head = document.getElementsByTagName("head")[0];
        let element = document.createElement("script");
        element.src = src + ".js";
        head.appendChild(element);
        element.onload = () => {
            element.remove();
            let data = opt ? readJSonData(name) : _importedJSonData[name];
            resolve(data);
        };
        element.onerror = (e) => reject(e);
    })
}

function readJSonData(name) {
    let data = structuredClone(_importedJSonData[name]);
    delete _importedJSonData[name];
    return data
}

async function load() {
    let a = await importJSon("./index.json", "index", true);
    let promises = [];
    a.forEach((e) => {
        promises.push(importJS(e));
    });
    await Promise.all(promises)

}