window.onload = async () => {
    () => {
        const head = document.getElementsByTagName("head")[0];
        let element = document.createElement("script");
        element.src = src;
        head.appendChild(element)
    }
    await load();
    await Core.init();
    main();
}