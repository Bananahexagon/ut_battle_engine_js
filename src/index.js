function importJs(src) {
    const head = document.getElementsByTagName("head")[0];
    let element = document.createElement("script");
    element.rc = src;
    head.appendChild(element);
    alert(src);
}

async function importJson(src) {
    let request = new XMLHttpRequest();
    request.open("json", src);
    request.responseType = "json";
    request.send();
    return (() => {
        return request.onload = () => {
            let data = request.response;
            data = JSON.parse(JSON.stringify(data));
            return data
        }
    })();
}

async function load() {
    let a = await importJson("../index.json")
    let promises = [];
    a.forEach((element) => {
        promises.push(importJs(e));
    });
    await Promise.all(promises)
}

window.onload = async () => {
    await load();
    main();
}