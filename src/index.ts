window.onload = async () => {
    await load();
    await Core.init();
    main();
}

async function load() {
    let index = require("/index.json")
    let promises = [];
    index.forEach((e) => {
        promises.push(import(e));
    });
    await Promise.all(promises)

}