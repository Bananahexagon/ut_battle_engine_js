"use strict"

window.onload = async () => {
    await load();
    await Core.init();
    main();
}